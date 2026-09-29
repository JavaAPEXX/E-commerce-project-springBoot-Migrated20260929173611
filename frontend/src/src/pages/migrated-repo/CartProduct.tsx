import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Interface representing a single row in the Cart table.
 * The field names match the column order used in the original JSP:
 *   1. id
 *   2. productName
 *   3. price
 *   4. description
 */
interface CartItem {
  id: number;
  productName: string;
  price: string;
  description: string;
}

/**
 * CartProduct – React migration of `cartproduct.jsp`.
 *
 * Functional fidelity:
 *   • Retrieves cart items from the backend (expected JSON array of CartItem).
 *   • Displays them in a responsive table that mirrors the original markup.
 *   • Provides a Delete button that issues a GET request to the legacy
 *     endpoint `cart/delete?id=<id>` and refreshes the list.
 *   • Includes a link to the product‑creation page (`/user/products`).
 *
 * UI modernization:
 *   • Uses the modern‑css design tokens (`.modern-container`, `.modern-card`,
 *     `.modern-table-wrapper`, `.form-group`, `.form-label`, `.form-control`,
 *     `.btn`, `.btn-primary`, `.btn-danger`, `.badge`, `.alert-box`).
 *   • Responsive layout with flexbox utilities.
 */
const CartProduct: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /** Fetch cart items from the backend. */
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      setError(null);
      // NOTE: Adjust the endpoint if your backend exposes a different URL.
      const response = await fetch("/cart"); // Expected to return JSON: CartItem[]
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const data: CartItem[] = await response.json();
      setItems(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load cart items.");
    } finally {
      setLoading(false);
    }
  };

  /** Delete a cart entry using the legacy GET endpoint. */
  const handleDelete = async (id: number) => {
    try {
      // The original JSP used a form GET to `cart/delete?id=...`
      const response = await fetch(`/cart/delete?id=${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }
      // Refresh the list after successful deletion
      await fetchCartItems();
    } catch (err: any) {
      setError(err.message ?? "Delete operation failed.");
    }
  };

  // Initial load
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="modern-container bg-light min-vh-100">
      {/* Navbar – kept identical to original styling */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="/images/logo.png"
              alt="Logo"
              width="auto"
              height="40"
              className="d-inline-block align-top"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto" />
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/adminhome">
                  Home Page
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/logout">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="modern-card container-fluid py-4">
        {/* Add Product button */}
        <div className="mb-3">
          <Link to="/user/products" className="btn btn-primary">
            Add Product
          </Link>
        </div>

        {/* Alert handling */}
        {error && (
          <div className="alert-box alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="modern-table-wrapper overflow-auto">
          {loading ? (
            <div className="alert-box alert alert-info">Loading cart items...</div>
          ) : items.length === 0 ? (
            <div className="alert-box alert alert-warning">No records found.</div>
          ) : (
            <table className="table table-hover">
              <thead className="thead-light">
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartProduct;