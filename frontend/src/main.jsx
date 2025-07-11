// import "@heroui/react/styles.css"; // Required!

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OAuthSuccess from "./pages/OAuthSuccess";
import Dashboard from "./pages/Dashboard";
import Bank from "./pages/bank";
import CreditCard from "./pages/CreditCard";
import LoanAccountPage from "./pages/LoanAccountPage"
import PaymentMethods from "./pages/paymentmethod"
import TransactionPage from "./pages/transaction"
import CategoryPage from "./pages/category";

// Components
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// HeroUI
// import { HeroUIProvider } from "@heroui/react";



import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <HeroUIProvider> */}
      <Provider store={store}>
        <BrowserRouter>
          <main className="relative min-h-screen overflow-visible bg-white text-black  transition-colors duration-300 ">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/oauth-success" element={<OAuthSuccess />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bank"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Bank />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/loan"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <LoanAccountPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pm"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <PaymentMethods />
                    </Layout>
                  </ProtectedRoute>
                }
              />
               <Route
                path="/tr"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <TransactionPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
               <Route
                path="/cat"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <CategoryPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
              path="/cc"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CreditCard />
                  </Layout>
                </ProtectedRoute>
              }></Route>
            </Routes>
            

            



          </main>
        </BrowserRouter>
      </Provider>
    {/* </HeroUIProvider> */}
  </React.StrictMode>
);
