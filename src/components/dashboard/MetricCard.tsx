import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  color: 'purple' | 'green' | 'orange' | 'blue';
}

const colorClasses = {
  purple: 'bg-[hsl(var(--metric-purple))] text-[hsl(var(--metric-purple-foreground))]',
  green: 'bg-[hsl(var(--metric-green))] text-[hsl(var(--metric-green-foreground))]',
  orange: 'bg-[hsl(var(--metric-orange))] text-[hsl(var(--metric-orange-foreground))]',
  blue: 'bg-[hsl(var(--metric-blue))] text-[hsl(var(--metric-blue-foreground))]',
};

export const MetricCard = ({ label, value, icon: Icon, color }: MetricCardProps) => {
  return (
    <Card className={`p-6 ${colorClasses[color]}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium opacity-80">{label}</p>
          <p className="text-4xl font-bold">{value}</p>
        </div>
        <div className="rounded-full bg-white/20 p-3">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  );
};
