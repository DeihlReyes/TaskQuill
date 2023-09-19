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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/use-modal";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label, Priority, Project } from "@prisma/client";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import useProject from "@/hooks/use-project";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priority: z.string().min(1), // You may need to update this validation
  label: z.string().min(1), // You may need to update this validation
  projectId: z.string().min(1),
});

export const AddTaskModal = () => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, type } = useModal();
  const { data: Projects =  []  } = useProject();

  const isModalOpen = isOpen && type === "createTask";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: Priority.LOW,
      label: Label.BUG,
      projectId: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("/api/add-task", values);
      if (res.status === 200) {
        console.log(res.data);
        form.reset();
        onClose();
        queryClient.invalidateQueries(["tasks"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="pb-8">
          <DialogTitle className="font-bold text-xl">Add Task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full border-2 border-[#0d0d0d]/20 dark:border-[#fefefe]/20">
                        <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                        {Projects.map((project: Project) => (
                            <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                )}
              />
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
