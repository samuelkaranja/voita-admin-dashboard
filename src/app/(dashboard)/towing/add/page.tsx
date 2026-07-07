import PageHeader from "@/components/layout/PageHeader";
import FormCard from "@/components/forms/FormCard";
import AddTowingForm from "@/components/towing/AddTowingForm";

export default function AddTowingPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Add Towing"
        breadcrumb={[
          { label: "Towing", href: "/towing" },
          { label: "Add Provider" },
        ]}
      />

      <FormCard>
        <AddTowingForm />
      </FormCard>
    </div>
  );
}
