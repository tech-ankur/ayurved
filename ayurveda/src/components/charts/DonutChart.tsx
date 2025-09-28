"use client"

interface DonutChartData {
  label: string;
  value: number;
  color?: string;
}

interface DonutChartProps {
  data?: DonutChartData[];
  size?: number;
  thickness?: number;
}

// Default colors now pull from your CSS theme variables
const defaultColors = ["var(--brand)", "var(--accent)", "var(--success)", "var(--danger)"];

export default function DonutChart({ data = [], size = 200, thickness = 26 }: DonutChartProps) {
  const total = Math.max(
    1,
    data.reduce((s, d) => s + d.value, 0),
  )
  const r = (size - thickness) / 2
  let acc = 0

  return (
    <div className="chart-container">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Distribution chart">
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle r={r} fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth={thickness} />
          {data.map((d, i) => {
            const a0 = (acc / total) * 2 * Math.PI - Math.PI / 2
            const a1 = ((acc + d.value) / total) * 2 * Math.PI - Math.PI / 2
            acc += d.value
            const large = a1 - a0 > Math.PI ? 1 : 0
            const p0 = [Math.cos(a0) * r, Math.sin(a0) * r]
            const p1 = [Math.cos(a1) * r, Math.sin(a1) * r]
            const path = `
              M ${p0[0]} ${p0[1]}
              A ${r} ${r} 0 ${large} 1 ${p1[0]} ${p1[1]}
            `
            const stroke = d.color || defaultColors[i % defaultColors.length]
            return <path key={i} d={path} fill="none" stroke={stroke} strokeWidth={thickness} strokeLinecap="round" />
          })}
        </g>
      </svg>
      
      <div className="chart-legend">
        {data.map((d, i) => (
          <div key={i} className="legend-item">
            <div
              className="legend-swatch"
              style={{ background: d.color || defaultColors[i % defaultColors.length] }}
            />
            <span className="subtle">{d.label}: {d.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}