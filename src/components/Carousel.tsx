import { useCallback, useState } from "react";

import classes from "./Carousel.module.css";
import Card from "../layout/Card";

interface CarouselProps {
  components: any[];
}

const Carousel = ({ components }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
    // add your conditional logic here
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

  return (
    <div
      className={classes.carousel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Card>{carouselComponents[currentIndex]}</Card>
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
