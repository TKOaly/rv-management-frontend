const stringToCents = (string: string) => {
  const matchResult = string.match(/^(-?)(\d+)([.,](\d{2}))?$/);

  if (matchResult) {
    const sign = matchResult[1];
    const integerPart = matchResult[2];
    let fractionalPart = matchResult[4];

    if (fractionalPart === undefined) {
      fractionalPart = "0";
    }

    let cents = parseInt(integerPart, 10) * 100 + parseInt(fractionalPart, 10);
    if (sign === "-") {
      cents *= -1;
    }
    return cents;
  } else {
    return NaN;
  }
};

const centsToString = (cents: number) => {
  const sign = cents < 0 ? "-" : "";
  const integerPart = Math.abs(Math.trunc(cents / 100)).toString();
  const fractionalPart = Math.abs(cents % 100)
    .toString()
    .padStart(2, "0");

  return sign + integerPart + "." + fractionalPart;
};

const applyMarginPercent = (money: number, marginPercent: number) => {
  return Math.round(money * ((100 + marginPercent) / 100));
};

export const currencyFormatter = Intl.NumberFormat("fi-FI", {
  style: "currency",
  currency: "EUR",
});

export default {
  stringToCents,
  centsToString,
  applyMarginPercent,
};
