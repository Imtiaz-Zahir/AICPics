// export function imageURLGenerator({
//   id,
//   prompt,
//   key,
//   width,
//   height,
// }: {
//   id: string;
//   key: string;
//   prompt: string;
//   width?: number;
//   height?: number;
// }) {
//   const url =
//     "https://d280om8rayd0ye.cloudfront.net/" +
//     slugGenerator(prompt, id, true) +
//     "?key=" +
//     key +
//     (width && height ? `&width=${width}&height=${height}` : "&og=true");
//   return url;
// }

export function slugGenerator(prompt: string, id: string, width?: number) {
  const cleanText = prompt.replace(/[^\w\s]/g, "");
  return cleanText
    .split(/\s+/)
    .slice(0, 7)
    .join("-")
    .toLowerCase()
    .concat(`_${id}${width ? ".webp?width:" + width : ".html"}`);
}
