import { Info } from 'lucide-react';
import ClusterOverviewChart from '../../components/ClusterOverviewChart/Index';
import FormFilter from '../../components/FormFilter/Index';

function Index() {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth() + 1; // Months are 0-indexed
  const year = now.getFullYear();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  return (
    <>
      <div className="my-6 flex flex-col justify-between items-start sm:flex-row sm:px-0 sm:items-center">
        <div className="flex items-center gap-1 sm:gap-2 sm:flex-row">
          <h2 className="text-2xl font-medium">Cluster Launch Overview</h2>
          <Info className="cursor-pointer" />
        </div>
        <p className="text-base text-gray-400">{`Last Updated: ${day}-${month}-${year} ${hours}:${minutes}`}</p>
      </div>
      {/* <div className="px-10 py-8 mb-6 bg-gray-100 rounded "> */}
      <FormFilter />
      {/* </div> */}
      <ClusterOverviewChart />
    </>
  );
}

export default Index;
