import AuthContainer from "@/features/auth/AuthContainer";
import ButtonAction from "@/ui/ButtonAction";
import TextField from "@/ui/TextField";
import { LuLock } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import api from "@/service/https";
import { LOGIN_USER } from "@/service/urls";
import { loginSchema, useValid } from "@/hooks/useValid";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { values, errors, validateForm, handleChange } = useValid(
    { email: "", password: "" },
    loginSchema
  );

  const loginUser = useCallback(() => api.post(LOGIN_USER, values), [values]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginUser,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!validateForm()) {
        toast.error("لطفا خطا ها رو برطرف کن");
        setIsSubmit(true);
        navigate("/", { replace: true });
      }

      await mutateAsync();
      toast.success("خوش اومدی دوست من");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContainer>
      <h6 className="lg:text-lg font-semibold text-zinc-700">خوش اومدی</h6>
      <p className="lg:text-base text-zinc-600 my-3 text-sm">
        حالا میتونی وارد حساب کاربریت بشی
      </p>
      <form className="space-y-7 my-5" onSubmit={onSubmit}>
        <TextField
          isSubmit={isSubmit}
          placeHolder="ایمیل"
          error={errors.email}
          value={values.email}
          type="email"
          onChange={(val) => handleChange("email", val)}
          icon={<MdOutlineAlternateEmail size={24} className="text-zinc-600" />}
        />
        <TextField
          isSubmit={isSubmit}
          placeHolder="رمز عبور"
          error={errors.password}
          value={values.password}
          type="password"
          onChange={(val) => handleChange("password", val)}
          icon={<LuLock size={24} className="text-zinc-600" />}
        />
        <ButtonAction title="ورود به حساب" loading={isPending} />
      </form>
      <div className="h-0.5 w-full bg-zinc-200 my-3"></div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 justify-center text-zinc-600 mb-3">
          حساب کاربری نساختی؟
          <Link
            to="/register"
            className="text-zinc-800 underline font-semibold"
          >
            ثبت نام
          </Link>
        </div>
        <div className="flex items-center gap-x-2 justify-center text-zinc-600 mb-3">
          رمز عبور یادت رفته؟
          <Link
            to="/register"
            className="text-zinc-800 underline font-semibold"
          >
            فراموشی رمز
          </Link>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
