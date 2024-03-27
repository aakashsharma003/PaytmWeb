const Button = ({ innertext, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" px-[2dvw] py-[2dvh]  text-white text-center rounded-[8px] cursor-pointer"
      style={{ backgroundColor: color }}
    >
      {innertext}
    </div>
  );
};
export default Button;
