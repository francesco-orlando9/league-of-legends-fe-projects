import { useCallback, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Tooltip } from "react-tooltip";
import { DIRECTION, SwipeState, defaultSwipeState } from "./Carousel";

import classes from "./SkinCarousel.module.css";
import { t } from "i18next";

interface SkinCarouselProps {
  images: { name: string; src: string }[];
}

const SkinCarousel = ({ images }: SkinCarouselProps) => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [swipeState, setSwipeState] = useState<SwipeState>(defaultSwipeState);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
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

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const setMaxHeight = useCallback(() => {
    let item = document.getElementById("splash-image");
    if (!item) return;

    let heightToAdd = 30;
    let height = parseFloat(window.getComputedStyle(item).height) + heightToAdd;

    console.log("splash height", height);
    if (innerDiv.current) {
      innerDiv.current.style.height = `${height}px`;
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMaxHeight();
    }, 1000);
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      setMaxHeight();
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
        setMaxHeight();
      });
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
        {images.map((image, index) => (
          <div
            className={classes["skin-container"]}
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
            <h3 style={{ textAlign: "center" }}>
              {image.name === "default" ? t("title.base_skin") : image.name}
            </h3>
            <img src={image.src} alt="champion skin" />
          </div>
        ))}
      </div>

      <div className={classes["carousel-indicator"]}>
        {images.map((image, index) => (
          <div
            data-tooltip-id="carousel-indicator"
            data-tooltip-content={
              image.name === "default" ? t("title.base_skin") : image.name
            }
            key={index}
            className={`${classes.dot} ${
              currentIndex === index ? classes.active : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
      <Tooltip id="carousel-indicator" />
    </div>
  );
};

export default SkinCarousel;
