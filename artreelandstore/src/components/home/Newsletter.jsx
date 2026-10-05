import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email.trim()) {
            setMessage("Please enter your email address.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        setMessage("Thank you for joining ARTRƎELAND!");

        setEmail("");
    };

    return (
        <section className="newsletter-section">

            <div className="container-custom newsletter-content">

                <p className="eyebrow">STAY CONNECTED</p>

                <h2>
                    BE THE FIRST
                    <br />
                    TO KNOW.
                </h2>

                <p>
                    Get updates about new collections,
                    exclusive releases and special offers.
                </p>

                <form
                    className="newsletter-form"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        aria-label="Email address"
                        required
                    />

                    <button type="submit" aria-label="Subscribe">
                        <ArrowRight />
                    </button>
                </form>

                {message && (
                    <p className="newsletter-message" role="status">
                        {message}
                    </p>
                )}

            </div>
        </section>
    );
}