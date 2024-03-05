"use client";

import { default as ReactBarcode } from "react-barcode";

type OwnProps = {
  barcode: string;
  displayInvalid?: boolean;
} & Omit<React.ComponentProps<typeof ReactBarcode>, "value">;

const Barcode = ({ barcode, displayInvalid = false, ...rest }: OwnProps) => {
  if (
    (!displayInvalid && ![8, 13].includes(barcode.length)) ||
    ["", null, undefined].includes(barcode)
  )
    return null;

  return (
    <ReactBarcode
      value={barcode}
      format={
        barcode.length === 13
          ? "EAN13"
          : barcode.length === 8
            ? ("EAN8" as "EAN13")
            : undefined
      }
      {...rest}
    />
  );
};

export default Barcode;
