import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Define types for the decoded token
interface DecodedToken {
  exp: number; // Expiration timestamp
  userId: string; // Adjust according to your JWT structure
}

const Authenticate = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/auth");
      return;
    }else{
      navigate("/task");
    }
    
  }, [navigate]);

  return <>{children}</>;
};

export default Authenticate;
