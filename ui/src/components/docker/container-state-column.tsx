import { containerStateIntention } from "@/lib/color";
import type { ColumnDef } from "@tanstack/react-table";
import type { Types } from "komodo_client";
import { type DataTableFeatures, SortableHeader, StatusBadge } from "mogh_ui";

export const containerStateColumn = {
  accessorKey: "state",
  header: ({ column }) => <SortableHeader column={column} title="State" />,
  cell: ({ row }) => {
    // Docker includes the health check result in the container list status.
    const { state, status } = row.original;
    if (status?.endsWith("(healthy)")) {
      return <StatusBadge text="Healthy" intent="Good" />;
    }
    if (status?.endsWith("(unhealthy)")) {
      return <StatusBadge text="Unhealthy" intent="Critical" />;
    }
    if (status?.endsWith("(health: starting)")) {
      return <StatusBadge text="Starting" intent="Warning" />;
    }
    return (
      <StatusBadge
        text={state || "Unknown"}
        intent={containerStateIntention(state)}
      />
    );
  },
} satisfies ColumnDef<DataTableFeatures, Types.ContainerListItem>;
