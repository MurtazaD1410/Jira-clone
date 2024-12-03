import { useState } from "react";
import { PencilIcon, XIcon } from "lucide-react";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUpdateTask } from "../api/use-update-task";
import { Task } from "../types";

interface TaskDescriptionProps {
  task: Task;
}

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const { mutate, isPending } = useUpdateTask();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    mutate(
      {
        json: { description },
        param: { taskId: task.$id },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Overview</p>
        <Button
          className=""
          variant={"secondary"}
          size={"sm"}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <PencilIcon className="size-4 mr-2" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description"
            value={description}
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isPending}
          />
          <Button
            className="w-fit ml-auto"
            size={"sm"}
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div className="">
          {task.description || (
            <span className="text-muted-foreground">No description set</span>
          )}
        </div>
      )}
    </div>
  );
};
