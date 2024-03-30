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
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#f3f4f6]">
      <div className="w-[80dvw] h-[50dvh] md:w-[50dvw] md:h-[60dvh] bg-white px-[3dvw] py-[3dvh] rounded-md shadow-gray shadow-lg shadow-gray-800/70 ">
        <Heading label={"Send Money"} />
        <div className="flex">
          <Profile profile={"A"} color={"#21c55d"} />
          <div className="flex justify-center items-center font- bold">
            {name}
          </div>
        </div>
        <InputBox
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          label={"Amount (in $)"}
          placeholder={"Enter amount"}
        />
        <Button
          onClick={async () => {
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

              await new Promise((resolve) => {
                playActive();
                resolve();
              });

              await new Promise((resolve) => {
                toast.success(res.data.message);
                resolve();
              });

              navigate("/dashboard");
            } catch (err) {
              toast.error(err.response.data.message); // Show error message
              console.error(err);
            }
          }}
          innertext={"Initiate Transfer"}
          color={"#21c55d"}
          render={"send"}
        />
      </div>
    </div>
  );
};

export default SendMoney;
