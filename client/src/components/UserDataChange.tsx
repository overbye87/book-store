import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_AVATAR_FILENAME, DEFAULT_AVATAR_URL } from "../constants";
import { updateUser } from "../http/userAPI";
import { setUserAction } from "../store/actions/user";
import { RootState } from "../store/redusers";
interface DataChangeInputs {
  name: string;
  files: FileList;
}

interface IMessage {
  error: boolean;
  message: string;
}

const UserDataChange = () => {
  const [message, setMessage] = useState<IMessage>({
    error: false,
    message: "",
  });
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: RootState) => state.user);
  const {
    register: registerData,
    setValue: setValueData,
    handleSubmit: handleSubmitData,
    reset: resetData,
    formState: { errors: errorsData, isValid: isValidData },
  } = useForm<DataChangeInputs>({ mode: "onBlur" });

  // --- DATA CHANGE --- --- ---
  const onSubmitDataChange: SubmitHandler<DataChangeInputs> = async (data) => {
    try {
      const { name, files } = data;
      const responseUser = await updateUser(name, files[0]);
      dispatch(setUserAction(responseUser));
      console.log(files[0]);
      //resetData();
      setMessage({ error: false, message: "Data changed successfully" });
    } catch (error: any) {
      setMessage({ error: true, message: `${error.response.data.message}` });
    }
  };
  return (
    <div className="column">
      <h3>Change user data</h3>
      <form key={1} onSubmit={handleSubmitData(onSubmitDataChange)}>
        <label>Name:</label>
        <input
          defaultValue={user ? user.name : ""}
          {...registerData("name", {
            required: 'Field "name" cannot be empty',
          })}
        ></input>
        <label>Avatar:</label>
        <img
          width={200}
          src={
            user
              ? user.img
                ? process.env.REACT_APP_API_URL + user.img
                : DEFAULT_AVATAR_URL
              : ""
          }
        ></img>
        <input {...registerData("files")} type="file" />
        <p className={message.error ? "info info--error" : "info"}>
          {message.message}
        </p>
        <input type="submit" value={"change"}></input>
      </form>
    </div>
  );
};

export default UserDataChange;
