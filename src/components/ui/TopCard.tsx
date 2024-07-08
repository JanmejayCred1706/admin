import { TopCardInterface } from '@interface/globalInterface';
import Link from 'next/link';
import React from 'react';

const TopCard: React.FC<TopCardInterface> = ({
  id,
  title,
  count,
  link = '',
}) => {
  return (
    <div className="topCard" key={id}>
      <p className="text-2xl leading-4">{title}</p>
      <p className="text-xl mb-1">{count}</p>
      <Link className="pointer text-priWhite" href={link}>
        See Details
      </Link>
    </div>
  );
};

export default React.memo(TopCard);
