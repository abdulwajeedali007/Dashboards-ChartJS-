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

import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  TimeScale,
);
const isMobile = window.innerWidth < 768;
// ---------------- STATUS COLORS ----------------
const statusColors: Record<string, string> = {
  completed: '#166534',
  inprogress: '#60a460',
  delay: '#ffc038',
  notstarted: '#9CA3AF',
};

// ---------------- LABEL PLUGIN ----------------
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
        ctx.font = '14px Poppins';

        ctx.fillStyle = '#4B5563';
        ctx.fillText(task.phase, centerX, bar.y + 24);

        ctx.fillStyle = '#9CA3AF';
        ctx.fillText(task.statusDate, centerX, bar.y + 40);

        ctx.restore();
      });
    });
  },
};

// ---------------- DOT CONNECTOR PLUGIN ----------------
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
        ctx.arc(circleX, circleY, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#E5E7EB';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(circleX, circleY, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#6B7280';
        ctx.fill();
      }
    }

    ctx.restore();
  },
};

// ---------------- GROUP LABEL PLUGIN (INSIDE CHART) ----------------
const projectClusterPlugin = {
  id: 'projectClusterPlugin',

  beforeDatasetsDraw(chart: any) {
    const { ctx, chartArea, scales } = chart;
    const yScale = scales.y;

    ctx.save();

    const seenProjects = new Set();
    const leftX = chartArea.left - 100;

    chart.data.datasets[0].data.forEach((d: any) => {
      const y = yScale.getPixelForValue(d.y);
      const [project, cluster] = d.y.split('__');

      // Draw border for each row
      ctx.strokeStyle = '#E5E7EB'; // border color
      ctx.lineWidth = 1;
      let pfs = isMobile ? 12 : 16;
      // Project label (once)
      if (!seenProjects.has(project)) {
        seenProjects.add(project);
        ctx.fillStyle = '#111827';
        ctx.font = `bold ${pfs}px Poppins`;
        ctx.fillText(project, leftX - 50, y - 16);
      }

      // Cluster label
      ctx.fillStyle = '#6B7280';
      ctx.font = `${pfs}px Poppins`;
      ctx.fillText(cluster, leftX - 35, y + 20);
    });

    ctx.restore();
  },
};

// ---------------- COMPONENT ----------------
export default function TimelineChart({ timelineTasks }: any) {
  const [expandedProjects] = useState<Record<number, boolean>>(
    timelineTasks.reduce((acc: any, item: any) => {
      acc[item.id] = item.expanded;
      return acc;
    }, {}),
  );

  // ---------------- FLATTEN DATA ----------------
  const visibleTasks = useMemo(() => {
    return timelineTasks.flatMap((project: any) => {
      if (!project.expanded) return [];

      return project.clusters.flatMap((cluster: any) =>
        cluster.phases.map((phase: any) => ({
          ...phase,
          cluster: cluster.cluster,
          projectName: project.projectName,
        })),
      );
    });
  }, [timelineTasks, expandedProjects]);

  // ---------------- FIXED Y-AXIS LABELS ----------------
  const yLabels = useMemo(() => {
    const set = new Set<string>();

    timelineTasks.forEach((project: any) => {
      if (!project.expanded) return;

      project.clusters.forEach((cluster: any) => {
        set.add(`${project.projectName}__${cluster.cluster}`);
      });
    });

    return Array.from(set);
  }, [timelineTasks, expandedProjects]);

  // ---------------- DATA ----------------
  const data = {
    datasets: [
      {
        label: 'Timeline',

        data: visibleTasks.map((task: any) => ({
          x: [task.startDate, task.endDate],

          // IMPORTANT FIX (GROUP KEY)
          y: `${task.projectName}__${task.cluster}`,

          phase: task.phase,
          statusDate: task.statusDate,
        })),

        backgroundColor: visibleTasks.map(
          (task: any) => statusColors[task.status],
        ),

        borderRadius: 8,
        borderSkipped: false,
        barThickness: isMobile ? 12 : 18,
        categoryPercentage: 0.5,
      },
    ],
  };

  // ---------------- OPTIONS ----------------
  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',

    plugins: {
      legend: { display: false },
      tooltip: {
        bodyFont: { size: isMobile ? 8 : 10 },
        titleFont: { size: isMobile ? 8 : 10 },
        callbacks: {
          label: (context: any) => {
            const raw = context.raw;
            return [raw.phase, `Start: ${raw.x[0]}`, `End: ${raw.x[1]}`];
          },
        },
      },
    },

    layout: {
      padding: {
        left: isMobile ? 145 : 150, // plugin draws inside chart area
      },
    },

    scales: {
      x: {
        type: 'time',
        time: { unit: 'month' },
        position: 'top',
        min: '2026-01-01',
        max: '2026-12-01',
        bounds: 'ticks', // KEY: aligns ticks to grid for time scale
        // offset: true,
        border: {
          display: false, // KEY: removes left axis line
        },
        grid: {
          color: '#F3F4F6',
        },
        ticks: {
          color: '#2a2a2a',
          font: {
            size: isMobile ? 10 : 12,
            weight: '600',
            family: 'Poppins',
          },
        },
      },

      y: {
        type: 'category',
        labels: yLabels,
        border: {
          display: false, // KEY: removes y-axis line
        },
        ticks: {
          align: 'center',
          display: false,
          offset: false,
        },
        grid: {
          display: true, // Usually you don't want y-grid on timeline
          drawBorder: false,
        },
        offset: true, // keeps bars centered between rows
      },
    },
  };

  return (
    <div className="h-[600px] overflow-x-auto">
      <Bar
        data={data}
        options={options}
        plugins={[timelineLabelPlugin, circleNodePlugin, projectClusterPlugin]}
      />
    </div>
  );
}
