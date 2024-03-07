"use client";

import { SubmitButton } from "@/components/ui/submit-button";
import { Input } from "@/components/ui/input";
import { nextFieldOnEnter } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { useFormState } from "react-dom";
import { authenticate } from "../../server/requests/login";

export default function Login() {
  const [errorMessage, login] = useFormState(authenticate, undefined);

  return (
    <form action={login} className="flex flex-col gap-y-3">
      <div onKeyDown={nextFieldOnEnter}>
        <label htmlFor="username" className="text-sm text-stone-700">
          Username
        </label>
        <Input
          id="username"
          name="username"
          placeholder="Enter username..."
          required
          data-next="password"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm text-stone-700">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter password..."
          required
        />
      </div>
      <SubmitButton id="loginSubmit" className="mt-3">
        Log in
      </SubmitButton>
      {errorMessage && (
        <div className="mt-3 flex space-x-2">
          <AlertTriangle className="text-red-500" />
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
