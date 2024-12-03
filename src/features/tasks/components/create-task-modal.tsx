"use client";

import { ResponsiveModal } from "@/components/responsive-modal";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { TaskStatus } from "../types";

import { CreateTaskFromWrapper } from "./create-task-form-wrapper";

export const CreateTaskModal = () => {
  const { queryState, close } = useCreateTaskModal();

  return (
    <ResponsiveModal open={queryState["create-task"]} onOpenChange={close}>
      <CreateTaskFromWrapper
        onCancel={close}
        initialStatus={queryState["initial-status"] as TaskStatus}
      />
    </ResponsiveModal>
  );
};
