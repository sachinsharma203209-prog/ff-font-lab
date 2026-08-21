import TransformTool from "./TransformTool";
import { upsideDown, mirrorText, tinyText, strikeText } from "../lib/text-transforms";

export function UpsideDownIsland() {
  return (
    <TransformTool
      toolId="upside-down-text"
      outputLabel="Flipped"
      placeholder="Type something to flip..."
      transform={(text) => upsideDown(text).output}
    />
  );
}

export function MirrorTextIsland() {
  return (
    <TransformTool
      toolId="mirror-text"
      outputLabel="Mirrored"
      placeholder="Type something to mirror..."
      options={[
        { id: "flip", label: "Full mirror" },
        { id: "reverse", label: "Reverse only" },
      ]}
      defaultOption="flip"
      transform={(text, option) => mirrorText(text, option === "flip").output}
    />
  );
}

export function TinyTextIsland() {
  return (
    <TransformTool
      toolId="tiny-text"
      outputLabel="Tiny text"
      placeholder="Type something to shrink..."
      options={[
        { id: "superscript", label: "Superscript ˢᵐᵃˡˡ" },
        { id: "subscript", label: "Subscript ₛₘₐₗₗ" },
      ]}
      defaultOption="superscript"
      transform={(text, option) => tinyText(text, option as "superscript" | "subscript").output}
    />
  );
}

export function StrikeTextIsland() {
  return (
    <TransformTool
      toolId="strikethrough-text"
      outputLabel="Struck through"
      placeholder="Type something to strike..."
      options={[
        { id: "single", label: "Single line" },
        { id: "short", label: "Short strokes" },
        { id: "underline", label: "Underline" },
      ]}
      defaultOption="single"
      transform={(text, option) => strikeText(text, option as "single" | "short" | "underline")}
    />
  );
}
