import Yup from "~/validations/yup";

export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().min(3).max(32).required(),
  newPassword: Yup.string().min(3).max(32).required(),
  newPasswordConfirm: Yup.string()
    .required()
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
