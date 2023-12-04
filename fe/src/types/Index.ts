import { Like } from "./like.type";
import { Message } from "./message";
import { Friend, User } from "./user.type";

export type NotificationType = {
    id?: number,
    message: string,
    description: string,
    type:StyleNotification
  }

export type StyleNotification = "success" | "error" | "warning" | "loading";

export interface Input{
  content: string;
  files: File[];
}

export interface SignalRRes{
  type:number,
  data: Notification | Message
}

export interface Notification{
  id: number;
  idObj: number;
  createdDate: string;
  type: number;
  from: User;
  fromId: number;
  to: User;
  toId: number;

}
export interface VeryForgotPassword{
  otp:string;
  passsword: string;
}