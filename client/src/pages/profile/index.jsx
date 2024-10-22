import { useAppStore } from "@/store/store";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { IoArrowBack } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { useEffect, useState } from "react";
import { colors, getColor } from "@/utils/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();
  const [hovered, setHovered] = useState(false);
  const [isThemeClicked, setIsThemeClicked] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleProfileEdit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (errors.firstName) {
      toast.error(errors.firstName?.message);
    } else if (errors.lastName) {
      toast.error(errors.lastName?.message);
    }
    return;
  }, [errors.firstName, errors.lastName]);

  const image = watch("image");
  const firstName = watch("firstName");
  const selectedColor = watch("color");
  console.log(selectedColor);

  return (
    <div className="bg-slate-800 h-screen flex items-center justify-center flex-col gap-10">
      <form
        className="flex flex-col gap-10 w-[80vw] md:w-max"
        onSubmit={handleSubmit(handleProfileEdit)}
        noValidate
      >
        <div className="">
          <IoArrowBack className="text-4xl lg:text-6xl text-white text-opacity-90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2 gap-x-10">
          <div className="w-full flex justify-center">
            <div
              className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center "
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                {image ? (
                  <AvatarImage
                    src={image}
                    alt="profile-icon"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                      selectedColor
                    )} `}
                  >
                    {firstName
                      ? firstName.split("").shift()
                      : user?.email?.split("").shift()}
                  </div>
                )}
              </Avatar>
              {hovered && (
                <div className=" absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer">
                  {image ? (
                    <FaTrash className="text-white text-3xl cursor-pointer" />
                  ) : (
                    <FaPlus className=" text-white text-3xl cursor-pointer" />
                  )}
                </div>
              )}
              {/* <input type="text" /> */}
            </div>
          </div>

          <div className="flex min-w-32  md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                value={user?.email}
                type="email"
                disabled
                className="rounded-lg p-6 bg-white text-black border-none "
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="FirstName"
                value={user?.firstName}
                type="text"
                className="rounded-lg p-6 bg-white text-black border-none "
                {...register("firstName", {
                  required: {
                    value: user?.firstName ? false : true,
                    message: "FirstName is required",
                  },
                })}
              />
              {/* {errors.firstName && handleError(errors.firstName?.message)} */}
            </div>
            <div className="w-full">
              <Input
                placeholder="LastName"
                value={user?.lastName}
                type="text"
                className="rounded-lg p-6 bg-white text-black border-none "
                {...register("lastName", {
                  required: {
                    value: user?.lastName ? false : true,
                    message: "LastName is required",
                  },
                })}
              />
              {/* {errors.lastName &&
                !errors.firstName &&
                handleError(errors.lastName?.message)} */}
            </div>
            <div className="w-full relative flex justify-center items-center gap-5">
              <p
                className={`bg-gray-950 rounded-2xl py-2 px-6 cursor-pointer ${
                  isThemeClicked ? "hidden" : "block"
                } `}
                onClick={() => setIsThemeClicked(true)}
              >
                SetTheme{" "}
              </p>
              {colors.map((eachColor, index) => (
                <div
                  key={index}
                  value={index}
                  className={`${eachColor} h-10 w-10 rounded-lg cursor-pointer transition-all duration-300 ${
                    isThemeClicked ? "block  duration-500" : "hidden"
                  } ${
                    selectedColor === index
                      ? "outline outline-white/70 outline-1"
                      : ""
                  }`}
                  onClick={() => setValue("color", index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full  flex justify-center">
          <Button
            className=" w-1/2 bg-purple-700 hover:bg-purple-900 px-10 py-6 rounded-3xl text-xl"
            type="submit"
            disabled={isSubmitting}
          >
            All Set
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
