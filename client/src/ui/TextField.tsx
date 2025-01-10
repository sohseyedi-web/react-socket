import { TextFieldTypes } from "@/types";
import { useState } from "react";

const TextField = ({
  icon,
  type = "text",
  placeHolder,
  error,
  value,
  autoFocus = false,
  onChange,
  isSubmit,
}: TextFieldTypes) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);

  return (
    <div className="w-full relative">
      <div className="w-full flex items-center bg-transparent justify-center gap-3 lg:h-[55px] h-[50px] rounded-[18px] border-2 border-zinc-300 px-3">
        <span
          className={`${
            error && isTouched ? "text-red-500" : "text-zinc-600"
          } transition-all duration-200`}
        >
          {icon}
        </span>
        <input
          autoFocus={autoFocus}
          type={type}
          placeholder={placeHolder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsTouched(true);
          }}
          className="flex-1 bg-transparent outline-none lg:text-lg text-zinc-800 placeholder:text-gray-500"
        />
      </div>
      {error && (isTouched || isSubmit) ? (
        <p className="text-red-500 absolute top-1/2 -translate-y-1/2 left-2 font-semibold text-sm transition-all duration-200">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default TextField;
