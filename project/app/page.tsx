import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Categories from '@/components/Categories';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
    </div>
  );
}