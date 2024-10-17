import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const handleSignUp = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
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
            minLength: {
              value: 8,
              message: "Password must be at least of 8 characters",
            },
            validate: {
              matchPattern: (value) =>
                new RegExp(
                  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]"
                ).test(value) ||
                "Password must contain a small,capital and special characters",
            },
          })}
        />
        {errors?.password && (
          <span className="text-red-600 text-sm">
            {errors.password?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-y-0.5">
        <Input
          type="password"
          placeholder="Confirm Password"
          className="rounded-full p-5 "
          {...register("confirmPassword", {
            validate: (value) => value === password || "Password do not match",
          })}
        />
        {errors?.confirmPassword && (
          <span className="text-red-600 text-sm">
            {errors.confirmPassword?.message}
          </span>
        )}
      </div>
      <div className="w-full flex items-center justify-center ">
        <Button className="rounded-full w-1/2 bg-blue-950" type="submit">
          SignUp
        </Button>
      </div>
    </form>
  );
};

export default SignUp;
