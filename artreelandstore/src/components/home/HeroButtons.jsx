import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroButtons() {
    return (
        <div className="hero-actions">
            <Link to="/shop" className="btn-primary-custom">
                SHOP NOW
                <ArrowRight size={18} />
            </Link>

            <Link to="/about" className="btn-outline-light">
                OUR STORY
            </Link>
        </div>
    );
}