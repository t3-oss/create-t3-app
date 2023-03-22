type OpenGraphProps = {
  title: string;
  description: string;
  imageBase: string;
};

export default function OpenGraph({
  title,
  description,
  imageBase,
}: OpenGraphProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        background:
          "linear-gradient(180deg, rgba(17,24,39,1) 0%, rgba(48,1,113,1) 50%, rgba(15,23,42,1) 100%)",
      }}
    >
      <img
        src={`${imageBase}/images/background-pattern.svg`}
        style={{
          position: "absolute",
          width: "1200px",
          height: "1200px",
          opacity: 0.05,
        }}
      />
      <img src={`${imageBase}/logo.svg`} width={268} height={203} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "50px",
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
            color: "#fff",
            fontSize: "25px",
          }}
        >
          {description}
        </h2>
      </div>
    </div>
  );
}
