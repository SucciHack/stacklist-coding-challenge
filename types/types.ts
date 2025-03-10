import { Product } from "@prisma/client";

export type QueriesResponse = {
  data: Product[] | null;
  error?: string | null;
};