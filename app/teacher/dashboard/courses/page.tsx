"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function TeacherCoursePage() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // GSAP animation for modal
  useEffect(() => {
    if (showModal && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [showModal]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Courses</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Course
        </button>
      </div>

      {/* Courses Section */}
      <div className="grid gap-4">
        {/* Placeholder for course cards */}
        <div className="p-4 border rounded shadow-sm">
          <h2 className="text-xl font-semibold">Course Title</h2>
          <p className="text-gray-600">Posted on: 2025-06-13</p>
          <div className="flex gap-2 mt-2">
            <button className="text-sm px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Update
            </button>
            <button className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-gray-100 text-black p-6 rounded-lg shadow-xl w-[80%] mx-10"
          >
            <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
            <form
              className="grid gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const title = (form.elements.namedItem("title") as HTMLInputElement).value;
                const description = (form.elements.namedItem("description") as HTMLTextAreaElement).value;
                const price = (form.elements.namedItem("price") as HTMLInputElement).value;
                const language = (form.elements.namedItem("language") as HTMLInputElement).value;

                const res = await fetch("/api/create-course", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ title, description, price, language }),
                });

                if (res.ok) {
                  alert("Course added successfully!");
                  setShowModal(false);
                  form.reset();
                } else {
                  alert("Failed to add course");
                }
              }}
            >
              <input
                name="title"
                type="text"
                placeholder="Title"
                className="border p-2 rounded w-full"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                className="border p-2 rounded w-full"
                required
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                className="border p-2 rounded w-full"
                required
              />
              <input
                name="language"
                type="text"
                placeholder="Language"
                className="border p-2 rounded w-full"
                required
              />

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Submit
              </button>
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-gray-600 hover:text-red-500 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
