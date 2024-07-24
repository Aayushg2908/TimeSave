import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Features, WithTimeSave, WithoutTimeSave } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="mt-10 flex flex-col gap-y-8 items-center mb-10">
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-center tracking-tighter">
        10x your productivity and <br />✨ stress less ✨
      </h1>
      <p className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tighter text-green-600 text-center">
        By structuring your day into hourly blocks
      </p>
      <div className="flex flex-col gap-y-4">
        {Features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-x-3 text-base sm:text-xl font-medium"
          >
            <CheckIcon className="size-7 text-green-500" />
            <span>{feature.title}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-y-2 items-center">
        <Link
          href="/today"
          className={cn(
            buttonVariants({
              size: "xl",
            })
          )}
        >
          Start TimeSaving
        </Link>
        <p className="text-sm text-neutral-500">No Credit Card Required</p>
      </div>
      <div className="max-w-[1000px] w-full p-[10px] bg-gray-200 h-[400px] sm:h-[700px] rounded-xl drop-shadow-xl">
        <Image
          src="/showcase.png"
          alt="showcase-image"
          width={1500}
          height={1000}
          className="w-full h-full rounded-md"
        />
      </div>
      <h1 className="text-3xl md:text-5xl text-center font-bold tracking-tighter mt-6">
        Tired of your day <span className="text-red-500">controlling you?</span>
      </h1>
      <div className="flex flex-col md:flex-row gap-12 px-2 mt-2">
        <Card className="w-full sm:w-[350px] border-4 border-red-400 rounded-md drop-shadow-xl">
          <CardContent className="flex flex-col gap-y-4 p-4 text-red-500 bg-red-100">
            <h1 className="text-2xl font-bold">Without TimeSave 😭</h1>
            {WithoutTimeSave.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-x-3 text-lg tracking-tight font-semibold"
              >
                <Cross1Icon className="size-5 text-red-500" />
                <span>{feature.title}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="w-full sm:w-[350px] border-4 border-green-400 rounded-md drop-shadow-xl">
          <CardContent className="flex flex-col gap-y-4 p-4 text-green-500 bg-green-100">
            <h1 className="text-2xl font-bold">With TimeSave 😁</h1>
            {WithTimeSave.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-x-3 text-lg tracking-tight font-semibold"
              >
                <CheckIcon className="size-5 text-green-500" />
                <span>{feature.title}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LandingPage;
