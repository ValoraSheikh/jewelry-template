"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the Product interface
interface Product {
  id: number;
  name: string;
  href: string;
  price: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
        console.log("Fetched products:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product.id} href={product.href} className="group">
              <Image
                height={500}
                width={500}
                alt={product.imageAlt}
                src={product.imageSrc}
                className="aspect-square w-full overflow-hidden rounded-lg object-cover group-hover:opacity-75 sm:aspect-2/3"
              />
              <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500 italic">{product.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}