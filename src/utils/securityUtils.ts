// One-way cryptographic hashing for secure Admin authentication
// The plaintext password is NEVER stored in GitHub repository or source code!

export const DEFAULT_ADMIN_HASH = '6482e4114a6debf3f93131c11b7699dbc09c4bde64f79c7d77f7761533e96035';

/**
 * Computes SHA-256 hash of a string using Web Crypto API
 */
export async function sha256(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verifies entered password against the SHA-256 hash
 */
export async function verifyAdminPassword(
  enteredPassword: string,
  targetHash?: string
): Promise<boolean> {
  const trimmed = enteredPassword.trim();
  if (!trimmed) return false;

  const enteredHash = await sha256(trimmed);
  
  // Environment variable override if set
  const envHash = (import.meta as any).env?.VITE_ADMIN_PASSWORD_HASH;
  const validHash = targetHash || envHash || DEFAULT_ADMIN_HASH;

  return enteredHash === validHash;
}
