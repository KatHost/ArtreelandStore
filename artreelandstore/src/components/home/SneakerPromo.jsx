import { ArrowRight, Crown } from "lucide-react";
import { Link } from "react-router-dom";

export default function SneakerPromo() {
    return (
        <section className="sneaker-promo-section">
            <div className="container-custom">
                <div className="sneaker-promo">
                    <div className="sneaker-promo-photo" aria-hidden="true" />

                    <div className="sneaker-promo-content">
                        <p className="sneaker-promo-kicker">UP TO</p>
                        <h2>50% OFF</h2>
                        <p className="sneaker-promo-caption">SELECTED STYLES</p>
                        <Link to="/shop" className="sneaker-promo-link">
                            SHOP SALE <ArrowRight size={13} />
                        </Link>
                    </div>

                    <div className="sneaker-promo-brand" aria-label="ARTRƎELAND">
                        <Crown aria-hidden="true" />
                        <strong>ARTRƎELAND</strong>
                        <span>LIMITED TIME ONLY</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
