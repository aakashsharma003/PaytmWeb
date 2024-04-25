const Button = ({ type, innertext, color, onClick, width }) => {
  return (
    <button
      onClick={onClick}
      className=" px-[2dvw] py-[2dvh]  text-white text-center rounded-[8px] cursor-pointer"
      type={type}
      style={{ backgroundColor: color, width: width }}
    >
      {innertext}
    </button>
  );
};
export default Button;
