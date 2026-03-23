export default function CognitionLogo({
  height = 24,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/cognition-logo-black.png"
      alt="Cognition"
      height={height}
      className={className}
      style={{ height, width: "auto", imageRendering: "auto" }}
    />
  );
}
