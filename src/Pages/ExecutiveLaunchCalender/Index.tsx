import { timelineTasks } from '../../data';
// import TableSalesTracker from './components/TableSalesTracker/Index';
import TimelineChart2 from '../../components/LaunchCalenderTimlineChart/TimelineChart2';
// import TimelineChart from '../../TimelineChart';
import InfoBlock from '../../components/InfoBlock/Index';
import FormFilter from '../../components/FormFilter/Index';
import {
  Boxes,
  CalendarDays,
  CircleCheckBig,
  Info,
  TriangleAlert,
  Wallet,
} from 'lucide-react';

function Index() {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth() + 1; // Months are 0-indexed
  const year = now.getFullYear();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  return (
    <>
      <div className="my-6 flex flex-col justify-between items-start  sm:flex-row sm:px-0 sm:flex-center">
        <div className="flex items-center gap-1 sm:gap-2 sm:flex-row">
          <h2 className="text-2xl font-medium ">
            Executive Launch Calender - Cluster Overview
          </h2>
          <Info className="cursor-pointer" />
        </div>
        <p className="text-base text-gray-400">{`Last Updated: ${day}-${month}-${year} ${hours}:${minutes}`}</p>
      </div>
      <div className="mb-6 flex flex-col gap-2  sm:flex-row sm:flex-wrap sm:gap-5 sm:px-0">
        <InfoBlock
          Icon={CalendarDays}
          title={'Upcoming Launches'}
          value={23}
          IconColor="text-blue-700"
        />
        <InfoBlock
          Icon={Boxes}
          title="Cluster Launching this quater"
          value={42}
          IconColor="text-green-700"
        />
        <InfoBlock
          Icon={CircleCheckBig}
          title="Ready to accept boarding"
          value={31}
          IconColor="text-green-700"
        />
        <InfoBlock
          Icon={TriangleAlert}
          title="Delayed Cluster"
          value={4}
          IconColor="text-red-700"
        />
        <InfoBlock
          Icon={Wallet}
          title="Project Launched Value"
          value={'AED 8.4B'}
          IconColor="text-purple-700"
        />
      </div>
      {/* <div className=""> */}
      <FormFilter />
      {/* </div> */}
      <div className="mb-6 p-3 shadow rounded">
        <div className="flex items-center flex-col justify-between mb-10 md:flex-col lg:flex-row ">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium uppercase mb-3 sm:mb-0">
              PROJECT & CLUSTER LAUNCH TIMELINE
            </h3>
            <Info className="cursor-pointer" />
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <p className="bg-yellow-500  h-3 w-10 rounded"></p>
              <p className="text-xs sm:text-base">Launch Planned</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="bg-green-600  h-3 w-10 rounded"></p>
              <p className="text-xs sm:text-base">Marketing Ready</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="bg-green-700  h-3 w-10 rounded"></p>
              <p className="text-xs sm:text-base">Booking Ready</p>
            </div>
          </div>
        </div>

        {/* <TimelineChart timelineTasks={timelineTasks} /> */}
        <div className="my-6 p-3 rounded">
          <div className="overflow-x-auto">
            <div className="min-w-[960px]">
              <TimelineChart2 timelineTasks={timelineTasks} />
            </div>
          </div>
        </div>
        {/* <TimelineChart2 timelineTasks={timelineTasks} /> */}
      </div>
    </>
  );
}

export default Index;
