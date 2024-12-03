"use client";

import { Fragment } from "react";
import Link from "next/link";
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react";

import { DottedSeparator } from "@/components/dotted-separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { MemberRole } from "@/features/members/types";
import { TaskStatus } from "@/features/tasks/types";
import { useConfirm } from "@/hooks/use-confirm";

import { useWorkspaceId } from "../hooks/use-workspace-id";

export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const { data } = useGetMembers({ workspaceId });
  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();
  const [ConfirmDialog, confirm] = useConfirm(
    "Remove Member",
    "This member will be removed from the workspace",
    "destructive",
  );

  const handleUpdateMember = (memberId: string, role: MemberRole) => {
    updateMember({
      json: { role },
      param: { memberId },
    });
  };

  const handleDeletMember = async (memberId: string) => {
    const ok = await confirm();
    if (!ok) {
      return;
    }

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          window.location.reload();
        },
      },
    );
  };

  return (
    <Card className="w-full h-full shadow-none border-none">
      <ConfirmDialog />
      <CardHeader className="felx flex-row items-center gap-x-4 p-7 space-y-0 ">
        <Button asChild variant={"secondary"} size={"sm"}>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon className="size-4 mr-2" />
            Back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members List</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        {data?.documents.map((member, index) => (
          <Fragment key={member.$id}>
            <div className="flex items-center gap-2">
              <MemberAvatar
                name={member.name}
                className="size-10"
                fallbackClassName="text-lg"
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
              <div className="ml-auto flex items-center space-x-3">
                <Badge
                  variant={
                    member.role === "ADMIN"
                      ? TaskStatus.TODO
                      : TaskStatus.IN_REVIEW
                  }
                >
                  {member.role}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="ml-auto "
                      variant={"secondary"}
                      size="icon"
                    >
                      <MoreVerticalIcon className="size-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="end">
                    {member.role === "MEMBER" && (
                      <DropdownMenuItem
                        className="font-medium"
                        onClick={() =>
                          handleUpdateMember(member.$id, MemberRole.ADMIN)
                        }
                        disabled={isUpdatingMember}
                      >
                        Set as Administrator
                      </DropdownMenuItem>
                    )}
                    {member.role === "ADMIN" && (
                      <DropdownMenuItem
                        className="font-medium"
                        onClick={() =>
                          handleUpdateMember(member.$id, MemberRole.MEMBER)
                        }
                        disabled={isUpdatingMember}
                      >
                        Set as Member
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="font-medium text-amber-700"
                      onClick={() => handleDeletMember(member.$id)}
                      disabled={isDeletingMember}
                    >
                      Remove {member.name}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {index < data.documents.length - 1 && (
              <Separator className="my-2.5" />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
};
