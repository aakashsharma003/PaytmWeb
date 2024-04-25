export const InputBox = ({ required, label, placeholder, type, onChange }) => {
  return (
    <div className="w-full">
      <label htmlFor="input" className="font-bold">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        name="name"
        id={label}
        placeholder={placeholder}
        required={required}
        className="focus:outline-none flex fex-col w-full px-[1dvh] py-[1dvh] md:py-[0.5dvw] border-2 border-gray-300 rounded-[8px] "
      />
    </div>
  );
};
