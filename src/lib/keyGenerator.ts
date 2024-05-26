import { encryptData } from "./hash";

export default async function keyGenerator({
  massageID,
  channelID,
  attachmentID,
  fileName,
  expiresAt,
  issuedAt,
  signature,
}: {
  massageID: string;
  channelID: string;
  attachmentID: string;
  fileName: string;
  expiresAt: string;
  issuedAt: string;
  signature: string;
}) {
  return encryptData(JSON.stringify({
    mid: massageID,
    cid: channelID,
    aid: attachmentID,
    fn: fileName,
    ex: expiresAt,
    is: issuedAt,
    sg: signature
  }));
}
