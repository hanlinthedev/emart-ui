"use server";

import { get } from "@/util/fetch";

export const getOrders = async () => {
  return get("order");
};