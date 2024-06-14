import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { InputBox } from "../components/InputBox";
import PaymentTone from "/paytm_payment_tune.mp3";
import useSound from "use-sound";
import { Profile } from "../components/Profile";
import toast from "react-hot-toast";
import { server } from "../main";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/NotFound.css";
import Box from "@mui/material/Box";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [playActive] = useSound(PaymentTone);

  const PaymentHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading animation
    try {
      const res = await axios.post(
        `${server}/account/transfermoney`,
        {
          to: id,
          amount: amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      new Promise((resolve) => {
        playActive();
        setTimeout(() => {
          resolve();
        }, 2000);
      }).then(function () {
        toast.success(res.data.message);
        navigate("/dashboard", {
          state: { data: res.data },
          replace: true,
        });
      });
    } catch (err) {
      toast.error(err.response.data.message);
      console.error(err);
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  return (
    <div className="bg-paytm w-screen h-screen flex justify-center items-center relative  ">
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
      <form
        className="w-[80vw] h-[50vh] md:w-[50vw] md:h-[60vh] bg-gray-50 px-[3vw] py-[3vh] rounded-md shadow-gray shadow-lg shadow-gray-800/70 flex flex-col justify-between items-stretch"
        onSubmit={PaymentHandler}
      >
        <Heading label={"Send Money"} />
        <div className="flex">
          <Profile profile={"A"} color={"#21c55d"} />
          <div className="flex justify-center items-center font-bold ml-2">
            {name}
          </div>
        </div>
        <InputBox
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          label={"Amount (in Rs)"}
          placeholder={"Enter amount"}
        />
        <Button
          innertext={"Initiate Transfer"}
          color={"#21c55d"}
          render={"send"}
          width={"100%"}
        />
      </form>
    </div>
  );
};

export default SendMoney;
