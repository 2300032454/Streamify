import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './../assets/css/Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:4570/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role: 0 }),
            });

            if (response.ok) {
                navigate("/signin");
            } else {
                const data = await response.text();
                setError(data);
            }
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="signin-container">
            <h1 className="title">Streamify</h1>
            <div className="signin-box">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="signin-button" onClick={handleRegister}>
                    Register
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <p>
                    Already have an account?{" "}
                    <span className="link" onClick={() => navigate("/signin")}>Sign In</span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
