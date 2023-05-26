"use client";

import { Button } from "~/components/ui/button";

export default function DownloadButton({ diff }: { diff: string }) {
  const downloadDiffFile = () => {
    const element = document.createElement("a");
    const file = new Blob([diff], { type: "text/plain" });

    element.href = URL.createObjectURL(file);
    element.download = "t3-upgrade.patch";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return <Button onClick={downloadDiffFile}>Download .patch file</Button>;
}
