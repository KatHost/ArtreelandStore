import {
    BadgeCheck,
    MapPin,
    MessageCircle,
    Sparkles,
} from "lucide-react";

import HeroButtons from "./HeroButtons";

export default function Hero() {
    const benefits = [
        {
            icon: Sparkles,
            title: "Curated brands",
            description: "Pairs picked for your rotation",
        },
        {
            icon: BadgeCheck,
            title: "Clear product details",
            description: "Sizes, condition and price upfront",
        },
        {
            icon: MapPin,
            title: "South African store",
            description: "Prices shown in rand",
        },
        {
            icon: MessageCircle,
            title: "Need a hand?",
            description: "Our contact page is one click away",
        },
    ];

    return (
        <>
            <section className="hero">
                <div className="hero-background" aria-hidden="true" />

                <div className="hero-content">
                    <span className="hero-label">
                        THE NEW COLLECTION
                    </span>

                    <h1 className="hero-title">
                        MORE THAN
                        <br />
                        JUST <span>FASHION.</span>
                    </h1>

                    <p className="hero-description">
                        ARTRƎELAND blends street culture, art and everyday
                        footwear into pieces that move with you.
                    </p>

                    <HeroButtons />

                    <div className="hero-bottom-note">
                        <span className="hero-slide-indicator">
                            <span>01</span>
                            <span>02</span>
                            <span>03</span>
                        </span>
                        <span>STEP INTO YOUR NEXT ROTATION</span>
                    </div>
                </div>
            </section>

            <section className="home-benefits" aria-label="Store highlights">
                <div className="home-benefits-track">
                    {[false, true].map((isDuplicate) => (
                        <div
                            className="home-benefits-group"
                            aria-hidden={isDuplicate || undefined}
                            key={isDuplicate ? "duplicate" : "original"}
                        >
                            {benefits.map(({ icon: Icon, title, description }) => (
                                <div className="home-benefit" key={title}>
                                    <Icon aria-hidden="true" />
                                    <span>
                                        <strong>{title}</strong>
                                        <small>{description}</small>
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}