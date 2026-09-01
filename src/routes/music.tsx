import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/music")({
  component: () => <Outlet />,
});
