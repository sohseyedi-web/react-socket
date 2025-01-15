import { ButtonTypes } from "@/types";
import Loading from "./Loading";

const ButtonAction = ({ title, loading, type = "submit" }: ButtonTypes) => {
  return (
    <button
      type={type}
      className="bg-zinc-900 hover:bg-zinc-950 transition-all duration-300 font-semibold lg:text-lg w-full lg:h-[55px] h-[50px] rounded-2xl text-zinc-100 flex items-center justify-center cursor-pointer border-none"
    >
      {loading ? <Loading/> : title}
    </button>
  );
};

export default ButtonAction;
