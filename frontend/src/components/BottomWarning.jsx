import { useNavigate } from "react-router-dom";
export const BottomWarning = ({ label, renderheading, render }) => {
  const navigate = useNavigate();
  return (
    <div className="text-lg flex justify-center items-center md:text-xl px-[0.5vw] text-center text-black w-full">
      <div>{label}</div>
      <div
        onClick={() => {
          navigate(`/${render}`);
        }}
        className="underline cursor-pointer text-violet-600"
      >
        {renderheading}
      </div>
    </div>
  );
};
