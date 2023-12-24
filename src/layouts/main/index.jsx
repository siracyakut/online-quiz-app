import { Outlet } from "react-router-dom";
import Header from "~/layouts/main/header";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useQuery } from "react-query";
import { checkAuthService } from "~/services/auth";
import { login, logout } from "~/store/auth/actions";
import Loading from "~/components/loading";
import Footer from "~/layouts/main/footer";

export default function MainLayout() {
  const [isOk, setIsOk] = useState(false);
  const { isFetching } = useQuery(["userAuth"], () => checkAuthService(), {
    onSuccess: async (data) => {
      await login(data.data, false);
      setIsOk(true);
    },
    onError: () => {
      logout();
      setIsOk(true);
    },
  });

  return !isFetching && isOk ? (
    <div className="w-full h-full flex flex-col container mx-auto">
      <Header />
      <div className="flex-1 mb-7">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  ) : (
    <Loading />
  );
}
