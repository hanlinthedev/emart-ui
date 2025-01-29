"use server";

import { API_URL } from "@/constants";
import { post } from "@/util/fetch";
import { cookies } from "next/headers";

export const checkoutWithStripe = async (data: any) => {
  const res = await fetch(`${API_URL}/checkout/session`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });
  return res.json();
};

export const checkoutCart = async (data: any) => {
  const body = {
    paymentMethod: data.get("paymentMethod"),
    productList: JSON.parse(data.get("productsList")),
  };

  const res = await post(`checkout`, body);
  if (res.error) {
    return { error: res.error };
  }
  return { error: null };
};