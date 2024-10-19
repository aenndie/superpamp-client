export default function formatDecimalString(value: string): string {
  if (value === "") {
    return "0";
  }
  // Parse the string to a number
  let num = parseFloat(value);
  if (isNaN(num)) {
    throw new Error("Invalid number string");
  }

  // Special case: if the number is exactly 0, return "0"
  if (num === 0) {
    return "0";
  }

  const DIGITS = 5;
  // Work with absolute value for calculations
  const absValue = Math.abs(num);

  // Find the order of magnitude of the number
  const exponent = Math.floor(Math.log10(absValue));
  const scale = Math.pow(10, exponent - DIGITS + 1); // Scale to retain 3 significant digits

  // Round the number to 3 significant digits
  const roundedValue = Math.round(num / scale) * scale;

  // Convert to a regular decimal string without scientific notation
  let result = parseFloat(roundedValue.toPrecision(DIGITS)).toString();

  // Format the result with thousand separators
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
    useGrouping: true,
  }).format(parseFloat(result));
}
