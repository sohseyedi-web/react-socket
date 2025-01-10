import AuthContainer from "@/features/auth/AuthContainer";
import { registerSchema, useValid } from "@/hooks/useValid";
import api from "@/service/https";
import { REGISTER_USER } from "@/service/urls";
import ButtonAction from "@/ui/ButtonAction";
import TextField from "@/ui/TextField";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { LuLock, LuUserRound } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const { values, errors, validateForm, handleChange } = useValid(
    { username: "", email: "", password: "" },
    registerSchema
  );

  const registerUser = useCallback(
    () => api.post(REGISTER_USER, values),
    [values]
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerUser,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!validateForm()) {
        toast.error("لطفا خطا ها رو برطرف کن");
        setIsSubmit(true);
      }

      await mutateAsync();
      toast.success("خوش اومدی دوست من");
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContainer>
      <h6 className="lg:text-lg font-semibold text-zinc-700">بیا شروع کنیم</h6>
      <p className="lg:text-base text-zinc-600 my-3 text-sm">
        از اینجا میتونی واسه خودت حساب بسازی
      </p>
      <form className="space-y-7 my-5" onSubmit={onSubmit}>
        <TextField
          isSubmit={isSubmit}
          placeHolder="نام کاربری"
          error={errors.username}
          value={values.username}
          onChange={(val) => handleChange("username", val)}
          icon={<LuUserRound size={24} />}
          autoFocus={true}
        />
        <TextField
          isSubmit={isSubmit}
          placeHolder="ایمیل"
          error={errors.email}
          value={values.email}
          type="email"
          onChange={(val) => handleChange("email", val)}
          icon={<MdOutlineAlternateEmail size={24} />}
        />
        <TextField
          isSubmit={isSubmit}
          placeHolder="رمز عبور"
          error={errors.password}
          value={values.password}
          type="password"
          onChange={(val) => handleChange("password", val)}
          icon={<LuLock size={24} />}
        />
        <ButtonAction title="ایجاد حساب" loading={isPending} />
      </form>
      <div className="h-0.5 w-full bg-zinc-200 my-3"></div>
      <div className="flex items-center gap-x-2 justify-center text-zinc-600 mb-3">
        حساب کاربری داری؟
        <Link to="/join" className="text-zinc-800 underline font-semibold">
          ورود
        </Link>
      </div>
    </AuthContainer>
  );
};

export default Register;
