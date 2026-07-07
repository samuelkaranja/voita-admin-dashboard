import PageHeader from "@/components/layout/PageHeader";
import FormCard from "@/components/forms/FormCard";
import AddScoutForm from "@/components/scouts/AddScoutForm";

export default function AddScoutPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Add Scouts"
        breadcrumb={[
          { label: "Scouts", href: "/scouts" },
          { label: "Add Provider" },
        ]}
      />

      <FormCard>
        <AddScoutForm />
      </FormCard>
    </div>
  );
}
