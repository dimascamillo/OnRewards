import Link from "next/link";

interface RedPrimaryButtonProps {
  content: string;
  url: string;
}

export default function RedPrimary({ content, url }: RedPrimaryButtonProps) {
  return (
    <Link
      className="bg-red-primary-400 text-white h-11 w-28 rounded-md transition-all border-2 border-red-primary-400 hover:bg-transparent hover:border-red-primary-400 flex justify-center items-center"
      href={url}
    >
      {content}
    </Link>
  );
}
