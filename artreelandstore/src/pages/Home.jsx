import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Categories from "../components/home/Categories";
import SneakerPromo from "../components/home/SneakerPromo";
import NewArrivals from "../components/home/NewArrivals";
import Newsletter from "../components/home/Newsletter";

export default function Home() {
    return (
        <>
            <Hero />

            <FeaturedProducts />

            <Categories />

            <SneakerPromo />

            <NewArrivals />

            <Newsletter />
        </>
    );
}