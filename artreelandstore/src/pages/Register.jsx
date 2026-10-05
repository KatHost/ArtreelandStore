import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        if (form.password.length < 8) {
            setMessage(
                "Password must contain at least 8 characters."
            );
            return;
        }

        setMessage(
            "Registration Page ready."
        );
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <p className="eyebrow">JOIN THE COMMUNITY</p>

                <h1>CREATE ACCOUNT</h1>

                <p>Start your ARTRƎELAND experience.</p>

                <form onSubmit={handleSubmit}>

                    <label>
                        Full Name

                        <input
                            className="form-control-custom"
                            value={form.name}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    name: event.target.value,
                                })
                            }
                            required
                        />
                    </label>

                    <label>
                        Email Address

                        <input
                            className="form-control-custom"
                            type="email"
                            value={form.email}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    email: event.target.value,
                                })
                            }
                            required
                        />
                    </label>

                    <label>
                        Password

                        <input
                            className="form-control-custom"
                            type="password"
                            value={form.password}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    password: event.target.value,
                                })
                            }
                            required
                        />
                    </label>

                    <label>
                        Confirm Password

                        <input
                            className="form-control-custom"
                            type="password"
                            value={form.confirmPassword}
                            onChange={(event) =>
                                setForm({
                                    ...form,
                                    confirmPassword: event.target.value,
                                })
                            }
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className="btn-primary-custom auth-submit"
                    >
                        CREATE ACCOUNT
                    </button>

                    {message && (
                        <p className="form-status">{message}</p>
                    )}

                </form>

                <p className="auth-bottom">
                    Already registered?
                    <Link to="/login"> Sign In</Link>
                </p>

            </div>
        </div>
    );
}