"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormField from "@/components/forms/FormField";
import TextInput from "@/components/forms/TextInput";
import TextArea from "@/components/forms/TextArea";
import SelectInput from "@/components/forms/SelectInput";
import ToggleSwitch from "@/components/forms/ToggleSwitch";
import FormActions from "@/components/forms/FormActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createAlertThunk,
  fetchAlertsThunk,
  clearSendFailure,
} from "@/store/slices/alertsSlice";
import { AlertPriority, AlertTargetType } from "@/types";

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

export default function AddAlertForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutationStatus, mutationError, lastSendFailure } = useAppSelector(
    (state) => state.alerts,
  );

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetType, setTargetType] = useState<AlertTargetType>("all_users");
  const [targetDriverId, setTargetDriverId] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [priority, setPriority] = useState<AlertPriority>("normal");
  const [sendImmediately, setSendImmediately] = useState(true);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(clearSendFailure());

    const result = await dispatch(
      createAlertThunk({
        title,
        message,
        target_type: targetType,
        target_driver_id:
          targetType === "specific_user" ? targetDriverId : undefined,
        target_role: targetType === "role_based" ? targetRole : undefined,
        priority,
        send_immediately: sendImmediately,
      }),
    );

    if (createAlertThunk.fulfilled.match(result)) {
      dispatch(fetchAlertsThunk(undefined));
      router.push("/alerts");
    }
    // On rejection (including a 502 send failure), stay on the form —
    // lastSendFailure/mutationError render the banner below with a link
    // to the alert, which was still created even though the send failed.
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {lastSendFailure ? (
        <div className="text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 flex flex-col gap-1.5">
          <p className="text-red-400 font-medium">{lastSendFailure.message}</p>
          <p className="text-voita-text-muted">
            {lastSendFailure.successCount}/{lastSendFailure.recipientsCount}{" "}
            delivered
            {lastSendFailure.firebaseError
              ? ` — ${lastSendFailure.firebaseError}`
              : ""}
          </p>
          <Link
            href={`/alerts/${lastSendFailure.alertId}`}
            className="text-voita-accent hover:underline w-fit"
          >
            View alert
          </Link>
        </div>
      ) : mutationStatus === "failed" && mutationError ? (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
          {mutationError}
        </p>
      ) : null}

      <FormField label="Alert Title">
        <TextInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Road closure on Waiyaki Way"
          required
        />
      </FormField>

      <FormField label="Message">
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Details drivers will see in the notification..."
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
            placeholder="Driver's user ID"
            required
          />
        </FormField>
      )}

      {targetType === "role_based" && (
        <FormField label="Role">
          <TextInput
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. driver, mechanic"
            required
          />
        </FormField>
      )}

      <ToggleSwitch
        label="Send Immediately"
        checked={sendImmediately}
        onChange={setSendImmediately}
      />
      {!sendImmediately && (
        <p className="text-xs text-voita-text-muted -mt-3">
          Saved as a draft — you can send it later from the alert's detail page.
        </p>
      )}

      <div className="pt-2">
        <FormActions
          onCancel={() => router.push("/alerts")}
          saveLabel={
            mutationStatus === "loading" ? "Sending..." : "Create Alert"
          }
        />
      </div>
    </form>
  );
}
