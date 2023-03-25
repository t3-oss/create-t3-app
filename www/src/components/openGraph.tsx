type OpenGraphProps = {
  title: string;
  description: string;
  imageBase: string;
  readingTime: string;
  pageUrl: string;
  rtl: boolean;
};

export default function OpenGraph({
  title,
  description,
  imageBase,
  readingTime,
  pageUrl,
  rtl,
}: OpenGraphProps) {
  return (
    <div
      style={{
        display: "flex",
        width: "1200px",
        height: "630px",
        justifyContent: "center",
        alignItems: "center",
        gap: "3rem",
        flexDirection: rtl ? "row-reverse" : "row",
        background:
          "linear-gradient(180deg, rgba(48,1,113,1) 0%, rgba(17,24,39,1) 100%)",
      }}
    >
      <img
        src={`${imageBase}/images/background-pattern.svg`}
        style={{
          position: "absolute",
          width: "1200px",
          height: "1200px",
          opacity: 0.15,
        }}
      />
      <Logo color={"#F5F5F5"} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "90px",
            lineHeight: "2.5rem",
            fontWeight: 700,
            color: "#fff",
            maxWidth: "100%",
          }}
        >
          {title}
        </h1>
        <h2
          style={{
            color: "#F5F5F5",
            fontSize: "40px",
            fontWeight: 400,
            maxWidth: "700px",
            textAlign: "center",
            wordBreak: "break-word",
          }}
        >
          {description}
        </h2>
      </div>
      <h3
        style={{
          fontSize: "40px",
          color: "#c3b4fc",
          fontWeight: 400,
          position: "absolute",
          bottom: "20px",
        }}
      >
        {pageUrl}
        {readingTime != "0" && ` • ${readingTime}`}
      </h3>
    </div>
  );
}

const Logo = ({ color }: { color: string }) => (
  <svg
    width="268"
    height="203"
    viewBox="0 0 268 203"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M152.981 29.4786L180.491 0.918945L0.850377 0.918945V29.4786H152.981Z"
      fill={color}
    />
    <path
      d="M159.664 101.527L257.947 1.29251L218.808 1.29228L137.874 83.0602L159.664 101.527Z"
      fill={color}
    />
    <path
      d="M155.638 131.857L132.692 154.803L135.035 160.378C145.494 185.262 170.104 202.762 198.823 202.762C237.023 202.762 267.99 171.795 267.99 133.595C267.99 108.277 254.171 86.3783 234.102 74.3543L228.039 70.7214L207.028 92.0006L217.746 97.6588C230.659 104.475 239.427 118.019 239.427 133.595C239.427 156.021 221.248 174.2 198.823 174.2C180.714 174.2 165.352 162.339 160.126 145.94L155.638 131.857Z"
      fill={color}
    />
    <path
      d="M98.4934 197.078L98.4934 52.2128H69.9338L69.9338 197.078H98.4934Z"
      fill={color}
    />
  </svg>
);
