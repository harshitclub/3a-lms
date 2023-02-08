import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../redux/features/auth/authService";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn;

    const redirectLoggedOutUser = async () => {
      try {
        isLoggedIn = await authService.adminLoginStatus();
      } catch (error) {
        console.log(error.message);
      }

      if (!isLoggedIn) {
        toast.info("Session Expired! | Please Login to Continue");
        navigate(path);
        return;
      }
    };

    redirectLoggedOutUser();
  }, [path, navigate]);
};

export default useRedirectLoggedOutUser;
