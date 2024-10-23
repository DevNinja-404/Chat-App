import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { userServices } from "@/services/users";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/store";

const SignUp = () => {
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

  const handleSignUp = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      // Register :
      const response = await userServices.register({
        email: data.email,
        password: data.password,
      });
      if (response?.data) toast.success(response?.data?.message);

      // Login :
      const loginResponse = await userServices.login({
        email: data.email,
        password: data.password,
      });

      if (loginResponse?.data && loginResponse.status === 200) {
        toast.message("Navigating To ChatMe...");
        setUser(loginResponse?.data?.data);
      }
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      handleError(error.response?.data?.message);
    }
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
        {errors.password &&
          !errors.email &&
          handleError(errors.password?.message)}
      </div>
      <div className="flex flex-col gap-y-0.5">
        <Input
          type="password"
          placeholder="Confirm Password"
          className="rounded-full p-5 text-black"
          {...register("confirmPassword")}
        />
      </div>
      <div className="w-full flex items-center justify-center ">
        <Button
          className="rounded-full w-1/2 bg-blue-950"
          type="submit"
          disabled={errors.email || errors.password || isSubmitting}
        >
          SignUp
        </Button>
      </div>
    </form>
  );
};

export default SignUp;
