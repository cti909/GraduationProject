import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/actions/authAction";

export const LogoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(logoutAction());

  useEffect(() => {
    navigate("/login");
  }, []);
  return <div>LogoutPage</div>;
};
