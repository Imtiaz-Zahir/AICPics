// "use client";
// import { useState, useEffect } from "react";
// import {
//   addToFavoriteList,
//   removeFromFavoriteList,
//   getFavoriteList,
// } from "@/actions/favoriteAction";
// import { useSession } from "next-auth/react";

// type Favorite = {
//   [key: string]: {
//     favoriteID: string;
//     displayImage: string;
//     thumbnailImage: string;
//     prompt: string;
//     height: number;
//     width: number;
//     size: number;
//   } | null;
// };

// export default function useFavorites() {
//   const { data: session } = useSession();
//   const [favorites, setFavorites] = useState<Favorite>({});

//   useEffect(() => {
//     if (!session?.user?.email) {
//       return;
//     }
//     getFavoriteList(session.user.email).then((data) => {
//       const favoriteData = data.reduce((acc: Favorite, favorite) => {
//         const obj = {
//           [favorite.photos.id]: {
//             favoriteID: favorite.id,
//             displayImage: favorite.photos.displayImage,
//             thumbnailImage: favorite.photos.thumbnailImage,
//             prompt: favorite.photos.prompt,
//             height: favorite.photos.height,
//             width: favorite.photos.width,
//             size: favorite.photos.size,
//           },
//         };

//         return { ...acc, ...obj };
//       }, {});
//       setFavorites(favoriteData);
//     });
//   }, [session]);

//   async function addFavorite(imageID: string) {
//     if (!session?.user?.email) {
//       return;
//     }
//     setFavorites((prev) => ({
//       ...prev,
//       [imageID]: null,
//     }));
//     const favorite = await addToFavoriteList(session.user.email, imageID);
//     if (!favorite) {
//       setFavorites((prev) => {
//         const newFavorites = { ...prev };
//         delete newFavorites[imageID];
//         return newFavorites;
//       });
//     } else {
//       setFavorites((prev) => ({
//         ...prev,
//         [imageID]: {
//           favoriteID: favorite.id,
//           displayImage: favorite.photos.displayImage,
//           thumbnailImage: favorite.photos.thumbnailImage,
//           prompt: favorite.photos.prompt,
//           height: favorite.photos.height,
//           width: favorite.photos.width,
//           size: favorite.photos.size,
//         },
//       }));
//     }
//   }

//   async function removeFavorite(imageID: string) {
//     const favoriteImage = favorites[imageID];
//     if (!favoriteImage) return;

//     setFavorites((prev) => {
//       return { ...prev, [imageID]: null };
//     });

//     const favorite = await removeFromFavoriteList(favoriteImage.favoriteID);

//     if (!favorite) {
//       setFavorites((prev) => {
//         return { ...prev, [imageID]: favoriteImage };
//       });
//     } else {
//       setFavorites((prev) => {
//         const newFavorites = { ...prev };
//         delete newFavorites[imageID];
//         return newFavorites;
//       });
//     }
//   }

//   function FavoriteComponent({ imageID }: { imageID: string }) {
//     if (favorites[imageID]) {
//     }
//   }
//   return { favorites, addFavorite, removeFavorite, FavoriteComponent };
// }
