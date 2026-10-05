import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setMessage(
            "Login Page ready.."
        );
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <p className="eyebrow">WELCOME BACK</p>

                <h1>LOGIN</h1>

                <p>Sign in to your ARTRƎELAND account.</p>

                <form onSubmit={handleSubmit}>

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

                    <button
                        type="submit"
                        className="btn-primary-custom auth-submit"
                    >
                        SIGN IN
                    </button>

                    {message && (
                        <p className="form-status">{message}</p>
                    )}

                </form>

                <p className="auth-bottom">
                    Don't have an account?
                    <Link to="/register"> Create Account</Link>
                </p>

            </div>
        </div>
    );
}