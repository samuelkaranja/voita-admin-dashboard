import PageHeader from "@/components/layout/PageHeader";
import FormCard from "@/components/forms/FormCard";
import AddMechanicForm from "@/components/mechanics/AddMechanicForm";

export default function AddMechanicPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Add Mechanics"
        breadcrumb={[
          { label: "Mechanics", href: "/mechanics" },
          { label: "Add Provider" },
        ]}
      />

      <FormCard>
        <AddMechanicForm />
      </FormCard>
    </div>
  );
}
