import { useState } from "react";

export default function ProductGallery({
    images = [],
    name = "",
    imageFit = "cover",
}) {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!images.length) {
        return (
            <div className="product-gallery-empty">
                Image unavailable
            </div>
        );
    }

    return (
        <div className="product-gallery">

            <div className="product-gallery-main">
                <img
                    src={images[selectedImage] || images[0]}
                    alt={name}
                    loading="eager"
                    className={`gallery-main-image${imageFit === "contain" ? " gallery-main-image--contain" : ""}`}
                />
            </div>

            {images.length > 1 && (
                <div className="product-gallery-thumbnails" aria-label="Product images">
                {images.map((image, index) => (
                    <button
                        type="button"
                        key={`${image}-${index}`}
                        className={
                            selectedImage === index
                                ? "gallery-thumbnail active"
                                : "gallery-thumbnail"
                        }
                        onClick={() => setSelectedImage(index)}
                        aria-label={`View image ${index + 1}`}
                        aria-pressed={selectedImage === index}
                    >
                        <img
                            src={image}
                            alt={`${name} ${index + 1}`}
                            className={imageFit === "contain" ? "gallery-thumbnail-image--contain" : ""}
                        />
                    </button>
                ))}
                </div>
            )}

        </div>
    );
}