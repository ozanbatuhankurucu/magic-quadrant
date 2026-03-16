import { useCallback, useRef, useState } from 'react'
import type { Point, QuadrantConfig } from '../types'
import { CHART } from '../constants'
import { clamp } from '../utils'

interface Props {
  points: Point[]
  config: QuadrantConfig
  showGrid: boolean
  onMovePoint: (id: string, x: number, y: number) => void
  chartRef: React.Ref<HTMLDivElement>
}

const { padding, areaWidth, areaHeight, viewBoxWidth, viewBoxHeight } = CHART

function toSvgX(value: number) {
  return padding.left + (value / 100) * areaWidth
}

function toSvgY(value: number) {
  return padding.top + areaHeight - (value / 100) * areaHeight
}

function fromSvg(clientX: number, clientY: number, svg: SVGSVGElement): { x: number; y: number } {
  const rect = svg.getBoundingClientRect()
  const scaleX = viewBoxWidth / rect.width
  const scaleY = viewBoxHeight / rect.height
  const svgX = (clientX - rect.left) * scaleX
  const svgY = (clientY - rect.top) * scaleY
  const x = ((svgX - padding.left) / areaWidth) * 100
  const y = ((areaHeight - (svgY - padding.top)) / areaHeight) * 100
  return { x: clamp(Math.round(x), 0, 100), y: clamp(Math.round(y), 0, 100) }
}

