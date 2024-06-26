import { Schema, model } from "mongoose";

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model("Customer", CustomerSchema);
