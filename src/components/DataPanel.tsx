import {
  Eye,
  EyeOff,
  Grid3X3,
  Plus,
  Redo2,
  Trash2,
  Undo2,
} from "lucide-react";
import type { Point } from "../types";
import { POINT_COLORS } from "../constants";

interface Props {
  points: Point[];
  showGrid: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onAddPoint: () => void;
  onDeletePoint: (id: string) => void;
  onUpdatePoint: (id: string, updates: Partial<Point>) => void;
  onToggleGrid: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

function ColorDot({ color, onChange }: { color: string; onChange: (c: string) => void }) {
  return (
    <div className="relative group">
      <button
        className="w-5 h-5 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200 dark:ring-gray-600
                   hover:scale-110 transition-transform"
        style={{ backgroundColor: color }}
        aria-label="Change color"
      />
      <div className="absolute left-0 top-5 z-20 hidden group-hover:flex pt-2">
        <div className="flex gap-1 p-2 bg-white dark:bg-gray-800
                        rounded-lg shadow-xl ring-1 ring-gray-200 dark:ring-gray-700 flex-wrap w-[120px]">
          {POINT_COLORS.map((c) => (
            <button
              key={c}
              className="w-5 h-5 rounded-full hover:scale-125 transition-transform ring-1 ring-gray-200 dark:ring-gray-600"
              style={{ backgroundColor: c }}
              onClick={() => onChange(c)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NumberInput({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <input
      type="number"
      min={0}
      max={100}
      value={value}
      onChange={(e) => {
        const n = parseInt(e.target.value, 10);
        if (!isNaN(n)) onChange(Math.max(0, Math.min(100, n)));
      }}
      aria-label={label}
      className="w-14 px-1.5 py-1 text-xs text-center rounded-md border border-gray-200 dark:border-gray-600
                 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100
                 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />
  );
}

export function DataPanel({
  points,
  showGrid,
  canUndo,
  canRedo,
  onAddPoint,
  onDeletePoint,
  onUpdatePoint,
  onToggleGrid,
  onUndo,
  onRedo,
}: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">Data Points</h2>
        <div className="flex items-center gap-1">
          <button onClick={onUndo} disabled={!canUndo} title="Undo (Ctrl+Z)"
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700
                       disabled:opacity-30 disabled:cursor-not-allowed transition">
            <Undo2 size={15} />
          </button>
          <button onClick={onRedo} disabled={!canRedo} title="Redo (Ctrl+Shift+Z)"
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700
                       disabled:opacity-30 disabled:cursor-not-allowed transition">
            <Redo2 size={15} />
          </button>
          <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />
          <button onClick={onToggleGrid} title="Toggle grid"
            className={`p-1.5 rounded-md transition ${
              showGrid
                ? "text-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}>
            <Grid3X3 size={15} />
          </button>
          <button onClick={onAddPoint} title="Add point"
            className="p-1.5 rounded-md text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
            <Plus size={15} />
          </button>
        </div>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[28px_1fr_52px_52px_28px_28px] gap-1.5 items-center px-1 py-2
                      text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        <span />
        <span>Label</span>
        <span className="text-center">X</span>
        <span className="text-center">Y</span>
        <span />
        <span />
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1 -mr-1">
        {points.length === 0 && (
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-8">
            No data points yet. Click + to add one.
          </p>
        )}
        {points.map((point) => (
          <div
            key={point.id}
            className={`grid grid-cols-[28px_1fr_52px_52px_28px_28px] gap-1.5 items-center px-1 py-1.5
                        rounded-lg transition ${
                          point.visible
                            ? "bg-white dark:bg-gray-800"
                            : "bg-gray-50 dark:bg-gray-800/50 opacity-50"
                        }`}
          >
            <ColorDot color={point.color} onChange={(c) => onUpdatePoint(point.id, { color: c })} />

            <input
              value={point.label}
              onChange={(e) => onUpdatePoint(point.id, { label: e.target.value })}
              className="text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-gray-600
                         bg-transparent text-gray-800 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-blue-400 transition w-full"
            />

            <NumberInput
              value={point.x}
              onChange={(x) => onUpdatePoint(point.id, { x })}
              label={`${point.label} X`}
            />
            <NumberInput
              value={point.y}
              onChange={(y) => onUpdatePoint(point.id, { y })}
              label={`${point.label} Y`}
            />

            <button
              onClick={() => onUpdatePoint(point.id, { visible: !point.visible })}
              title={point.visible ? "Hide" : "Show"}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {point.visible ? <Eye size={13} /> : <EyeOff size={13} />}
            </button>

            <button
              onClick={() => onDeletePoint(point.id)}
              title="Delete"
              className="p-1 rounded-md text-gray-400 hover:text-red-500
                         hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
