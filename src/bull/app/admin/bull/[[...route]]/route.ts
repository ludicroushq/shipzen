import { auth } from "@/auth";
import { Bull } from "@/bull";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { HonoAdapter } from "@bull-board/hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { notFound } from "next/navigation";

const serverAdapter = new HonoAdapter(serveStatic);
serverAdapter.setBasePath("/admin/bull");

createBullBoard({
  queues: Object.values(Bull).map(({ queue }) => new BullMQAdapter(queue)),
  serverAdapter,
});

const app = new Hono();
app.onError((err) => {
  throw err;
});
app.use(async (_, next) => {
  const session = await auth();

  if (!session?.user.isAdmin) {
    return notFound();
  }

  return next();
});
app.route("/admin/bull", serverAdapter.registerPlugin());

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const HEAD = handle(app);
export const OPTIONS = handle(app);
