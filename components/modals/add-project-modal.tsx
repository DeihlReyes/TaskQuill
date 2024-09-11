"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/use-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ProjectSchema, projectSchema } from "@/lib/validation/project";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

export const AddProjectModal = () => {
  const { isOpen, onClose, type } = useModal();
  const queryKey: QueryKey = ["projects"];
  const isModalOpen = isOpen && type === "createProject";
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      projectTag: "",
    },
  });

  // useMutation to handle form submission
  const { mutate: createProject, isPending } = useMutation({
    mutationFn: async (values: ProjectSchema) => {
      const res = await axios.post("/api/project", values);
      return res.data;
    },
    onMutate: async (newProject: ProjectSchema) => {
      await queryClient.cancelQueries({ queryKey });

      const previousProjects =
        queryClient.getQueryData<ProjectSchema[]>(queryKey) || [];

      queryClient.setQueryData<ProjectSchema[]>(queryKey, (oldProjects) => {
        if (!oldProjects) return [newProject];

        return [...oldProjects, newProject];
      });
      return { previousProjects };
    },
    onError: (err, newProjects, context) => {
      queryClient.setQueryData(queryKey, context?.previousProjects);
    },
    onSettled: () => {
      form.reset();
      onClose();
      router.push("/projects");
    },
  });

  // Submit handler
  const onSubmit = (values: ProjectSchema) => {
    createProject(values); // Use the mutation instead of axios directly
  };

  const handleClose = () => {
    form.reset(); // Reset the form on modal close
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Project</DialogTitle>
          <DialogDescription>Add your project here.</DialogDescription>
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
                      Project Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="border-0 bg-[#0d0d0d]/10 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#fefefe]/10"
                        placeholder="Enter Project Title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectTag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">
                      Project Tag
                    </FormLabel>
                    <FormControl>
                      <Input
                        maxLength={4}
                        disabled={isPending}
                        className="border-0 bg-[#0d0d0d]/10 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#fefefe]/10"
                        placeholder="Enter Project Tag"
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
                      Project Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        maxLength={200}
                        className="h-[110px] border-0 bg-[#0d0d0d]/10 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#fefefe]/10"
                        placeholder="Enter Project Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                className="flex items-center justify-center"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <LoaderIcon className="mr-2 animate-spin" size={20} />
                    Creating
                  </>
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
