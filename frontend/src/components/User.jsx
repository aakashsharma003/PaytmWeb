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
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const location = useLocation();
  const name = location.state.data.name;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        if (storedUsers.length === 0) {
          const res = await axios.get(`${server}/user/bulk`);
          storedUsers = res.data.users;
          localStorage.setItem("users", JSON.stringify(storedUsers));
        }
        setUsers(storedUsers);
        // Initially display 12 users
        setDisplayedUsers(storedUsers.slice(0, 12));
      } catch (err) {
        toast.error("Error fetching users");
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = user.first_name + " " + user.last_name;
    return (
      fullName.toLowerCase().includes(filter.toLowerCase()) && fullName !== name
    );
  });

  useEffect(() => {
    // Update displayed users whenever filter or users change
    if (!showAll) {
      setDisplayedUsers(filteredUsers.slice(0, 12));
    } else {
      setDisplayedUsers(filteredUsers);
    }
  }, [filteredUsers, showAll]);

  const handleViewAll = () => {
    setShowAll(true); // Show all users
  };

  return (
    <>
      <InputBox
        label={"Users"}
        onChange={(e) => {
          setFilter(e.target.value);
          setShowAll(false); // Reset to show only 12 users when filtering
        }}
        placeholder={"Search users"}
      />

      {displayedUsers.map((user) => (
        <AllUsers
          key={user.user_id}
          profile={user.first_name.substr(0, 1)}
          name={user.first_name + " " + user.last_name}
          id={user.user_id}
        />
      ))}

      {!showAll && filteredUsers.length > 12 && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={handleViewAll}
            innertext={"View All"}
            color={"black"}
            sx={{ padding: "8px 16px", borderRadius: "9999px" }}
          />
        </div>
      )}
    </>
  );
};

function AllUsers({ profile, name, id }) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[5%] flex justify-between items-center mb-2 border-gray-300 border rounded p-2">
      <div className="flex items-center w-[40%]">
        <Profile
          profile={profile}
          color={"#cbd5e1"}
          className="w-10 h-10 rounded-full overflow-hidden"
        />
        <SubHeading
          label={name}
          className="ml-2 overflow-hidden whitespace-nowrap text-sm overflow-ellipsis max-w-[calc(100%-3rem)]"
        />
      </div>
      <Button
        onClick={() => {
          navigate(`/send?id=${id}&name=${encodeURIComponent(name)}`);
        }}
        innertext={"Send Money"}
        color={"black"}
        className="ml-2"
      />
    </div>
  );
}
