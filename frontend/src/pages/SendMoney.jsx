import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Profile } from "../components/Profile";
import toast from "react-hot-toast";
import { server } from "../main";
const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState();
  const navigate = useNavigate();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
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
          onClick={() => {
            try {
              axios
                .post(
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
                )
                .then((res) => {
                  toast.success(res.data.message);
                  console.log(res.data.message);
                  navigate("/dashboard");
                })
                .catch((err) => {
                  throw err;
                });
            } catch (err) {
              toast.error(err.response.data.msg);
              console.log(err);
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