export function MagicQuadrant({ points, config, showGrid, onMovePoint, chartRef }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dragging, setDragging] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const midX = padding.left + areaWidth / 2
  const midY = padding.top + areaHeight / 2
  const right = padding.left + areaWidth
  const bottom = padding.top + areaHeight

  const handlePointerDown = useCallback((id: string, e: React.PointerEvent) => {
    e.preventDefault()
    ;(e.target as Element).setPointerCapture(e.pointerId)
    setDragging(id)
  }, [])

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || !svgRef.current) return
      const { x, y } = fromSvg(e.clientX, e.clientY, svgRef.current)
      onMovePoint(dragging, x, y)
    },
    [dragging, onMovePoint]
  )

  const handlePointerUp = useCallback(() => {
    setDragging(null)
  }, [])

  const visiblePoints = points.filter((p) => p.visible)

  return (
    <div ref={chartRef} className='w-full max-w-[720px] aspect-[640/580]'>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className='w-full h-full select-none'
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}>
        {/* Quadrant backgrounds */}
        <rect
          x={padding.left}
          y={padding.top}
          width={areaWidth / 2}
          height={areaHeight / 2}
          className='fill-quadrant-challengers dark:fill-quadrant-challengers-dark'
          opacity={0.5}
        />
        <rect
          x={midX}
          y={padding.top}
          width={areaWidth / 2}
          height={areaHeight / 2}
          className='fill-quadrant-leaders dark:fill-quadrant-leaders-dark'
          opacity={0.5}
        />
        <rect
          x={padding.left}
          y={midY}
          width={areaWidth / 2}
          height={areaHeight / 2}
          className='fill-quadrant-niche dark:fill-quadrant-niche-dark'
          opacity={0.5}
        />
        <rect
          x={midX}
          y={midY}
          width={areaWidth / 2}
          height={areaHeight / 2}
          className='fill-quadrant-visionaries dark:fill-quadrant-visionaries-dark'
          opacity={0.5}
        />

        {/* Grid lines */}
        {showGrid &&
          Array.from({ length: 9 }, (_, i) => {
            const pct = (i + 1) * 10
            const gx = toSvgX(pct)
            const gy = toSvgY(pct)
            return (
              <g key={i}>
                <line
                  x1={gx}
                  y1={padding.top}
                  x2={gx}
                  y2={bottom}
                  className='stroke-gray-300 dark:stroke-gray-600'
                  strokeWidth={0.5}
                  strokeDasharray='4 4'
                />
                <line
                  x1={padding.left}
                  y1={gy}
                  x2={right}
                  y2={gy}
                  className='stroke-gray-300 dark:stroke-gray-600'
                  strokeWidth={0.5}
                  strokeDasharray='4 4'
                />
              </g>
            )
          })}

        {/* Center axes */}
        <line
          x1={midX}
          y1={padding.top}
          x2={midX}
          y2={bottom}
          className='stroke-gray-400 dark:stroke-gray-500'
          strokeWidth={1.5}
        />
        <line
          x1={padding.left}
          y1={midY}
          x2={right}
          y2={midY}
          className='stroke-gray-400 dark:stroke-gray-500'
          strokeWidth={1.5}
        />

        {/* Border */}
        <rect
          x={padding.left}
          y={padding.top}
          width={areaWidth}
          height={areaHeight}
          fill='none'
          className='stroke-gray-400 dark:stroke-gray-500'
          strokeWidth={1.5}
        />

        {/* Quadrant labels */}
        <text
          x={padding.left + areaWidth * 0.25}
          y={padding.top + areaHeight * 0.12}
          textAnchor='middle'
          className='fill-gray-400 dark:fill-gray-500'
          fontSize={14}
          fontWeight={600}>
          {config.topLeft}
        </text>
        <text
          x={padding.left + areaWidth * 0.75}
          y={padding.top + areaHeight * 0.12}
          textAnchor='middle'
          className='fill-gray-400 dark:fill-gray-500'
          fontSize={14}
          fontWeight={600}>
          {config.topRight}
        </text>
        <text
          x={padding.left + areaWidth * 0.25}
          y={padding.top + areaHeight * 0.92}
          textAnchor='middle'
          className='fill-gray-400 dark:fill-gray-500'
          fontSize={14}
          fontWeight={600}>
          {config.bottomLeft}
        </text>
        <text
          x={padding.left + areaWidth * 0.75}
          y={padding.top + areaHeight * 0.92}
          textAnchor='middle'
          className='fill-gray-400 dark:fill-gray-500'
          fontSize={14}
          fontWeight={600}>
          {config.bottomRight}
        </text>

        {/* Axis labels */}
        <text
          x={midX}
          y={viewBoxHeight - 8}
          textAnchor='middle'
          className='fill-gray-600 dark:fill-gray-300'
          fontSize={13}
          fontWeight={500}>
          {config.xAxis} →
        </text>
        <text
          transform={`rotate(-90) translate(${-(padding.top + areaHeight / 2)}, 16)`}
          textAnchor='middle'
          className='fill-gray-600 dark:fill-gray-300'
          fontSize={13}
          fontWeight={500}>
          {config.yAxis} →
        </text>

        {/* Tick labels */}
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={`tick-${v}`}>
            <text
              x={toSvgX(v)}
              y={bottom + 18}
              textAnchor='middle'
              className='fill-gray-400 dark:fill-gray-500'
              fontSize={10}>
              {v}
            </text>
            <text
              x={padding.left - 10}
              y={toSvgY(v) + 4}
              textAnchor='end'
              className='fill-gray-400 dark:fill-gray-500'
              fontSize={10}>
              {v}
            </text>
          </g>
        ))}

        {/* Points */}
        {visiblePoints.map((point) => {
          const cx = toSvgX(point.x)
          const cy = toSvgY(point.y)
          const isHovered = hoveredId === point.id
          const isDragging = dragging === point.id
          return (
            <g key={point.id} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
              {(isHovered || isDragging) && <circle cx={cx} cy={cy} r={14} fill={point.color} opacity={0.15} />}
              <circle
                cx={cx}
                cy={cy}
                r={8}
                fill={point.color}
                stroke='#fff'
                strokeWidth={2}
                className='drop-shadow-sm'
                onPointerDown={(e) => handlePointerDown(point.id, e)}
                onPointerEnter={() => setHoveredId(point.id)}
                onPointerLeave={() => setHoveredId(null)}
              />
              <text
                x={cx}
                y={cy - 14}
                textAnchor='middle'
                className='fill-gray-700 dark:fill-gray-200 pointer-events-none'
                fontSize={11}
                fontWeight={500}>
                {point.label}
              </text>

              {isHovered &&
                !isDragging &&
                (() => {
                  const tw = 140,
                    th = 32,
                    gap = 12
                  const tx = cx + gap + tw > right ? cx - gap - tw : cx + gap
                  const ty = cy - th - 4 < padding.top ? cy + gap : cy - th - 4
                  return (
                    <g className='pointer-events-none'>
                      <rect
                        x={tx}
                        y={ty}
                        width={tw}
                        height={th}
                        rx={6}
                        className='fill-gray-800 dark:fill-gray-200'
                        opacity={0.92}
                      />
                      <text
                        x={tx + tw / 2}
                        y={ty + th / 2 + 4}
                        textAnchor='middle'
                        className='fill-white dark:fill-gray-900'
                        fontSize={10}
                        fontWeight={500}>
                        Vision: {point.x} | Execute: {point.y}
                      </text>
                    </g>
                  )
                })()}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
