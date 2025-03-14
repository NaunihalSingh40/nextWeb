import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: [6, "Password should be at least 6 characters long"],
  },
  //   confirmPassword: {
  //     type: String,
  //     required: [true, "Confirm password is required!"],
  //   },
  role: {
    type: String,
    enum: ["customer", "seller", "admin"],
    default: "customer",
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.isPasswordMatch = function (password: string) {
  return bcrypt.compare(password, this.password);
};

// To avoid saving confirmPassword field in DB
// userSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.confirmPassword;
//   return obj;
// };

// export default mongoose.model("User", userSchema);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
