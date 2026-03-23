import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthRegister from 'sections/auth/AuthRegister';
import API from "api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await API.post("/auth/register", {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        role_id: parseInt(formData.role_id)
      });

      alert("Registration successful!");
      navigate("/login");

    } catch (error) {
      console.error("Register error:", error);
      alert("Registration failed");
    }
  };

  return (
    <AuthWrapper>
      <AuthRegister handleRegister={handleRegister} />
    </AuthWrapper>
  );
}
  
  