"use client";

import { default as ReactBarcode } from "react-barcode";
import validator from "validator";

type OwnProps = {
  barcode: string;
  displayInvalid?: boolean;
} & Omit<React.ComponentProps<typeof ReactBarcode>, "value">;

const Barcode = ({ barcode, displayInvalid = false, ...rest }: OwnProps) => {
  const { isEAN } = validator;

  if (
    (!displayInvalid && !isEAN(barcode)) ||
    ["", null, undefined].includes(barcode)
  )
    return null;

  return (
    <>
      <ReactBarcode
        value={barcode}
        format={
          barcode.length === 13 && isEAN(barcode)
            ? "EAN13"
            : barcode.length === 8 && isEAN(barcode)
              ? ("EAN8" as "EAN13")
              : undefined
        }
        {...rest}
      />
      <span className="sr-only" aria-label="Barcode">
        {barcode}
      </span>
    </>
  );
};

export default Barcode;
