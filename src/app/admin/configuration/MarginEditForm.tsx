"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { useToast } from "@/components/ui/use-toast";
import { hasOwnProperty, isString, merge } from "@/lib/utils";
import { changeMarginAction } from "@/server/actions/margin";
import { useEffect, useMemo, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useFormState } from "react-dom";

const NumberFormatter = new Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
});

export const MarginEditForm = ({ defaultMargin = 0.05 }) => {
  const { toast } = useToast();

  const [localDefaultMargin, setLocalDefaultMargin] = useState(defaultMargin);
  const defaultMarginInt = localDefaultMargin * 100;

  const [margin, setMargin] = useState(defaultMarginInt.toString());
  const touched = useMemo(
    () => Number(margin) !== defaultMarginInt,
    [margin, defaultMarginInt],
  );
  const [approximateSalesValue, setApproximateSalesValue] = useState<
    string | undefined
  >("24760,00");
  const approximateSales = Number(approximateSalesValue?.replace(",", "."));
  const marginPercentage = Number(margin) / 100;

  const marginIncome = approximateSales * marginPercentage;
  const difference = approximateSales * (marginPercentage - defaultMargin);
  const totalIncome = approximateSales * (1 + marginPercentage);

  const [state, changeMargin] = useFormState<
    ReturnType<typeof changeMarginAction>,
    FormData
  >(changeMarginAction, { success: false });

  useEffect(() => {
    if (state.success && state.changedMargin) {
      setLocalDefaultMargin(state.changedMargin);
      toast({
        title: "Default Margin Updated",
        description: `The default margin is now ${state.changedMargin}`,
        duration: 6000,
      });
    }
  }, [state.success, state.changedMargin]);

  useEffect(() => {
    if (state.error) {
      console.log(state.error);
      toast({
        title: "Failed to update margin",
        /* state.error might be an object with a key 'margin' that has an array of errors. It might be something else as well.
        If it is the object, display all messages joined with a comma. */
        description: isString(state.error)
          ? state.error
          : (hasOwnProperty(state.error, "margin") &&
              Array.isArray(state.error.margin) &&
              state.error.margin.join(", ")) ||
            undefined,
        variant: "destructive",
        duration: 6000,
      });
    }
  }, [state.error]);

  return (
    <form className="flex w-max  flex-col gap-2 rounded-lg border-2 p-3">
      <label htmlFor="margin" className="font-semibold">
        Default margin
      </label>
      <input type="hidden" value={marginPercentage} name="margin" id="margin" />
      <Input
        type="number"
        step="1"
        containerClassName="w-[15ch]"
        className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        value={margin}
        onChange={({ target }) => setMargin(target.value)}
        endSlot="%"
        required
      />

      <div className="flex flex-col gap-2">
        <span>Yearly approximates</span>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 opacity-75">
          <span>Purchases</span>
          <span>
            <CurrencyInput
              value={approximateSalesValue}
              onValueChange={(value) => setApproximateSalesValue(value)}
              step={1}
              decimalsLimit={2}
              intlConfig={{ locale: "fi-FI", currency: "EUR" }}
              decimalSeparator=","
              groupSeparator=" "
              className={merge(
                "w-[10ch] rounded-sm border-b-2 transition-colors duration-200 focus:border-stone-950 focus-visible:outline-none",
                Number.isNaN(approximateSales) &&
                  "border-red-400 focus:border-red-700",
              )}
            />
          </span>

          <span>Margin</span>
          <span className={merge(marginIncome < 0 && "text-red-500")}>
            {Number.isNaN(marginIncome)
              ? "-"
              : NumberFormatter.format(marginIncome)}
          </span>

          <span>Difference</span>
          <span
            className={merge(
              difference < 0 && "text-red-500",
              difference > 0 && "text-green-700",
            )}
          >
            {Number.isNaN(difference)
              ? "-"
              : NumberFormatter.format(difference)}
          </span>

          <span>Total income</span>
          <span className={merge(totalIncome < 0 && "text-red-500")}>
            {Number.isNaN(totalIncome)
              ? "-"
              : NumberFormatter.format(totalIncome)}
          </span>
        </div>
      </div>

      <SubmitButton
        id="marginSubmit"
        className="mt-3"
        disabled={!touched}
        formAction={changeMargin}
      >
        Save
      </SubmitButton>
    </form>
  );
};
