import { z } from "zod";
export const feeBillingSchema = z.object({
  amount: z.coerce
    .number()
    .min(1, { message: "Amount must be at least 1 rupees" }),
  payer: z.string().optional(),
  methodOfPayment: z.enum(["cash", "digital"]),
  remarks: z.string().max(32).optional(),
});
