import AddAlertForm from "@/components/alerts/AddAlertForm";
import PageHeader from "@/components/layout/PageHeader";

export default function AddAlertPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="New Alert" />
      <AddAlertForm />
    </div>
  );
}
