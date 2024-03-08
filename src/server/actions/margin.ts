"use server";

import { z } from "zod";
import { changeMargin } from "../requests/globalMarginRequests";

export async function changeMarginAction(
  _prevState: unknown,
  formData: FormData,
): Promise<{
  success: boolean;
  changedMargin?: number;
  error?: { margin?: string[] | undefined } | null | string;
}> {
  const { margin } = Object.fromEntries(formData.entries());

  const data = {
    margin: Number(margin),
  };

  const validatedData = z
    .object({
      margin: z.number().nonnegative(),
    })
    .required()
    .safeParse(data);

  if (!validatedData.success) {
    console.error(validatedData.error);
    return {
      success: false,
      error: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    const changedMargin = await changeMargin(validatedData.data.margin);

    return {
      success: true,
      error: null,
      changedMargin,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "The server returned an unexpected error.",
    };
  }
}
