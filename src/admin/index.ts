import type { NextAdminOptions } from "@premieroctet/next-admin";

export const options: NextAdminOptions = {
  basePath: "/admin",
  forceColorScheme: "light",
  pages: {
    "/worker": {
      title: "Worker",
    },
  },
};
