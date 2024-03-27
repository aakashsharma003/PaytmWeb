import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-[#cbd5e1] flex justify-center items-center">
      <div className="bg-white w-[80dvw] h-[90dvh] md:w-[50dvw] md:h-[90dvh] md:px-[1dvw] md:py-[1dvh] px-[4dvw] shadow-gray shadow-lg shadow-gray-800/70 rounded-md">
        <div className="w-full h-full flex justify-between flex-col py-2 px-2 ">
          <Heading label="Signup" />
          <SubHeading label="Enter your information to create an account" />
          <InputBox
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            label="First Name"
            placeholder="Akash"
            type="text"
          />
          <InputBox
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            label="Last Name"
            placeholder="Sharma"
            type="text"
          />
          <InputBox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label="Username"
            placeholder="akashsharma@gmail.com"
            type="email"
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
            placeholder="ayushiakash@123"
            type="password"
          />
          <Button
            innertext={"Sign up"}
            color={"black"}
            onClick={async () => {
              try {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    first_name: firstName,
                    last_name: lastName,
                    username: username,
                    password: password,
                  }
                );
                toast.success(response.data.msg);
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              } catch (err) {
                toast.error(err);
                console.log(err);
              }
            }}
          />
          <BottomWarning
            label={"Already have an account?"}
            renderheading={"Signin"}
            render={"signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
