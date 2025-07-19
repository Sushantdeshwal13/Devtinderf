import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => { 
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
  try {
    const res = await axios.get(BASE_URL + "/profile", {
      withCredentials: true,
    });
    dispatch(addUser(res.data));
  } catch (err) {
    console.error("Error fetching user:", err);
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }
};


 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchUser(); // ✅ Only call if token exists
  } else {
    navigate("/login");
  }
}, []);


  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;
