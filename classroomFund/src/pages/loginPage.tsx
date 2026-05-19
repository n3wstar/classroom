import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/styles/auth.css";



export const LoginPage = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: login,
                        password,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Ошибка авторизации");
            }

            const data = await response.json();

            // 💾 сохраняем в localStorage
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/plans");
        } catch (error) {
            console.error(error);
        }
    };

    const handleUrfuLogin = () => {
        window.location.href = "https://urfu.ru";
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <h2 className="auth-title">Аудитория.УРФУ</h2>

                <div className="auth-field">
                    <input
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        placeholder="Введите логин"
                    />
                </div>

                <div className="auth-field">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите пароль"
                    />
                </div>

                <div className="auth-actions">
                    <button
                        className="auth-btn primary"
                        onClick={handleLogin}
                    >
                        Войти
                    </button>
                </div>

                <div className="auth-divider">
                    <span>или</span>
                </div>

                <button
                    className="auth-btn urfu"
                    onClick={handleUrfuLogin}
                >
                    Войти через учётную запись УрФУ
                </button>

            </div>
        </div>
    );
};