export default function ProductSkeleton() {
    return (
        <div className="skeleton-card">
            <div className="skeleton-image" />

            <div className="skeleton-line" />

            <div className="skeleton-line short" />

            <div className="skeleton-line price" />
        </div>
    );
}