import { User } from "../models/user.model.js";

const getContacts = async (req, res, next) => {
  try {
    
    const  searchTerm  = req.body.payload;
console.log(searchTerm);

    if (!searchTerm) throw new Error("searchTerm is required");

    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(sanitizedSearchTerm, "i");

    // We don't want the current user to appear as contact of itself:
    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.user._id } },
        { $or: [{ firstName: regex }, { lastName: regex }, { email: regex }] },
      ],
    });
    if (!contacts) throw new Error("No Contact Found!!!");

    return res.status(200).json({ message: "Contact Found", data: contacts });
  } catch (err) {
    next(err);
  }
};

export const contactServices = {
  getContacts,
};
