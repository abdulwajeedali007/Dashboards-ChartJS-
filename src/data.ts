import type { Task } from './Types';
export const tasksProgress: Task[] = [
  {
    id: 1,
    name: 'Tracker Initiation & Upload Documents by Design & Concept',
    startDate: '2026-05-07',
    endDate: '2026-08-17',
    progress: 100,
    status: 'completed',
    updatedBy: 'Kautuk Shet',
    lastUpdated: '2026-05-05',
  },
  {
    id: 2,
    name: 'D&C HOD Approve F&A',
    startDate: '2026-06-03',
    endDate: '2026-09-10',
    progress: 60,
    status: 'inprogress',
    updatedBy: 'Muthyala Srujan',
    lastUpdated: '2026-05-07',
  },
  {
    id: 3,
    name: 'Budgeting HOD Approve F&A',
    startDate: '2026-05-10',
    endDate: '2026-08-12',
    progress: 20,
    status: 'delay',
    updatedBy: 'Rajesh',
    lastUpdated: '2026-08-12',
  },
  {
    id: 4,
    name: 'Technical DesignHOD Approve F&A',
    startDate: '2026-05-06',
    endDate: '2026-08-15',
    progress: 40,
    status: 'inprogress',
    updatedBy: 'Raviteja Dhanukonda',
    lastUpdated: '2026-05-09',
  },
  {
    id: 5,
    name: 'Property ID and Location ID Creation',
    startDate: '2026-05-10',
    endDate: '',
    progress: 0,
    status: 'notstarted',
    updatedBy: '',
    lastUpdated: '2026-05-10',
  },
];

export const timelineTasks = [
  {
    id: 1,
    projectName: 'Damac Growth',
    expanded: true,
    clusters: [
      {
        id: 11,
        cluster: 'Cluster 1',
        phases: [
          {
            id: 111,
            phase: 'Launch Planned',
            startDate: '2026-03-01',
            endDate: '2026-06-10',
            statusDate: '14 Jan 2026',
            status: 'delay',
          },
          {
            id: 112,
            phase: 'Marketing Ready',
            startDate: '2026-06-11',
            endDate: '2026-08-20',
            status: 'inprogress',
            statusDate: '25 Feb 2026',
          },
          {
            id: 113,
            phase: 'Booking Ready',
            startDate: '2026-08-23',
            endDate: '2026-10-15',
            status: 'completed',
            statusDate: '12 Mar 2026',
          },
        ],
      },
      {
        id: 12,
        cluster: 'Cluster 2',
        phases: [
          {
            id: 121,
            phase: 'Launch Planned',
            startDate: '2026-02-15',
            endDate: '2026-04-25',
            status: 'delay',
            statusDate: '20 Jan 2026',
          },
          {
            id: 122,
            phase: 'Marketing Ready',
            startDate: '2026-04-26',
            endDate: '2026-07-01',
            status: 'inprogress',
            statusDate: '18 Feb 2026',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    projectName: 'Damac Research',
    expanded: true,
    clusters: [
      {
        id: 21,
        cluster: 'Cluster 1',
        phases: [
          {
            id: 211,
            phase: 'Launch Planned',
            startDate: '2026-05-10',
            endDate: '2026-08-05',
            status: 'completed',
            statusDate: '10 Jan 2026',
          },
          {
            id: 221,
            phase: 'Marketing Ready',
            startDate: '2026-08-10',
            endDate: '2026-10-28',
            status: 'delay',
            statusDate: '5 Feb 2026',
          },
        ],
      },
      {
        id: 22,
        cluster: 'Cluster 2',
        phases: [
          {
            id: 221,
            phase: 'Marketing Ready',
            startDate: '2026-06-20',
            endDate: '2026-08-28',
            status: 'delay',
            statusDate: '5 Feb 2026',
          },
        ],
      },
    ],
  },
  {
    // Moved this out to be a separate project
    id: 3,
    projectName: 'Damac Growth 2', // renamed so it doesn't conflict with id:1
    expanded: true,
    clusters: [
      {
        id: 31,
        cluster: 'Cluster 1',
        phases: [
          {
            id: 311,
            phase: 'Launch Planned',
            startDate: '2026-05-01',
            endDate: '2026-08-10',
            status: 'delay',
            statusDate: '14 Jan 2026',
          },
          {
            id: 312,
            phase: 'Marketing Ready',
            startDate: '2026-08-11',
            endDate: '2026-09-20',
            status: 'inprogress',
            statusDate: '25 Feb 2026',
          },
          {
            id: 313,
            phase: 'Booking Ready',
            startDate: '2026-09-21',
            endDate: '2026-11-15',
            status: 'completed',
            statusDate: '12 Mar 2026',
          },
        ],
      },
      {
        id: 32,
        cluster: 'Cluster 2',
        phases: [
          {
            id: 321,
            phase: 'Launch Planned',
            startDate: '2026-02-15',
            endDate: '2026-04-25',
            status: 'delay',
            statusDate: '20 Jan 2026',
          },
          {
            id: 322,
            phase: 'Marketing Ready',
            startDate: '2026-04-26',
            endDate: '2026-08-01',
            status: 'inprogress',
            statusDate: '18 Feb 2026',
          },
        ],
      },
      {
        id: 33,
        cluster: 'Cluster 3',
        phases: [
          {
            id: 323,
            phase: 'Launch Planned',
            startDate: '2026-05-15',
            endDate: '2026-08-25',
            status: 'delay',
            statusDate: '20 Jan 2026',
          },
          {
            id: 324,
            phase: 'Marketing Ready',
            startDate: '2026-08-26',
            endDate: '2026-12-01',
            status: 'inprogress',
            statusDate: '18 Feb 2026',
          },
        ],
      },
    ],
  },
];

// data.ts
export const timelineTasks2 = [
  {
    id: 1,
    projectName: 'Domino Growth',
    expanded: true,
    clusters: [
      {
        id: 11,
        cluster: 'Cluster 1',
        phases: [
          {
            id: 111,
            phase: 'Launch Planned',
            startDate: '2026-05-01',
            endDate: '2026-06-10',
            statusDate: '14 Jan 2026',
            status: 'delay',
          },
          {
            id: 112,
            phase: 'Marketing Ready',
            startDate: '2026-06-11',
            endDate: '2026-07-20',
            statusDate: '25 Feb 2026',
            status: 'inprogress',
          },
        ],
      },
      {
        id: 12,
        cluster: 'Cluster 2',
        phases: [
          {
            id: 121,
            phase: 'Launch Planned',
            startDate: '2026-05-15',
            endDate: '2026-06-25',
            statusDate: '20 Jan 2026',
            status: 'delay',
          },
        ],
      },
    ],
  },

  {
    id: 2,
    projectName: 'Domino Research',
    expanded: false,
    clusters: [
      {
        id: 21,
        cluster: 'Cluster 1',
        phases: [
          {
            id: 211,
            phase: 'Launch Planned',
            startDate: '2026-05-10',
            endDate: '2026-06-05',
            statusDate: '10 Jan 2026',
            status: 'completed',
          },
        ],
      },
      {
        id: 22,
        cluster: 'Cluster 2',
        phases: [
          {
            id: 221,
            phase: 'Marketing Ready',
            startDate: '2026-06-20',
            endDate: '2026-07-28',
            statusDate: '5 Feb 2026',
            status: 'delay',
          },
        ],
      },
    ],
  },
];
