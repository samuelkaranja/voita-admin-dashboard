import Card from "@/components/ui/Card";

export default function FormCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-5 sm:p-8">{children}</Card>
    </div>
  );
}
