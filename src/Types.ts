export type Task = {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    progress: number;
    updatedBy: string;
    status: 'completed' | 'inprogress' | 'notstarted' | 'delay';
    lastUpdated: string;
  };
  
  export type Milestone = {
    id: number;
    title: string;
    status: 'completed' | 'delay' | 'notstarted' | 'inprogress';
    assignedTo?: string;
    date?: string;
  };
  
  export type Step = {
    id: number;
    title: string;
    status: 'completed' | 'delay' | 'notstarted' | 'inprogress';
  };
  