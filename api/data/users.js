import bcrypt from "bcrypt";

const users = [
  {
    username: "admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("12345", 10), //123456 is our curr pass here
    profilePic: "/images/defaultUserImg.jpg",
    isAdmin: true,
  },
  {
    username: "john",
    email: "john@example.com",
    password: bcrypt.hashSync("12345", 10),
    profilePic: "/images/john.jpeg",
    isAdmin: false,
  },
  {
    username: "jane",
    email: "jane@example.com",
    password: bcrypt.hashSync("12345", 10),
    profilePic: "/images/defaultUserImg.jpg",
    isAdmin: false,
  },
];

export default users;
