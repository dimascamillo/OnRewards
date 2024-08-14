import Link from "next/link";

interface TransparentButtonProps {
  content: string;
  url: string;
}

export default function Transparent({ content, url }: TransparentButtonProps) {
  return (
    <Link
      className="text-white h-11 w-28 rounded-md transition-all border-2 border-white bg-transparent hover:border-yellow-primary-400 flex justify-center items-center"
      href={url}
    >
      {content}
    </Link>
  );
}
