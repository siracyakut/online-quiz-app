import Yup from "~/validations/yup";

export const registerSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(3).max(32).required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match"),
  terms: Yup.boolean()
    .required("You need to agree terms & conditions.")
    .oneOf([true], "You need to agree terms & conditions."),
});
