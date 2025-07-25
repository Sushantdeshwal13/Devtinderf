import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data)
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
 
  if (!connections) return;

  if (connections.length === 0) return <h1 className="flex justify-center my-10"> No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections !!</h1>

      {connections.map((connection) => {
  const {
    _id,
    firstName = "Unknown",
    lastName = "",
    photoUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    age = "N/A",
    gender = "Not specified",
    about = "No bio available"
  } = connection;
     console.log("Connection values =>", { firstName, lastName, age, gender, about });
  
        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
   <div>
      <img
         alt="photo"
         className="w-20 h-20 rounded-full object-cover"
         src={photoUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
      />
       </div>
        <div className="text-left mx-4 ">
         <h2 className="font-bold text-xl">
          {firstName + " " + lastName}
           </h2>
            {age && gender && <p>{age + ", " + gender}</p>}
           <p>{about}</p>
            </div>
             <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
             </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
