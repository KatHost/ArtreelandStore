import { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (event) => {
        setForm((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setStatus(
            "Thank you! Your message has been sent."
        );

        setForm({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    return (
        <div className="container-custom contact-page">

            <p className="eyebrow">WE ARE HERE TO HELP</p>

            <h1 className="page-title">GET IN TOUCH.</h1>

            <p className="contact-intro">
                Have a question about a product or order?
                Send us a message.
            </p>

            <form
                className="contact-form"
                onSubmit={handleSubmit}
            >

                <label>
                    Full Name

                    <input
                        className="form-control-custom"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Email Address

                    <input
                        className="form-control-custom"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Subject

                    <input
                        className="form-control-custom"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Message

                    <textarea
                        className="form-control-custom"
                        name="message"
                        rows="6"
                        value={form.message}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button
                    type="submit"
                    className="btn-primary-custom"
                >
                    SEND MESSAGE
                </button>

                {status && (
                    <p className="form-status" role="status">
                        {status}
                    </p>
                )}

            </form>

        </div>
    );
}