import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";

import Loading from "@/assets/Loading.svg";

const MessageBar = () => {
  const emojiRef = useRef(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const message = watch("message");

  const handleSendMessage = (data) => {
    console.log(data);
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(handleSendMessage)}
        noValidate
        className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-5 gap-6 "
      >
        <div className="flex-1 flex bg-[#2a2b33] rounded-md gap-5  items-center pr-5 ">
          <input
            type="text"
            className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none "
            placeholder="Enter text Message"
            {...register("message")}
            defaultValue=""
          />
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            type="button"
          >
            <GrAttachment className="text-2xl" />
          </button>
          <div className="relative flex justify-center">
            <button
              className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
              onClick={() => setEmojiPickerOpen(true)}
              type="button"
            >
              <RiEmojiStickerLine className="text-2xl" />
            </button>
            <div className="absolute bottom-16 right-0" ref={emojiRef}>
              <EmojiPicker
                open={emojiPickerOpen}
                theme="dark"
                searchPlaceHolder="Search Any Emoji"
                onEmojiClick={(selectedEmoji) => {
                  console.log(message);
                  setValue("message", `${message + selectedEmoji.emoji}`);
                }}
                autoFocusSearch={false}
              />
            </div>
          </div>
        </div>
        <button
          className="bg-[#8417ff] rounded-lg flex items-center justify-center p-3 focus:border-none hover:bg-[#741dda] focus:bg-[#741dda] focus:outline-none focus:text-white duration-300 transition-all"
          type="submit"
        >
          {isSubmitting ? (
            <img src={Loading} alt="" className="w-[20px]" />
          ) : (
            <IoSend className="text-2xl" />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageBar;
