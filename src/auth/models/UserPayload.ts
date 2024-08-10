export interface UserPayload {
  sub: number;
  email: string;
  user_name: string;
  iat?: number;
  exp?: number;
}
