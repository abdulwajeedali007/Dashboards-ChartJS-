import { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChevronDown, ChevronRight } from 'lucide-react';

import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  TimeScale,
);

const statusColors: Record<string, string> = {
  completed: '#166534',
  inprogress: '#60a460',
  delay: '#ffc038',
  notstarted: '#9CA3AF',
};

// ---------------- YOUR EXISTING PLUGINS (UNCHANGED) ----------------
const timelineLabelPlugin = {
  id: 'timelineLabelPlugin',

  afterDatasetsDraw(chart: any) {
    const { ctx } = chart;

    chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
      const meta = chart.getDatasetMeta(datasetIndex);

      meta.data.forEach((bar: any, index: number) => {
        const task = dataset.data[index];

        const centerX = (bar.base + bar.x) / 2;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.font = '8px Poppins';
        ctx.fillStyle = '#4B5563';

        ctx.fillText(task.phase, centerX, bar.y + 16);

        ctx.fillStyle = '#9CA3AF';
        ctx.fillText(task.statusDate, centerX, bar.y + 26);

        ctx.restore();
      });
    });
  },
};

const circleNodePlugin = {
  id: 'circleNodePlugin',

  afterDatasetsDraw(chart: any) {
    const { ctx } = chart;

    const dataset = chart.data.datasets[0];
    const meta = chart.getDatasetMeta(0);

    ctx.save();

    for (let i = 0; i < meta.data.length - 1; i++) {
      const currentBar = meta.data[i];
      const nextBar = meta.data[i + 1];

      const currentTask = dataset.data[i];
      const nextTask = dataset.data[i + 1];

      if (currentTask.y === nextTask.y) {
        const circleX = (currentBar.x + nextBar.base) / 2;
        const circleY = currentBar.y;

        ctx.beginPath();
        ctx.arc(circleX, circleY, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#E5E7EB';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(circleX, circleY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#6B7280';
        ctx.fill();
      }
    }

    ctx.restore();
  },
};

// ---------------- MAIN COMPONENT ----------------
export default function TimelineChart({ timelineTasks }: any) {
  const [expandedProjects, setExpandedProjects] = useState<
    Record<number, boolean>
  >(
    timelineTasks.reduce((acc: any, item: any) => {
      acc[item.id] = item.expanded;
      return acc;
    }, {}),
  );

  const toggleProject = (id: number) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ---------------- 🔥 FIXED FLATTEN DATA ----------------
  const visibleTasks = useMemo(() => {
    return timelineTasks.flatMap((project: any) => {
      if (!expandedProjects[project.id]) return [];

      return project.clusters.flatMap((cluster: any) =>
        cluster.phases.map((phase: any) => ({
          ...phase,
          cluster: cluster.cluster,
          projectName: project.projectName, // ✅ FIX 1 (IMPORTANT)
        })),
      );
    });
  }, [timelineTasks, expandedProjects]);

  // ---------------- 🔥 FIXED DATA MAPPING ----------------
  const data = {
    datasets: [
      {
        label: 'Timeline',

        data: visibleTasks.map((task: any) => ({
          x: [task.startDate, task.endDate],

          // 🔥 FIX 2 (MOST IMPORTANT LINE)
          y: `${task.projectName}__${task.cluster}`,

          phase: task.phase,
          statusDate: task.statusDate,
        })),

        backgroundColor: visibleTasks.map(
          (task: any) => statusColors[task.status],
        ),

        borderRadius: 8,
        borderSkipped: false,
        barThickness: 4,
      },
    ],
  };

  // ---------------- OPTIONS (UNCHANGED) ----------------
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',

    plugins: {
      legend: { display: false },

      tooltip: {
        bodyFont: { size: 8 },
        titleFont: { size: 8 },

        callbacks: {
          label: (context: any) => {
            const raw = context.raw;
            return [raw.phase, `Start: ${raw.x[0]}`, `End: ${raw.x[1]}`];
          },
        },
      },
    },

    scales: {
      x: {
        type: 'time',
        time: { unit: 'month' },
        position: 'top',
        min: '2026-04-10',
        grid: { color: '#F3F4F6' },
        ticks: {
          color: '#333333',
          font: {
            size: 8,
            weight: '600',
            family: 'Poppins',
          },
        },
      },

      y: {
        ticks: {
          display: false, // (UNCHANGED)
        },
        grid: {},
      },
    },
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* LEFT SIDE (UNCHANGED) */}
      <div className="col-span-2 mt-3">
        {timelineTasks.map((project: any) => (
          <div key={project.id}>
            <button
              onClick={() => toggleProject(project.id)}
              className="flex items-center gap-1 mt-2 text-[8px] font-medium"
            >
              {expandedProjects[project.id] ? (
                <ChevronDown size={12} />
              ) : (
                <ChevronRight size={12} />
              )}

              {project.projectName}
            </button>

            {expandedProjects[project.id] && (
              <div className="mt-2 space-y-3 pl-8">
                {project.clusters.map((cluster: any) => (
                  <div key={cluster.id} className="text-[8px]">
                    {cluster.cluster}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE (UNCHANGED) */}
      <div className="col-span-10 h-[300px] overflow-hidden">
        <div className="overflow-x-auto h-screen">
          <Bar
            data={data}
            options={options}
            plugins={[timelineLabelPlugin, circleNodePlugin]}
          />
        </div>
      </div>
    </div>
  );
}
