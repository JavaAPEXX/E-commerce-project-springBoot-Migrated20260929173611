import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

/* ---------- Types ---------- */
interface Category {
  id: number;
  name: string;
}

/* ---------- Component ---------- */
const ProductsAdd: React.FC = () => {
  const navigate = useNavigate();

  /* ----- Form state ----- */
  const [id, setId] = useState<number>(0); // readonly, computed from products list
  const [name, setName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [productImage, setProductImage] = useState<string>("");
  const [imgName, setImgName] = useState<string>(""); // hidden field, kept for compatibility
  const [csrfParam, setCsrfParam] = useState<string>("_csrf");
  const [csrfToken, setCsrfToken] = useState<string>("");

  /* ----- Supporting data ----- */
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  /* ----- Fetch CSRF token & supporting data ----- */
  useEffect(() => {
    // Spring Security usually places CSRF token in meta tags.
    const paramMeta = document.querySelector('meta[name="_csrf_parameter"]');
    const tokenMeta = document.querySelector('meta[name="_csrf"]');
    if (paramMeta && tokenMeta) {
      setCsrfParam(paramMeta.getAttribute("content") ?? "_csrf");
      setCsrfToken(tokenMeta.getAttribute("content") ?? "");
    }

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await fetch("/admin/categories", {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Failed to load categories");
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (e) {
        console.error(e);
        setError("Unable to load categories.");
      }
    };

    // Fetch existing products to compute next id
    const fetchProducts = async () => {
      try {
        const res = await fetch("/admin/products", {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Failed to load products");
        const products: { id: number }[] = await res.json();
        const maxId = products.reduce((max, p) => (p.id > max ? p.id : max), 0);
        setId(maxId + 1);
      } catch (e) {
        console.error(e);
        setError("Unable to compute next product id.");
      }
    };

    Promise.all([fetchCategories(), fetchProducts()]).finally(() => setLoading(false));
  }, []);

  /* ----- Handlers ----- */
  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<any>>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
      setter(value);
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append(csrfParam, csrfToken);
    formData.append("id", id.toString());
    formData.append("name", name);
    formData.append("categoryid", categoryId);
    formData.append("price", price.toString());
    formData.append("weight", weight.toString());
    formData.append("quantity", quantity.toString());
    formData.append("description", description);
    formData.append("productImage", productImage);
    formData.append("imgName", imgName);

    try {
      const response = await fetch("/admin/products/add", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const txt = await response.text();
        throw new Error(txt || "Failed to add product");
      }

      // Assuming successful redirect or JSON response
      navigate("/admin/products");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Submission failed");
    }
  };

  /* ----- Render ----- */
  if (loading) {
    return (
      <div className="modern-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="modern-container">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="/images/logo.png"
              alt="Logo"
              width="auto"
              height