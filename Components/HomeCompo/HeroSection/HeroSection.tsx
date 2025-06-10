"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const marqueeImages = [
  "https://i.ibb.co/kss4jrq7/67974eb2165957c1bebb9e96-Group-1000006252.png",
  "https://i.ibb.co/5ZR3gZP/67974eb12599a208836cb308-Group-1000006248.png",
  "https://i.ibb.co/jvKyXGX5/67974eb1beea98951c7add8d-Group-1000006250.png",
  "https://i.ibb.co/x9hcB3f/67974eb1ed12de2b53f74b4f-Dorfus.png",
  "https://i.ibb.co/GfdmFNGn/67974eb140c7a0f658b2af46-Group-1000006251.png",
  "https://i.ibb.co/tpJN9TRL/67974eb188b8968f0ddc6593-Group-1000006249.png",
  "https://i.ibb.co/ymK7WpB6/67974eb264c9cb18fb0a343b-Group-1000006247.png",
];

export default function HeroSection() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const ratingRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLImageElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

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
    const handleMouseEnter = () =>
      gsap.to(arrow, { rotation: 0, duration: 0.4 });
    const handleMouseLeave = () =>
      gsap.to(arrow, { rotation: -45, duration: 0.4 });

    button?.addEventListener("mouseenter", handleMouseEnter);
    button?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button?.removeEventListener("mouseenter", handleMouseEnter);
      button?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const totalWidth = marquee.scrollWidth / 2;
    gsap.to(marquee, {
      x: `-=${totalWidth}`,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col justify-center"
      style={{ backgroundImage: "url('https://i.ibb.co/wFQH4Sxp/27230.jpg')" }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center w-full py-12 px-4 md:px-8">
        <div className="w-[10%] hidden lg:block">
          <Image
            src="https://i.ibb.co/q2g5BcR/6795acba8283a3ae750934bc-Mask-group.png"
            alt="Left Image"
            width={150}
            height={150}
          />
        </div>
        <div className="w-full lg:w-[80%] flex flex-col justify-center items-center space-y-6 md:space-y-8 text-white text-center">
          <div
            className="flex gap-2 items-center text-sm md:text-base"
            ref={ratingRef}
          >
            <Image
              src="https://i.ibb.co/ZpcmzBRn/6794a5e92556a4d768f66c60-Frame-1215874394-1.png"
              alt="rating"
              width={60}
              height={60}
              className="w-20 h-5 md:w-50 md:h-10"
            />
            <span className="font-bold text-lg md:text-xl">4.9</span>
            <span className="text-xs md:text-sm">(15,008)</span>
          </div>
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight"
          >
            Unlock Your Potential
            <br />
            <span ref={subtitleRef} className="text-gray-300 italic block mt-2">
              With New Skills
            </span>
          </h1>
          <p
            ref={descriptionRef}
            className="text-base md:text-xl lg:text-2xl w-full md:w-3/4"
          >
            Unlock a world of opportunities and take control of your future by
            mastering new skills that empower you to achieve your goals.
          </p>
          <div ref={buttonRef}>
            <button className="flex items-center gap-3 md:gap-4 bg-transparent border border-white rounded-full px-5 md:px-6 py-2 md:py-3 hover:bg-white hover:text-black transition-all font-semibold text-sm md:text-base">
              Explore Courses
              <Image
                ref={arrowRef}
                className="bg-gray-200 rounded-full p-2 w-8 h-8 md:w-10 md:h-10 -rotate-45"
                src="https://i.ibb.co/Y7qJvhKv/right-arrow-removebg-preview.png"
                alt="arrow"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
        <div className="w-[10%] hidden lg:block">
          <Image
            src="https://i.ibb.co/H91hZQ0/6795acb8cb71ba04e7a7f7ca-Mask-group-1.png"
            alt="Right Image"
            width={150}
            height={150}
          />
        </div>
      </div>
      <div className="text-center text-white text-lg md:text-xl mt-0 md:mt-12 mb-5">
        We featured in
      </div>
      <div className="overflow-hidden whitespace-nowrap w-full">
        <div className="flex gap-20 md:gap-20 px-4" ref={marqueeRef}>
          {[...marqueeImages, ...marqueeImages].map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`marquee-${i}`}
              width={200}
              height={50}
              className="h-auto w-auto"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
