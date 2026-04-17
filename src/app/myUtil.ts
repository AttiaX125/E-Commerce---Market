import { auth } from "@/nextAuth/nextAuth";

export async function getUserToken() {
  const session = await auth();

  return session?.user.credentialToken;
}