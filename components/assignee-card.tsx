import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";

interface AssigneeCardProps {
  userId: string;
}

const AssigneeCard: React.FC<AssigneeCardProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, [userId]);

  return (
    <div className="flex flex-row justify-start items-center gap-4">
      <Avatar className="w-7 h-7">
        <AvatarImage src={user?.imageUrl || ""} alt={user?.name} />
        <AvatarFallback>{user?.name}</AvatarFallback>
      </Avatar>
      <h1>{user?.name}</h1>
    </div>
  );
};

export default AssigneeCard;
