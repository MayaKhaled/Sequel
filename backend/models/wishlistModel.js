const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  list: [
    {
      title: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      genre: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
});

mongoose.models = {};
listSchema.set("toJSON", { virtuals: true });
listSchema.set("toObject", { virtuals: true });
const User = mongoose.model("List", listSchema);
module.exports = User;
