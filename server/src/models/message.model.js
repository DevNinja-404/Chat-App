import mongoose, { model } from "mongoose";

const messageSchmea = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    messageType: {
      type: String,
      enum: ["text", "file"],
      required: true,
    },
    content: {
      type: String,
      required: function () {
        return this.messageType === "text";
      },
    },
    fileURL: {
      type: String,
      required: function () {
        return this.messageType === "file";
      },
    },
  },
  { timestamps: true }
);

export const Message = new mongoose.model("Message", messageSchmea);
