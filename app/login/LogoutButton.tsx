"use client";

import { logout } from "@/app/login/actions";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button
      className="whitespace-nowrap rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 dark:bg-[linear-gradient(135deg,#5d67e3_0%,#8b5cf6_100%)] dark:text-white"
      variant="outline"
      aria-label="Submit"
      onClick={() => logout()}
    >
      Logout
    </Button>
  );
}
