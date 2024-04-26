import { router } from "@/server/trpc";
import { world } from "./world";

export const helloRouter = router({
  world,
});
