import { useEffect, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { server } from "../main";
import CircularProgress from "@mui/material/CircularProgress"; // Importing CircularProgress
import Box from "@mui/material/Box"; // Importing Box for centering the loader

const Signup = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      toast.success("logout successfully");
    };
    if (token != null) logout();
  }, []);

  return (
    <div className="w-screen h-screen bg-[#cbd5e1] flex justify-center items-center relative">
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 50,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <div className="bg-white w-[94vw] h-[90vh] md:w-[50vw] md:h-[90vh] md:px-[3vw] md:py-[1vh] px-[5vw] shadow-gray shadow-lg shadow-gray-800/70 rounded-md">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true); // Show loading animation
            try {
              const res = await axios.post(`${server}/user/signup`, {
                first_name: firstName,
                last_name: lastName,
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
              console.error(err);
              toast.error(err.response.data.message);
            } finally {
              setLoading(false); // Hide loading animation
            }
          }}
          className="w-full h-full flex justify-between flex-col py-2 px-2 "
        >
          <Heading label="Signup" />
          <SubHeading label="Enter your information to create an account" />
          <InputBox
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            label="First Name"
            placeholder="Akash"
            type="text"
            required={"required"}
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
            label="Email"
            placeholder="akashsharma@gmail.com"
            type="email"
            required={"required"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
            placeholder="akash@123"
            type="password"
            required={"required"}
          />
          <Button type={"submit"} innertext={"Sign up"} color={"black"} />
          <BottomWarning
            label={"Already have an account?"}
            renderheading={"Signin"}
            render={"signin"}
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
