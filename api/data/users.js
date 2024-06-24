import bcrypt from "bcrypt";

const users = [
  {
    username: "john",
    email: "john@example.com",
    password: bcrypt.hashSync("12345", 10),
    profilePic: "/images/john.jpeg",
  },
];

export default users;
