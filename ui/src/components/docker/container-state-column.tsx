import { containerStateIntention } from "@/lib/color";
import type { ColumnDef } from "@tanstack/react-table";
import type { Types } from "komodo_client";
import { type DataTableFeatures, SortableHeader, StatusBadge } from "mogh_ui";

function displayState({ state, status }: Types.ContainerListItem) {
  if (status?.endsWith("(healthy)")) return "healthy";
  if (status?.endsWith("(unhealthy)")) return "unhealthy";
  if (status?.endsWith("(health: starting)")) return "starting";
  return state || "unknown";
}

export const containerStateColumn = {
  id: "state",
  accessorFn: displayState,
  header: ({ column }) => <SortableHeader column={column} title="State" />,
  cell: ({ getValue }) => {
    const state = getValue();
    return <StatusBadge text={state} intent={containerStateIntention(state)} />;
  },
} satisfies ColumnDef<
  DataTableFeatures,
  Types.ContainerListItem,
  ReturnType<typeof displayState>
>;
