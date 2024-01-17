import { atom } from "recoil";

export const userState = atom({
  key: "user_id",
  default: "",
});
