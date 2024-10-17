import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
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
          className="rounded-full p-5 "
          {...register("email", {
            required: { value: true, message: "Email is required" },
            validate: {
              matchPattern: (value) =>
                /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        {errors?.email && (
          <span className="text-red-600 text-sm">{errors.email?.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-y-0.5">
        <Input
          type="password"
          placeholder="Password"
          className="rounded-full p-5 "
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        {errors?.password && (
          <span className="text-red-600 text-sm">
            {errors.password?.message}
          </span>
        )}
      </div>
      <div className="w-full flex items-center justify-center ">
        <Button className="rounded-full w-1/2 bg-blue-950" type="submit">
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
