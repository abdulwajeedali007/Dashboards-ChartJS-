import  { useMemo } from 'react';
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
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  TimeScale,
);

type Phase = {
  id: number;
  phase: string;
  startDate: string;
  endDate: string;
  statusDate: string;
  units: number;
  revenue: string;
  status: 'completed' | 'inprogress' | 'delay';
};

type Cluster = {
  id: number;
  cluster: string;
  phases: Phase[];
};

type Project = {
  id: number;
  projectName: string;
  expanded: boolean;
  clusters: Cluster[];
};

const timelineTasks: Project[] = [
  {
    id: 1,
    projectName: 'Domino Growth',
    expanded: true,
    clusters: [
      {
        id: 11,
        cluster: 'Cluster A',
        phases: [
          {
            id: 111,
            phase: 'Marketing Launch',
            startDate: '2026-01-10',
            endDate: '2026-03-12',
            statusDate: '2026-02-15',
            units: 120,
            revenue: '120,000 AED',
            status: 'completed',
          },
          {
            id: 112,
            phase: 'Booking Launch',
            startDate: '2026-03-15',
            endDate: '2026-04-20',
            statusDate: '2026-03-20',
            units: 220,
            revenue: '220,000 AED',
            status: 'inprogress',
          },
        ],
      },
      {
        id: 12,
        cluster: 'Cluster B',
        phases: [
          {
            id: 121,
            phase: 'Marketing Launch',
            startDate: '2026-02-01',
            endDate: '2026-04-10',
            statusDate: '2026-03-01',
            units: 180,
            revenue: '180,000 AED',
            status: 'delay',
          },
          {
            id: 122,
            phase: 'Booking Launch',
            startDate: '2026-04-15',
            endDate: '2026-06-01',
            statusDate: '2026-05-01',
            units: 260,
            revenue: '260,000 AED',
            status: 'inprogress',
          },
        ],
      },
    ],
  },

  {
    id: 2,
    projectName: 'Skyline Expansion',
    expanded: true,
    clusters: [
      {
        id: 21,
        cluster: 'Cluster X',
        phases: [
          {
            id: 211,
            phase: 'Marketing Launch',
            startDate: '2026-02-20',
            endDate: '2026-04-18',
            statusDate: '2026-03-20',
            units: 150,
            revenue: '150,000 AED',
            status: 'completed',
          },
          {
            id: 212,
            phase: 'Booking Launch',
            startDate: '2026-04-22',
            endDate: '2026-06-20',
            statusDate: '2026-05-10',
            units: 320,
            revenue: '320,000 AED',
            status: 'inprogress',
          },
        ],
      },

      {
        id: 22,
        cluster: 'Cluster Y',
        phases: [
          {
            id: 221,
            phase: 'Marketing Launch',
            startDate: '2026-01-25',
            endDate: '2026-03-30',
            statusDate: '2026-02-25',
            units: 175,
            revenue: '175,000 AED',
            status: 'delay',
          },
          {
            id: 222,
            phase: 'Booking Launch',
            startDate: '2026-04-05',
            endDate: '2026-06-15',
            statusDate: '2026-05-12',
            units: 280,
            revenue: '280,000 AED',
            status: 'completed',
          },
        ],
      },
    ],
  },

  {
    id: 3,
    projectName: 'Elite Residency',
    expanded: true,
    clusters: [
      {
        id: 31,
        cluster: 'Cluster Alpha',
        phases: [
          {
            id: 311,
            phase: 'Marketing Launch',
            startDate: '2026-01-05',
            endDate: '2026-02-28',
            statusDate: '2026-02-01',
            units: 110,
            revenue: '110,000 AED',
            status: 'completed',
          },
          {
            id: 312,
            phase: 'Booking Launch',
            startDate: '2026-03-05',
            endDate: '2026-04-25',
            statusDate: '2026-03-20',
            units: 210,
            revenue: '210,000 AED',
            status: 'inprogress',
          },
        ],
      },

      {
        id: 32,
        cluster: 'Cluster Beta',
        phases: [
          {
            id: 321,
            phase: 'Marketing Launch',
            startDate: '2026-02-10',
            endDate: '2026-04-05',
            statusDate: '2026-03-05',
            units: 145,
            revenue: '145,000 AED',
            status: 'delay',
          },
          {
            id: 322,
            phase: 'Booking Launch',
            startDate: '2026-04-10',
            endDate: '2026-06-10',
            statusDate: '2026-05-15',
            units: 290,
            revenue: '290,000 AED',
            status: 'completed',
          },
        ],
      },

      {
        id: 33,
        cluster: 'Cluster Gamma',
        phases: [
          {
            id: 331,
            phase: 'Marketing Launch',
            startDate: '2026-03-01',
            endDate: '2026-05-01',
            statusDate: '2026-04-01',
            units: 165,
            revenue: '165,000 AED',
            status: 'inprogress',
          },
          {
            id: 332,
            phase: 'Booking Launch',
            startDate: '2026-05-05',
            endDate: '2026-07-01',
            statusDate: '2026-06-01',
            units: 340,
            revenue: '340,000 AED',
            status: 'delay',
          },
        ],
      },
    ],
  },
];
const ROW_HEIGHT = 56;

