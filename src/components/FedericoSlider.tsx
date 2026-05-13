// src/components/FedericoSlider.tsx

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation, Mousewheel } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './promo-slider.css';

export default function FedericoSlider() {
  const { t } = useTranslation();
  const slides = [
    {
      mediaUrl: '/images/slide1.jpg',
      mobileMediaUrl: '/images/slide1-mobile.jpg',
      title: t('federicoSlider.slide1.title'),
      subtitle: t('federicoSlider.slide1.subtitle'),
    },
    {
      mediaUrl: '/images/slide2.jpg',
      mobileMediaUrl: '/images/slide2-mobile.jpg',
      title: t('federicoSlider.slide2.title'),
      subtitle: t('federicoSlider.slide2.subtitle'),
    },
    {
      mediaUrl: '/images/slide3.jpg',
      mobileMediaUrl: '/images/slide3-mobile.jpg',
      title: t('federicoSlider.slide3.title'),
      subtitle: t('federicoSlider.slide3.subtitle'),
    },
    {
      mediaUrl: '/images/slide4.jpg',
      mobileMediaUrl: '/images/slide4-mobile.jpg',
      title: t('federicoSlider.slide4.title'),
      subtitle: t('federicoSlider.slide4.subtitle'),
    },
    {
      mediaUrl: '/images/slide5.jpg',
      mobileMediaUrl: '/images/slide5-mobile.jpg',
      title: t('federicoSlider.slide5.title'),
      subtitle: t('federicoSlider.slide5.subtitle'),
    },
  ];
  const swiperRef = useRef<SwiperInstance | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };
  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay, Navigation, Mousewheel]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={false}
        loop
        touchRatio={1.5}
        resistanceRatio={0}
        speed={450}
        threshold={5}
        followFinger={true}
        grabCursor={true}
        shortSwipes={true}
        longSwipesRatio={0.2}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1.5,
          releaseOnEdges: true,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="h-[80vh] promo-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={isMobile && slide.mobileMediaUrl ? slide.mobileMediaUrl : slide.mediaUrl}
                alt={slide.title}
                className={`absolute inset-0 w-full h-full ${index === 2 || index === 4 ? 'object-[bottom]' : 'object-cover'}`}
              />
              <img
                src={isMobile && slide.mobileMediaUrl ? slide.mobileMediaUrl : slide.mediaUrl}
                alt={slide.subtitle}
                className="sr-only"
              />
              <div className="absolute inset-0 bg-black/40" />
              <motion.div
                className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl font-light text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] mb-6">
                  {slide.subtitle}
                </p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}

        {/* Flechas custom (ocultas en mobile) */}
        <button
          onClick={handlePrev}
          className="custom-nav-btn custom-prev hidden sm:flex absolute top-1/2 left-4 z-20 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 shadow-lg"
          aria-label="Anterior"
        >
          <ChevronLeft className="text-white" size={28} />
        </button>
        <button
          onClick={handleNext}
          className="custom-nav-btn custom-next hidden sm:flex absolute top-1/2 right-4 z-20 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 shadow-lg"
          aria-label="Siguiente"
        >
          <ChevronRight className="text-white" size={28} />
        </button>
      </Swiper>
    </section>
  );
}
