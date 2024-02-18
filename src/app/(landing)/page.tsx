import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link href={"/admin"}>Admin Login</Link>
      </div>
    </main>
  );
}
