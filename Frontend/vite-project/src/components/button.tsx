import React from 'react';

export const Button = ({onClick,children}: {onClick: () => void, children: React.ReactNode;
}) => {
  return (
    <button onClick={onClick} className="inline px-8 py-4 text-2xl bg-stone-full hover:bg-sky-800 text-white font-bold rounded">
      {children}
    </button>
  );
};
