import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logout } from "../store/slices/authSlice"
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    dispatch(fetchUser()).unwrap().catch(() => {
      dispatch(logout());
      navigate("/");
    });
  }, [dispatch, navigate, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      {user ? (
        <p className="text-lg text-gray-700 mb-4">Welcome, {user.name}!</p>
      ) : (
        <p>No user info available</p>
      )}
      <p className="text-gray-600 max-w-md text-center mb-8">
        This is a protected page. You can show user-specific data here.
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
