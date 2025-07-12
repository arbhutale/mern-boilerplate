import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/slices/authSlice";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validate = () => {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Invalid email format.");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, form);
      localStorage.setItem("token", res.data.token);
      dispatch(loginSuccess(res.data.token));
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border px-3 py-2 rounded w-64"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border px-3 py-2 rounded w-64"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border px-3 py-2 rounded w-64"
      />

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <button
        onClick={handleSignup}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-64 disabled:opacity-50"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      <p className="text-sm">
        Already have an account?{" "}
        <a href="/" className="text-blue-500 underline">
          Login
        </a>
      </p>
    </div>
  );
}
