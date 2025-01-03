"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Homepage from "./Homepage/page"; 
export default function Component() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <div className="flex flex-row justify-between">
          <p>Signed in as {session?.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
        <div>
          <Homepage />
        </div>
      </div>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in with GitHub</button>
    </>
  );
}
