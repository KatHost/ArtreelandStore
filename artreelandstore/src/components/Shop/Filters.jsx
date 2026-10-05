import products from "../../data/product";

const brandOptions = [
    ...new Set(products.map((product) => product.brand)),
];

const categoryOptions = [
    ...new Set(products.map((product) => product.category)),
];

export default function Filters({
    filters,
    setFilters,
}) {
    const selectedBrands = Array.isArray(filters?.brands)
        ? filters.brands
        : [];
    const selectedCategories = Array.isArray(filters?.categories)
        ? filters.categories
        : [];
    const maxPrice = Number.isFinite(filters?.maxPrice)
        ? filters.maxPrice
        : 5000;

    const handleBrandChange = (brand) => {
        setFilters((previous) => {
            const brands = Array.isArray(previous.brands)
                ? previous.brands
                : [];
            const exists = brands.includes(brand);

            return {
                ...previous,
                brands: exists
                    ? brands.filter(
                        (item) => item !== brand
                    )
                    : [...brands, brand],
            };
        });
    };

    const handleCategoryChange = (category) => {
        setFilters((previous) => {
            const categories = Array.isArray(previous.categories)
                ? previous.categories
                : [];

            return {
                ...previous,
                categories: categories.includes(category)
                    ? categories.filter((item) => item !== category)
                    : [...categories, category],
            };
        });
    };

    return (
        <div className="shop-filter-panel">

            <h3 className="shop-filter-title">
                Categories
            </h3>

            {categoryOptions.map((category) => (
                <label
                    className="shop-filter-option"
                    key={category}
                >
                    <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                    />

                    {category}
                </label>
            ))}

            <hr />

            <h3 className="shop-filter-title">
                Brands
            </h3>

            {brandOptions.map((brand) => (
                <label
                    className="shop-filter-option"
                    key={brand}
                >
                    <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() =>
                            handleBrandChange(brand)
                        }
                    />

                    {brand}
                </label>
            ))}

            <hr />

            <h3 className="shop-filter-title">
                Maximum Price
            </h3>

            <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(event) =>
                    setFilters((previous) => ({
                        ...previous,
                        maxPrice: Number(event.target.value),
                    }))
                }
                className="form-range"
            />

            <p className="filter-price-value">
                Up to R{maxPrice}
            </p>

            <hr />

            <button
                type="button"
                className="filter-reset"
                onClick={() =>
                    setFilters({
                        brands: [],
                        categories: [],
                        maxPrice: 5000,
                    })
                }
            >
                Reset Filters
            </button>

        </div>
    );
}