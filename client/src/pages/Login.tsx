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
        toast.error("Please fix the errors.");
        setIsSubmit(true);
        return;
      }

      await mutateAsync();
      navigate("/", { replace: true });
      toast.success("Welcome back!");
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <AuthContainer>
      <h6 className="lg:text-lg font-semibold text-zinc-700">Welcome back!</h6>
      <p className="lg:text-base text-zinc-600 my-3 text-sm">
        You can now log in to your account.
      </p>
      <form className="space-y-7 my-5" onSubmit={onSubmit}>
        <TextField
          isSubmit={isSubmit}
          placeHolder="Email"
          error={errors.email}
          value={values.email}
          type="email"
          onChange={(val) => handleChange("email", val)}
          icon={<MdOutlineAlternateEmail size={24} className="text-zinc-600" />}
        />
        <TextField
          isSubmit={isSubmit}
          placeHolder="Password"
          error={errors.password}
          value={values.password}
          type="password"
          onChange={(val) => handleChange("password", val)}
          icon={<LuLock size={24} className="text-zinc-600" />}
        />
        <ButtonAction title="Log in" loading={isPending} />
      </form>
      <div className="h-0.5 w-full bg-zinc-200 my-3"></div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 justify-center text-zinc-600 mb-3">
          Don't have an account?
          <Link
            to="/register"
            className="text-zinc-800 underline font-semibold"
          >
            Sign up
          </Link>
        </div>
        <div className="flex items-center gap-x-2 justify-center text-zinc-600 mb-3">
          Forgot your password?
          <Link
            to="/forgot-password"
            className="text-zinc-800 underline font-semibold"
          >
            Reset password
          </Link>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Login;
