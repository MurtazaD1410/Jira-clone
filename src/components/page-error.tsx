import { AlertTriangle } from "lucide-react";

interface PageErrorProps {
  message?: string;
}

export const PageError = ({
  message = "Something went wrong",
}: PageErrorProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-4">
      <AlertTriangle className="size-6 text-muted-foreground mb-2" />
      <p className="text-sm text-muted-foreground font-medium">{message}</p>
    </div>
  );
};
