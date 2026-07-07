import PageHeader from "@/components/layout/PageHeader";
import FormCard from "@/components/forms/FormCard";
import AddCarWashForm from "@/components/carwash/AddCarWashForm";

export default function AddCarWashPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Add Car Wash"
        breadcrumb={[
          { label: "Car Wash", href: "/car-wash" },
          { label: "Add Provider" },
        ]}
      />

      <FormCard>
        <AddCarWashForm />
      </FormCard>
    </div>
  );
}
