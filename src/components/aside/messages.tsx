"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
// import { useAuth } from '@/contexts/auth-context';
import { Chat, ChatButton } from "@/components/chat/chat";
import { Conversation } from "@/types/chat";
import { ChatProvider } from "@/contexts/chat-context";
import { Input } from "../ui/input";

// Mock data - replace with actual API calls
const mockCurrentUser = {
  userId: "current-user-id",
  name: "Current User",
  email: "user@example.com",
  profileImage: "/images/user-placeholder.png",
};

const mockConversations: Conversation[] = [
  {
    conversationId: "1",
    participants: [
      mockCurrentUser,
      {
        userId: "other-user-1",
        name: "John Doe",
        profileImage: "/images/user-placeholder.png",
      },
    ],
    lastMessage: {
      messageId: "msg1",
      conversationId: "1",
      senderId: "other-user-1",
      sender: {
        userId: "other-user-1",
        name: "John Doe",
        profileImage: "/images/user-placeholder.png",
      },
      receiverId: "current-user-id",
      content: "Hey there!",
      messageType: "TEXT",
      status: "delivered",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
    },
    unreadCount: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more mock conversations as needed
];

export default function Messages() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  // const { user } = useAuth();
  const user = localStorage.getItem("user");
  // In a real app, you would fetch conversations from your API
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate API call
    const fetchConversations = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/conversations');
        // const data = await response.json();
        // setConversations(data);

        // For now, use mock data
        setConversations(mockConversations);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const filteredConversations = conversations.filter((conversation) => {
    if (!searchQuery) return true;
    const otherUser = conversation.participants.find(
      (p) => p.userId !== user?.id
    );
    return otherUser?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  if (!user) {
    return (
      <div className="main-card flex items-center justify-center h-full">
        <p>Please sign in to view messages</p>
      </div>
    );
  }

  return (
    <ChatProvider userId={user.id}>
      <div className="main-card  flex flex-col h-full">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-xl font-semibold">Messages</h2>
          <button
            onClick={() => setIsChatOpen(true)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Image
              src="/images/pen.png"
              width={24}
              height={24}
              alt="New message"
            />
          </button>
        </div>

        <div className="h-10 mb-4 flex items-center justify-between w-full bg-main-bg px-2 py-3 rounded-full">
          <div className="flex items-center justify-start gap-2 flex-1">
            <Image
              src="/images/search.png"
              width={20}
              height={20}
              className="size-5"
              alt="Search"
            />
            <Input
              placeholder="Search conversations"
              className="w-full bg-transparent border-0 shadow-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <p className="text-gray-500 mb-2">No conversations found</p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="text-primary hover:underline"
            >
              Start a new conversation
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto -mx-2 px-2">
            {filteredConversations.map((conversation) => {
              const otherUser = conversation.participants.find(
                (p) => p.userId !== user.id
              );

              if (!otherUser) return null;

              return (
                <div
                  key={conversation.conversationId}
                  className="flex items-start justify-start gap-3 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => setIsChatOpen(true)}
                >
                  <div className="relative">
                    <Image
                      src={
                        otherUser.profileImage || "/images/user-placeholder.png"
                      }
                      alt={otherUser.name}
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover"
                    />
                    {conversation.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">
                        {otherUser.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {new Date(
                          conversation.lastMessage?.createdAt || Date.now()
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {conversation.lastMessage?.content || "No messages yet"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Chat
        currentUser={{
          userId: user.id,
          name: user.name || "User",
          email: user.email || "",
          profileImage: user.image || "/images/user-placeholder.png",
        }}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </ChatProvider>
  );
}

