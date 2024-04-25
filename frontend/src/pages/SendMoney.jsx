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
const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [playActive] = useSound(PaymentTone);
  // console.log(id, name);
  const PaymentHandler = async (e) => {
    e.preventDefault();
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
        // setTimeout(() => {
        playActive();
        // console.log("playing");

        setTimeout(() => {
          resolve();
        }, 2000);
        // }, 2000);
      }).then(function () {
        // console.log("aa gye");
        toast.success(res.data.message);
        navigate("/dashboard", {
          state: { data: res.data },
          replace: true,
        });
      });
    } catch (err) {
      toast.error(err.response.data.message);
      console.error(err);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <form
        className="w-[80vw] h-[50vh] md:w-[50vw] md:h-[60vh] bg-white px-[3vw] py-[3vh] rounded-md shadow-gray shadow-lg shadow-gray-800/70"
        onSubmit={PaymentHandler}
      >
        <Heading label={"Send Money"} />
        <div className="flex">
          <Profile profile={"A"} color={"#21c55d"} />
          <div className="flex justify-center items-center font- bold">
            {name}
          </div>
        </div>
        <InputBox
          type="number"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          label={"Amount (in $)"}
          placeholder={"Enter amount"}
        />
        <Button
          innertext={"Initiate Transfer"}
          color={"#21c55d"}
          render={"send"}
        />
      </form>
    </div>
  );
};

export default SendMoney;
