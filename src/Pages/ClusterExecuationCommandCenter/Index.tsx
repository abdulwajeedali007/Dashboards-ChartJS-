import {
  CircleCheckBig,
  ClipboardList,
  Clock7,
  TriangleAlert,
  User2Icon,
} from 'lucide-react';
import InfoBlock from '../../components/InfoBlock/Index';
import WorkFlowRow from '../../components/WorkFlowRow/Index';

import { type Step } from '../../Types';

const steps: Step[] = [
  {
    id: 1,
    title: 'Step 1',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Step 2',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Step 3',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Step 4',
    status: 'completed',
  },
  {
    id: 5,
    title: 'Step 5',
    status: 'completed',
  },
  {
    id: 6,
    title: 'Step 6',
    status: 'completed',
  },
  {
    id: 7,
    title: 'Step 7',
    status: 'completed',
  },
  {
    id: 8,
    title: 'Step 8',
    status: 'completed',
  },
  {
    id: 9,
    title: 'Step 9',
    status: 'completed',
  },
  {
    id: 10,
    title: 'Step 10',
    status: 'completed',
  },
  {
    id: 11,
    title: 'Step 11',
    status: 'completed',
  },
  {
    id: 12,
    title: 'Step 12',
    status: 'completed',
  },
  {
    id: 13,
    title: 'Step 13',
    status: 'completed',
  },
  {
    id: 14,
    title: 'Step 14',
    status: 'completed',
  },
];

function Index() {
  return (
    <>
      <div className="flex my-6">
        <h2 className="text-2xl font-medium ">
          Cluster Execution Command Center
        </h2>
      </div>
      <div className="my-6 flex flex-col gap-2  sm:flex-row sm:flex-wrap sm:gap-5 sm:px-0">
        <InfoBlock
          Icon={CircleCheckBig}
          title={'Cluster Name'}
          ValueColor="text-green-700"
          value={'78%'}
          IconColor="text-white"
          IconBg="bg-green-700"
          info={'On Track'}
        />
        <InfoBlock
          Icon={ClipboardList}
          title="Cluster Launching this quater"
          value={'26 / 42'}
          IconColor="text-white"
          IconBg="bg-blue-700"
        />
        <InfoBlock
          Icon={Clock7}
          title="Inprogess"
          value={5}
          IconColor="text-white"
          IconBg="bg-yellow-500"
          ValueColor="text-yellow-500"
          info={'Steps'}
        />
        <InfoBlock
          Icon={TriangleAlert}
          title="Delayed"
          value={3}
          IconColor="text-white"
          IconBg="bg-red-500"
          ValueColor="text-red-500"
          info="Steps"
        />
        <InfoBlock
          Icon={User2Icon}
          title="Pending Approvals"
          value={2}
          IconColor="text-white"
          IconBg="bg-purple-700"
          info={'Steps'}
          ValueColor="text-purple-700"
        />
      </div>
      <div className="flex justify-between items-center mb-6 px-4 flex-wrap md:flex-nowrap ">
        <div className="flex items-center gap-3 w-1/2 md:w-auto">
          <p className="h-3 w-12 rounded bg-green-700"></p>
          <p className="text-base">Completed</p>
        </div>
        <div className="flex items-center gap-3 w-1/2 md:w-auto">
          <p className="h-3 w-12 rounded bg-yellow-500"></p>
          <p className="text-base">In Progress</p>
        </div>
        <div className="flex items-center gap-3 w-1/2 md:w-auto">
          <p className="h-3 w-12 rounded bg-yellow-600"></p>
          <p className="text-base">Delayed</p>
        </div>
        <div className="flex items-center gap-3 w-1/2 md:w-auto">
          <p className="h-3 w-12 rounded bg-red-700"></p>
          <p className="text-base">At Risk</p>
        </div>
        <div className="flex items-center gap-3 w-1/2 md:w-auto">
          <p className="h-3 w-12 rounded bg-gray-500"></p>
          <p className="text-base">Not Started</p>
        </div>
      </div>
      <div className="mb-6">
        <WorkFlowRow
          title="Inventory Readiness"
          percentage={100}
          steps={steps}
          status="completed"
        />
      </div>
    </>
  );
}

export default Index;
