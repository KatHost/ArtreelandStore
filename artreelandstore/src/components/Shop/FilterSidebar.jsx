import Filters from "./Filters";

export default function FilterSidebar({
    filters,
    setFilters,
}) {
    return (
        <aside className="filter-sidebar">
            <div className="filter-sidebar-heading">
                <h3>FILTERS</h3>
            </div>

            <Filters
                filters={filters}
                setFilters={setFilters}
            />
        </aside>
    );
}