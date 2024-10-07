import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { User } from "../components/User";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../main";
import { useLocation } from "react-router-dom";
import "../styles/Scrollbar.css";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet"; // Import Wallet icon from Material-UI

const Dashboard = () => {
  const [balance, setBalance] = useState();
  const location = useLocation();
  const data = location.state.data;

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get(`${server}/account/balance`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setBalance(res.data.balance);
        toast.success("Balance fetched successfully");
      } catch (error) {
        toast.error("Failed to fetch balance");
      }
    };
    fetchBalance();
  }, []);

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center box-border">
      <div className="bg-white w-full h-full rounded-md overflow-x-hidden">
        <Appbar user={data.name} profile={data.name[0]} />
        <div className="w-full h-[5vh] font-bold flex justify-start items-center p-[2%]">
          <WalletIcon style={{ fontSize: 24, marginRight: 8 }} />{" "}
          {/* Wallet icon */}
          <span className="text-lg">Your balance:</span>
          <span className="ml-2 text-xl font-bold text-gray-800">
            Rs {balance}
          </span>{" "}
          {/* Styled balance amount */}
        </div>
        <div className="w-full p-[2%]">
          <User />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
