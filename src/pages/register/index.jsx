import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerSchema } from "~/validations";
import Input from "~/components/input";
import { useMutation } from "react-query";
import { registerGoogleService, registerService } from "~/services/auth";
import toast from "react-hot-toast";
import { login } from "~/store/auth/actions";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => registerService(data),
    onSuccess: async (data) => {
      await login(data.data, true);
      navigate("/", { replace: true });
    },
    onError: (error) =>
      toast.error(
        error.data || "Couldn't connect to the server, please try again later.",
      ),
  });

  const googleMutation = useMutation({
    mutationFn: (data) => registerGoogleService(data),
    onSuccess: async (data) => {
      await login(data.data, true);
      navigate("/", { replace: true });
    },
    onError: (error) =>
      toast.error(
        error.data || "Couldn't connect to the server, please try again later.",
      ),
  });

  return (
    <div className="border p-5 rounded-lg flex flex-col gap-y-5 items-center justify-center">
      <h3 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-t from-yellow-900 to-yellow-400">
        Register to Quiz App
      </h3>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        }}
        validationSchema={registerSchema}
        onSubmit={(values) => mutation.mutate(values)}
      >
        <Form className="grid gap-y-4">
          <Input name="email" label="Email: " />
          <Input name="password" type="password" label="Password: " />
          <Input
            name="confirmPassword"
            type="password"
            label="Confirm Password: "
          />
          <div className="text-sm text-black">Terms & Conditions:</div>
          <label className="flex items-center justify-center gap-x-4">
            <Field name="terms" type="checkbox" />
            <p>I agree terms & conditions.</p>
          </label>
          <ErrorMessage
            component="small"
            name="terms"
            className="text-xs text-red-400 mt-1 block"
          />
          <button
            className="px-4 py-2 rounded-lg mt-2 bg-blue-400 text-white hover:bg-blue-600 transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={mutation.isLoading}
          >
            Register
          </button>
        </Form>
      </Formik>
      <div className="w-full flex items-center gap-x-4">
        <div className="flex-1 h-0.5 bg-black/20 rounded-lg" />
        <p className="text-black/50 font-medium italic">OR</p>
        <div className="flex-1 h-0.5 bg-black/20 rounded-lg" />
      </div>
      <GoogleLogin
        onSuccess={(credentialResponse) =>
          googleMutation.mutate({ jwt: credentialResponse.credential })
        }
        onError={() => toast.error("Register failed!")}
      />
    </div>
  );
}
