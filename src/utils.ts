import type { Point } from "./types";
import { POINT_COLORS } from "./constants";

export function generateId(): string {
  return crypto.randomUUID();
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function nextColor(points: Point[]): string {
  const usedColors = new Set(points.map((p) => p.color));
  const available = POINT_COLORS.find((c) => !usedColors.has(c));
  return available ?? POINT_COLORS[points.length % POINT_COLORS.length]!;
}

export function createPoint(points: Point[], overrides?: Partial<Point>): Point {
  return {
    id: generateId(),
    label: "New Point",
    x: 50,
    y: 50,
    color: nextColor(points),
    visible: true,
    ...overrides,
  };
}

const STYLE_PROPS = [
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray",
  "opacity",
  "font-size",
  "font-weight",
  "font-family",
  "text-anchor",
  "dominant-baseline",
  "filter",
] as const;

function inlineStyles(source: SVGElement, target: SVGElement) {
  const computed = getComputedStyle(source);
  for (const prop of STYLE_PROPS) {
    const val = computed.getPropertyValue(prop);
    if (val) target.style.setProperty(prop, val);
  }
  const srcChildren = source.children;
  const tgtChildren = target.children;
  for (let i = 0; i < srcChildren.length; i++) {
    const s = srcChildren[i];
    const t = tgtChildren[i];
    if (s instanceof SVGElement && t instanceof SVGElement) {
      inlineStyles(s, t);
    }
  }
}

export async function exportAsPng(container: HTMLElement, filename = "magic-quadrant.png") {
  const svg = container.querySelector("svg");
  if (!svg) throw new Error("No SVG found");

  const clone = svg.cloneNode(true) as SVGSVGElement;
  inlineStyles(svg, clone);

  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.removeAttribute("class");

  const vbParts = (svg.getAttribute("viewBox") ?? "0 0 640 580").split(" ");
  const exportW = Number(vbParts[2]) * 3;
  const exportH = Number(vbParts[3]) * 3;
  clone.setAttribute("width", String(exportW));
  clone.setAttribute("height", String(exportH));

  const data = new XMLSerializer().serializeToString(clone);
  const blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const img = new Image();
  img.width = exportW;
  img.height = exportH;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = exportW;
      canvas.height = exportH;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = getComputedStyle(container).backgroundColor || "#ffffff";
      ctx.fillRect(0, 0, exportW, exportH);
      ctx.drawImage(img, 0, 0, exportW, exportH);
      URL.revokeObjectURL(url);

      canvas.toBlob((b) => {
        if (!b) { reject(new Error("Canvas toBlob failed")); return; }
        const a = document.createElement("a");
        a.download = filename;
        a.href = URL.createObjectURL(b);
        a.click();
        URL.revokeObjectURL(a.href);
        resolve();
      }, "image/png");
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Image load failed")); };
    img.src = url;
  });
}

export function exportAsJson(points: Point[], filename = "magic-quadrant.json") {
  const data = JSON.stringify(points, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

export function importFromJson(file: File): Promise<Point[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const raw = JSON.parse(e.target?.result as string);
        if (!Array.isArray(raw)) throw new Error("Invalid format");
        const points: Point[] = raw.map((item: Record<string, unknown>) => ({
          id: typeof item.id === "string" ? item.id : generateId(),
          label: typeof item.label === "string" ? item.label : "Imported",
          x: clamp(Number(item.x) || 50, 0, 100),
          y: clamp(Number(item.y) || 50, 0, 100),
          color: typeof item.color === "string" ? item.color : POINT_COLORS[0]!,
          visible: item.visible !== false,
        }));
        resolve(points);
      } catch {
        reject(new Error("Failed to parse JSON file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}
