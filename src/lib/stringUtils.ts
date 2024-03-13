export const stringToCamelcase = (str: string) =>
  str
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (substr, idx) {
      return idx === 0 ? substr.toLowerCase() : substr.toUpperCase();
    })
    .replace(/\s+/g, "");
