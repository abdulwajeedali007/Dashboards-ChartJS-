import { ChevronDown } from 'lucide-react';
import MilestoneNode from '../MilestoneNode/Index';
import type { Step } from '../../Types';
function Index({
  title,
  steps,
  percentage
}: {
  title: string;
  steps: Step[];
  percentage: number | string;
}) {
  const segmentWidth = 100 / steps.length;
  return (
    <>
      <div className=" border border-gray-300 overflow-hidden rounded ">
        <div className="flex items-center justify-between gap-6 bg-green-100 border-b border-green-600 p-2 mb-6 hover:cursor-pointer sm:p-4">
          <div className="flex gap-2">
            <ChevronDown />
            <h3 className="uppercase text-green-600 text-base font-medium md:text-lg">
              1. {title}
            </h3>
          </div>
          <p className=" bg-green-300 rounded text-xs text-green-700 py-2 px-2  sm:px-3 sm:text-sm">
            Completed {percentage}%
          </p>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[960px] flex items-center px-3 pt-12 pb-16 sm:pb-20 sm:px-6 sm:pt-8">
            <div className="relative h-[3px] bg-gray-600 w-full">
              {steps.map((step: Step, index: number) => (
                <MilestoneNode
                  step={step}
                  key={index}
                  segmentWidth={segmentWidth}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Index;
