import React from "react";
import HomeSection from "@/Components/HomeCompo/HeroSection/HeroSection";
import FeaturedCourses from "@/Components/HomeCompo/FeaturedCourses/FeaturedCourses";

export default function HomePage() {
  return (
    <div>
      <HomeSection></HomeSection>
      <FeaturedCourses></FeaturedCourses>
    </div>
  );
}
