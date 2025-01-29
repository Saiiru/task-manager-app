export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/protected-route", "/auth/login", "/auth/register"],
};
