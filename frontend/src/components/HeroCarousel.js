import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const slides = [{
  id: 1,
  image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  alt: "Children at a charity event"
}, {
  id: 2,
  image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  alt: "Volunteers helping community"
}, {
  id: 3,
  image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  alt: "Clean water initiative"
}, {
  id: 4,
  image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  alt: "Education programs"
}];
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return <div className="relative w-full overflow-hidden bg-gray-100">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
          {slides.map((slide, index) => <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
              <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center px-4">
                  <h1 className="text-white text-2xl md:text-4xl font-bold mb-4">
                    Make a Difference Today
                  </h1>
                  <p className="text-white text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                    Your support can change lives and create lasting impact in communities worldwide
                  </p>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium text-lg transition-colors">
                    Donate Now
                  </button>
                </div>
              </div>
            </div>)}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all" aria-label="Previous slide">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all" aria-label="Next slide">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'}`} aria-label={`Go to slide ${index + 1}`} />)}
          </div>
        </div>
      </div>
    </div>;
};
export default HeroCarousel;