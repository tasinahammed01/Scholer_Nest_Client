"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });

    tl.from(ratingRef.current, { y: -50, opacity: 0 })
      .from(titleRef.current, { y: 50, opacity: 0 }, "-=0.8")
      .from(subtitleRef.current, { y: 50, opacity: 0 }, "-=0.6")
      .from(descriptionRef.current, { y: 50, opacity: 0 }, "-=0.6")
      .from(buttonRef.current, { scale: 0.8, opacity: 0 }, "-=0.5");
  }, []);

  useEffect(() => {
    const button = buttonRef.current;
    const arrow = arrowRef.current;

    const handleMouseEnter = () => {
      gsap.to(arrow, { rotation: 0, duration: 0.4, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(arrow, { rotation: -45, duration: 0.4, ease: "power2.out" });
    };

    if (button && arrow) {
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (button && arrow) {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/wFQH4Sxp/27230.jpg')",
      }}
    >
      <div className="w-[10%]">
        <Image
          src="https://i.ibb.co/q2g5BcR/6795acba8283a3ae750934bc-Mask-group.png"
          alt="Left Image"
          width={200}
          height={200}
        />
      </div>

      <div className="w-[80%] flex flex-col justify-center items-center space-y-12 text-white text-center">
        <div className="flex gap-2" ref={ratingRef}>
          <Image
            src="https://i.ibb.co/ZpcmzBRn/6794a5e92556a4d768f66c60-Frame-1215874394-1.png"
            alt=""
            width={120}
            height={100}
          />
          <span className="font-bold">4.9</span>
          <span>(15,008)</span>
        </div>
        <h1 ref={titleRef} className="text-7xl font-bold mb-4">
          <span>Unlock Your Potential</span>
          <br />
          <span ref={subtitleRef} className="text-[#d1d5db] italic">
            With New Skills
          </span>
        </h1>
        <p ref={descriptionRef} className="mb-6 text-2xl w-[60%]">
          Unlock a world of opportunities and take control of your future by
          mastering new skills that empower you to achieve your goals.
        </p>
        <div ref={buttonRef}>
          <button className="flex justify-center items-center gap-4 border-1 rounded-4xl hover:bg-gray-500 text-white hover:text-black font-semibold py-3 px-6">
            Explore Courses
            <Image
              ref={arrowRef}
              className="bg-[#d1d5db] rounded-4xl p-2 -rotate-45"
              src="https://i.ibb.co/Y7qJvhKv/right-arrow-removebg-preview.png"
              alt="arrow"
              width={40}
              height={40}
            />
          </button>
        </div>
      </div>

      <div className="w-[10%]">
        <Image
          src="https://i.ibb.co/H91hZQ0/6795acb8cb71ba04e7a7f7ca-Mask-group-1.png"
          alt="Right Image"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
