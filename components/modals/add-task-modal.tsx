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
import { Label, Priority } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.string().min(1),
  label: z.string().min(1),
  projectId: z.string().min(1),
});

export const AddTaskModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { projectId } = data;
  const router = useRouter();

  const isModalOpen = isOpen && type === "createTask";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: Priority.LOW,
      label: Label.BUG,
      projectId: projectId || "",
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

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">Add Task</DialogTitle>
          <DialogDescription>Add a task for your project.</DialogDescription>
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
                        className="border-0 bg-[#0d0d0d]/10 dark:bg-[#fefefe]/10 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                        className="border-0 bg-[#0d0d0d]/10 dark:bg-[#fefefe]/10 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter Task Description"
                        {...field}
                      />
                    </FormControl>
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
                    <FormItem className="flex flex-col w-1/2">
                      <FormLabel className="font-semibold">Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={Priority.LOW}>Low</SelectItem>
                          <SelectItem value={Priority.MEDIUM}>Medium</SelectItem>
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
                    <FormItem className="flex flex-col w-1/2">
                      <FormLabel className="font-semibold">Label</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Label" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={Label.BUG}>Bug</SelectItem>
                          <SelectItem value={Label.FEATURE}>Feature</SelectItem>
                          <SelectItem value={Label.IMPROVEMENT}>Improvement</SelectItem>
                          <SelectItem value={Label.REFACTOR}>Refactor</SelectItem>
                          <SelectItem value={Label.TEST}>Test</SelectItem>
                          <SelectItem value={Label.DOCUMENTATION}>Documentation</SelectItem>
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
