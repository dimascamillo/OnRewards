import SearchClient from "./searchClient";

type EditClientProps = {
  visibility: string;
};

export default function EditClient({ visibility }: EditClientProps) {
  return (
    <div className={visibility}>
      <SearchClient />
    </div>
  );
}
