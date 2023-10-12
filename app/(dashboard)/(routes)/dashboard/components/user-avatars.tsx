'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UserAvatar = () => {
    const { data: users } = useQuery(["users"], async () => {
        const res = await axios.get("/api/users");
        return res.data;
    });

    return (
        <div className="flex flex-row">
            {users?.map((user: User, index: number) => (
                <div key={user.id} className={`relative ${index !== 0 ? 'ml-[-7px]' : ''}`}>
                    <Avatar className="w-6 h-6">
                        <AvatarImage src={user.imageUrl || ""} alt={user.name} />
                        <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                </div>
            ))}
        </div>
    );
};

export default UserAvatar;