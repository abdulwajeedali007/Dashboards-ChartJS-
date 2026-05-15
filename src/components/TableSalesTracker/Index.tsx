import type { Task } from '../../Types';
import TableRow from '../TableRow/Index';

type Props = {
  tasks: Task[];
};

const Index = ({ tasks }: Props) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg shadow mt-5">
      <h2 className="text-sm font-bold px-2 py-1">Department Readiness</h2>
      <table className="w-full border-collapse">
        {/* Header */}
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-2 font-medium text-[6px] py-2">#</th>
            <th className="px-2 font-medium text-[6px] py-2">Task Name</th>
            <th className="px-2 font-medium text-[6px] py-2">Task Status</th>
            <th className="px-2 font-medium text-[6px] py-2">Progress</th>
            <th className="px-2 font-medium text-[6px] py-2">Created Date</th>
            <th className="px-2 font-medium text-[6px] py-2">
              Lasted Updated Date
            </th>
            <th className="px-2 font-medium text-[6px] py-2">Updated By</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {tasks.map((task) => (
            <TableRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
