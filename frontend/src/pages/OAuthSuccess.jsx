import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/slices/authSlice";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log(token)

    if (token) {
      localStorage.setItem("token", token);
      dispatch(loginSuccess(token));
      navigate("/dashboard");
    }
  }, [dispatch, navigate]);

  return <div>Logging in via OAuth...</div>;
}
