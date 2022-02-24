import { $host } from "./index";
import jwt_decode from "jwt-decode";

// --- REGISTRATION --- --- ---
export const registration = async (
  email: string,
  password: string,
  name: string
) => {
  const response = await $host.post("api/user/registration", {
    email,
    password,
    name,
    role: "ADMIN",
  });
  localStorage.setItem("accessToken", response.data.token);
  const { data } = response;
  const token_decode: any = jwt_decode(data.token);
  return token_decode.user;
};

// --- LOGIN --- --- ---
export const login = async (email: string, password: string) => {
  const response = await $host.post("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("accessToken", response.data.token);
  const { data } = response;
  const token_decode: any = jwt_decode(data.token);
  return token_decode.user;
};

// --- CHECK --- --- ---
export const check = async () => {
  const response = await $host.get("api/user/auth");
  const { data } = response;
  const token_decode: any = jwt_decode(data.token);
  return token_decode.user;
};

// --- UPDATE PASSWORD --- --- ---
export const updatePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  console.log(oldPassword, newPassword);

  const reqData = new FormData();
  reqData.append("oldPassword", oldPassword);
  reqData.append("newPassword", newPassword);
  const response = await $host.put("api/user/updatepassword", reqData);

  console.log(response);
  localStorage.setItem("accessToken", response.data.token);
  const { data } = response;
  const token_decode: any = jwt_decode(data.token);
  return token_decode.user;
};

// --- UPDATE USER DATA --- --- ---
export const updateUser = async (name: string, file: File) => {
  console.log(file);
  const reqData = new FormData();
  reqData.append("name", name);
  reqData.append("file", file);
  const response = await $host.put("api/user/update", reqData);
  localStorage.setItem("accessToken", response.data.token);
  const { data } = response;
  const token_decode: any = jwt_decode(data.token);
  return token_decode.user;
};
