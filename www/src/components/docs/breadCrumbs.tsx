export default function BreadCrumbs() {
  const breadcrumbs = window.location.href
    .split("/")
    .slice(window.location.href.split("/").length > 5 ? -2 : -1)
    .map((crumb) => {
      const href = window.location.href
        .split("/")
        .slice(0, window.location.href.split("/").indexOf(crumb) + 1)
        .join("/");
      return {
        href,
        text: crumb,
      };
    });

  return (
    <div className="mb-4 flex items-center gap-2 px-2 text-sm">
      <a href="/">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="m12 5.561l-7 5.6V19h5v-4h4v4h5v-7.358a1 1 0 0 0-.375-.781L12 5.561ZM12 3l7.874 6.3A3 3 0 0 1 21 11.641V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7.839A2 2 0 0 1 3.75 9.6L12 3Z"
          />
        </svg>
      </a>
      <svg width="16" height="16" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"
        />
      </svg>
      {breadcrumbs.map((crumb, index) => (
        <div className="flex items-center gap-2">
          <a
            href={crumb.href}
            className="rounded-lg bg-t3-purple-500/10 p-1 dark:bg-t3-purple-500/20"
          >
            {crumb.text}
          </a>
          {index < breadcrumbs.length - 1 && (
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
