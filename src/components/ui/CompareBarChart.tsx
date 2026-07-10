import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '@/lib/utils';

export type CompareBarPoint = {
  name: string;
  value: number;
  fill?: string;
};

export function CompareBarChart({
  data,
  unit,
  className,
  height = 280,
}: {
  data: CompareBarPoint[];
  unit?: string;
  className?: string;
  height?: number;
}) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Sin datos para mostrar en este recorte.
      </p>
    );
  }

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 8, right: 16, top: 8, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="name"
            width={88}
            tick={{ fontSize: 11 }}
          />
          <Tooltip
            formatter={(value) =>
              unit
                ? [`${Number(value).toLocaleString('es')} ${unit}`, 'Valor']
                : [Number(value).toLocaleString('es'), 'Valor']
            }
          />
          <Bar
            dataKey="value"
            radius={[0, 4, 4, 0]}
            fill="var(--color-link, #3b82f6)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
