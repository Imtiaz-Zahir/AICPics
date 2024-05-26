export default function getIDFromSlag(slag: string) {
    const slagPaces = slag.slice(0,-5).split("_")
    return slagPaces[slagPaces.length-1];
  }