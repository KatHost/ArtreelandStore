import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="about-page">

            <section className="about-hero">
                <div className="container-custom">
                    <p className="eyebrow">OUR IDENTITY</p>

                    <h1>
                        STYLE IS
                        <br />
                        <span>PERSONAL.</span>
                    </h1>

                    <p>
                        ARTRƎELAND is a fashion and lifestyle concept
                        built around self-expression, individuality
                        and contemporary design.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container-custom about-content">

                    <div>
                        <p className="eyebrow">OUR STORY</p>

                        <h2 className="section-heading">
                            MORE THAN FASHION.
                            A STATEMENT.
                        </h2>
                    </div>

                    <div>
                        <p>
                            We believe clothing is more than fabric.
                            It is identity, creativity and confidence.
                            Our collection is designed for people who
                            want to express themselves without limits.
                        </p>

                        <p>
                            From everyday essentials to statement pieces,
                            ARTRƎELAND represents a modern approach
                            to fashion and lifestyle.
                        </p>

                        <Link to="/shop" className="btn-primary-custom">
                            DISCOVER THE COLLECTION
                        </Link>
                    </div>

                </div>
            </section>

            <section className="section about-visuals">
                <div className="container-custom">
                    <div className="about-visuals-heading">
                        <p className="eyebrow">THE BRAND IN EVERY DETAIL</p>
                        <h2 className="section-heading">
                            MADE TO BE REMEMBERED.
                        </h2>
                        <p className="section-subtitle">
                            A glimpse at the ARTRƎELAND identity, from the
                            mark itself to the details around every collection.
                        </p>
                    </div>

                    <div className="about-visuals-grid">
                        <figure>
                            <img
                                src="/images/brand-packaging-box.png"
                                alt="Black ARTRƎELAND presentation box with a raised emblem"
                                loading="lazy"
                            />
                            <figcaption>THE SIGNATURE PRESENTATION</figcaption>
                        </figure>
                        <figure>
                            <img
                                src="/images/brand-stationery.png"
                                alt="ARTRƎELAND stationery, business card, and embossed envelope"
                                loading="lazy"
                            />
                            <figcaption>OUR IDENTITY, IN PRINT</figcaption>
                        </figure>
                        <figure>
                            <img
                                src="/images/wooden-brand-stamp.png"
                                alt="Wooden stamp engraved with the ARTRƎELAND emblem"
                                loading="lazy"
                            />
                            <figcaption>THE EMBLEM</figcaption>
                        </figure>
                        <figure>
                            <img
                                src="/images/pink-brand-shopping-bag.png"
                                alt="Pink ARTRƎELAND shopping bag with black handles"
                                loading="lazy"
                            />
                            <figcaption>THE SHOPPING EXPERIENCE</figcaption>
                        </figure>
                        <figure>
                            <img
                                src="/images/monochrome-everyday-carry.png"
                                alt="ARTRƎELAND monochrome apparel and everyday accessories collection"
                                loading="lazy"
                            />
                            <figcaption>EVERYDAY, REIMAGINED</figcaption>
                        </figure>
                        <figure>
                            <img
                                src="/images/noir-accessories-flatlay.png"
                                alt="ARTRƎELAND accessories arranged in a dark flat-lay"
                                loading="lazy"
                            />
                            <figcaption>THE NOIR ACCESSORIES EDIT</figcaption>
                        </figure>
                        <figure>
                            <img
                                src="/images/noir-essentials-flatlay.png"
                                alt="ARTRƎELAND black essentials collection"
                                loading="lazy"
                            />
                            <figcaption>THE NOIR ESSENTIALS</figcaption>
                        </figure>
                        <figure>
                            <img
                                src="/images/streetwear-product-showcase.png"
                                alt="ARTRƎELAND streetwear collection showcase"
                                loading="lazy"
                            />
                            <figcaption>MADE FOR THE STREET</figcaption>
                        </figure>
                        <figure>
                            <img
                                src="/images/urban-essentials-flatlay.png"
                                alt="ARTRƎELAND urban clothing and accessories"
                                loading="lazy"
                            />
                            <figcaption>URBAN ESSENTIALS</figcaption>
                        </figure>
                        <figure>
                            <img
                                src="/images/be-in-the-now-showcase.png"
                                alt="ARTRƎELAND Be In The Now apparel showcase"
                                loading="lazy"
                            />
                            <figcaption>BE IN THE NOW</figcaption>
                        </figure>
                        <figure>
                            <img
                                src="/images/luxury-artreeland-cap-showcase.png"
                                alt="ARTRƎELAND embroidered cap design showcase"
                                loading="lazy"
                            />
                            <figcaption>THE CAP COLLECTION</figcaption>
                        </figure>
                        <figure>
                            <img
                                src="/images/artreeland-embroidered-cap.png"
                                alt="Black embroidered ARTRƎELAND cap"
                                loading="lazy"
                            />
                            <figcaption>EMBROIDERED SIGNATURES</figcaption>
                        </figure>
                    </div>
                </div>
            </section>

        </div>
    );
}