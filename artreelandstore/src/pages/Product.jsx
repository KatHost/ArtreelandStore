import { Link, useParams } from "react-router-dom";

import products from "../data/product";

import ProductGallery from "../components/shop/ProductGallery";
import ProductInfo from "../components/shop/ProductInfo";
import ProductTabs from "../components/shop/ProductTabs";
import RelatedProducts from "../components/shop/RelatedProducts";

export default function Product() {
    const { id } = useParams();

    const product = products.find(
        (item) => item.id === Number(id)
    );

    if (!product) {
        return (
            <div className="container-custom py-5">
                <h1>Product not found</h1>

                <Link to="/shop" className="btn-primary-custom">
                    Return to Shop
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="container-custom product-detail-page">

                <nav className="breadcrumb-custom">
                    <Link to="/">Home</Link>
                    <span>/</span>
                    <Link to="/shop">Shop</Link>
                    <span>/</span>
                    <span>{product.name}</span>
                </nav>

                <div className="product-detail-layout">

                    <ProductGallery
                        key={product.id}
                        images={product.images}
                        name={product.name}
                        imageFit={product.imageFit}
                    />

                    <ProductInfo key={product.id} product={product} />

                </div>

                <ProductTabs product={product} />

            </div>

            <RelatedProducts product={product} />
        </>
    );
}