import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import { animationDefaultOptions, getColor } from "@/utils/utils";
import Lottie from "react-lottie";
import { contactsServices } from "@/services/contacts";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { BASE_URL } from "@/constants";
import { useAppStore } from "@/store/store";

const NewDM = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const { setSelectedChatData, setSelectedChatType, selectedChatType } =
    useAppStore();

  console.log(selectedChatType);

  // Debouncing the searchTerm:
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(delay);
  });
  // Searching the Contacts from the debounced searchTerm:
  useEffect(() => {
    const searchContacts = async () => {
      try {
        if (debouncedTerm.length > 0) {
          const response = await contactsServices.getContacts(debouncedTerm);
          setSearchedContacts(response?.data?.data);
        } else {
          setSearchedContacts([]);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    };
    searchContacts();
  }, [debouncedTerm]);

  // Add New Contact Feature:
  const selectNewContact = (contact) => {
    setOpenNewContactModel(false);
    setSelectedChatType("contact"); //We passed that the chat we selected is with a person
    setSelectedChatData(contact); // We passed the information of the person we currently are chatting
    setSearchedContacts([]);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-2 text-white">
            Select New conatct
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog
        open={openNewContactModel}
        onOpenChange={setOpenNewContactModel}
        className=""
      >
        <DialogContent className="bg-[#181920] border-none text-white[400px] h-[400px] flex flex-col ">
          <DialogHeader>
            <DialogTitle className="text-center text-white">
              Please Select a Contact
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contact"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none outline-none text-white placeholder:text-gray-400"
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {searchedContacts.length > 0 && (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchedContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => selectNewContact(contact)}
                  >
                    <div className="w-12 h-12 relative ">
                      <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                        {contact?.image ? (
                          <AvatarImage
                            src={`${BASE_URL}/${contact?.image}`}
                            alt="profile-icon"
                            className="object-cover w-full h-full bg-black rounded-full"
                          />
                        ) : (
                          <div
                            className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                              contact?.color
                            )} `}
                          >
                            {contact?.firstName
                              ? contact?.firstName.split("").shift()
                              : contact?.email?.split("").shift()}
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div className="flex flex-col text-white ">
                      <span>
                        {contact?.firstName && contact?.lastName
                          ? `${contact.firstName} ${contact.lastName}`
                          : contact.email}
                      </span>
                      <span className="text-xs">{contact.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {searchedContacts.length <= 0 && (
            <div className="flex-1 md:flex flex-col justify-center items-center mt-5 duration-1000 transition-all">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-4xl text-3xl transition-all duration-300 text-center">
                <h3 className="poppins-medium">
                  Hi<span className="text-purple-500">!</span> Search a{" "}
                  <span className="text-purple-500 ">Contact</span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
