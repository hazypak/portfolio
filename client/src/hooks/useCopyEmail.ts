import { useCallback, useEffect, useRef, useState } from "react";
import { contactEmail } from "@/data/portfolio";

/** Copies the contact address; `copied` stays true for a moment for feedback. */
export function useCopyEmail(resetMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    const email = contactEmail();
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard can be blocked (permissions, insecure context); fall back
      // to opening the mail client so the action still does something.
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), resetMs);
  }, [resetMs]);

  return { copied, copy };
}
