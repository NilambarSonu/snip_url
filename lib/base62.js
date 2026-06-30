const CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = 62;

export function encode(num) {
  if (num === 0) return '0'.padStart(6, '0');

  let result = '';
  let n = BigInt(num);

  while (n > 0n) {
    result = CHARSET[Number(n % BigInt(BASE))] + result;
    n = n / BigInt(BASE);
  }

  // Pad to exactly 6 characters
  return result.padStart(6, '0');
}

export function decode(str) {
  let num = 0n;
  for (const char of str) {
    const index = CHARSET.indexOf(char);
    if (index === -1) throw new Error(`Invalid Base62 character: ${char}`);
    num = num * BigInt(BASE) + BigInt(index);
  }
  return Number(num);
}
