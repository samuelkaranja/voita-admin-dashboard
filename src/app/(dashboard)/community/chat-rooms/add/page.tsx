import PageHeader from "@/components/layout/PageHeader";
import FormCard from "@/components/forms/FormCard";
import AddRoomForm from "@/components/community/AddRoomForm";

export default function AddRoomPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Create Room"
        breadcrumb={[
          { label: "Community Rooms", href: "/community/chat-rooms" },
          { label: "Create Room" },
        ]}
      />
      <FormCard>
        <AddRoomForm />
      </FormCard>
    </div>
  );
}
