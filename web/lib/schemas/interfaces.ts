export interface LoginDto {
  email: string;
  password: string;
  remember_me: boolean;
  is_mobile?: false;
}
