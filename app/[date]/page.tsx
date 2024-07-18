"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const MainPage = () => {
  const session = useSession();

  return (
    <div>
      {JSON.stringify(session)}
      <Button
        onClick={async () => {
          await signOut({ callbackUrl: "/" });
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default MainPage;
