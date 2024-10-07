export const InputBox = ({ required, label, placeholder, type, onChange }) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={label} className="font-bold">
        {label}
      </label>}
      <input
        onChange={onChange}
        type={type}
        name="name"
        id={label}
        placeholder={placeholder}
        required={required}
        autocomplete="off"
        className="focus:outline-none flex fex-col w-full px-[1vh] py-[1vh] md:py-[0.5vw] border-2 border-gray-300 rounded-[8px] "
      />
    </div>
  );
};
