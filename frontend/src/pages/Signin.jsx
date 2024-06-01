import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      toast.success("logout successfully");
    };
    if (token != null) {
      logout();
    }
  }, []);
  return (
    <div className="w-screen h-screen bg-[#cbd5e1] flex justify-center items-center">
      <div className="bg-white  rounded-md w-[80dvw] h-[60dvh] md:h-[70dvh] md:w-[60dvw] shadow-gray shadow-lg shadow-gray-800/70 px-[2dvw] py-[2dvh] flex flex-col justify-between">
        <Heading label={"Sigin"} />
        <InputBox
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          label={"Email"}
          placeholder={"aakash6263264@gmail.com"}
        />
        <InputBox
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={"password"}
          label={"Password"}
          placeholder={"12345678"}
        />
        <Button
          onClick={async () => {
            try {
              const res = await axios.post(`${server}/user/signin`, {
                username,
                password,
              });
              toast.success(res.data.message);
              localStorage.setItem("token", res.data.token);
              navigate("/dashboard", {
                state: { data: res.data },
                replace: true,
              });
            } catch (err) {
              if (err.response.data.message)
                toast.error(err.response.data.message);
              else {
                toast.error("Internal server Error");
              }
            }
          }}
          innertext={"Signin"}
          color={"black"}
          render={"dashboard"}
        />
        <div className="flex justify-center items-center">
          <BottomWarning
            label={"If you don't have an account?"}
            renderheading={"Signup"}
            render={"signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
