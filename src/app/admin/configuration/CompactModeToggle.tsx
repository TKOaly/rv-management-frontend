"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { compactModeAtom } from "@/lib/localSettings";
import { useAtom } from "jotai";

export const CompactModeToggle = () => {
  const [compactMode, setCompactMode] = useAtom(compactModeAtom);

  return (
    <form>
      <Card className="w-96">
        <CardHeader>
          <CardTitle>
            Compact Mode{" "}
            <span className="text-md font-normal text-stone-400">
              - local setting
            </span>
          </CardTitle>
          <CardDescription className="flex flex-col">
            <span>Toggles between compact and spacious user interface.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-x-2">
            <Checkbox
              id="compactMode"
              checked={compactMode}
              onClick={() => setCompactMode(!compactMode)}
            />
            <label htmlFor="compactMode" className="cursor-pointer">
              Enable compact mode{" "}
            </label>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
