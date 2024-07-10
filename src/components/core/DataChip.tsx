import { chipColors } from '@functions/globalFn';
import React from 'react';

interface ChipProps {
  color: keyof typeof chipColors;
  name: string;
}

const Chip: React.FC<ChipProps> = ({ color, name }) => {
  return (
    <>
      {name && (
        <div
          className={`mx-auto min-w-[12rem] max-w-[14rem] rounded-2xl border px-1 py-1 text-center ${chipColors[color]?.bgColor} ${chipColors[color]?.textColor}`}
        >
          {name}
        </div>
      )}
    </>
  );
};

export default React.memo(Chip);
