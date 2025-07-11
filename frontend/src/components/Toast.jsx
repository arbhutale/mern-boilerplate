// src/components/Toast.jsx
import React, { useEffect } from "react";

export default function Toast({ type = "success", message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const baseStyle =
    "fixed bottom-20 right-2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow text-white text-sm font-medium transition-opacity duration-300 opacity-100";

  const typeStyles = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  };

  return (
    <div
      className={`${baseStyle} ${typeStyles[type] || "bg-gray-700"} animate-toast-slide-in`}
    >
      {message}
    </div>
  );
}
