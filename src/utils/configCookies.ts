import { CookieOptions } from "express";
export const configAccessToken : CookieOptions = {
  httpOnly: true,
  path: '/',
  sameSite: 'none',
  secure: true,
  maxAge: 1000 * 60 * 60,
};