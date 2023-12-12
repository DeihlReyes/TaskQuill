import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";

interface AssigneeCardProps {
  userId: string;
}

const AssigneeCard: React.FC<AssigneeCardProps> = ({ userId }) => {
  const [user, setUser] = useState<any>(null);

  const users = async () => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      const userData = await response.data;
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  users();

  return (
    <div className="flex flex-row justify-start items-center gap-4">
      {user && (
        <Avatar className="w-7 h-7">
          <AvatarImage src={user.imageUrl || ""} alt={user.name} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      )}
      <h1>{user?.name}</h1>
    </div>
  );
};

export default AssigneeCard;
