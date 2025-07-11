import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, unique: true },
});
categorySchema.index({ user: 1, name: 1 }, { unique: true });
const Category = mongoose.model("Category", categorySchema);
export default Category;
