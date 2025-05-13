import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: {type: String, unique: true},
  password: String
});

userSchema.statics.hashPassword = clearPassword => bcrypt.hash(clearPassword, 9);

userSchema.methods.comparePassword = function (clearPassword) {
  return bcrypt.compare(clearPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;