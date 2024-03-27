import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { SubHeading } from "./SubHeading";
import { Profile } from "./Profile";
import { useEffect, useState } from "react";
import axios from "axios";
import { InputBox } from "./InputBox";
export const User = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filter=${filter}`
      );
      setUsers(res.data.users);
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
