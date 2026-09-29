import React, { useState, ChangeEvent, FormEvent } from "react";

interface RegisterProps {
  /** Name attribute for the CSRF hidden field (e.g. "_csrf") */
  csrfParameterName?: string;
  /** CSRF token value */
  csrfToken?: string;
  /** Optional message to display (e.g. registration error) */
  msg?: string;
}

/**
 * Register page – migrated from `register.jsp`.
 * Preserves the original form fields, CSRF handling, and message display,
 * while modernizing the layout with the project's CSS design tokens.
 */
const Register: React.FC<RegisterProps> = ({
  csrfParameterName,
  csrfToken,
  msg,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // Let the browser perform a normal POST submission to preserve
    // server‑side processing (redirects, validation, etc.).
    // No `e.preventDefault()` so the request behaves exactly like the original JSP form.
  };

  return (
    <div className="modern-container">
      <div className="modern-card" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h3 style={{ marginTop: "10px" }}>Sign Up Now</h3>
        <p>Please fill out this to register</p>

        <form
          action="newuserregister"
          method="post"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* CSRF hidden field – rendered only when values are supplied */}
          {csrfParameterName && csrfToken && (
            <input
              type="hidden"
              name={csrfParameterName}
              value={csrfToken}
            />
          )}

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control form-control-lg"
              placeholder="Your Username*"
              required
              value={username}
              onChange={handleInputChange(setUsername)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control form-control-lg"
              placeholder="Email*"
              required
              minLength={6}
              aria-describedby="emailHelp"
              value={email}
              onChange={handleInputChange(setEmail)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control form-control-lg"
              placeholder="Password*"
              required
              value={password}
              onChange={handleInputChange(setPassword)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              className="form-control form-control-lg"
              rows={3}
              placeholder="Enter Your Address"
              value={address}
              onChange={handleInputChange(setAddress)}
            />
          </div>

          <span style={{ marginTop: "10px", display: "block" }}>
            Already have an account{" "}
            <a className="linkControl" href="/">
              Login here
            </a>
          </span>

          <input
            type="submit"
            value="Register"
            className="btn btn-primary btn-block"
          />
        </form>

        {/* Message from server (e.g., registration error) */}
        {msg && (
          <div className="alert-box" style={{ color: "red", marginTop: "1rem" }}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;