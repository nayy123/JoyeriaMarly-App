import React from "react";

function InputComplaintsBook(props) {
  const { titulo, extraMargin = false } = props;

  return (
    <>
      <div className="flex flex-col">
        <label
          htmlFor=""
          className={`md:font-semibold text-xs ${
            extraMargin ? "mb-30" : "mb-4"
          }`}
        >
          {titulo}
        </label>
        <input
          type={props.type || "text"} 
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
      </div>
    </>
  );
}

export default InputComplaintsBook;
