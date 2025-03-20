import { z } from "zod";

export const TodoListSchema = z.object({
  title: z.string({ message: "El campo de título es requerido" }),
  description: z.string({ message: "El campo de descripción es requerido" }),
  done: z.boolean({ message: "El campo de done es requerido" }),
});
