import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, "Username must be at least 3 characters long."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email address."],
  },
  password: {
    type: string,
    required: true,
    minLength: [8, "Password must be at least 8 characters long."],
    select: false,
  },

  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password."],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match.",
    },
  },
  passwordChangeAt: Date,
  passwordResteToken: String,
  passwordResteTokenExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcryptjs.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcryptjs.compare(enteredPassword, this.password);
};

const user = mongoose.model("user", userSchema);

export default user;
