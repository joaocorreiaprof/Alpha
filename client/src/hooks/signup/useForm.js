import { useState } from "react";

const useForm = () => {
  const [formData, setFormData] = useState({
    username: "", // Changed from name to username
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "", // Changed from name to username
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let formErrors = { username: "", email: "", password: "" }; // Changed from name to username

    if (!formData.username) {
      formErrors.username = "Username is required"; // Changed from name to username
    }

    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    setErrors(formErrors);
    return formErrors;
  };

  return { formData, errors, handleChange, validate };
};

export default useForm;
