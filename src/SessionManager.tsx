import React from "react";
import { useSession } from "./hooks/useSession";

type Props = {
  children: React.ReactNode;
};

const SessionManager = ({ children }: Props) => {
  useSession();
  return <>{children}</>;
};

export default SessionManager;
