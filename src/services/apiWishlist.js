import api from "./axios";

export async function getWishlist() {
  const res = await api.get("/wishlist");
  return res.data;
}
