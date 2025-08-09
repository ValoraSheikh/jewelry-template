import Image from "next/image";
import { Playfair_Display, Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const features = [
  {
    name: "Three card types",
    description:
      "Today, Next, and Someday cards allow you to defer your dreams into the future.",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-08-detail-01.jpg",
    imageAlt: "Green cardstock box containing white, beige, and brown cards.",
  },
  {
    name: "The perfect mix",
    description:
      "Each refill pack contains plenty of cards to last you a month of procrastination.",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-08-detail-02.jpg",
    imageAlt: "Green cardstock box open with 50 cards inside.",
  },
  {
    name: "Dot grid backs",
    description:
      "Flip a card over to doodle during meetings when you should be listening.",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-08-detail-03.jpg",
    imageAlt:
      "Detail of white today card, beige next card, and brown someday card with dot grid.",
  },
  {
    name: "Refill packs",
    description:
      "Subscribe and save on routine refill packs to keep you productive all year long.",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-08-detail-04.jpg",
    imageAlt:
      "Stack of three green cardstock boxes with 3 hole cutouts showing cards inside.",
  },
];

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

const DEFAULT_ITEMS: TimelineItem[] = [
  {
    year: "1998",
    title: "Humble Beginnings",
    description:
      "Started in a small Jodhpur workshop, crafting timeless designs for local weddings.",
    image: {
      src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvcHxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Artisan at a jewelry bench in a small Jodhpur workshop",
    },
  },
  {
    year: "2004",
    title: "First Boutique",
    description:
      "Opened our first luxury store, introducing exclusive bridal collections.",
    image: {
      src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob3B8ZW58MHx8MHx8fDA%3D",
      alt: "Elegant interior of a luxury jewelry boutique",
    },
  },
  {
    year: "2012",
    title: "National Recognition",
    description:
      "Featured in leading bridal magazines for exquisite craftsmanship.",
    image: {
      src: "https://images.unsplash.com/photo-1487377330423-12f2f3e6d27a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHNob3B8ZW58MHx8MHx8fDA%3D",
      alt: "Editorial magazine spread featuring bridal jewelry",
    },
  },
  {
    year: "2018",
    title: "Global Standards",
    description:
      "Introduced hallmark-certified gold and internationally graded diamonds.",
    image: {
      src: "https://images.unsplash.com/photo-1464979681340-bdd28a61699e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHNob3B8ZW58MHx8MHx8fDA%3D",
      alt: "Diamond grading tools with hallmark certificate",
    },
  },
  {
    year: "2024",
    title: "Digital Era",
    description:
      "Launched our online boutique, blending heritage with modern convenience.",
    image: {
      src: "https://images.unsplash.com/photo-1562280963-8a5475740a10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHNob3B8ZW58MHx8MHx8fDA%3D",
      alt: "Online boutique interface displaying luxury jewelry",
    },
  },
];

type SearchParams = { [key: string]: string | string[] | undefined };

export default function About({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const data = DEFAULT_ITEMS;

  return (
    <>
      <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16 ">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            height={500}
            width={500}
            alt=""
            src="https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-feature-section-full-width.jpg"
            className="size-full object-cover"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900/50" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Long-term thinking
          </h2>
          <p className="mt-3 text-xl text-white">
            We{"'"}re committed to responsible, sustainable, and ethical
            manufacturing. Our small-scale approach allows us to focus on
            quality and reduce our impact. We{"'"}re doing our best to delay the
            inevitable heat-death of the universe.
          </p>
          <a
            href="#"
            className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
          >
            Read our story
          </a>
        </div>
      </div>

      <div className="bg-white">
        <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
          <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
              <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                <div className="w-full flex-col justify-center items-start gap-8 flex">
                  <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                    <h6 className="text-gray-600 text-base font-normal leading-relaxed">
                      About Us
                    </h6>
                    <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                      <h2 className="text-indigo-600 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                        The Tale of Our Achievement Story
                      </h2>
                      <p className="text-gray-600 text-base font-normal leading-relaxed lg:text-start text-center">
                        Our achievement story is a testament to teamwork and
                        perseverance. Together, we{"'"}ve overcome challenges,
                        celebrated victories, and created a narrative of
                        progress and success.
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex-col justify-center items-start gap-6 flex">
                    <div className="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                      <div className="w-full h-full p-3.5 rounded-xl border border-gray-300 hover:border-gray-500 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                        <h4 className="text-gray-800 text-2xl font-bold font-manrope leading-9">
                          33+ Years
                        </h4>
                        <p className="text-gray-600 text-base font-normal leading-relaxed">
                          Influencing Digital Landscapes Together
                        </p>
                      </div>
                      <div className="w-full h-full p-3.5 rounded-xl border border-gray-300 hover:border-gray-500 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                        <h4 className="text-gray-800 text-2xl font-bold font-manrope leading-9">
                          125+ Projects
                        </h4>
                        <p className="text-gray-600 text-base font-normal leading-relaxed">
                          Excellence Achieved Through Success
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                      <div className="w-full p-3.5 rounded-xl border border-gray-300 hover:border-gray-500 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                        <h4 className="text-gray-800 text-2xl font-bold font-manrope leading-9">
                          26+ Awards
                        </h4>
                        <p className="text-gray-600 text-base font-normal leading-relaxed">
                          Our Dedication to Innovation Wins Understanding
                        </p>
                      </div>
                      <div className="w-full h-full p-3.5 rounded-xl border border-gray-300 hover:border-gray-500 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                        <h4 className="text-gray-800 text-2xl font-bold font-manrope leading-9">
                          99% Happy Clients
                        </h4>
                        <p className="text-gray-600 text-base font-normal leading-relaxed">
                          Mirrors our Focus on Client Satisfaction.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="sm:w-fit w-full group px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
                  <span className="px-1.5 text-indigo-600 text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                    Read More
                  </span>
                  <svg
                    className="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996"
                      stroke="#4F46E5"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="w-full lg:justify-start justify-center items-start flex">
                <div className="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-50 rounded-3xl sm:border border-gray-300 relative">
                  <Image
                    height={646}
                    width={564}
                    className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                    src="https://images.unsplash.com/photo-1617791693847-e9a22372299e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amV3ZWxyeSUyMHdvcmtzaG9wfGVufDB8MnwwfHx8MA%3D%3D"
                    alt="about Us image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
          <div className="max-w-3xl">
            <h2 id="features-heading" className="font-medium text-gray-500">
              Focus
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple productivity
            </p>
            <p className="mt-4 text-gray-500">
              Focus allows you to plan 10 daily tasks, while also thinking ahead
              about what{"'"}s next. Forget distracting digital apps and embrace
              these small, sturdy pieces of paper.
            </p>
          </div>

          <div className="mt-11 grid grid-cols-1 items-start gap-x-6 gap-y-16 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col-reverse">
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
                <Image
                  height={500}
                  width={500}
                  alt={feature.imageAlt}
                  src={feature.imageSrc}
                  className="aspect-square w-full rounded-lg bg-gray-100 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-gray-100">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="max-w-screen-lg text-gray-500 sm:text-lg">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900">
              Powering innovation at{" "}
              <span className="font-extrabold">200,000+</span> companies
              worldwide
            </h2>
            <p className="mb-4 font-light">
              Track work across the enterprise through an open, collaborative
              platform. Link issues across Jira and ingest data from other
              software development tools, so your IT support and operations
              teams have richer contextual information to rapidly respond to
              requests, incidents, and changes.
            </p>
            <p className="mb-4 font-medium">
              Deliver great service experiences fast - without the complexity of
              traditional ITSM solutions. Accelerate critical development work,
              eliminate toil, and deploy changes with ease.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium text-primary-600 hover:text-primary-800"
            >
              Learn more
              <svg
                className="ml-1 w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <main className="w-full bg-white text-neutral-900">
        <section
          aria-label="Brand timeline"
          className="relative mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24"
        >
          {/* Center vertical line */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gray-300" />

          <div className="relative">
            {data.map((item, idx) => (
              <div key={item.year}>
                {/* Timeline item */}
                <article className="relative mx-auto text-center">
                  {/* Image on top */}
                  <div className="overflow-hidden rounded-2xl">
                    <Image
                      src={item.image.src || "/placeholder.svg"}
                      alt={item.image.alt}
                      width={1200}
                      height={800}
                      className="h-64 w-full object-cover sm:h-80 md:h-96"
                      priority={idx === 0}
                    />
                  </div>

                  {/* Text block */}
                  <div className="mt-6 sm:mt-8">
                    <div
                      className={cn(
                        playfair.className,
                        "text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight"
                      )}
                    >
                      {item.year}
                    </div>
                    <h3
                      className={cn(
                        playfair.className,
                        "mt-2 text-xl sm:text-2xl font-medium tracking-tight"
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        inter.className,
                        "mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-neutral-700"
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </article>

                {/* Marker between items (not after the last) */}
                {idx < data.length - 1 && (
                  <div className="relative mx-auto h-16 sm:h-20">
                    <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}