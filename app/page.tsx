import Category from "@/components/Home/category-section";
import Category1 from "@/components/Home/category-section-1";
import Hero from "@/components/Home/hero";
import Incentive from "@/components/Home/Incentives";
import PromoSection from "@/components/Home/Promo-section";
import TrendingProducts from "@/components/Home/trendingProducts";


export default function Home() {
  return (
    <>
      <Hero/>
      <Category1/>
      <TrendingProducts/>
      <Category/>
      <PromoSection/>
      <Incentive/>
    </>
  );
}
