import { useState } from "react";
import { apiRequest, saveToken } from "../lib/api";
import { navigate } from "../lib/router";
import { RoseTop } from "../components/Ornaments";
import Icon from "../components/Icons";
import "../styles/auth.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "idle", text: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    if (!username.trim() || !password) {
      setStatus({ type: "error", text: "Escribe tu usuario y tu contraseña." });
      return;
    }
    setStatus({ type: "sending", text: "Verificando..." });
    try {
      // El backend revisa la contraseña y devuelve un token
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: { username: username.trim(), password },
      });
      saveToken(data.token);
      onLogin(data.token);
      navigate("/admin");
    } catch (error) {
      setStatus({ type: "error", text: error.message });
    }
  }

  return (
    <main className="auth">
      <div className="auth__card">
        <RoseTop size={84} className="auth__rose" />
        <h1>Iniciar sesión</h1>
        <p className="auth__lead">Acceso para el equipo de Daly's Coffee.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="button button--primary button--block" disabled={status.type === "sending"}>
            <Icon name="lock" size={18} />
            {status.type === "sending" ? "Verificando..." : "Entrar"}
          </button>
          {status.text && status.type !== "sending" && (
            <p className={`form-status form-status--${status.type}`} role="status">
              {status.text}
            </p>
          )}
        </form>

        <a href="#inicio" className="auth__back">
          Volver a la página principal
        </a>
      </div>
    </main>
  );
}
