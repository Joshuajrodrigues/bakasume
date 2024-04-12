import { AppSwitch } from "@/components/elements/appSwitch";
import { TypographyH1 } from "@/components/typography/typographyH1";

export default function Home() {
  return (
    <main className="m-2 flex flex-col justify-start items-center w-max-full min-h-svh">
      <TypographyH1>
        BAKASUME
      </TypographyH1>
      <AppSwitch />
    </main>
  );
}


