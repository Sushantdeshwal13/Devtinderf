import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const {
    _id,
    firstName = "Unknown",
    lastName = "",
    photoUrl,
    age,
    gender,
    about
  } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userid) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userid,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userid));
    } catch (err) {
      console.error("Failed to send request:", err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={
            photoUrl ||
            "https://www.w3schools.com/howto/img_avatar.png"
          }
          alt="photo"
          className="w-64 h-64 rounded-full object-cover mt-4"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + " " + lastName}
        </h2>
        <p>{`${age || "N/A"}, ${gender || "Not specified"}`}</p>
        <p>{about || "No bio available"}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
