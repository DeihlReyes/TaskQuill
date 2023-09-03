import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal"; 
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
});

export const AddTaskModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createTask";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
                      <FormItem>
                        <FormLabel className="text-md font-semibold">Project Title</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="border-0 bg-[#0d0d0d]/10 dark:bg-[#fefefe]/10 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                        <FormLabel className="text-md font-semibold">Project Description</FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={isLoading}
                            className="border-0 bg-[#0d0d0d]/10 dark:bg-[#fefefe]/10 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                <Button disabled={isLoading}>
                  Create
                </Button>
              </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};