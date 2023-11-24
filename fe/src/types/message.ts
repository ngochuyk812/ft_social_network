import { MediaType } from "./mediaType.type";
import { Pagination } from "./post.type";
import { User } from "./user.type";

export type MessageCreate = {
  message:string, room : number, medias:File[]
}

export interface Participant{
  id: number;
  roomId: number;
  userId: number;
  user: User;
  createDate: string;
}
export interface Message{
  id:number;
  roomId: number;
  userId: number;
  status: number;
  user: User;
  mediaMessages: MediaType[]; 
  createdDate : string
}
export interface Room{
  id: number;
  name?:string;
  type: number;
  participants: Participant[];
  messages: Message[]
}

export interface PaginationMessage extends Pagination {
  data: Message[];
}