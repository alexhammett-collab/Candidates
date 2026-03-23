import { COGNITION_LOGO } from "./logoData";

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
      src={`data:image/png;base64,${COGNITION_LOGO}`}
      alt="Cognition"
      height={height}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
