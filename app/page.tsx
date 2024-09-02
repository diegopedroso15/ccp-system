"use client";
import { useRouter } from "next/navigation";

export default function EmptyScreen() {
  const router = useRouter();

  function redirect() {
    router.push("/login");
  }
  redirect();
  return null;
}
