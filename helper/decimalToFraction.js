function decimalToFraction(decimal) {
  if (decimal === 0) return "0";

  if (decimal >= 1) return String(decimal);

  let numerator = decimal;
  let denominator = 1;

  while (numerator % 1 !== 0) {
    numerator *= 10;
    denominator *= 10;
  }

  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;

  return denominator === 1 ? String(numerator) : `${numerator}/${denominator}`;
}

export default decimalToFraction;
