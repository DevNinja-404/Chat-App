import { useAppStore } from "@/store/store";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { IoArrowBack } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { useEffect, useRef, useState } from "react";
import { colors, getColor } from "@/utils/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { userServices } from "@/services/users";
import { BASE_URL } from "@/constants";
import { BackgroundLines } from "@/components/ui/background-lines";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();
  const [hovered, setHovered] = useState(false);
  const [isThemeClicked, setIsThemeClicked] = useState(false);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState("");
  console.log(user);
  console.log(image);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({});

  const handleProfileEdit = async (data) => {
    try {
      console.log(data);

      const response = await userServices.updateProfile(data);
      console.log(response);
      if (response?.data && response.status === 200) {
        setUser(response?.data?.data);
        toast.success(response?.data?.message);
        setTimeout(() => {
          navigate("/chat");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    if (errors.firstName) {
      toast.error(errors.firstName?.message);
    } else if (errors.lastName) {
      toast.error(errors.lastName?.message);
    }
    return;
  }, [errors.firstName, errors.lastName]);

  useEffect(() => {
    if (user?.isProfileComplete) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("color", user.color);
    }
    if (user.image) setImage(`${BASE_URL}/${user.image}`);
  }, [user, setValue]);

  const handleNavigate = () => {
    if (user?.isProfileComplete) {
      navigate("/chat");
    } else {
      toast.error("Please setup profile to continue");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      console.log(file);
      if (file) {
        const formData = new FormData();
        formData.append("profilePic", file);
        const response = await userServices.updateProfilePic(formData);
        if (response.status === 200 && response.data) {
          toast.success(response.data?.message);
          setUser({ ...user, image: response.data?.data });
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message);
    }
  };
  const handleDeleteImage = async () => {
    try {
      const response = await userServices.removeProfilePic();
      if (response.status === 200 && response.data) {
        toast.success(response.data?.message);
        setUser({ ...user, image: null });
        setImage(null);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message);
    }
  };

  const firstName = watch("firstName");
  const selectedColor = watch("color") || 0;

  return (
    <BackgroundLines className="h-screen w-screen bg-black  ">
      <div className=" h-screen w-screen  flex items-center absolute top-0 justify-center flex-col gap-10 z-10">
        <form
          className="flex flex-col gap-10 w-[80vw] md:w-max"
          onSubmit={handleSubmit(handleProfileEdit)}
          noValidate
        >
          <div className="" onClick={handleNavigate}>
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
                  <div
                    className=" absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer"
                    onClick={image ? handleDeleteImage : handleFileInputClick}
                  >
                    {image ? (
                      <FaTrash className="text-white text-3xl cursor-pointer" />
                    ) : (
                      <FaPlus className=" text-white text-3xl cursor-pointer" />
                    )}
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                  name="profilePic"
                  accept=".png, .jpg, .jpeg, .svg ,.webp"
                />
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
                  type="text"
                  className="rounded-lg p-6 bg-white text-black border-none "
                  {...register("firstName", {
                    required: {
                      value: !user?.firstName ? false : true,
                      message: "FirstName is required",
                    },
                  })}
                />
              </div>
              <div className="w-full">
                <Input
                  placeholder="LastName"
                  type="text"
                  className="rounded-lg p-6 bg-white text-black border-none "
                  {...register("lastName", {
                    required: {
                      value: !user?.lastName ? false : true,
                      message: "LastName is required",
                    },
                  })}
                />
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
                    onClick={() => {
                      setValue("color", index, {
                        shouldDirty: true,
                      });
                    }}
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
    </BackgroundLines>
  );
};

export default Profile;
