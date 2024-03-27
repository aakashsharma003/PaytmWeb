import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { User } from "../components/User";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [balance, setBalance] = useState();
  useEffect(() => {
    const fetchBalance = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setBalance(res.data.balance);
      toast.success("Balance fetched successfully");
    };
    fetchBalance();
  }, []);
  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center box-border">
      <div className="bg-white w-full h-full rounded-md overflow-x-hidden">
        <Appbar user={"Akash"} profile={"A"} />
        <div className="w-full h-[5dvh] font-bold flex justify-start items-center p-[2%]">
          Your balance Rs {balance}
        </div>
        <div className="w-full p-[2%]">
          <User />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
