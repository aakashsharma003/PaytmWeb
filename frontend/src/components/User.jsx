import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { SubHeading } from "./SubHeading";
import { Profile } from "./Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { InputBox } from "./InputBox";
import { server } from "../main";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
export const User = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const location = useLocation();
  const name = location.state.data.name;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${server}/user/bulk?filter=${filter}`);
        if (res.data.users.length === 0) {
          toast.error("No user found");
        }
        setUsers(res.data.users);
      } catch (err) {
        toast.error("No user found");
      }
    };
    fetchUsers();
  }, [filter]);
  const filteredUsers = users.filter((user) => user.first_name !== name);
  return (
    <>
      <InputBox
        label={"Users"}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        placeholder={"Search users"}
      />

      {filteredUsers.map((user) => {
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
  // console.log(id);
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
