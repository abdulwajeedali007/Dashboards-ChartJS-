import type { Task } from '../../Types';
import ProgressBar from '../ProgressBar/Index';
import StatusBadge from '../StatusBadge/Index';

const TableRow = ({ task }: { task: Task }) => {
  return (
    <tr className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer">
      <td className="px-2  text-[6px]">{task.id}</td>
      {/* Task Name */}
      <td className="px-1  text-[6px] text-wrap w-35">{task.name}</td>
      {/* Status */}
      <td className="px-1 ">
        <StatusBadge status={task.status} />
      </td>
      {/* Progress */}
      <td className="px-2">
        <ProgressBar progress={task.progress} />
      </td>
      {/* Dates */}
      <td className="px-2  text-[6px]">{task.startDate}</td>
      <td className="px-2  text-[6px]">{task.endDate}</td>

      {/* Updated By */}
      <td className="px-1  text-[6px]">{task.updatedBy}</td>
    </tr>
  );
};
export default TableRow;
