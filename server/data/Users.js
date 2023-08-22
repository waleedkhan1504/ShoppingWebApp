import bcrypt from "bcrypt";
const users = [
  {
    name: "admin",
    email: "admin@123",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  { name: "lee", email: "lee@123", password: bcrypt.hashSync("12345", 10) },
  { name: "ali", email: "ali@123", password: bcrypt.hashSync("12345", 10) },
];

export default users;
