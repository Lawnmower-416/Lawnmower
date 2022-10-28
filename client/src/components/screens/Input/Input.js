import React from "react";

const Input = ({ type, label, name, value, onChange }) => {
  return (
    <div className="flex flex-col pt-6">
      <label
        htmlFor={name}
        className="font-inter font-bold text-white text-2xl lg:text-3xl pb-1"
      >
        {label}
      </label>
      <input
        style={{ paddingTop: "6px", paddingBottom: "6px" }}
        className="w-full  rounded outline-none px-3"
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
