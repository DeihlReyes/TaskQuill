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

export const AddProjectModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "createProject";

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      projectTag: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: ProjectSchema) {
    try {
      const res = await axios.post("/api/project", values);
      if (res.status === 200) {
        form.reset();
        router.refresh();
        onClose();
      }
    } catch (error) {
      return error;
    }
  }

  const handleClose = () => {
    form.reset();
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">
                      Project Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
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
              <Button disabled={isLoading}>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
