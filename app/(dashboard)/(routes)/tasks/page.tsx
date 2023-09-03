'use client'

import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { DataTable } from "@/components/table-components/data-table";
import { columns } from "@/components/table-components/columns";
import { useModal } from "@/hooks/use-modal";
import tasks from "@/components/table-components/data/seed";
  

const projects = [
    {
        "Name": "SecureSign",
        "Description": "SecureSign is an AI-powered solution designed to automate the detection of forged signatures in documents. By combining image processing techniques and machine learning algorithms, this system enhances document security and authenticity.",
        "TasksCount": 8
    },
    {
        "Name": "SignaSure",
        "Description": "SignaSure is a comprehensive framework that leverages deep learning and image analysis to authenticate signatures and prevent forgery. This project aims to address the challenges associated with document security and fraudulent practices.",
        "TasksCount": 10
    },
    {
        "Name": "ForgeryAI",
        "Description": "ForgeryAI is an innovative project that harnesses the power of deep learning for accurate signature forgery detection. By analyzing patterns and features in signature images, this system contributes to the fight against document fraud.",
        "TasksCount": 7
    },
    {
        "Name": "AutoDetectSig",
        "Description": "AutoDetectSig is a data-driven approach to automated signature forgery detection. By combining machine learning techniques and feature extraction from signature images, this project aims to develop a reliable authentication system.",
        "TasksCount": 9
    },
    {
        "Name": "GuardianSign",
        "Description": "GuardianSign is a project that focuses on building a robust signature forgery detection and prevention system. Through the integration of AI algorithms and advanced image analysis, this system enhances document security.",
        "TasksCount": 11
    },
    {
        "Name": "VeriSig",
        "Description": "VeriSig is an integrated solution that combines machine learning and image processing techniques to ensure the authenticity of signatures. By addressing the challenges of document fraud, this project contributes to secure transactions and records.",
        "TasksCount": 8
    },   
]

const myTasks =  tasks;

export const Tasks = () => {
    const { onOpen } = useModal();

    return (
        <div className="md:p-8 p-4 flex flex-col justify-center mx-auto">
            <div className="flex flex-col">
                <h1 className="mb-4 md:text-xl font-bold">My Projects</h1>
                <div className="flex flex-row justify-between">
                    <Select>
                        <SelectTrigger className="w-3/5 md:w-1/3 border-2 border-[#0d0d0d]/20 dark:border-[#fefefe]/20">
                            <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                            {projects.map((project) => (
                                <SelectItem key={null} value={project.Name}>{project.Name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button onClick={() => onOpen("createTask")}>
                        <PlusIcon className="h-4 w-4 mr-2 md:mr-4" />
                        Add Task
                    </Button>
                </div>
            </div>
            <div className="py-12">
            <DataTable data={myTasks} columns={columns} />
          </div>
        </div>
    );
}

export default Tasks;
  