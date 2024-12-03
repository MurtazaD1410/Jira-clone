import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

import { TaskStatus } from "../types";

export const useCreateTaskModal = () => {
  const [queryState, setQueryState] = useQueryStates(
    {
      "create-task": parseAsBoolean
        .withDefault(false)
        .withOptions({ clearOnDefault: true }),
      "initial-status": parseAsString
        .withDefault("")
        .withOptions({ clearOnDefault: true }),
    },
    {
      history: "push",
    }
  );

  const open = (initialStatus: TaskStatus | null) =>
    setQueryState({
      "create-task": true,
      "initial-status": initialStatus?.toString() || "",
    });

  const close = () =>
    setQueryState({
      "create-task": false,
      "initial-status": "",
    });

  return {
    queryState,
    open,
    close,
    setQueryState,
  };
};
