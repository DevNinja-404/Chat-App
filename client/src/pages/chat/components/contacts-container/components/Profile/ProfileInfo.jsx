import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BASE_URL } from "@/constants";
import { useAppStore } from "@/store/store";
import { getColor } from "@/utils/utils";
import { FiEdit2 } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-around w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center ">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12  rounded-full overflow-hidden">
            {user?.image ? (
              <AvatarImage
                src={`${BASE_URL}/${user?.image}`}
                alt="profile-icon"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  user?.color
                )} `}
              >
                {user?.firstName
                  ? user?.firstName.split("").shift()
                  : user?.email?.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {user?.firstName && user?.lastName
            ? `${user?.firstName} ${user?.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={() => navigate("/profile")}>
              <FiEdit2 className="text-slate-300 text-xl font-medium" />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={() => navigate("/login")}>
              <IoLogOut className="text-slate-300 text-xl font-medium " />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
