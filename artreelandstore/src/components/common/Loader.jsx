export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    disabled = false,
    className = "",
}) {
    const variants = {
        primary: "btn-primary-custom",
        dark: "btn-dark-custom",
        outline: "btn-outline-custom",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${variants[variant] || variants.primary} ${className}`}
        >
            {children}
        </button>
    );
}