import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import products from "../data/product";

import ProductCard from "../components/Shop/ProductCard";
import SearchBar from "../components/Shop/SearchBar";
import FilterSidebar from "../components/Shop/FilterSidebar";
import MobileFilterDrawer from "../components/Shop/MobileFilterDrawer";
import ProductSkeleton from "../components/common/ProductSkeleton";
import ViewToggle from "../components/Shop/ViewToggle";
import assetUrl from "../utils/assets";

const EMPTY_BRANDS = [];

export default function Shop() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("grid");
    const [sortBy, setSortBy] = useState("newest");
    const [showFilters, setShowFilters] = useState(false);

    const [searchParams] = useSearchParams();

    const productsPerPage = 9;

    const [page, setPage] = useState(0);

    const brandParam = searchParams.get("brand");
    const categoryParam = searchParams.get("category");
    const isWomenPreview =
        categoryParam === "Women" &&
        !products.some((product) => product.category === "Women");

    const [filters, setFilters] = useState(() => ({
        brands: brandParam ? [brandParam] : [],
        categories: categoryParam ? [categoryParam] : [],
        maxPrice: 5000,
    }));

    const routeFilterKey = `${brandParam ?? ""}|${categoryParam ?? ""}`;
    const [appliedRouteFilterKey, setAppliedRouteFilterKey] =
        useState(routeFilterKey);

    if (appliedRouteFilterKey !== routeFilterKey) {
        setAppliedRouteFilterKey(routeFilterKey);
        setFilters((previous) => ({
            ...previous,
            brands: brandParam ? [brandParam] : [],
            categories: categoryParam ? [categoryParam] : [],
        }));
        setPage(0);
    }
    const activeBrands = Array.isArray(filters.brands)
        ? filters.brands
        : EMPTY_BRANDS;
    const activeCategories = Array.isArray(filters.categories)
        ? filters.categories
        : EMPTY_BRANDS;
    const maximumPrice = Number.isFinite(filters.maxPrice)
        ? filters.maxPrice
        : 5000;

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
        setPage(0);
    };

    const handleFilters = (callback) => {
        setFilters((previous) => {
            const normalizedPrevious = {
                ...previous,
                brands: Array.isArray(previous.brands)
                    ? previous.brands
                    : [],
                categories: Array.isArray(previous.categories)
                    ? previous.categories
                    : [],
                maxPrice: Number.isFinite(previous.maxPrice)
                    ? previous.maxPrice
                    : 5000,
            };
            const updated =
                typeof callback === "function"
                    ? callback(normalizedPrevious)
                    : callback;

            return updated;
        });

        setPage(0);
    };

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (search.trim()) {
            result = result.filter((product) =>
                product.name
                    .toLowerCase()
                    .includes(search.trim().toLowerCase())
            );
        }

        if (activeBrands.length > 0) {
            result = result.filter((product) =>
                activeBrands.includes(product.brand)
            );
        }

        if (activeCategories.length > 0) {
            result = result.filter((product) =>
                activeCategories.includes(product.category)
            );
        }

        result = result.filter(
            (product) => product.price <= maximumPrice
        );

        switch (sortBy) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;

            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;

            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;

            case "name":
                result.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                break;

            case "newest":
                result.sort(
                    (a, b) =>
                        Number(b.newArrival) -
                        Number(a.newArrival)
                );
                break;

            default:
                break;
        }

        return result;
    }, [search, activeBrands, activeCategories, maximumPrice, sortBy]);

    const pageCount = Math.ceil(
        filteredProducts.length / productsPerPage
    );
    const safePage =
        pageCount > 0 ? Math.min(page, pageCount - 1) : 0;

    const currentProducts = filteredProducts.slice(
        safePage * productsPerPage,
        (safePage + 1) * productsPerPage
    );

    return (
        <div className="container-custom shop-page">

            <div className="shop-page-header">
                <p className="eyebrow">ARTRƎELAND COLLECTION</p>

                <h1 className="page-title">
                    {categoryParam ? categoryParam.toUpperCase() : "ALL PRODUCTS"}
                </h1>

                <p>
                    Shop ARTRƎELAND streetwear and selected footwear.
                </p>
            </div>

            {isWomenPreview ? (
                <section className="women-preview" aria-labelledby="women-preview-title">
                    <div className="women-preview-heading">
                        <p className="eyebrow">THE ARTRƎELAND WOMEN'S EDIT</p>
                        <h2 className="section-heading" id="women-preview-title">
                            MADE TO STAND OUT
                        </h2>
                        <p>
                            A first look at our women’s streetwear collection.
                            Product details and availability are coming soon.
                        </p>
                    </div>

                    <div className="women-preview-grid">
                        <article className="women-preview-card">
                            <img
                                src={assetUrl("/images/women-blue-track-set.png")}
                                alt="ARTRƎELAND blue and black cropped track jacket with matching cargo pants"
                            />
                            <div>
                                <p className="eyebrow">BLUE ENERGY</p>
                                <h3>Streetwear in motion</h3>
                            </div>
                        </article>

                        <article className="women-preview-card">
                            <img
                                src={assetUrl("/images/women-noir-crop-set.png")}
                                alt="ARTRƎELAND black cropped top and streetwear look"
                            />
                            <div>
                                <p className="eyebrow">NOIR ESSENTIALS</p>
                                <h3>Own your everyday</h3>
                            </div>
                        </article>
                    </div>
                </section>
            ) : (
            <>
            <div className="shop-layout">

                <aside className="shop-sidebar">
                    <FilterSidebar
                        filters={{
                            ...filters,
                            brands: activeBrands,
                            categories: activeCategories,
                            maxPrice: maximumPrice,
                        }}
                        setFilters={handleFilters}
                    />
                </aside>

                <section className="shop-main">

                    <div className="shop-toolbar">

                        <SearchBar
                            search={search}
                            setSearch={handleSearch}
                        />

                        <button
                            type="button"
                            className="mobile-filter-button"
                            onClick={() => setShowFilters(true)}
                        >
                            <SlidersHorizontal size={17} />
                            Filters
                        </button>

                        <select
                            className="shop-sort"
                            value={sortBy}
                            onChange={(event) => {
                                setSortBy(event.target.value);
                                setPage(0);
                            }}
                            aria-label="Sort products"
                        >
                            <option value="newest">Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="name">A to Z</option>
                        </select>

                        <ViewToggle
                            view={view}
                            setView={setView}
                        />

                    </div>

                    <div className="shop-results-info">
                        Showing {loading ? "..." : currentProducts.length}
                        {" "}of{" "}
                        {filteredProducts.length} products
                    </div>

                    <div
                        className={
                            view === "grid"
                                ? "shop-product-grid"
                                : "shop-product-list"
                        }
                    >

                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <ProductSkeleton key={index} />
                            ))
                        ) : currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        ) : (
                            <div className="shop-empty">
                                <h3>No products found</h3>

                                <p>
                                    Try changing your search or filters.
                                </p>

                                <button
                                    type="button"
                                    className="btn-primary-custom"
                                    onClick={() => {
                                        setSearch("");
                                        setFilters({
                                            brands: [],
                                            categories: [],
                                            maxPrice: 5000,
                                        });
                                        setPage(0);
                                    }}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

                    </div>

                    {!loading && pageCount > 1 && (
                        <div className="pagination">

                            <button
                                type="button"
                                className="pagination-button"
                                disabled={safePage === 0}
                                onClick={() =>
                                    setPage((previous) => previous - 1)
                                }
                            >
                                Previous
                            </button>

                            {Array.from(
                                { length: pageCount },
                                (_, index) => index
                            ).map((number) => (
                                <button
                                    type="button"
                                    key={number}
                                    className={
                                        safePage === number
                                            ? "pagination-button active"
                                            : "pagination-button"
                                    }
                                    onClick={() => setPage(number)}
                                >
                                    {number + 1}
                                </button>
                            ))}

                            <button
                                type="button"
                                className="pagination-button"
                                disabled={safePage >= pageCount - 1}
                                onClick={() =>
                                    setPage((previous) => previous + 1)
                                }
                            >
                                Next
                            </button>

                        </div>
                    )}

                </section>
            </div>

            <MobileFilterDrawer
                open={showFilters}
                onClose={() => setShowFilters(false)}
                filters={{
                    ...filters,
                    brands: activeBrands,
                    categories: activeCategories,
                    maxPrice: maximumPrice,
                }}
                setFilters={handleFilters}
            />
            </>
            )}

        </div>
    );
}