"use server";

import { get, post } from "@/util/fetch";
import { revalidatePath } from "next/cache";

export const addToCart = async (body: {
  productId: string;
  quantity: number;
  subTotal: number;
}) => {
  const res = await post(`cart`, body);
  if (res.error) {
    return { error: res.error };
  }
  return { error: null };
};

export const getCartItems = async () => {
  return await get("cart");
};

export const removeItemFromCart = async (id: string) => {
  const res = await post(`cart/${id}`, {});
  if (res.error) {
    return { error: res.error };
  }
  revalidatePath("/cart");
  return { error: null };
};

export const getCartCount = async () => {
  return get("cart/cartCount");
};