interface YellowButtonProps {
  content: string;
  type: "submit" | "reset" | "button";
  className?: string;
  disabled?: true | false;
  onClick?: () => void;
}

export default function YellowButton({
  content,
  type,
  className,
  disabled,
  onClick,
}: YellowButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-yellow-primary-400 text-white h-11 w-auto p-4 rounded-md transition-all border-2 border-yellow-primary-400 hover:bg-transparent hover:border-yellow-primary-400 flex justify-center items-center ${className}`}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
