import React, { useState, FormEvent } from "react";

interface UserLoginProps {
  /** Name attribute for the CSRF hidden field (e.g. "_csrf") */
  csrfParameterName?: string;
  /** CSRF token value */
  csrfToken?: string;
  /** Optional message to display (e.g. login error) */
  msg?: string;
}

/**
 * UserLogin – React migration of `userLogin.jsp`.
 * Preserves the original form submission (POST to /userloginvalidate)
 * and includes CSRF handling, controlled inputs, and accessible markup.
 * Presentation is modernized using the `.modern-*` CSS design tokens.
 */
const UserLogin: React.FC<UserLoginProps> = ({
  csrfParameterName = "",
  csrfToken = "",
  msg = "",
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Build URL‑encoded body to match original form submission
    const body = new URLSearchParams();
    if (csrfParameterName && csrfToken) {
      body.append(csrfParameterName, csrfToken);
    }
    body.append("username", username);
    body.append("password", password);

    try {
      const response = await fetch("/userloginvalidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
        credentials: "include", // preserve cookies / session
      });

      // Let the server handle redirects / error messages.
      // If the response is a redirect, the browser will follow it automatically.
      if (!response.ok) {
        // Optional: you could surface a generic error here.
        console.error("Login request failed:", response.status);
      }
    } catch (error) {
      console.error("Network error during login:", error);
    }
  };

  return (
    <div className="modern-container" style={containerStyle}>
      <div className="modern-card" style={cardStyle}>
        <h2 className="text-center">User Login</h2>

        <form onSubmit={handleSubmit} action="/userloginvalidate" method="post">
          {/* CSRF hidden field – rendered only when values are supplied */}
          {csrfParameterName && csrfToken && (
            <input
              type="hidden"
              name={csrfParameterName}
              value={csrfToken}
            />
          )}

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-user" aria-hidden="true"></i>
                </span>
              </div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username*"
                required
                className="form-control form-control-lg"
                value={username}
                onChange={(e) = /> setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fas fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password*"
                required
                className="form-control form-control-lg"
                value={password}
                onChange={(e) = /> setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Register link */}
          <div className="mb-3">
            <span>
              Don't have an account?{" "}
              <a className="linkControl" href="/register">
                Register here
              </a>
            </span>
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>

          {/* Optional server‑side message */}
          {msg && (
            <h3 className="text-center text-danger mt-3 alert-box">{msg}</h3>
          )}
        </form>
      </div>
    </div>
  );
};

/* Inline styles for the modern container/card – replace with your CSS framework if desired */
const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#f8f9fa",
  padding: "1rem",
};

const cardStyle: React.CSSProperties = {
  maxWidth: "400px",
  width: "100%",
  padding: "2rem",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  borderRadius: "8px",
  backgroundColor: "#fff",
};

export default UserLogin;