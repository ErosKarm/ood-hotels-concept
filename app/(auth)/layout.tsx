import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-2 flex-col h-full">
      <div className="flex items-center flex-col justify-center">
        <h1 className="text-3xl font-bold mb-8">Log-in to Admin Dashboard</h1>
        {children}
      </div>

      <div className="h-full w-full bg-rose-500 overflow-hidden relative flex flex-col items-center justify-center">
        <Image
          src="/dash-image.jpg"
          alt="dashboard cover"
          fill
          className="object-cover absolute"
        />
        <h1 className="z-10 text-white text-8xl font-bold text-center">
          ÖÖD-hotels
        </h1>
        <h2 className="flex z-10 text-white text-3xl tracking-wide font-semibold">
          Admin Dashboard
        </h2>
      </div>
    </div>
  );
};
export default AuthLayout;
