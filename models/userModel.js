const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.statics.register = async function (username, email, password) {
  if (!username || !email || !password) throw Error("Semua field harus diisi");
  if (!validator.isEmail(email)) throw Error("Email tidak valid");
  if (!validator.isStrongPassword(password)) throw Error("Password harus mengandung minimal 8 karakter, 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 simbol");
  const exist = await this.findOne({ email });
  if (exist) throw Error("Email sudah terdaftar");
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });
  return user;
};

// Compare password
userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("Semua field harus diisi");
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email tidak ditemukan");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("Password salah");
  return user;
};

module.exports = mongoose.model("User", userSchema);
