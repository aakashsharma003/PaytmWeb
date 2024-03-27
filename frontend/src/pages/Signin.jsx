import { BottomWarning } from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { InputBox } from "../components/InputBox";

const Signin = () => {
  return (
    <div className="w-screen h-screen bg-[#cbd5e1] flex justify-center items-center">
      <div className="bg-white  rounded-md w-[80dvw] h-[60dvh] md:h-[70dvh] md:w-[60dvw] shadow-gray shadow-lg shadow-gray-800/70 px-[2dvw] py-[2dvh] flex flex-col justify-between">
        <Heading label={"Sigin"} />
        <InputBox label={"Username"} placeholder={"aakash6263264@gmail.com"} />
        <InputBox label={"Password"} placeholder={"12345678"} />
        <Button innertext={"Signin"} color={"black"} render={"dashboard"} />
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
