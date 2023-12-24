import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useQuery } from "react-query";
import { checkAuthService } from "~/services/auth";
import { login, logout } from "~/store/auth/actions";
import Loading from "~/components/loading";
import { useAuth } from "~/store/auth/hooks";
import AdminHeader from "~/layouts/admin/header";
import Footer from "~/layouts/main/footer";

export default function AdminLayout() {
  const [isOk, setIsOk] = useState(false);
  const { admin } = useAuth();
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
    admin ? (
      <div className="w-full h-full flex flex-col container mx-auto">
        <AdminHeader />
        <div className="flex-1 mb-7">
          <Outlet />
        </div>
        <Footer />
        <Toaster />
      </div>
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Loading />
  );
}
