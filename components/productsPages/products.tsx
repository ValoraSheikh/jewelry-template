import Image from "next/image"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: 'Focus Paper Refill',
    href: '/products/123',
    price: '$13',
    description: '3 sizes available',
    imageSrc: 'https://images.unsplash.com/photo-1694166054938-bf735789f6ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amV3ZWxyeSUyMHByb2R1Y3RzfGVufDB8fDB8fHww',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 2,
    name: 'Focus Card Holder',
    href: '/products/123',
    price: '$64',
    description: 'Walnut',
    imageSrc: 'https://images.unsplash.com/photo-1642373299591-5575fdcaabbb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGpld2VscnklMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D',
    imageAlt: 'Paper card sitting upright in walnut card holder on desk.',
  },
  {
    id: 3,
    name: 'Focus Carry Case',
    href: '/products/123',
    price: '$32',
    description: 'Heather Gray',
    imageSrc: 'https://images.unsplash.com/photo-1670953491625-c3ce26aeb555?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGpld2VscnklMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D',
    imageAlt: 'Textured gray felt pouch for paper cards with snap button flap and elastic pen holder loop.',
  },
  {
    id: 4,
    name: 'Focus Multi-Pack',
    href: '/products/123',
    price: '$39',
    description: '3 refill packs',
    imageSrc: 'https://images.unsplash.com/photo-1631982645875-8bd1db34b1a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amV3ZWxyeSUyMHByb2R1Y3RzfGVufDB8fDB8fHww',
    imageAlt: 'Stack of 3 small drab green cardboard paper card refill boxes with white text.',
  },
  {
    id: 5,
    name: 'Machined Mechanical Pencil',
    href: '/products/123',
    price: '$35',
    description: 'Black and brass',
    imageSrc: 'https://images.unsplash.com/photo-1633555234047-192d10238f5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amV3ZWxyeSUyMHByb2R1Y3RzfGVufDB8fDB8fHww',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 6,
    name: 'Brass Scissors',
    href: '/products/123',
    price: '$50',
    description: 'Includes brass stand',
    imageSrc: 'https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5lY2tsYWNlfGVufDB8fDB8fHww',
    imageAlt: 'Brass scissors with geometric design, black steel finger holes, and included upright brass stand.',
  },
]

export default function Products() {
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
  )
}
