import Image from "next/image";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center">
      <div className="flex flex-col space-y-4">
        <div className="mb-4 flex flex-col items-center space-y-2">
          <Image
            src={"/rv-logo.png"}
            alt="Ruokavälitys"
            height={48}
            width={200}
          />
          <h1 className="text-4xl font-semibold">Ruokavälitys</h1>
        </div>
        <div className=" flex flex-col items-center rounded-2xl border border-stone-300 bg-white p-8 shadow-xl">
          {children}
        </div>
      </div>
    </main>
  );
}
