export default function getIDFromSlag(slag: string) {
    const slagPaces = slag.split("_")
    return slagPaces[slagPaces.length-1];
  }