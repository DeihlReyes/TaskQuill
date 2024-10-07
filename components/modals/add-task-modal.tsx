"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarIcon, LoaderIcon } from "lucide-react";
import { Label, Priority } from "@prisma/client";

import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import { TaskSchema, taskSchema } from "@/lib/validation/task";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export const TaskModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();

  const isModalOpen = isOpen && (type === "createTask" || type === "editTask");
  const isEditing = type === "editTask";

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: Priority.LOW,
      label: Label.BUG,
      projectId: "",
      dueDate: new Date(),
    },
  });

  useEffect(() => {
    if (isEditing && data.task) {
      form.reset({
        ...data.task,
        description: data.task.description ?? "",
      });
    } else if (data.project?.id) {
      form.setValue("projectId", data.project.id);
    }
  }, [isEditing, data, form]);

  const mutation = useMutation({
    mutationFn: async (values: TaskSchema) => {
      if (isEditing && data.task) {
        return axios.put(`/api/task/${data.task.id}`, values);
      } else {
        return axios.post("/api/task", values);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      form.reset();
      router.refresh();
      onClose();
    },
  });

  const onSubmit = (values: TaskSchema) => {
    mutation.mutate(values);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditing ? "Edit Task" : "Add Task"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">
                      Task Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={mutation.isPending}
                        className="border-0 bg-[#0d0d0d]/10 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#fefefe]/10"
                        placeholder="Enter Task Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">
                      Task Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={mutation.isPending}
                        className="border-0 bg-[#0d0d0d]/10 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#fefefe]/10"
                        placeholder="Enter Task Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < yesterday}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-8">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="flex w-1/2 flex-col">
                      <FormLabel className="font-semibold">Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={Priority.LOW}>Low</SelectItem>
                          <SelectItem value={Priority.MEDIUM}>
                            Medium
                          </SelectItem>
                          <SelectItem value={Priority.HIGH}>High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="flex w-1/2 flex-col">
                      <FormLabel className="font-semibold">Label</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Label" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={Label.BUG}>Bug</SelectItem>
                          <SelectItem value={Label.FEATURE}>Feature</SelectItem>
                          <SelectItem value={Label.IMPROVEMENT}>
                            Improvement
                          </SelectItem>
                          <SelectItem value={Label.REFACTOR}>
                            Refactor
                          </SelectItem>
                          <SelectItem value={Label.TEST}>Test</SelectItem>
                          <SelectItem value={Label.DOCUMENTATION}>
                            Documentation
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={mutation.isPending}>
                {isEditing ? "Update" : "Create"}
                {mutation.isPending ? (
                  <LoaderIcon className="ml-2 animate-spin" size={20} />
                ) : null}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
