export default function createURL(prompt: string, id: string) {
  const cleanText = prompt.replace(/[^\w\s]/g, "");
  return cleanText
    .split(/\s+/)
    .slice(0, 10)
    .join("-")
    .toLowerCase()
    .concat(`_${id}`);
}
