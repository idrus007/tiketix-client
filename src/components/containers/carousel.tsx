import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/carousel/image.webp",
  },
  {
    image: "/images/carousel/image2.webp",
  },
  {
    image: "/images/carousel/image3.webp",
  },
];

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden rounded-md mt-2">
      <div
        className="relative flex transition-transform duration-500 ease-in-out rounded-md"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full flex justify-center items-center"
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto max-h-[400px] object-contain"
            />
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-0 sm:left-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-white hover:text-pink-500 transition-all"
      >
        <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-0 sm:right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-white hover:text-pink-500 transition-all"
      >
        <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-1 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 rounded-full border border-gray-300 ${
              currentIndex === index ? "bg-pink-500" : "bg-white"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
