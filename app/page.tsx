"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ContentItem = {
  title: string;
  description: string;
  imageUrl: string;
};

const content: ContentItem[] = [
  {
    title: "Empowering Students Through Collaborative Learning",
    description:
      "Watch as two dedicated students engage in meaningful study sessions, sharing knowledge and growing together. Our platform fosters an environment where learning becomes a collaborative journey.",
    imageUrl: "https://i.ibb.co/MkBbdLkM/7610633.jpg",
  },
  {
    title: "Your Gateway to Global Education",
    description:
      "Dreaming of studying abroad? We're here to turn your aspirations into reality. From application guidance to cultural preparation, we support your journey to international academic excellence.",
    imageUrl: "https://i.ibb.co/0RTY797Z/8848686.jpg",
  },
  {
    title: "Ai Chatbot",
    description:
      "Our AI chatbot is here to assist you with your questions and concerns. Whether you need help with your studies, need guidance on your application, or just want to chat, our AI is ready to assist you.",
    imageUrl: "https://i.ibb.co/1tmm7qQb/5162744.jpg",
  },
  {
    title: "3D Model",
    description:
      "Our 3D model is here to assist you with your questions and concerns. Whether you need help with your studies, need guidance on your application, or just want to chat, our AI is ready to assist you.",
    imageUrl: "https://i.ibb.co/VWFFLNv4/Screenshot-513.png",
  },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const animateIn = () => {
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    };

    animateIn();

    const interval = setInterval(() => {
      // Animate out
      gsap.to(textRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
        onComplete: () => {
          setCurrentIndex((prev) => (prev + 1) % content.length);
        },
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [content.length]);

  useEffect(() => {
    // Animate in new content
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [currentIndex]);

  useEffect(() => {
    let radiusX = 300;
    let radiusY = 200;

    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 768) {
        radiusX = 100;
        radiusY = 70;
      } else if (width < 1024) {
        radiusX = 200;
        radiusY = 120;
      }
    }

    let angleOffset = 0;

    const updatePositions = () => {
      boxRefs.current.forEach((box, i) => {
        const angle =
          ((i * (360 / content.length) + angleOffset) * Math.PI) / 180;
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY;
        const isActive = i === currentIndex;

        gsap.to(box, {
          x,
          y,
          opacity: isActive ? 1 : 0.4,
          zIndex: isActive ? 10 : 0,
          scale: isActive ? 1.1 : 0.9,
          duration: 1,
          ease: "power2.inOut",
        });
      });

      angleOffset += 90;
    };

    updatePositions();
    const interval = setInterval(updatePositions, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="h-[85vh] flex flex-col lg:flex-row items-center justify-center gap-10 px-5 md:px-10 py-10">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 p-4 md:p-10 text-center lg:text-left mb-10">
        <div ref={textRef} key={currentIndex}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {content[currentIndex].title}
          </h1>
          <p className="text-gray-300 mt-5 text-base md:text-lg">
            {content[currentIndex].description}
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div
        ref={containerRef}
        className="w-full md:w-1/2 h-[300px] relative flex items-center justify-center"
      >
        {content.map((item, index) => (
          <div
            key={index}
            ref={(el) => (boxRefs.current[index] = el!)}
            className="absolute transition-all duration-500"
          >
            <Image
              width={300}
              height={300}
              src={item.imageUrl}
              alt={item.title}
              loading="lazy"
              className="rounded-full object-cover shadow-lg w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
