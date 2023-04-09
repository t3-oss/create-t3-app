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
        "my-4 flex w-full gap-3 rounded-md border p-3 text-justify",
        {
          "border-orange-400 bg-orange-400/50 dark:border-orange-600 dark:bg-orange-600/50":
            type === "warning",
          "border-blue-400 bg-blue-400/50 dark:border-blue-600 dark:bg-blue-600/50":
            type === "info",
          "border-yellow-400 bg-yellow-400/50 dark:border-yellow-600 dark:bg-yellow-600/50":
            type === "tip",
        },
      )}
    >
      <span>{getEmoji()}</span>
      <span className="[&>p]:mb-0">{children}</span>
    </div>
  );
}
