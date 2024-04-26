import { sha512 } from 'oslo/crypto';
import { encodeHex } from 'oslo/encoding';

export async function sha256String(text: string) {
  const data = new TextEncoder().encode(text);
  const hash = await sha512(data);
  const hexHash = encodeHex(hash);
  return hexHash;
}
