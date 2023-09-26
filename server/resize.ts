import axios from "axios";
import sharp from "sharp";

export default function resize(url: string, width: number, height: number) {
  try {
    return axios
      .get(url, { responseType: "arraybuffer" })
      .then(async (res) => {
        return await sharp(res.data).resize(width, height,{fit:"contain"}).toBuffer();
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}
