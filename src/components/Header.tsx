import { useRef } from "react";
import {
  Download,
  Image,
  Moon,
  Sun,
  Upload,
} from "lucide-react";

interface Props {
  dark: boolean;
  onToggleDark: () => void;
  onExportPng: () => void;
  onExportJson: () => void;
  onImportJson: (file: File) => void;
}

export function Header({ dark, onToggleDark, onExportPng, onExportJson, onImportJson }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700
                        bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <line x1="8" y1="1" x2="8" y2="15" stroke="white" strokeWidth="1.5" />
            <line x1="1" y1="8" x2="15" y2="8" stroke="white" strokeWidth="1.5" />
            <circle cx="11" cy="4" r="2" fill="white" opacity="0.9" />
            <circle cx="5" cy="6" r="1.5" fill="white" opacity="0.7" />
            <circle cx="12" cy="10" r="1.5" fill="white" opacity="0.6" />
          </svg>
        </div>
        <h1 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
          Magic Quadrant
        </h1>
      </div>

      <div className="flex items-center gap-1">
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onImportJson(file);
              e.target.value = "";
            }
          }}
        />

        <button onClick={() => fileRef.current?.click()} title="Import JSON"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300
                     rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Upload size={14} />
          <span className="hidden sm:inline">Import</span>
        </button>
        <button onClick={onExportJson} title="Export JSON"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300
                     rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Download size={14} />
          <span className="hidden sm:inline">JSON</span>
        </button>
        <button onClick={onExportPng} title="Export as PNG"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300
                     rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Image size={14} />
          <span className="hidden sm:inline">PNG</span>
        </button>

        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

        <button onClick={onToggleDark} title={dark ? "Light mode" : "Dark mode"}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400
                     hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
