import { toPng } from "html-to-image";
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

export async function exportAsPng(element: HTMLElement, filename = "magic-quadrant.png") {
  const dataUrl = await toPng(element, {
    backgroundColor: "#ffffff",
    pixelRatio: 2,
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
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
