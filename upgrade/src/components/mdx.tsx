export function Steps(props: React.ComponentProps<"div">) {
  return (
    <div
      className="[&>h3]:step mb-12 ml-4 border-l pl-6 [counter-reset:step]"
      {...props}
    />
  );
}
