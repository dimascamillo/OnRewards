import Link from "next/link";

interface YellowButtonProps {
  content: string;
  url: string;
}

export default function YellowPrimary({ content, url }: YellowButtonProps) {
  return (
    <Link
      className="bg-yellow-primary-400 text-white h-11 w-28 rounded-md transition-all border-2 border-yellow-primary-400 hover:bg-transparent hover:border-yellow-primary-400 flex justify-center items-center"
      href={url}
    >
      {content}
    </Link>
  );
}
