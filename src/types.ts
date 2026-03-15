export interface Point {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  visible: boolean;
}

export interface QuadrantConfig {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  xAxis: string;
  yAxis: string;
}

export interface HistoryState {
  past: Point[][];
  present: Point[];
  future: Point[][];
}
