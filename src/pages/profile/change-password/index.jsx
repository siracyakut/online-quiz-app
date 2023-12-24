import { changePasswordSchema } from "~/validations";
import { Form, Formik } from "formik";
import Input from "~/components/input";
import { useAuth } from "~/store/auth/hooks";
import { useMutation } from "react-query";
import { changePasswordService } from "~/services/auth";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const { email } = useAuth();

  const mutation = useMutation({
    mutationFn: (data) => changePasswordService(data),
    onSuccess: () => toast.success("Your password has successfully updated!"),
    onError: (error) =>
      toast.error(
        error.data ||
          "An error occured while updating your password, try again later.",
      ),
  });

  const handleSubmit = (values, formikHelpers) => {
    mutation.mutate({
      email,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmNewPassword: values.newPasswordConfirm,
    });
    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        newPasswordConfirm: "",
      }}
      validationSchema={changePasswordSchema}
      onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
    >
      <Form className="grid gap-3.5 border p-5 rounded-md">
        <Input label="Old Password:" name="oldPassword" variant="pass" />
        <Input label="New Password:" name="newPassword" variant="pass" />
        <Input
          label="Confirm New Password:"
          name="newPasswordConfirm"
          variant="pass"
        />
        <button
          className="px-4 py-2 rounded-lg mt-2 bg-blue-400 text-white hover:bg-blue-600 transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={mutation.isLoading}
        >
          Change Password
        </button>
      </Form>
    </Formik>
  );
}
