"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from 'next/navigation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type FormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
    role: 'student' | 'teacher';
};

export default function RegisterPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 4000));
            console.log("Submitting the form", data);
            
            // Reset the form
            reset();
            
            // Get the callback URL from search params or default to home
            const callbackUrl = searchParams.get('callbackUrl') || '/';
            router.push(callbackUrl);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen p-4">
            <div className="w-full lg:w-1/2 h-[300px] lg:h-full flex justify-center items-center mb-8 lg:mb-0">
                <DotLottieReact
                    className='w-[100%]'
                    src="https://lottie.host/2bb25ab8-f7ed-40a6-98c2-3f58b51c23fe/kiHMt28h9h.lottie"
                    loop
                    autoplay
                />
            </div>
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center">
                <h1 className="text-center text-3xl md:text-4xl font-semibold underline mb-6 md:mb-8">
                    Register Now
                </h1>
                <form className="space-y-5 md:space-y-7 w-full md:w-[90%] lg:w-[80%] max-w-md shadow-2xl rounded-lg p-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name" className="block mb-1 font-medium text-sm md:text-base">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register("name", { required: "Name is required" })}
                            className="w-full p-2 text-sm md:text-base border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs md:text-sm mt-1">
                                {errors.name.message?.toString()}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium text-sm md:text-base">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            className="w-full p-2 text-sm md:text-base border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs md:text-sm mt-1">
                                {errors.email.message?.toString()}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="role" className="block mb-1 font-medium text-sm md:text-base dark:text-blue-400">
                            Register as
                        </label>
                        <select
                            id="role"
                            {...register("role", { required: "Please select a role" })}
                            className="w-full p-2 text-sm md:text-base border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        >
                            <option value="" className="dark:bg-gray-800 text-black">Select Role</option>
                            <option value="student" className="dark:bg-gray-800 text-black">Student</option>
                            <option value="teacher" className="dark:bg-gray-800 text-black">Teacher</option>
                        </select>
                        {errors.role && (
                            <p className="text-red-500 text-xs md:text-sm mt-1">
                                {errors.role.message?.toString()}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 font-medium text-sm md:text-base">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className="w-full p-2 text-sm md:text-base border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs md:text-sm mt-1">
                                {errors.password.message?.toString()}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block mb-1 font-medium text-sm md:text-base"
                        >
                            Retype Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register("confirmPassword", {
                                required: "Please retype your password",
                                validate: (value, { password }) =>
                                    value === password || "Passwords do not match",
                            })}
                            className="w-full p-2 text-sm md:text-base border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs md:text-sm mt-1">
                                {errors.confirmPassword.message?.toString()}
                            </p>
                        )}
                    </div>

                    <div className="flex items-start space-x-2">
                        <input
                            type="checkbox"
                            id="terms"
                            {...register("terms", {
                                required: "You must accept the terms",
                            })}
                            className="mt-1"
                        />
                        <label htmlFor="terms" className="text-xs md:text-sm">
                            I accept the{" "}
                            <a href="#" className="text-blue-600 underline">
                                terms and conditions
                            </a>
                        </label>
                    </div>
                    {errors.terms && (
                        <p className="text-red-500 text-xs md:text-sm">{errors.terms.message?.toString()}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition text-sm md:text-base"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}
