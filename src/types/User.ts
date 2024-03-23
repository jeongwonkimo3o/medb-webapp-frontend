export interface User {
  id: number;
  nickname: string;
  email: string;
  email_verified_at: string | null;
  verification_token: string;
  grade: string;
  is_admin: number;
  created_at: string;
  updated_at: string;
}
