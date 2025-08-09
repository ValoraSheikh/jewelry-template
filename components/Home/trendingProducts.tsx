import Image from "next/image"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: 'Machined Pen',
    color: 'Black',
    price: '$35',
    href: '/products/123',
    imageSrc: 'https://images.unsplash.com/photo-1693213085231-fc580d8916de?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8amV3ZWxyeSUyMHByb2R1Y3R8ZW58MHwyfDB8fHww',
    imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
    availableColors: [
      { name: 'Black', colorBg: '#111827' },
      { name: 'Brass', colorBg: '#FDE68A' },
      { name: 'Chrome', colorBg: '#E5E7EB' },
    ],
  },
  {
    id: 2,
    name: 'Earthen Mug',
    color: 'Matte Black',
    price: '$28',
    href: '/products/123',
    imageSrc: 'https://images.unsplash.com/photo-1693833923492-16fd4c1373bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amV3ZWxyeSUyMHByb2R1Y3R8ZW58MHwyfDB8fHww',
    imageAlt: 'Black porcelain mug with modern square handle and natural clay accents on rim and bottom.',
    availableColors: [
      { name: 'Matte Black', colorBg: '#4B5563' },
      { name: 'Natural', colorBg: '#FEF3C7' },
    ],
  },
  {
    id: 3,
    name: 'Leatherbound Daily Journal Set',
    color: 'Natural',
    price: '$50',
    href: '/products/123',
    imageSrc: 'https://images.unsplash.com/photo-1617791693847-e9a22372299e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGpld2VscnklMjBwcm9kdWN0fGVufDB8MnwwfHx8MA%3D%3D',
    imageAlt: 'Natural leather journal with brass disc binding and three paper refill sets.',
    availableColors: [
      { name: 'Natural', colorBg: '#FEF3C7' },
      { name: 'Black', colorBg: '#1F2937' },
      { name: 'Brown', colorBg: '#7C2D12' },
    ],
  },
  {
    id: 4,
    name: 'Leatherbound Daily Journal',
    color: 'Black',
    price: '$50',
    href: '/products/123',
    imageSrc: 'https://images.unsplash.com/photo-1571859906623-9612b0f58b86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGpld2VscnklMjBwcm9kdWN0fGVufDB8MnwwfHx8MA%3D%3D',
    imageAlt: 'Black leather journal with brass disc binding.',
    availableColors: [
      { name: 'Black', colorBg: '#111827' },
      { name: 'Brown', colorBg: '#7C2D12' },
      { name: 'Natural', colorBg: '#FEF3C7' },
    ],
  },
]

export default function TrendingProducts() {
  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 font-playfair">Treasures Adored by Our Patrons</h2>
          <a href="#" className="hidden text-sm font-semibold text-gray-600 hover:text-gray-500 sm:block">
            See everything
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="relative mt-8">
          <div className="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0"
            >
              {products.map((product) => (
                <li key={product.id} className="inline-flex w-64 flex-col text-center lg:w-auto">
                  <div className="group relative">
                    <Image
                      height={500}
                      width={500}
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75"
                    />
                    <div className="mt-6">
                      <p className="text-sm text-gray-500">{product.color}</p>
                      <h3 className="mt-1 font-semibold text-gray-900 font-serif">
                        <Link href={product.href}>
                          <span className="absolute inset-0 font-serif" />
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-gray-900 font-serif">{product.price}</p>
                    </div>
                  </div>

                  <h4 className="sr-only">Available colors</h4>
                  <ul role="list" className="mt-auto flex items-center justify-center space-x-3 pt-6">
                    {product.availableColors.map((color) => (
                      <li
                        key={color.name}
                        style={{ backgroundColor: color.colorBg }}
                        className="size-4 rounded-full border border-black/10"
                      >
                        <span className="sr-only">{color.name}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex px-4 sm:hidden">
          <a href="#" className="text-sm font-semibold text-gray-600 hover:text-gray-500">
            See everything
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}
