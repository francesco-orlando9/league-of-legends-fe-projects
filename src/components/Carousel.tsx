import { useCallback, useEffect, useRef, useState } from "react";

import classes from "./Carousel.module.css";
import Card from "../layout/Card";

interface CarouselProps {
  components: any[];
  type: "spells" | "tips" | "skins";
}

export interface SwipeState {
  isSwiping: boolean;
  swipeDistance: number;
  shouldTransition: boolean;
}

export enum DIRECTION {
  LEFT = "left",
  RIGHT = "right",
  NONE = "none",
}

export const defaultSwipeState: SwipeState = {
  isSwiping: false,
  swipeDistance: 0,
  shouldTransition: true,
};

const Carousel = ({ components, type }: CarouselProps) => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [swipeState, setSwipeState] = useState<SwipeState>(defaultSwipeState);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const innerDiv = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    if (windowWidth > 1024) return;

    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => {
    if (windowWidth > 1024) return;

    setSwipeState({
      isSwiping: true,
      swipeDistance: touchStart - e.targetTouches[0].clientX,
      shouldTransition: false,
    });
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (windowWidth > 1024) return;

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

  const simulateSlide = useCallback(() => {
    if (windowWidth > 1024) return;

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
  }, [windowWidth]);

  const setMaxHeight = useCallback(() => {
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

    console.log(maxHeight, type);
    if (innerDiv.current) {
      innerDiv.current.style.height = `${maxHeight}px`;
    }
  }, [type]);

  useEffect(() => {
    setMaxHeight();
    setWindowWidth(window.innerWidth);
    const timeout = setTimeout(() => {
      simulateSlide();
    }, 4000);

    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      setMaxHeight();
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
        setMaxHeight();
      });
      clearTimeout(timeout);
    };
  }, [setMaxHeight, simulateSlide]);

  return (
    <div
      className={classes.carousel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        ref={innerDiv}
        className={classes["inner-div"]}
        style={{ position: "relative", height: 215, overflow: "hidden" }}
      >
        {carouselComponents.map((component, index) => (
          <div
            className={classes["card-container"]}
            key={index}
            style={{
              position: "absolute",
              transform: `translateX(${
                currentIndex === 0 && !swipeState.isSwiping
                  ? index * windowWidth
                  : swipeState.isSwiping
                  ? index * windowWidth -
                    currentIndex * windowWidth -
                    swipeState.swipeDistance
                  : index * windowWidth - currentIndex * windowWidth
              }px)`,
              transition: swipeState.shouldTransition ? "transform 0.3s" : "",
              width: "100%",
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
