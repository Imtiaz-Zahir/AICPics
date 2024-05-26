import crypto from "crypto";

const secret_key = process.env.SECRET_KEY as string;
const secret_iv = process.env.SECRET_IV as string;

if (!secret_key || !secret_iv) {
  throw new Error("secretKey and secretIV are required");
}

const key = crypto.createHash("sha256").update(secret_key).digest();

// Generate a 16-byte IV from the secret_iv
const encryptionIV = crypto
  .createHash("sha256")
  .update(secret_iv)
  .digest()
  .slice(0, 16);

// Encrypt data
export function encryptData(data: string) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, encryptionIV);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return Buffer.from(encrypted, "hex").toString("base64"); // Encrypts data and converts to base64
}

export function decryptKey(encryptedData: string) {
  const encryptedBuffer = Buffer.from(encryptedData, "base64").toString("hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, encryptionIV);
  let decrypted = decipher.update(encryptedBuffer, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted) as {
    mid: string;
    cid: string;
    aid: string;
    fn: string;
    ex: string;
    is: string;
    sg: string;
  }
}