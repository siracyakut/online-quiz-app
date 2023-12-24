import { Form, Formik } from "formik";
import Input from "~/components/input";
import { loginSchema } from "~/validations";
import { useMutation } from "react-query";
import { loginGoogleService, loginService } from "~/services/auth";
import toast from "react-hot-toast";
import { login } from "~/store/auth/actions";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (data) => loginService(data),
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
    mutationFn: (data) => loginGoogleService(data),
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
        Login to Your Account
      </h3>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => loginMutation.mutate(values)}
      >
        <Form className="grid gap-y-4">
          <Input name="email" label="Email: " />
          <Input name="password" variant="pass" label="Password: " />
          <button
            className="px-4 py-2 rounded-lg mt-2 bg-blue-400 text-white hover:bg-blue-600 transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={loginMutation.isLoading}
          >
            Login
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
        onError={() => toast.error("Login failed!")}
      />
    </div>
  );
}
