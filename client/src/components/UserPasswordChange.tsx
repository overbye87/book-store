import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updatePassword } from "../http/userAPI";
interface PasswordChangeInputs {
  oldPassword: string;
  newPassword: string;
}

interface IMessage {
  error: boolean;
  message: string;
}

const UserPasswordChange = () => {
  const [message, setMessage] = useState<IMessage>({
    error: false,
    message: "",
  });
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: errorsPassword, isValid: isValidPassword },
  } = useForm<PasswordChangeInputs>({ mode: "onBlur" });

  // --- PASSWORD CHANGE --- --- ---
  const onSubmitPasswordChange: SubmitHandler<PasswordChangeInputs> = async (
    data
  ) => {
    try {
      const { oldPassword, newPassword } = data;
      const responseUser = await updatePassword(oldPassword, newPassword);
      resetPassword();
      setMessage({ error: false, message: "Password changed successfully" });
    } catch (error: any) {
      setMessage({ error: true, message: `${error.response.data.message}` });
    }
  };
  return (
    <div className="column">
      <h3>Change user password</h3>
      <form key={2} onSubmit={handleSubmitPassword(onSubmitPasswordChange)}>
        <label>Old password:</label>
        <input
          type="password"
          {...registerPassword("oldPassword", {
            required: 'Field "old password" cannot be empty',
          })}
        ></input>
        <label>New password:</label>
        <input
          type="password"
          {...registerPassword("newPassword", {
            required: 'Field "new password" cannot be empty',
          })}
        ></input>
        <p className={message.error ? "info info--error" : "info"}>
          {message.message}
        </p>
        <input type="submit" value={"change"}></input>
      </form>
    </div>
  );
};

export default UserPasswordChange;
