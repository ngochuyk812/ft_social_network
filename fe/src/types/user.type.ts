import { MediaType } from "./mediaType.type";

export interface UserData {
    username: string;
    refreshToken?: string;
    accessToken?: string;
    fullName?: string;
    birthDay?: string;
    email?: string;
    address?: string;
    avatar?: string;
    banner?: string;
    story?: string;
    id:number;
  }


export interface LoginType{
    username: string,
    password: string
}

export interface User {
  id: number;
  username: string;
  fullName: string;
  birthDay: string;
  email: string;
  address: string | null;
  avatar?: string;
  banner?: string;
  story: string | null;
  status: number;
  createdDate: string;
  friend?: Friend;
}

export interface Friend{
  userRequest: User;
  userAccept: User;
  userAcceptId: number;
  userRequestId: number;
  status: number;
}

export interface UpdateProfile{
  avatar: File | null,
  banner: File | null,
  fullName: string,
  passwordNew: string | null,
  story: string
}