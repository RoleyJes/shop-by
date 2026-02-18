import api from "./axios";

export async function getWishlist() {
  const res = await api.get("/wishlist");
  return res.data.data;
}

export async function addToWishlist(payload) {
  const res = await api.post("/wishlist/add", payload);
  return res.data;
}

export async function deleteFromWishlist(id) {
  const res = await api.delete(`/wishlist/${id}`, { product_id: id });
  return res.data;
}
