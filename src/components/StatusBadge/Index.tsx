import { Calendar, CircleCheckBig, Clock7 } from 'lucide-react';

type Status = 'completed' | 'inprogress' | 'notstarted' | 'delay';

const statusConfig: Record<
  Status,
  {
    label: string;
    className: string;
    Icon: any;
    iconProps?: any;
  }
> = {
  completed: {
    label: 'Completed',
    className: 'bg-green-100 text-green-600',
    Icon: CircleCheckBig,
    iconProps: {
      fill: 'currentColor',
      stroke: 'white',
    },
  },
  inprogress: {
    label: 'In Progress',
    className: 'bg-yellow-200 text-yellow-600',
    Icon: Calendar,
  },
  delay: {
    label: 'Delay',
    className: 'bg-slate-200 text-slate-600',
    Icon: Clock7,
  },
  notstarted: {
    label: 'Not Started',
    className: 'bg-slate-200 text-slate-600',
    Icon: Clock7,
  },
};

function StatusBadge({ status = 'notstarted' }: { status?: Status }) {
  const config = statusConfig[status];

  const Icon = config.Icon;

  return (
    <div
      className={`inline-flex items-center gap-1 px-1 py-0.5 rounded ${config.className}`}
    >
      <Icon size={8} strokeWidth={1.5} {...config.iconProps} />
      <p className="text-[6px]">{config.label}</p>
    </div>
  );
}

export default StatusBadge;
