export const findOrdinalNumber = (number, onlySuffix = false) => {
  if (typeof number !== "number" || isNaN(number)) {
    return null;
  }

  const lastDigit = number % 10;
  let suffix;

  if (number >= 11 && number <= 13) {
    suffix = "th";
  } else {
    switch (lastDigit) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;
      default:
        suffix = "th";
    }
  }

  return onlySuffix ? suffix : number + suffix;
};
