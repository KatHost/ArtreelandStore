import { Search, X } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
    return (
        <div className="shop-search">

            <Search
                size={19}
                className="search-icon"
            />

            <input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(event) =>
                    setSearch(event.target.value)
                }
                aria-label="Search products"
            />

            {search && (
                <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="search-clear"
                >
                    <X size={17} />
                </button>
            )}

        </div>
    );
}