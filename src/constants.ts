import type { Point, QuadrantConfig } from "./types";

export const POINT_COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#f97316",
  "#6366f1",
  "#14b8a6",
] as const;

export const DEFAULT_QUADRANT_CONFIG: QuadrantConfig = {
  topLeft: "Challengers",
  topRight: "Leaders",
  bottomLeft: "Niche Players",
  bottomRight: "Visionaries",
  xAxis: "Completeness of Vision",
  yAxis: "Ability to Execute",
};

const CHART_PADDING = { top: 24, right: 24, bottom: 56, left: 72 };

export const CHART = {
  viewBoxWidth: 640,
  viewBoxHeight: 580,
  padding: CHART_PADDING,
  areaWidth: 640 - CHART_PADDING.left - CHART_PADDING.right,
  areaHeight: 580 - CHART_PADDING.top - CHART_PADDING.bottom,
};

export const SAMPLE_POINTS: Point[] = [
  { id: "1", label: "Microsoft", x: 78, y: 82, color: POINT_COLORS[0]!, visible: true },
  { id: "2", label: "Google", x: 72, y: 75, color: POINT_COLORS[1]!, visible: true },
  { id: "3", label: "AWS", x: 85, y: 88, color: POINT_COLORS[2]!, visible: true },
  { id: "4", label: "Startup A", x: 65, y: 30, color: POINT_COLORS[3]!, visible: true },
  { id: "5", label: "Startup B", x: 25, y: 35, color: POINT_COLORS[4]!, visible: true },
  { id: "6", label: "Legacy Corp", x: 20, y: 70, color: POINT_COLORS[5]!, visible: true },
];

export const STORAGE_KEY = "magic-quadrant-points";
export const DARK_MODE_KEY = "magic-quadrant-dark";
