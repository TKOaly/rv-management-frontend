import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col space-y-2">
      <Input />
      <Link href={"/admin"}>Admin Login</Link>
    </div>
  );
}
