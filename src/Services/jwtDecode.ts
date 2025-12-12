import { jwtDecode } from "jwt-decode";

interface TokenData {
  Name: string;
  RoleId: number;
  BankId: number;
  DistrictId: number;
  exp: number;
}

export const parseToken = (token: string): TokenData => {
  return jwtDecode<TokenData>(token);
};