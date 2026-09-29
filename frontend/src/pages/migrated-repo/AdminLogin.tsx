import React, { useState, ChangeEvent, FormEvent } from 'react';

interface AdminLoginProps {
  /** CSRF parameter name (e.g., "_csrf") */
  csrfParameterName: string;
  /** CSRF token value */
  csrfToken: string;
  /** Optional message to display (e.g., error message) */
  msg?: string;
}

const AdminLogin: React.FC<AdminLoginProps> = ({
  csrfParameterName,
  csrfToken,
  msg = '',
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // The form uses native POST submission to preserve original behavior.
  // Controlled inputs are used for accessibility and potential future enhancements.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // No custom logic required; form will submit to /admin/loginvalidate.
    // Preventing default is optional; leaving it out keeps native behavior.
  };

  return (
    <div className="modern-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="modern-card p-4 shadow-sm rounded">
        <h2 className="text-center mb-4">Admin Login</h2>
        <form
          action="/admin/loginvalidate"
          method="post"
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name={csrfParameterName}
            value={csrfToken}
          />
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Admin username"
                required
                className="form-control form-control-lg"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-lock"></i>
              </span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Admin Password"
                required
                className="form-control form-control-lg"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-4">
            Login
          </button>

          {msg && (
            <div className="alert-box text-danger text-center mt-3">
              {msg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;