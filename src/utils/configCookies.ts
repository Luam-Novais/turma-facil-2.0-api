import { CookieOptions } from "express";
export const configAccessToken : CookieOptions = {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  maxAge: 1000 * 60 * 60,
};