import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useScroll,
} from "framer-motion";

import classes from "./Carousel.module.css";
import Card from "../layout/Card";

interface CarouselProps {
  components: any[];
}

const Carousel = ({ components }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [shouldTransition, setShouldTransition] = useState<boolean>(false);

  const minSwipeDistance = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      if (!touchEnd) {
        simulateSlide();
      }
    }, 10000);
    // simulateSlide();

    return () => {
      clearInterval(interval);
    };
  }, [touchEnd]);

  const onTouchStart = (e: any) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    // setShouldTransition(true);
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
    // setTimeout(() => setShouldTransition(false), 600);
  };

  const carouselComponents = [components[0], ...components[1]];

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
    setShouldTransition(true);
    setTouchEnd(5);
    setTouchStart(150);
    setTimeout(() => {
      setTouchEnd(null);
      setTouchStart(null);
    }, 300);
    setTimeout(() => setShouldTransition(false), 600);
  };

  return (
    <div
      className={classes.carousel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div style={{ position: "relative", height: 215, overflow: "hidden" }}>
        <div
          style={{
            transition: shouldTransition ? "transform 0.3s" : "",
            transform: `translateX(-${
              touchEnd && touchStart ? 350 - touchEnd + touchStart : 350
            }px)`,
            position: "absolute",
          }}
        >
          <Card>
            {carouselComponents[currentIndex === 0 ? 4 : currentIndex - 1]}
          </Card>
        </div>
        <div
          style={{
            transition: shouldTransition ? "transform 0.3s" : "",
            transform: `translateX(${
              touchEnd && touchStart ? touchEnd - touchStart : 0
            }px)`,
            position: "absolute",
          }}
        >
          <Card>{carouselComponents[currentIndex]}</Card>
        </div>
        <div
          style={{
            transition: shouldTransition ? "transform 0.3s" : "",
            transform: `translateX(${
              touchEnd && touchStart ? touchEnd - touchStart + 350 : 350
            }px)`,
            position: "absolute",
          }}
        >
          <Card>
            {carouselComponents[currentIndex === 4 ? 0 : currentIndex + 1]}
          </Card>
        </div>
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
