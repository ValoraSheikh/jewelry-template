'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1620656798579-1984d9e87df7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1633555234296-657a18d8b81a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGpld2Vscnl8ZW58MHwwfDB8fHww'
  ]

    useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);


  return (
    <div className="bg-white">
      <div className="relative bg-gray-900">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          {images.map((img, index) => (
            <Image
            key={index}
            fill
            alt=""
            src={img}
            className={`object-cover transition-opacity duration-1000 ease-in-out size-full ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
          )) }
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl font-playfair italic">Crafted for Moments That Last Forever</h1>
          <p className="mt-4 text-xl text-white font-serif">
            Discover our signature collection — where artistry meets timeless beauty.
          </p>
          <a
            href="#"
            className="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            Shop New Arrivals
          </a>
        </div>
      </div>
    </div>
  )
}
