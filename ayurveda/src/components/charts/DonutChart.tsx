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

export default function DonutChart({ data = [], size = 200, thickness = 26 }: DonutChartProps) {
  const total = Math.max(
    1,
    data.reduce((s, d) => s + d.value, 0),
  )
  const r = (size - thickness) / 2
  let acc = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="distribution chart">
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={r} fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth={thickness} />
        {data.map((d, i) => {
          const a0 = (acc / total) * 2 * Math.PI
          const a1 = ((acc + d.value) / total) * 2 * Math.PI
          acc += d.value
          const large = a1 - a0 > Math.PI ? 1 : 0
          const p0 = [Math.cos(a0) * r, Math.sin(a0) * r]
          const p1 = [Math.cos(a1) * r, Math.sin(a1) * r]
          const path = `
            M ${p0[0]} ${p0[1]}
            A ${r} ${r} 0 ${large} 1 ${p1[0]} ${p1[1]}
          `
          const stroke = d.color || ["#0f766e", "#e07a1f", "#17a673", "#e25656"][i % 4]
          return <path key={i} d={path} fill="none" stroke={stroke} strokeWidth={thickness} strokeLinecap="round" />
        })}
        <circle r={r - thickness / 2} fill="transparent" />
      </g>
      <g transform={`translate(12, 12)`}>
        {data.map((d, i) => (
          <g key={i} transform={`translate(0, ${i * 22})`}>
            <rect
              width="14"
              height="14"
              rx="3"
              ry="3"
              fill={d.color || ["#0f766e", "#e07a1f", "#17a673", "#e25656"][i % 4]}
            />
            <text x="20" y="12" fontSize="12" fill="var(--text)">
              {d.label}: {d.value}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
