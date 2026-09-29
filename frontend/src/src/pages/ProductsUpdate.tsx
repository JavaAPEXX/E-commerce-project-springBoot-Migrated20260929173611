import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* ---------- Type Definitions (match backend) ---------- */
interface Category {
  id: number | string;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
  quantity: number;
  description: string;
  image: string;
  categoryId?: number | string;
}

/* ---------- Helper to read CSRF token from meta tags ---------- */
function useCsrfToken() {
  const param = document
    .querySelector('meta[name="_csrf_parameter"]')
    ?.getAttribute("content");
  const token = document
    .querySelector('meta[name="_csrf"]')
    ?.getAttribute("content");
  return { param: param ?? "_csrf", token: token ?? "" };
}

/* ---------- Main Component ---------- */
const ProductsUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // product id from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Form fields (controlled)
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [imgName, setImgName] = useState(""); // hidden field – kept for compatibility

  const { param: csrfParam, token: csrfToken } = useCsrfToken();

  /* ---------- Data Loading ---------- */
  useEffect(() => {
    async function fetchData() {
      try {
        // 1️⃣ fetch product details (expects JSON)
        const prodResp = await fetch(`/admin/products/update/${id}`, {
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });
        if (!prodResp.ok) throw new Error("Failed to load product");
        const prodData: Product = await prodResp.json();

        // 2️⃣ fetch categories list
        const catResp = await fetch("/admin/categories", {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!catResp.ok) throw new Error("Failed to load categories");
        const catData: Category[] = await catResp.json();

        // Populate state
        setProduct(prodData);
        setCategories(catData);

        // Initialise form fields
        setName(prodData.name);
        setCategoryId(String(prodData.categoryId ?? ""));
        setPrice(prodData.price);
        setWeight(prodData.weight);
        setQuantity(prodData.quantity);
        setDescription(prodData.description);
        setProductImage(prodData.image);
        setImgName(""); // original hidden field had no value
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  /* ---------- Handlers ---------- */
  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<any>>) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
      setter(value);
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!product) return;

    const payload = new URLSearchParams();
    payload.append(csrfParam, csrfToken);
    payload.append("id", String(product.id));
    payload.append("name", name);
    payload.append("categoryid", categoryId);
    payload.append("price", String(price));
    payload.append("weight", String(weight));
    payload.append("quantity", String(quantity));
    payload.append("description", description);
    payload.append("productImage", productImage);
    payload.append("imgName", imgName);

    try {
      const resp = await fetch(`/admin/products/update/${product.id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      });

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt || "Update failed");
      }

      // On success, redirect back to product list or detail page
      navigate("/admin/products");
    } catch (e: any) {
      setError(e.message);
    }
  };

  /* ---------- Render ---------- */
  if (loading) {
    return (
      <div className="modern-container">
        <div className="alert-box">Loading product information…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modern-container">
        <div className="alert-box">{error}</div>
      </div>
    );
  }

  return (
    <