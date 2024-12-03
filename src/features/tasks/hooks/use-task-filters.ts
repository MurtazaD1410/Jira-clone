import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

import { TaskStatus } from "../types";

export const useTaskFilters = () => {
  return useQueryStates({
    status: parseAsStringEnum(Object.values(TaskStatus)),
    projectId: parseAsString,
    assigneeId: parseAsString,
    search: parseAsString,
    dueDate: parseAsString,
  });
};
