import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// const options = [
//   { label: '2025', value: '2025' },
//   { label: '2026', value: '2026' },
//   { label: '2027', value: '2027' },
// ];

interface dropdownTypes {
  label: string;
  values?: string[];
  setSelected: React.Dispatch<
    React.SetStateAction<{
      Year: string;
      ProjectType: string;
      ClusterType: string;
    }>
  >;
  selected: string;
  field: string;
}

export default function Dropdown({
  values,
  label,
  setSelected,
  selected,
  field,
}: dropdownTypes) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handler = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="w-80 relative sm:w-60 md:w-40" ref={ref}>
      <span className="text-base">{label}</span>
      {/* Button */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className=" flex items-center justify-between p-3 border border-gray-300 rounded-md bg-white text-base hover:cursor-pointer"
      >
        <span>{selected}</span>

        {/* Caret (rotates on toggle) */}
        <ChevronDown
          size={24}
          className={`transition-transform duration-200 text-gray-400 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-0.5 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 overflow-hidden">
          {values &&
            values.map((value) => (
              <div
                key={value}
                onClick={() => {
                  setSelected((prev) => ({ ...prev, [field]: value }));
                  setOpen(false);
                }}
                className="px-4 py-3 text-base hover:bg-gray-100 cursor-pointer"
              >
                {value}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
