import { useEffect, useState } from "react";
import ChatRepository, { Chat } from "../../repository/ChatRepository";

interface ChatRoomItemProps {
  roomId: number;
  reportedUserId: number;
}

export default function ChatRoomItem({
  roomId,
  reportedUserId,
}: ChatRoomItemProps) {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    ChatRepository.getChats(roomId)
      .then((data) => setChats(data))
      .catch((error) => console.error("Error fetching chats", error));
  }, [roomId]);

  return (
    <div className="max-w-4xl mx-auto p-4 border rounded-xl">
      <div className="h-[400px] overflow-y-auto flex flex-col space-y-4">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex ${
              chat.senderId === reportedUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs break-words ${
                chat.senderId === reportedUserId
                  ? "bg-primary text-white"
                  : "bg-gray-500 text-white"
              }`}
            >
              {chat.type === "TALK" ? (
                <p>{chat.message}</p>
              ) : (
                <img
                  src={chat.message}
                  alt="채팅 이미지"
                  className="w-full h-auto rounded"
                />
              )}
              <div className="text-xs text-white mt-1">
                {new Date(chat.createdDate).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
