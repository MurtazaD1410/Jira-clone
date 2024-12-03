"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { useEditTaskModal } from "../hooks/use-edit-task-modal";

import { EditTaskFromWrapper } from "./edit-task-form-wrapper";

export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFromWrapper onCancel={close} id={taskId} />}
    </ResponsiveModal>
  );
};
