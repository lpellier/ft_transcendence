import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axios from "axios";

export default function Auth() {
  type LocationProps = {
    state: {
      from: Location;
    };
  };

  let auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation() as unknown as LocationProps;
  let from = location.state?.from?.pathname || "/";

  console.log("passed by Auth and from:", from);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACK_URL + "/users/me", {
        withCredentials: true,
      })
      .then((res) => {
        auth.signin(res.data, () => {
          console.log("about to login", from);
          navigate(from, { replace: true });
        });
      })
      .catch((err) => {
        console.log("not logged in");
        navigate("/login");
      });
  }, [auth, from, navigate]);

  return <div />;
}
