"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/forms/FormField";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import SelectInput from "@/components/forms/SelectInput";
import FormActions from "@/components/forms/FormActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAlertThunk } from "@/store/slices/alertsSlice";
import { Alert, AlertPriority, AlertTargetType } from "@/types";

const TARGET_OPTIONS: { label: string; value: AlertTargetType }[] = [
  { label: "All Users", value: "all_users" },
  { label: "Specific User", value: "specific_user" },
  { label: "Role Based", value: "role_based" },
];

const PRIORITY_OPTIONS: { label: string; value: AlertPriority }[] = [
  { label: "Low", value: "low" },
  { label: "Normal", value: "normal" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

export default function EditAlertForm({ alert }: { alert: Alert }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutationStatus, mutationError } = useAppSelector(
    (state) => state.alerts,
  );

  const [title, setTitle] = useState(alert.title);
  const [message, setMessage] = useState(alert.message);
  const [targetType, setTargetType] = useState<AlertTargetType>(
    alert.targetType,
  );
  const [targetDriverId, setTargetDriverId] = useState(
    alert.targetDriverId ?? "",
  );
  const [targetRole, setTargetRole] = useState(alert.targetRole ?? "");
  const [priority, setPriority] = useState<AlertPriority>(alert.priority);

  // Re-sync local state if a different alert is passed in (e.g. navigating
  // directly between two edit pages without a full remount).
  useEffect(() => {
    setTitle(alert.title);
    setMessage(alert.message);
    setTargetType(alert.targetType);
    setTargetDriverId(alert.targetDriverId ?? "");
    setTargetRole(alert.targetRole ?? "");
    setPriority(alert.priority);
  }, [alert.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await dispatch(
      updateAlertThunk({
        id: alert.id,
        payload: {
          title,
          message,
          target_type: targetType,
          target_driver_id:
            targetType === "specific_user" ? targetDriverId : undefined,
          target_role: targetType === "role_based" ? targetRole : undefined,
          priority,
        },
      }),
    );

    if (updateAlertThunk.fulfilled.match(result)) {
      router.push(`/alerts/${alert.id}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {mutationStatus === "failed" && mutationError && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {mutationError}
        </p>
      )}

      <FormField label="Alert Title">
        <TextInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Message">
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </FormField>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full">
          <FormField label="Target Audience">
            <SelectInput
              value={targetType}
              onChange={(e) => setTargetType(e.target.value as AlertTargetType)}
              options={TARGET_OPTIONS}
            />
          </FormField>
        </div>
        <div className="w-full">
          <FormField label="Priority">
            <SelectInput
              value={priority}
              onChange={(e) => setPriority(e.target.value as AlertPriority)}
              options={PRIORITY_OPTIONS}
            />
          </FormField>
        </div>
      </div>

      {targetType === "specific_user" && (
        <FormField label="Driver ID">
          <TextInput
            value={targetDriverId}
            onChange={(e) => setTargetDriverId(e.target.value)}
            required
          />
        </FormField>
      )}

      {targetType === "role_based" && (
        <FormField label="Role">
          <TextInput
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            required
          />
        </FormField>
      )}

      <div className="pt-2">
        <FormActions
          onCancel={() => router.push(`/alerts/${alert.id}`)}
          saveLabel={
            mutationStatus === "loading" ? "Saving..." : "Save Changes"
          }
        />
      </div>
    </form>
  );
}
