import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const queryClient = useQueryClient();

export const { mutate } = useMutation({
  mutationFn: (newLabel: string) =>
    axios.post("/api/task/${task.id}", { text: newLabel }),
  onSettled: async () => {
    return await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  },
  mutationKey: ["tasks"],
});
