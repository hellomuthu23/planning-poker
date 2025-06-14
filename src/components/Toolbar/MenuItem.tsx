import React from 'react';

export const MenuItem = ({
  icon,
  label,
  onClick,
  testId,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  testId?: string;
}) => {
  return (
    <button
      className='button-ghost text-left flex items-center'
      onClick={onClick}
      data-testid={testId}
    >
      <div className='pr-2'>{icon}</div>
      <div className='text-sm font-normal'> {label}</div>
    </button>
  );
};
