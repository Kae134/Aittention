// Instance partagée upfetch pour des requêtes HTTP robustes dans toute l'application.
// Configurez les tentatives, le délai entre tentatives et d'autres options ici si nécessaire.
// Exemple:
// export const upfetch = up(fetch, { retries: 3, retryDelay: 1000 });

import { up } from "up-fetch";
import env from "./env";

export const upfetch = up(fetch, () => ({
  baseUrl: env.NEXT_PUBLIC_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      typeof window !== "undefined" ? localStorage.getItem("token") || "" : "",
  },
}));
