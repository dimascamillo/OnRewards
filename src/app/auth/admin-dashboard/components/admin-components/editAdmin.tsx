import SearchAdmin from "./searchClient";

type EditAdminProps = {
  visibility: string;
};

export default function EditAdmin({ visibility }: EditAdminProps) {
  return (
    <div className={visibility}>
      <SearchAdmin />
    </div>
  );
}
