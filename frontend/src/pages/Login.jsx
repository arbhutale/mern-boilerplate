import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Invalid email format.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      console.log(`${import.meta.env.VITE_BACKEND_URL}auth/login`)
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/login`, form);
      console.log(res)
      localStorage.setItem("token", res.data.token);
      
      window.location.href = "/";
    } catch (err) {
         console.log(`${import.meta.env.VITE_BACKEND_URL}auth/login`)
      console.log(err)
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_BACKEND_URL + "/auth/google";
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Login</h1>

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
      {error && <div className="text-red-600">{error}</div>}

      <button
        onClick={handleLogin}
        className="bg-green-600 text-white px-4 py-2 rounded w-64 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <button
        onClick={handleGoogleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded w-64"
      >
        Sign in with Google
      </button>

      <p className="text-sm">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-500 underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}
