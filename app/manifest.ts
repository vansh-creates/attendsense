import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AttendSense",
    short_name: "AttendSense",
    description: "Student attendance planning for SPCE.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icons/attendsense.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
