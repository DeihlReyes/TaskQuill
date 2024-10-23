import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import { MeetingSchema, meetingSchema } from "@/lib/validation/meeting";

import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const AddMeetingModal = () => {
  const { isOpen, onClose, type } = useModal();
  const queryKey: QueryKey = ["meetings"]; // Adjust this based on your app's structure
  const queryClient = useQueryClient();
  const router = useRouter();

  const isModalOpen = isOpen && type === "createMeeting";

  const form = useForm({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      date: new Date(),
    },
  });

  // useMutation to handle form submission
  const { mutate: createMeeting, isPending } = useMutation({
    mutationFn: async (values: MeetingSchema) => {
      const res = await axios.post("/api/meeting", values);
      return res.data;
    },
    onMutate: async (newMeeting: MeetingSchema) => {
      await queryClient.cancelQueries({ queryKey });

      const previousMeetings =
        queryClient.getQueryData<MeetingSchema[]>(queryKey) || [];

      queryClient.setQueryData<MeetingSchema[]>(queryKey, (oldMeetings) => {
        if (!oldMeetings) return [newMeeting];

        return [...oldMeetings, newMeeting];
      });

      return { previousMeetings };
    },
    onError: (err, newMeeting, context) => {
      queryClient.setQueryData(queryKey, context?.previousMeetings);
    },
    onSettled: () => {
      form.reset();
      onClose();
      router.push("/meetings");
    },
  });

  // Submit handler
  const onSubmit = (values: MeetingSchema) => {
    createMeeting(values); // Use the mutation instead of axios directly
  };

  const handleClose = () => {
    form.reset(); // Reset the form on modal close
    onClose();
  };

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add a Meeting</DialogTitle>
          <DialogDescription>
            Add important meeting details here.
          </DialogDescription>
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
                      Meeting Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="border-0 bg-[#0d0d0d]/10 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#fefefe]/10"
                        placeholder="Enter meeting title"
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
                      Meeting Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="border-0 bg-[#0d0d0d]/10 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#fefefe]/10"
                        placeholder="Enter meeting description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-semibold">
                      Meeting Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="border-0 bg-[#0d0d0d]/10 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-[#fefefe]/10"
                        placeholder="Enter meeting link"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
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
