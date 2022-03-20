import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../http/userAPI";
import { setUserAction } from "../store/actions/user";
import { RootState } from "../store/redusers";
interface DataChangeInputs {
  name: string;
  files: FileList;
}

const UserDataChange = () => {
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
      alert("Data changed successfully");
    } catch (error: any) {
      alert(error.response.data.message);
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
                : process.env.REACT_APP_API_URL + "avatar.png"
              : ""
          }
        ></img>
        <input {...registerData("files")} type="file" />
        <input type="submit" value={"change"}></input>
      </form>
    </div>
  );
};

export default UserDataChange;
