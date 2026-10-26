import { useState } from "react";
import { apiRequest } from "../lib/api";
import { Stamp } from "./Ornaments";
import SectionTitle from "./SectionTitle";
import Icon from "./Icons";
import "../styles/contact.css";

const emptyForm = { name: "", email: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Las mismas reglas que tenías en script.js
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Escribe tu nombre.";
  if (!form.email.trim()) errors.email = "Escribe tu correo.";
  else if (!emailPattern.test(form.email.trim())) errors.email = "Escribe un correo válido, como nombre@correo.com.";
  if (!form.message.trim()) errors.message = "Escribe tu mensaje.";
  else if (form.message.trim().length < 10) errors.message = "El mensaje debe tener al menos 10 caracteres.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", text: "" });

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ type: "error", text: "Revisa los campos marcados." });
      return;
    }

    setStatus({ type: "sending", text: "Enviando tu mensaje..." });
    try {
      // El backend guarda el mensaje en la base de datos
      await apiRequest("/api/contact", {
        method: "POST",
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        },
      });
      setForm(emptyForm);
      setStatus({ type: "success", text: "Recibimos tu mensaje. Te responderemos a tu correo pronto." });
    } catch (error) {
      setStatus({ type: "error", text: error.message });
    }
  }

  return (
    <section className="contact section" id="contacto" aria-labelledby="contacto-titulo">
      <SectionTitle
        id="contacto-titulo"
        title="Escríbenos"
        intro="Pedidos para eventos, sugerencias o lo que quieras contarnos."
      />

      <div className="contact__layout">
        <ul className="contact__info">
          <li>
            <Icon name="pin" size={24} />
            <div>
              <strong>Ubicación</strong>
              <span>Barranquilla, Colombia</span>
            </div>
          </li>
          <li>
            <Icon name="mail" size={24} />
            <div>
              <strong>Correo</strong>
              <a href="mailto:dalyscoffee@gmail.com">dalyscoffee@gmail.com</a>
            </div>
          </li>
          <li>
            <Icon name="at" size={24} />
            <div>
              <strong>Redes sociales</strong>
              <span>@dalyscoffee</span>
            </div>
          </li>
          <li>
            <Icon name="clock" size={24} />
            <div>
              <strong>Horario</strong>
              <span>Lunes a sábado, 7:00 a.m. – 8:00 p.m.</span>
            </div>
          </li>
        </ul>

        <form className="letter" onSubmit={handleSubmit} noValidate>
          <Stamp className="letter__stamp" />

          <div className="field">
            <label htmlFor="contact-name">Nombre</label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby="contact-name-error"
            />
            <small id="contact-name-error" className="field__error">{errors.name}</small>
          </div>

          <div className="field">
            <label htmlFor="contact-email">Correo</label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby="contact-email-error"
            />
            <small id="contact-email-error" className="field__error">{errors.email}</small>
          </div>

          <div className="field">
            <label htmlFor="contact-message">Mensaje</label>
            <textarea
              id="contact-message"
              rows="5"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby="contact-message-error"
            />
            <small id="contact-message-error" className="field__error">{errors.message}</small>
          </div>

          <button type="submit" className="button button--primary" disabled={status.type === "sending"}>
            <Icon name="send" size={18} />
            {status.type === "sending" ? "Enviando..." : "Enviar mensaje"}
          </button>

          {status.text && (
            <p className={`form-status form-status--${status.type}`} role="status">
              {status.text}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
