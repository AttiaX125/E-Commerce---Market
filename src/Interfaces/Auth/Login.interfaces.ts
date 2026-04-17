export interface LoginUserDataResponse {
  message: string
  user: LoginUser
  token: string
}

export interface LoginUser {
  name: string
  email: string
  role: string
}
export interface LoginFormData {
  email: string;
  password: string;
}
