import { Truck } from "lucide-react";

export default function TopBar() {
    return (
        <div className="top-bar">
            <div className="container-custom top-bar-content">
                <span>
                    Free shipping on orders of R1,500 or more
                </span>

                <span className="top-bar-right">
                    Wear the culture. Live the lifestyle.
                </span>

                <span className="top-bar-locale">EN <span>·</span> ZAR</span>

                <Truck
                    className="top-bar-truck"
                    size={15}
                    aria-hidden="true"
                />
            </div>
        </div>
    );
}