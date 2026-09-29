import React, { useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Interface matching the backend Customer model used in displayCustomers.jsp
 */
interface Customer {
  username: string;
  email: string;
  address: string;
}

/**
 * DisplayCustomers – React migration of `displayCustomers.jsp`
 *
 * - Preserves the original table structure (Customer Name, Email, Address, Delete)
 * - Retrieves the customer list from the backend endpoint `/customers`
 * - Uses modern CSS utility classes (`modern-container`, `modern-card`, etc.)
 * - Includes the original navigation bar (Home → Dashboard, Logout)
 * - Handles loading, empty, and error states without adding any form logic
 */
const DisplayCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch customers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("/customers", {
          method: "GET",
          credentials: "include", // preserve session cookies if any
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        // Assuming the backend returns JSON array of customers
        const data: Customer[] = await response.json();
        setCustomers(data);
      } catch (err) {
        console.error("Failed to fetch customers:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="bg-light min-vh-100">
      {/* Navigation Bar – identical to original JSP */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            {/* Image path preserved – adjust if static assets are relocated */}
            <img
              src="/images/logo.png"
              alt="Logo"
              width="auto"
              height="40"
              className="d-inline-block align-top"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto"></ul>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/Dashboard">
                  Home Page
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="modern-container py-4">
        <div className="modern-card p-4 shadow-sm bg-white">
          <h2 className="mb-4">Customers</h2>

          {/* Loading / Error / Empty states */}
          {loading && (
            <div className="alert-box alert-info">Loading customers...</div>
          )}
          {error && (
            <div className="alert-box alert-danger">
              Error loading customers: {error}
            </div>
          )}
          {!loading && !error && customers.length === 0 && (
            <div className="alert-box alert-warning">No customers found.</div>
          )}

          {/* Table – rendered only when data exists */}
          {!loading && !error && customers.length > 0 && (
            <div className="modern-table-wrapper overflow-auto">
              <table className="table table-hover">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, idx) => (
                    <tr key={idx}>
                      <td>{customer.username}</td>
                      <td>{customer.email}</td>
                      <td>{customer.address}</td>
                      {/* Delete column left empty to match original JSP (no delete button present) */}
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayCustomers;