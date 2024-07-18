"use client";

import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect } from "react";
import { newVerification } from "@/actions/auth";
import { toast } from "sonner";
import { CardWrapper } from "../card-wrapper";

const NewVerificationPage = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const token = searchParams.token;
  const router = useRouter();

  const onSubmit = useCallback(() => {
    if (!token) return;

    newVerification(token)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.success!);
          router.push("/login");
        }
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  }, [token, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/sign-in"
    >
      <div className="flex items-center w-full justify-center">
        <BeatLoader color="#52a447" />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationPage;
