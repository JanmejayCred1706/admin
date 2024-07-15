import React from 'react';
import { chipColors } from '@functions/globalFn';

interface ChipProps {
  name: string;
}

const Chip: React.FC<ChipProps> = ({ name }) => {
  const colors = chipColors[name];

  if (!colors) {
    console.error(`No colors defined for name: ${name}`);
    return null;
  }

  return (
    <div
      className={`mx-auto min-w-[12rem] max-w-[14rem] rounded-2xl border px-1 py-1 text-center ${colors.bgColor} ${colors.textColor}`}
    >
      {name}
    </div>
  );
};

export default React.memo(Chip);
