import { handle } from "hono/vercel";
import { hono } from "@/api";

export const GET = handle(hono); // eslint-disable-line @typescript-eslint/naming-convention
export const POST = handle(hono); // eslint-disable-line @typescript-eslint/naming-convention
export const PUT = handle(hono); // eslint-disable-line @typescript-eslint/naming-convention
export const PATCH = handle(hono); // eslint-disable-line @typescript-eslint/naming-convention
export const DELETE = handle(hono); // eslint-disable-line @typescript-eslint/naming-convention
export const HEAD = handle(hono); // eslint-disable-line @typescript-eslint/naming-convention
export const OPTIONS = handle(hono); // eslint-disable-line @typescript-eslint/naming-convention
