"use client";

import { useEffect, useState } from "react";
import { CloudOff } from "lucide-react";

export const SAVE_ERROR_EVENT = "studio:save-error";

/** A small banner shown when saving to the server fails, so no one loses work silently. */
export function SaveStatus() {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const onError = () => setFailed(true);
    const onOk = () => setFailed(false);
    window.addEventListener(SAVE_ERROR_EVENT, onError);
    window.addEventListener("studio:saved", onOk);
    return () => {
      window.removeEventListener(SAVE_ERROR_EVENT, onError);
      window.removeEventListener("studio:saved", onOk);
    };
  }, []);
  if (!failed) return null;
  return (
    <div className="save-status" role="status">
      <CloudOff size={16} /> Couldn&apos;t save your latest changes. Check your connection. We&apos;ll retry on your next edit.
    </div>
  );
}
