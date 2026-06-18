export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}