import Image from "next/image";
import Link from "next/link";

export default function SplitImage() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="grid min-h-[100vh] grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        <div className="relative flex">
          <Image
            height={500}
            width={500}
            alt=""
            src="https://images.unsplash.com/photo-1723802205477-33f3f4f9135b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8amV3ZWxsZXJ5JTIwaW1hZ2VzfGVufDB8MXwwfHx8MA%3D%3D"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="relative flex w-full flex-col items-start justify-end bg-black/40 p-8 sm:p-12">
            <h2 className="text-lg text-white/75 font-playfair font-semibold
            ">
              The Solitaire Signature
            </h2>
            <p className="mt-1 text-2xl font-medium text-white font-serif">
              Discover brilliance perfected over generations.
            </p>
            <Link
              href="/products"
              className="mt-4 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Explore Collection
            </Link>
          </div>
        </div>
        <div className="relative flex">
          <Image
            height={500}
            width={500}
            alt=""
            src="https://plus.unsplash.com/premium_photo-1674581921333-959b929a2e0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGpld2VsbGVyeSUyMGltYWdlc3xlbnwwfDF8MHx8fDA%3D"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="relative flex w-full flex-col items-start justify-end bg-black/40 p-8 sm:p-12">
            <h2 className="text-lg font-semibold text-white/75 font-playfair">
              The Heritage Gold Line
            </h2>
            <p className="mt-1 text-2xl font-medium text-white font-serif">
              Crafted in pure 22K gold, inspired by royal traditions.
            </p>
            <Link
              href="/products"
              className="mt-4 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
