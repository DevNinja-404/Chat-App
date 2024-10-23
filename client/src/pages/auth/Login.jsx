import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { userServices } from "@/services/users";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/store";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleError = (error) => {
    toast.error(error);
    return;
  };

  const handleLogin = async (data) => {
    try {
      const response = await userServices.login(data);
      if (response?.data && response.status === 200) {
        toast.success(response?.data?.message);
        setUser(response?.data?.data);
      }
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      handleError(error.response?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      noValidate
      className="w-full flex flex-col gap-5 mt-12"
    >
      <div className="flex flex-col gap-y-0.5">
        <Input
          type="email"
          placeholder="Email"
          className="rounded-full p-5 text-black"
          {...register("email", {
            required: { value: true, message: "Email is required" },
            validate: {
              matchPattern: (value) =>
                /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        {errors.email && handleError(errors.email?.message)}
      </div>
      <div className="flex flex-col gap-y-0.5">
        <Input
          type="password"
          placeholder="Password"
          className="rounded-full p-5 text-black"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        {errors.password &&
          !errors.email &&
          handleError(errors.password?.message)}
      </div>
      <div className="w-full flex items-center justify-center ">
        <Button
          className="rounded-full w-1/2 bg-blue-950"
          type="submit"
          disabled={errors.email || errors.password || isSubmitting}
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
