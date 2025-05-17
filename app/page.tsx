"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type ContentItem = {
  title: string;
  description: string;
  lottieUrl: string;
};

const content: ContentItem[] = [
  {
    title: "Empowering Students Through Collaborative Learning",
    description:
      "Watch as two dedicated students engage in meaningful study sessions, sharing knowledge and growing together. Our platform fosters an environment where learning becomes a collaborative journey.",
    lottieUrl:
      "https://lottie.host/fab6639b-fbbe-46c6-91b1-21abe5c0b1b0/OKbLVBQ7H5.lottie",
  },
  {
    title: "Your Gateway to Global Education",
    description:
      "Dreaming of studying abroad? We're here to turn your aspirations into reality. From application guidance to cultural preparation, we support your journey to international academic excellence.",
    lottieUrl:
      "https://lottie.host/c7642e33-9e5c-4cd3-94a5-336ac87b963b/eNRZ7pRDct.lottie",
  },
  {
    title: "Ai Chatbot",
    description:
      "Our AI chatbot is here to assist you with your questions and concerns. Whether you need help with your studies, need guidance on your application, or just want to chat, our AI is ready to assist you.",
    lottieUrl:
      "https://lottie.host/7359999f-fac9-4672-bcdc-c7a0dc7b06fc/DlN6Yha7Cv.lottie",
  },
  {
    title: "3D Model",
    description:
      "Our 3D model is here to assist you with your questions and concerns. Whether you need help with your studies, need guidance on your application, or just want to chat, our AI is ready to assist you.",
    lottieUrl:
      "https://lottie.host/7c0db350-0637-47b6-a88a-5b914e1e429d/pwIdSX80n6.lottie",
  },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef(null);

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
          // Update index after animating out
          setCurrentIndex((prev) => (prev + 1) % content.length);
        },
      });
    }, 5000); // 5 seconds

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

  return (
    <div className="min-h-screen flex items-center justify-center gap-10 px-10">
      <div className="w-[50%] overflow-hidden p-20">
        <div ref={textRef} key={currentIndex}>
          <h1 className="text-5xl font-bold">{content[currentIndex].title}</h1>
          <p className="text-gray-300 mt-5">{content[currentIndex].description}</p>
        </div>
      </div>

      <div className="w-[50%] flex flex-col items-center justify-center gap-10">
        {content.map((item, index) => (
          <div key={index}>
            <img src={item.lottieUrl} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**const containerRef = useRef<HTMLDivElement>(null);
const boxRefs = useRef<HTMLDivElement[]>([]);

useEffect(() => {
  const radiusX = 200;
  const radiusY = 100;
  let angleOffset = 0;

  const updatePositions = () => {
    boxRefs.current.forEach((box, i) => {
      const angle = ((i * 90 + angleOffset) * Math.PI) / 180;
      const x = Math.cos(angle) * radiusX;
      const y = Math.sin(angle) * radiusY;

      gsap.to(box, {
        x,
        y,
        duration: 1,
        ease: "power2.inOut",
      });
    });

    angleOffset += 90;
  };

  updatePositions(); // initial call
  const interval = setInterval(updatePositions, 5000); // every 5 sec

  return () => clearInterval(interval);
}, []); **/

/**  
 <div
        ref={containerRef}
        className="relative w-[500px] h-[400px]"
      >
        {content.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) boxRefs.current[index] = el;
            }}
            className="absolute w-40 h-40 bg-white shadow-xl rounded-lg flex items-center justify-center text-center p-4"
          >
            <Image src={item.lottieUrl} alt={item.title} width={100} height={100} />
          </div>
        ))}
      </div>
*/
