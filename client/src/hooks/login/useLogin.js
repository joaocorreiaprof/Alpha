import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import authService from "../../services/authService";

const useLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = { email: "", password: "" };

    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();

    if (!formErrors.email && !formErrors.password) {
      try {
        const response = await authService.login(formData);
        console.log("Login successful:", response);
        login(response.user); // Store the user information in the context
        navigate("/"); // Redirect to home page after successful login
      } catch (error) {
        console.error("Login Error:", error);
      }
    }
  };

  return { formData, errors, handleChange, handleSubmit };
};

export default useLogin;
