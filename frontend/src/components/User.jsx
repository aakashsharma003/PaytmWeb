import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { SubHeading } from "./SubHeading";
import { Profile } from "./Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { InputBox } from "./InputBox";
import { server } from "../main";
import toast from "react-hot-toast";
export const User = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${server}/user/bulk?filter=${filter}`);
        setUsers(res.data.users);
      } catch (err) {
        if (err.response.data.message) toast.error(err.response.data.message);
        else {
          toast.error("Internal server Error");
        }
      }
    };
    fetchUsers();
  }, [filter]);
  return (
    <>
      <InputBox
        label={"Users"}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        placeholder={"Search users"}
      />
      {users.map((user) => {
        if (user.first_name != localStorage.getItem("name"))
          return (
            <AllUsers
              profile={user.first_name.substr(0, 1)}
              name={user.first_name}
              key={user.user_id}
              id={user.user_id}
            />
          );
      })}
    </>
  );
};

function AllUsers({ profile, name, id }) {
  console.log(id);
  const navigate = useNavigate();
  return (
    <div className="w-full h-[5%] flex justify-between items-center">
      <div className="flex justify-between items-center">
        <Profile profile={profile} color={"#cbd5e1"} />
        <SubHeading label={name} />
      </div>
      <Button
        onClick={() => {
          navigate(`/send?id=${id}&name=${name}`);
        }}
        innertext={"SendMoney"}
        color={"black"}
      />
    </div>
  );
}
