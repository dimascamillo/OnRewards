interface YellowButtonProps {
  content: string;
  onClick: () => void;
  className: string;
}

export default function ButtonYellowPrimary({
  content,
  onClick,
  className,
}: YellowButtonProps) {
  return (
    <button
      className={`${className} bg-yellow-primary-400 text-white h-11 w-auto p-4 rounded-md transition-all border-2 border-yellow-primary-400 hover:bg-transparent hover:border-yellow-primary-400 flex justify-center items-center`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
