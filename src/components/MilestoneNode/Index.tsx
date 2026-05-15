import type { Step } from '../../Types';

function Index({ step, segmentWidth }: { step: Step; segmentWidth: number }) {
  let bgColor =
    step.status === 'completed'
      ? 'bg-green-500'
      : step.status === 'inprogress'
        ? 'bg-yellow-500'
        : 'bg-gray-500';

  let left = (step.id - 1) * segmentWidth;
  return (
    <>
      <div
        style={{ left: `${left}%`, width: `${segmentWidth}%` }}
        className={`absolute h-[4px]   flex flex-col items-center ${bgColor}`}
      >
        <div className="absolute top-1/2 -translate-y-1/2 flex flex-col   items-center">
          <div className="h-6 w-6 rounded-full text-xs bg-green-600 text-white flex justify-center items-center">
            {step.id}
          </div>

          <p className="absolute text-xs w-28 text-center left-1/2 -translate-x-1/2 top-6 ">
            {step.title}
          </p>
        </div>
      </div>
    </>
  );
}

export default Index;