export default function Index() {
  const visibleTasks = useMemo(() => {
    return timelineTasks.flatMap((project) =>
      project.clusters.flatMap((cluster) =>
        cluster.phases.map((phase) => ({
          ...phase,
          projectName: project.projectName,
          cluster: cluster.cluster,
        })),
      ),
    );
  }, []);

  // One row per cluster
  const clusterRows = useMemo(() => {
    return timelineTasks.flatMap((project) =>
      project.clusters.map((cluster) => {
        const marketing = cluster.phases.find((p) =>
          p.phase.toLowerCase().includes('marketing'),
        );

        const booking = cluster.phases.find((p) =>
          p.phase.toLowerCase().includes('booking'),
        );

        return {
          id: cluster.id,
          projectName: project.projectName,
          clusterName: cluster.cluster,

          units: marketing?.units ?? booking?.units ?? 0,

          marketingEnd: marketing?.endDate ?? '-',

          bookingEnd: booking?.endDate ?? '-',

          unitsSold: booking?.units ?? marketing?.units ?? 0,

          priceInAED: booking?.revenue ?? marketing?.revenue ?? '-',
        };
      }),
    );
  }, []);

  const chartHeight = clusterRows.length * ROW_HEIGHT;

  const xAxisBackgroundPlugin = {
    id: 'xAxisBackground',

    beforeDraw(chart: any) {
      const { ctx, chartArea, scales } = chart;
      const xAxis = scales.x;

      ctx.save();

      // draw background under x-axis ticks
      ctx.fillStyle = '#f3f4f6';

      ctx.fillRect(
        chartArea.left,
        xAxis.top,
        chartArea.right - chartArea.left,
        xAxis.height,
      );

      ctx.restore();
    },
  };

  const data = {
    datasets: [
      {
        label: 'Timeline',

        data: visibleTasks.map((task: any) => ({
          x: [new Date(task.startDate), new Date(task.endDate)],

          // SAME CLUSTER ROW
          y: `${task.projectName}__${task.cluster}`,

          phase: task.phase,
          statusDate: task.statusDate,
        })),

        backgroundColor: visibleTasks.map((task: any) =>
          task.phase.toLowerCase().includes('booking') ? '#166534' : '#ffc038',
        ),

        borderRadius: 8,
        borderSkipped: false,
        barThickness: 12,

        grouped: false,

        categoryPercentage: 1,
      },
    ],
  };

  const options: any = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    animation: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label(context: any) {
            const raw = context.raw;

            return `${raw.phase}: ${format(raw.x[0], 'dd MMM yyyy')} → ${format(
              raw.x[1],
              'dd MMM yyyy',
            )}`;
          },
        },
      },
    },

    scales: {
      y: {
        display: true,

        offset: true,

        grid: {
          display: true,
          drawBorder: true,
          // offset: false,
        },
        ticks: {
          display: false, // hide y-axis text
        },

        border: {
          display: false,
        },
      },

      x: {
        type: 'time',
        position: 'top',
        offset: true,
        min: '2026-01-01',
        max: '2026-08-01',

        time: {
          unit: 'month',
        },

        ticks: {
          padding: 24,

          callback(value: any) {
            const date = new Date(value);

            return [
              // format(date, 'dd'),
              format(date, 'MMM'),
              format(date, 'yy'),
            ].join('-');
          },

          color: '#2a2a2a',
          font: {
            size: 12,
            weight: 600,
            family: 'Poppins',
          },
        },

        grid: {
          color: '#e5e7eb',
        },
      },
    },
  };

  return (
    <>
      <div className="flex mb-6 gap-5 justify-center">
        <div className="flex gap-2 items-center">
          <span className="w-10 h-3 bg-yellow-600 rounded"></span>
          <p className="text-base">Marketing Launch</p>
        </div>
        <div className="flex gap-2 items-center">
          <span className="w-10 h-3 bg-green-800 rounded"></span>
          <p className="text-base">Booking Launch</p>
        </div>
      </div>
      <div className="rounded border border-gray-200 bg-white shadow-sm overflow-x-auto">
        <div className="flex min-w-[1400px] md:grid md:grid-cols-12">
          {/* LEFT TABLE */}
          <div className="border-r border-gray-200 bg-white md:col-span-6">
            {/* HEADER */}
            <div className="grid grid-cols-6 h-[70px] items-center border-b border-gray-200 bg-gray-100 px-2 text-[10px] font-bold text-gray-700 sticky top-0 z-30 sm:px-4 sm:text-[12px]">
              <div>Project / Cluster</div>
              <div>No of Units</div>
              <div>Marketing Launch Ends</div>
              <div>Booking Launch Ends</div>
              <div>No of Units Sold</div>
              <div>Price in AED</div>
            </div>

            {/* BODY */}
            {timelineTasks.map((project) => (
              <div key={project.id}>
                {/* PROJECT HEADER */}
                <div className="border-b border-gray-200 bg-gray-100 px-2 py-0 text-[12px] font-semibold text-gray-800 sm:text-sm sm:px-4">
                  {project.projectName}
                </div>

                {/* CLUSTERS */}
                {project.clusters.map((cluster) => {
                  const row = clusterRows.find((r) => r.id === cluster.id);

                  return (
                    <div
                      key={cluster.id}
                      className="grid grid-cols-6 items-center border-b border-gray-100 px-2 h-[56px] text-xs sm:px-4"
                    >
                      <div className="pl-1 text-gray-700 sm:pl-5">
                        {cluster.cluster}
                      </div>

                      <div>{row?.units}</div>

                      <div>
                        {row?.marketingEnd !== '-'
                          ? format(new Date(row!.marketingEnd), 'dd MMM yyyy')
                          : '-'}
                      </div>

                      <div>
                        {row?.bookingEnd !== '-'
                          ? format(new Date(row!.bookingEnd), 'dd MMM yyyy')
                          : '-'}
                      </div>

                      <div>{row?.unitsSold}</div>

                      <div>{row?.priceInAED}</div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* RIGHT TIMELINE */}
          <div className="w-full bg-white md:col-span-6">
            <div
              style={{
                height: chartHeight + 110,
              }}
            >
              <Bar
                data={data}
                options={options}
                plugins={[xAxisBackgroundPlugin]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
