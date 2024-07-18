"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_REDIRECT } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  const handleSocialLogin = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_REDIRECT,
    });
  };

  return (
    <Card className="w-[400px] border-4 border-green-400">
      <CardHeader>
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
          <h1 className="text-3xl font-semibold">🔐 Auth</h1>
          <p className="text-muted-foreground text-sm">{headerLabel}</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <div className="flex items-center w-full gap-x-2">
            <Button
              size="lg"
              className="w-full"
              variant="outline"
              onClick={() => handleSocialLogin("google")}
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              <span className="text-base">Google</span>
            </Button>
            <Button
              size="lg"
              className="w-full"
              variant="outline"
              onClick={() => handleSocialLogin("github")}
            >
              <FaGithub className="h-5 w-5 mr-2" />
              <span className="text-base">Github</span>
            </Button>
          </div>
        </CardFooter>
      )}
      <CardFooter>
        <Link
          href={backButtonHref}
          className={cn(
            buttonVariants({
              variant: "link",
              className: "font-medium w-full",
            })
          )}
        >
          {backButtonLabel}
        </Link>
      </CardFooter>
    </Card>
  );
};
