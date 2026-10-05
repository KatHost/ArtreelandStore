import { X } from "lucide-react";

import Filters from "./Filters";

export default function MobileFilterDrawer({
    open,
    onClose,
    filters,
    setFilters,
}) {
    if (!open) return null;

    return (
        <div
            className="filter-drawer-backdrop"
            onClick={onClose}
        >
            <div
                className="filter-drawer"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="filter-drawer-header">
                    <h3>FILTER PRODUCTS</h3>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close filters"
                    >
                        <X />
                    </button>
                </div>

                <Filters
                    filters={filters}
                    setFilters={setFilters}
                />

                <button
                    type="button"
                    className="btn-primary-custom filter-apply"
                    onClick={onClose}
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}