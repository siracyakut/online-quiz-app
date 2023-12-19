import { Outlet } from "react-router-dom";
import Header from "~/layouts/main/header";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { checkAuthService } from "~/services/auth";
import { login, logout } from "~/store/auth/actions";
import Loading from "~/components/loading";

export default function MainLayout() {
  const [isOk, setIsOk] = useState(false);
  const { data, error, isLoading } = useQuery(["userAuth"], () =>
    checkAuthService(),
  );

  useEffect(() => {
    if (!isLoading) {
      if (!error) {
        login(data.data);
      } else {
        logout();
      }
      setIsOk(true);
    }
  }, [isLoading]);

  return isOk ? (
    <div className="w-full h-full flex flex-col container mx-auto">
      <Header />
      <div className="flex-1 mb-7">
        <Outlet />
      </div>
      <Toaster />
    </div>
  ) : (
    <Loading />
  );
}
