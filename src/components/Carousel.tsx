import { useCallback, useEffect, useRef, useState } from "react";

import classes from "./Carousel.module.css";
import Card from "../layout/Card";

interface CarouselProps {
  components: any[];
  type: "spells" | "tips";
}

interface SwipeState {
  isSwiping: boolean;
  swipeDistance: number;
  shouldTransition: boolean;
}

enum DIRECTION {
  LEFT = "left",
  RIGHT = "right",
  NONE = "none",
}

const defaultSwipeState: SwipeState = {
  isSwiping: false,
  swipeDistance: 0,
  shouldTransition: true,
};

const Carousel = ({ components, type }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const [swipeState, setSwipeState] = useState<SwipeState>(defaultSwipeState);
  const innerDiv = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => {
    setSwipeState({
      isSwiping: true,
      swipeDistance: touchStart - e.targetTouches[0].clientX,
      shouldTransition: false,
    });
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setSwipeState({
      isSwiping: false,
      swipeDistance: 0,
      shouldTransition: true,
    });
    if (!touchStart || !touchEnd) return;

    const direction = getSwipeDirection();

    if (direction === DIRECTION.LEFT) {
      handleNext();
    }
    if (direction === DIRECTION.RIGHT) {
      handlePrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const getSwipeDirection = (): DIRECTION => {
    let direction = DIRECTION.NONE;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      direction = DIRECTION.LEFT;
    }
    if (distance < -minSwipeDistance) {
      direction = DIRECTION.RIGHT;
    }

    return direction;
  };

  // const carouselComponents = [components[0], ...components[1]];
  const carouselComponents: any[] = [];
  components.forEach((c) => {
    if (Array.isArray(c)) {
      c.forEach((comp) => carouselComponents.push(comp));
    } else {
      carouselComponents.push(c);
    }
  });

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === carouselComponents.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? carouselComponents.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const simulateSlide = () => {
    setSwipeState({
      isSwiping: true,
      swipeDistance: 150,
      shouldTransition: true,
    });
    setTimeout(
      () =>
        setSwipeState({
          isSwiping: false,
          swipeDistance: 0,
          shouldTransition: true,
        }),
      300
    );
  };

  const setMaxHeight = useCallback(() => {
    // window.getComputedStyle(document.getElementsByClassName("spell-text")[1]).height;
    let items = null;
    let heightToAdd = 0;
    if (type === "spells") {
      items = document.getElementsByClassName("spell-text");
      heightToAdd = 25;
    } else {
      items = document.getElementsByClassName("tip");
      heightToAdd = 70;
    }

    let maxHeight = 0;
    for (let i = 0; i < items.length; i++) {
      console.log(items[i]);
      const itemHeight = parseFloat(window.getComputedStyle(items[i]).height);
      if (itemHeight > maxHeight) maxHeight = itemHeight + heightToAdd;
    }
    debugger;
    console.log(maxHeight, type);
    if (innerDiv.current) {
      innerDiv.current.style.height = `${maxHeight}px`;
    }
  }, [type]);

  useEffect(() => {
    setMaxHeight();
    const timeout = setTimeout(() => {
      simulateSlide();
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [setMaxHeight]);

  return (
    <div
      className={classes.carousel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        ref={innerDiv}
        style={{ position: "relative", height: 215, overflow: "hidden" }}
      >
        {carouselComponents.map((component, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              transform: `translateX(${
                currentIndex === 0 && !swipeState.isSwiping
                  ? index * 350
                  : swipeState.isSwiping
                  ? index * 350 - currentIndex * 350 - swipeState.swipeDistance
                  : index * 350 - currentIndex * 350
              }px)`,
              transition: swipeState.shouldTransition ? "transform 0.3s" : "",
            }}
          >
            <Card>{component}</Card>
          </div>
        ))}
      </div>

      <div className={classes["carousel-indicator"]}>
        {carouselComponents.map((_, index) => (
          <div
            key={index}
            className={`${classes.dot} ${
              currentIndex === index ? classes.active : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
