import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/use-modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useQueryClient } from '@tanstack/react-query';

const formSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1)
});

export const AddProjectModal = () => {
  const { isOpen, onClose, type } = useModal();
  const queryClient = useQueryClient();

  const isModalOpen = isOpen && type === "createProject";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    try {
      const res = await axios.post("/api/add-project", values);
      if (res.status === 200) {
        form.reset();
        onClose();
        queryClient.invalidateQueries(["projects"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="pb-8">
          <DialogTitle className="font-bold text-xl">Add Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <div>
                    <FormLabel className="text-md font-semibold">Project Title</FormLabel>
                    <Input
                      disabled={isLoading}
                      className="border-0 bg-[#0d0d0d]/10 dark:bg-[#fefefe]/10 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Enter Project Title"
                      {...field}
                    />
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <div>
                    <FormLabel className="text-md font-semibold">Project Description</FormLabel>
                    <Textarea
                      disabled={isLoading}
                      maxLength={200}
                      className="border-0 bg-[#0d0d0d]/10 dark:bg-[#fefefe]/10 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="Enter Project Description"
                      {...field}
                    />
                    <FormMessage />
                  </div>
                )}
              />
            </div>
            <DialogFooter>
              <Button disabled={isLoading}>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
