import { useState } from "react";
import { Profile } from "./Profile";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Appbar = ({ user, profile }) => {
  const [menubutton, setmenubutton] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-full h-[13vh] flex justify-between border-b-2 border-gray-100 px-[3%] md:px-[2%] py-[2%] ">
      <div className="flex justify-start items-center text-lg font-bold w-[40%] md:w-[20%]">
        <img
          src="https://www.paytmbank.com/_next/static/media/paytmbank-logo.4ba3db09.svg"
          alt="patm-logo"
        />
      </div>
      {!menubutton && (
        <div className="w-[20%] flex justify-center items-center py-[2%] h-full">
          <div className="text-center text-[90%] bold w-full md:px-[15%]">
            Hii, {user.split(" ")[0]}
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
        <div className="flex flex-col justify-between items-center h-[26vh] bg-gray-200 rounded-md px-[2vw] py-[2vh]">
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
              toast.success("logout Successfully");
              navigate("/signin");
            }}
            width={"100%"}
          />
        </div>
      )}
    </div>
  );
};
