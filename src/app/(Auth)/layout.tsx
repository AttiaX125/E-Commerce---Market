import AnimationProvider from "@/components/Providers/AnimationProvider";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AnimationProvider>{children}</AnimationProvider>;
}