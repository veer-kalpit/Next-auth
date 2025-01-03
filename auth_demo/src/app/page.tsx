"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Homepage from "./Homepage/page";

export default function AuthComponent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="mt-8 w-full">
        <Homepage />
      </div>
    );
  }

  // Redirect to Login page
  router.push("/Login");
  return null; // Return null to prevent rendering during redirection
}
