import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string) {
  const formattedPrice = Number(price).toLocaleString("es-ES", {
    minimumFractionDigits: 2,
  });

  return formattedPrice;
}
