export default function PageWrapper({ children, className = "" }) {
    return (
        <div className={`container-custom page-wrapper ${className}`}>
            {children}
        </div>
    );
}