import UpdatePasswordForm from "./form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Update Password",
};
export default function Page() {
  return <UpdatePasswordForm />;
}
