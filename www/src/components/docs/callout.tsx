import clsx from "clsx";

export default function Callout({
  type,
  children,
}: {
  type: "warning" | "info" | "tip";
  children: React.ReactNode;
}) {
  const getEmoji = () => {
    switch (type) {
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      case "tip":
        return "💡";
    }
  };

  return (
    <div
      className={clsx(
        "my-4 flex gap-3 rounded-md border p-3 pb-0 text-justify",
        {
          "border-orange-600 bg-orange-600/50": type === "warning",
          "border-blue-600 bg-blue-600/50": type === "info",
          "border-yellow-600 bg-yellow-600/50": type === "tip",
        },
      )}
    >
      <span>{getEmoji()}</span>
      <span>{children}</span>
    </div>
  );
}
