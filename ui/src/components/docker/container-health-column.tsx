import type { ColumnDef } from "@tanstack/react-table";
import type { Types } from "komodo_client";
import { type DataTableFeatures, StatusBadge } from "mogh_ui";

export const containerHealthColumn = {
  header: "Health",
  cell: ({ row }) => {
    // Docker includes the health check result in the container list status.
    const { status } = row.original;
    if (status?.endsWith("(healthy)")) {
      return <StatusBadge text="Healthy" intent="Good" />;
    }
    if (status?.endsWith("(unhealthy)")) {
      return <StatusBadge text="Unhealthy" intent="Critical" />;
    }
    if (status?.endsWith("(health: starting)")) {
      return <StatusBadge text="Starting" intent="Warning" />;
    }
    return <span title="No health status reported">—</span>;
  },
} satisfies ColumnDef<DataTableFeatures, Types.ContainerListItem>;
