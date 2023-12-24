import ChangePassword from "~/pages/profile/change-password";
import Stats from "~/pages/profile/stats";

export default function Profile() {
  return (
    <div className="p-5 border rounded-lg flex flex-col items-center justify-center gap-5">
      <Stats />
      <ChangePassword />
    </div>
  );
}
