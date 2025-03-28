import API from "./API";

export interface Chat {
  id: number;
  senderId: number;
  type: "TALK" | "IMAGE";
  message: string;
  createdDate: string;
}

class ChatRepository {
  async getChats(roomId: number): Promise<Chat[]> {
    const { data } = await API.get(`/admin/chatroom/${roomId}/chats`);
    return data;
  }
}

export default new ChatRepository();
