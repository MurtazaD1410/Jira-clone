import { useParams } from "next/navigation";

export const UseInviteCode = () => {
  const params = useParams();
  return params.inviteCode as string;
};
