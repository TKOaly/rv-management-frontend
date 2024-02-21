"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";
import { useFormState } from "react-dom";
import { authenticate } from "../../server/login";

export default function Login() {
  const [errorMessage, login] = useFormState(authenticate, undefined);

  return (
    <form action={login} className="flex flex-col gap-y-3">
      <div>
        <label htmlFor="username" className="text-sm text-stone-700">
          Username
        </label>
        <Input
          id="username"
          name="username"
          placeholder="Enter username..."
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm text-stone-700">
          Password
        </label>
        <Input
          id="username"
          name="password"
          type="password"
          placeholder="Enter password..."
          required
        />
      </div>
      <Button type="submit" className="mt-3">
        Login
      </Button>
      {errorMessage && (
        <div className="mt-3 flex space-x-2">
          <AlertTriangle className="text-red-500" />
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
