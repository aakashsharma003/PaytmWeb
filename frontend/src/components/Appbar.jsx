import { useState } from "react";
import { Profile } from "./Profile";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export const Appbar = ({ user, profile }) => {
  const [menubutton, setmenubutton] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-full h-[13dvh] flex justify-between border-b-2 border-gray-100 px-[2%] py-[2%] ">
      <div className="flex justify-center items-center text-lg font-bold">
        PayTm App
      </div>
      {!menubutton && (
        <div className="w-[20%] flex justify-center items-center py-[2%] h-full">
          <div className="text-center text-[90%] bold w-full md:pl-[20%]">
            Hii, {user}
          </div>
          <Profile
            profile={profile}
            color={"#cbd5e1"}
            menubutton={menubutton}
            onClick={() => {
              setmenubutton(!menubutton);
            }}
          />
        </div>
      )}
      {menubutton && (
        <div className="flex flex-col justify-between items-center h-[22dvh] bg-gray-200 rounded-md px-[2dvw] py-[2dvh]">
          <div className="flex justify-center items-center">
            <Profile
              profile={profile}
              color={"#cbd5e1"}
              menubutton={menubutton}
              onClick={() => {
                setmenubutton(!menubutton);
              }}
            />
            <div className="capitalize">{user}</div>
          </div>
          <Button
            innertext={"logout"}
            color={"black"}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/signin");
            }}
            width={"100%"}
          />
        </div>
      )}
    </div>
  );
};
