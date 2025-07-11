import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useDarkMode from "../hooks/useDarkMode";

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const { isDark, toggleDarkMode } = useDarkMode();
    const [themeMenuOpen, setThemeMenuOpen] = useState(false);


    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <header className="bg-primary text-white shadow-md">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* LEFT */}
                <div className="flex items-center space-x-6">
                    {/* Brand */}
                    <div className="flex items-center space-x-2 cursor-pointer font-bold text-lg">
                        {/* https://ibb.co/TDSLL3P9 */}
                        <img src="https://i.ibb.co/j92RRX3n/Chat-GPT-Image-Jun-30-2025-05-00-46-PM.png" className="h-8 w-8 bg-white rounded-full" />
                        <span>Bhutale Board</span>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex space-x-4 items-center">
                        {/* Themes Dropdown */}
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-2 py-1 rounded${isActive ? "text-white font-semibold" : " text-[#FFFFFF8C]  hover:text-[#FFFFFFBF]"
                                }`
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/bank"
                            className={({ isActive }) =>
                                `px-2 py-1 rounded  ${isActive ? "text-white font-semibold" : "text-[#FFFFFF8C] hover:text-[#FFFFFFBF]"
                                }`
                            }
                        >
                            Bank
                        </NavLink>
                        <NavLink
                            to="/cc"
                            className={({ isActive }) =>
                                `px-2 py-1 rounded  ${isActive ? "text-white font-semibold" : "text-[#FFFFFF8C] hover:text-[#FFFFFFBF]"
                                }`
                            }
                        >
                            Credit Card
                        </NavLink>

                        <NavLink
                            to="/pm"
                            className={({ isActive }) =>
                                `px-2 py-1 rounded ${isActive ? "text-white font-semibold" : "text-[#FFFFFF8C] hover:text-[#FFFFFFBF]"
                                }`
                            }
                        >
                            Payment
                        </NavLink>

                        <NavLink
                            to="/tr"
                            className={({ isActive }) =>
                                `px-2 py-1 rounded ${isActive ? "text-white font-semibold" : " text-[#FFFFFF8C]  hover:text-[#FFFFFFBF]"
                                }`
                            }
                        >
                            United
                        </NavLink>
                    </div>

                </div>

                {/* RIGHT */}
                <div className="flex items-center space-x-4">
                    <i className="fab fa-github text-white cursor-pointer"></i>
                    <i className="fab fa-twitter text-white cursor-pointer"></i>

                    {/* Version dropdown */}
                    {/* <div className="text-sm bg-white text-primary px-2 py-1 rounded font-semibold cursor-pointer">v5.3 ▾</div> */}

                    {/* Theme toggle (same icon as bootswatch) */}
                    <button onClick={toggleDarkMode}>
      {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
                    {/* User dropdown */}
                    {user && (
                        <div className="relative group">
                            <button className="flex items-center space-x-2 focus:outline-none">
                                <div className="bg-white text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold">
                                    {user.name[0]}
                                </div>
                                <span className="hidden sm:inline">{user.name}</span>
                            </button>

                            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-md hidden group-hover:block z-10">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-secondary"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
