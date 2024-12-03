import React from "react";
import { useRouter } from "next/navigation";

import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Project } from "@/features/projects/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";

import { TaskStatus } from "../types";

interface EventCardProps {
  id: string;
  title: string;
  project: Project;
  status: TaskStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignee: any;
}

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-700",
  [TaskStatus.TODO]: "border-l-red-700",
  [TaskStatus.DONE]: "border-l-green-700",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-700",
  [TaskStatus.IN_REVIEW]: "border-l-blue-700",
};

export const EventCard = ({
  id,
  title,
  project,
  status,
  assignee,
}: EventCardProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 hover:opacity-75 cursor-pointer transition",
          statusColorMap[status],
        )}
      >
        <p>{title}</p>
        <div className="flex items-center gap-x-1">
          <MemberAvatar name={assignee?.name} />
          <div className="size-1 rounded-full bg-neutral-300" />
          <ProjectAvatar name={project?.name} image={project?.imageUrl} />
        </div>
      </div>
    </div>
  );
};
