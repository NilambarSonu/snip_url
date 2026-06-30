const CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = 62;

// Bijective obfuscation constants to map [0, 56.8 Billion] to pseudo-random codes
const M = 56800235584n;
const P = 35461223123n;
const OFFSET = 28400117792n;

export function encode(num) {
  // Obfuscate the sequential ID to a pseudo-random integer
  let obfuscated = ((BigInt(num) * P) + OFFSET) % M;

  let result = '';
  let n = obfuscated;

  while (n > 0n) {
    result = CHARSET[Number(n % BigInt(BASE))] + result;
    n = n / BigInt(BASE);
  }

  return result.padStart(6, '0');
}

const P_INV = 47100772123n;

export function decode(str) {
  let num = 0n;
  for (const char of str) {
    const index = CHARSET.indexOf(char);
    if (index === -1) throw new Error(`Invalid Base62 character: ${char}`);
    num = num * BigInt(BASE) + BigInt(index);
  }

  // Restore the original sequential ID
  let deobfuscated = (((num - OFFSET + M) % M) * P_INV) % M;
  return Number(deobfuscated);
}
