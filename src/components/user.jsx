import axios from "axios";
import { useState, useEffect } from "react";
import queryString from "query-string";
import { useParams, useNavigate } from "react-router-dom";

const User = (props) => {
  const [user, userState] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(async () => {
    console.log("hh");
    console.log(props);
    const response = await axios.get(`https://reqres.in/api/users/${id}`);
    userState(response.data.data);
  });

  return (
    <>
      <img
        src={user.avatar}
        style={{ borderRadius: "50%", width: "35%" }}
        alt=""
      />
      <h4>
        {user.first_name} {user.last_name}
      </h4>
      <h5>{user.email}</h5>
      <button
        onClick={() => {
          navigate("/users");
        }}
      >
        users
      </button>
    </>
  );
};

export default User;
