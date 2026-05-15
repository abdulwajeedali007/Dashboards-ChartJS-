import { useState } from 'react';
import Dropdown from '../FormComponents/DropDown';

function Index() {
  const [selected, setSelected] = useState({
    Year: '2026',
    ProjectType: 'All',
    ClusterType: 'All',
  });

  return (
    <>
      <div className="mb-6 flex rounded p-8 bg-gray-200 flex-col items-center justify-between lg:flex-row md:flex-row md:items-center ">
        <div className="flex items-center gap-2 flex-col mb-4 sm:flex-row sm:mb-0 md:mb-3 ">
          <Dropdown
            label={'Year'}
            field="Year"
            values={['2024', '2025', '2026', '2027']}
            setSelected={setSelected}
            selected={selected.Year}
          />
          <Dropdown
            label={'Project Type'}
            field="ProjectType"
            values={['All', 'project one', 'project two']}
            setSelected={setSelected}
            selected={selected.ProjectType}
          />
          <Dropdown
            label={'Cluster Status'}
            field="ClusterType"
            values={['All', 'cluster one', 'cluster two']}
            setSelected={setSelected}
            selected={selected.ClusterType}
          />
        </div>
        <div className="flex gap-2">
          <button className="py-3 px-8 border border-blue-500 text-blue-500 text-base rounded hover:bg-blue-500 hover:text-white cursor-pointer transition  ">
            Reset
          </button>
          <button className="py-3 px-8 border border-blue-500  bg-blue-500 text-white text-base rounded hover: hover:bg-blue-600 cursor-pointer transition  ">
            Apply
          </button>
        </div>
      </div>
    </>
  );
}

export default Index;
