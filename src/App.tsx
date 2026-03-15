import { useCallback, useEffect, useRef, useState } from "react";
import type { Point } from "./types";
import { DEFAULT_QUADRANT_CONFIG, SAMPLE_POINTS, STORAGE_KEY } from "./constants";
import { createPoint, exportAsJson, exportAsPng, importFromJson } from "./utils";
import { useUndoRedo } from "./hooks/useUndoRedo";
import { useDarkMode } from "./hooks/useDarkMode";
import { Header } from "./components/Header";
import { MagicQuadrant } from "./components/MagicQuadrant";
import { DataPanel } from "./components/DataPanel";

function loadPoints(): Point[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed as Point[];
    }
  } catch { /* use defaults */ }
  return SAMPLE_POINTS;
}

export default function App() {
  const { dark, toggle: toggleDark } = useDarkMode();
  const { state: points, set: setPoints, undo, redo, canUndo, canRedo, reset } = useUndoRedo(loadPoints());
  const [showGrid, setShowGrid] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(points));
  }, [points]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  const handleAddPoint = useCallback(() => {
    setPoints([...points, createPoint(points)]);
  }, [points, setPoints]);

  const handleDeletePoint = useCallback(
    (id: string) => {
      setPoints(points.filter((p) => p.id !== id));
    },
    [points, setPoints],
  );

  const handleUpdatePoint = useCallback(
    (id: string, updates: Partial<Point>) => {
      setPoints(points.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    },
    [points, setPoints],
  );

  const handleMovePoint = useCallback(
    (id: string, x: number, y: number) => {
      setPoints(points.map((p) => (p.id === id ? { ...p, x, y } : p)));
    },
    [points, setPoints],
  );

  const handleExportPng = useCallback(async () => {
    if (chartRef.current) {
      try {
        await exportAsPng(chartRef.current);
      } catch (err) {
        console.error("PNG export failed:", err);
      }
    }
  }, []);

  const handleExportJson = useCallback(() => {
    exportAsJson(points);
  }, [points]);

  const handleImportJson = useCallback(
    async (file: File) => {
      try {
        const imported = await importFromJson(file);
        reset(imported);
      } catch (err) {
        console.error("Import failed:", err);
      }
    },
    [reset],
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Header
        dark={dark}
        onToggleDark={toggleDark}
        onExportPng={handleExportPng}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
      />

      <main className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
        {/* Chart */}
        <section className="flex-1 flex items-start justify-center">
          <div className="w-full max-w-[720px] bg-white dark:bg-gray-800 rounded-2xl shadow-sm
                          ring-1 ring-gray-200 dark:ring-gray-700 p-4">
            <MagicQuadrant
              points={points}
              config={DEFAULT_QUADRANT_CONFIG}
              showGrid={showGrid}
              onMovePoint={handleMovePoint}
              chartRef={chartRef}
            />
          </div>
        </section>

        {/* Side panel */}
        <aside className="w-full lg:w-[360px] lg:min-w-[360px]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm
                          ring-1 ring-gray-200 dark:ring-gray-700 p-4 h-full max-h-[calc(100vh-120px)]
                          lg:sticky lg:top-[72px]">
            <DataPanel
              points={points}
              showGrid={showGrid}
              canUndo={canUndo}
              canRedo={canRedo}
              onAddPoint={handleAddPoint}
              onDeletePoint={handleDeletePoint}
              onUpdatePoint={handleUpdatePoint}
              onToggleGrid={() => setShowGrid((g) => !g)}
              onUndo={undo}
              onRedo={redo}
            />
          </div>
        </aside>
      </main>
    </div>
  );
}
