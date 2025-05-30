import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";

import { WorkspaceIdPageClient } from "./client";

const WorkspaceIdPage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  return <WorkspaceIdPageClient />;
};

export default WorkspaceIdPage;
