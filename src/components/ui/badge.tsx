import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { TaskStatus } from "@/features/tasks/types";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        [TaskStatus.TODO]:
          "border-none bg-red-50 py-1 text-red-700 ring-1 ring-inset ring-red-600/10",
        [TaskStatus.IN_PROGRESS]:
          "border-none bg-yellow-50 py-1 text-yellow-800 ring-1 ring-inset ring-yellow-600/20",
        [TaskStatus.IN_REVIEW]:
          "border-none bg-blue-50 py-1 text-blue-800 ring-1 ring-inset ring-blue-600/20",
        [TaskStatus.DONE]:
          "border-none bg-green-50 py-1 text-green-800 ring-1 ring-inset ring-green-600/20",
        [TaskStatus.BACKLOG]:
          "border-none bg-pink-50 py-1 text-pink-800 ring-1 ring-inset ring-pink-600/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
