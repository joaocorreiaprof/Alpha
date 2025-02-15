import { useAuth } from "../../context/useAuth";
import useForm from "./useForm";
import authService from "../../services/authService";

const useSignup = () => {
  const { login } = useAuth();
  const { formData, errors, handleChange, validate } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();

    if (!formErrors.name && !formErrors.email && !formErrors.password) {
      try {
        const response = await authService.signUp(formData);
        console.log("User created successfully:", response);
        // Optionally, you can log in the user after successful sign-up
        // login(response.token);
      } catch (error) {
        console.error("Sign Up Error:", error);
      }
    }
  };

  return { formData, errors, handleChange, handleSubmit, login };
};

export default useSignup;
