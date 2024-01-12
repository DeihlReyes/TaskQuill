import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
import { useModal } from "@/hooks/use-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label, Priority, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.string().min(1),
  label: z.string().min(1),
  projectId: z.string().min(1),
  dueDate: z.date({
    required_error: "A due date is required.",
  }),
});

export const AddTaskModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { projectId } = data;
  const router = useRouter();

  const isModalOpen = isOpen && type === "createTask";

  const { data: users } = useQuery(["users"], async () => {
    const res = await axios.get("/api/users");
    return res.data;
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: Priority.LOW,
      label: Label.BUG,
      projectId: projectId || "",
      dueDate: new Date(),
    },
  });

  useEffect(() => {
    if (projectId) {
      form.setValue("projectId", projectId);
    } else {
      form.setValue("projectId", "");
    }
  }, [projectId, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("/api/task", values);
      if (res.status === 200) {
        console.log(res.data);
        form.reset();
        router.refresh();
        onClose();
      }
    } catch (error) {
      console.log("Error creating task", error);
    }
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
          <DialogTitle className="text-xl font-bold">Add Task</DialogTitle>
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                {/* Priority Select */}
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
                {/* Label Select */}
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
              <Button type="submit" disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
