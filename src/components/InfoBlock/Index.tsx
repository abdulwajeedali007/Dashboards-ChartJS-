interface infoBoxTypes {
  Icon?: any;
  title?: string;
  value?: number | string;
  IconColor?: string;
  info?: string;
  IconBg?: string;
  titleColor?: string;
  ValueColor?: string;
}

function Index({
  Icon,
  title,
  titleColor,
  value,
  IconColor,
  IconBg,
  ValueColor,
  info,
}: infoBoxTypes) {
  //   let updateValue = typeof value != 'number' ? `AED ${value}B` : value;
  return (
    <>
      <div className=" text-left border border-gray-200 rounded p-5 flex gap-4  w-full md:w-[48%] lg:flex-1">
        <div className="">
          {Icon && (
            <Icon
              className={`${IconBg ? 'p-1.5 rounded-3xl' : ''} ${IconColor && IconColor} ${IconBg && IconBg}`}
              size={40}
              strokeWidth={1.5}
            />
          )}
        </div>
        <div className="title_value flex flex-col justify-between ">
          <h4 className={`text-base ${titleColor}`}>{title && title}</h4>
          <h2 className={`text-2xl font-medium ${ValueColor}`}>
            {value && value}
          </h2>
          <p className="text-xs">{info && info}</p>
        </div>
      </div>
    </>
  );
}

export default Index;
