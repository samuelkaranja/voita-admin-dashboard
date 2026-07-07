"use client";

import { useEffect } from "react";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentActivityTable from "@/components/dashboard/RecentActivityTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMechanicsThunk } from "@/store/slices/mechanicsSlice";
import { fetchCarWashesThunk } from "@/store/slices/carWashSlice";
import { fetchTowingProvidersThunk } from "@/store/slices/towingSlice";
import { fetchScoutsThunk } from "@/store/slices/scoutsSlice";
import { StatCardData, ActivityItem } from "@/types";

export default function OverviewPage() {
  const dispatch = useAppDispatch();
  const mechanics = useAppSelector((state) => state.mechanics.items);
  const carWashes = useAppSelector((state) => state.carWash.items);
  const towingProviders = useAppSelector((state) => state.towing.items);
  const scouts = useAppSelector((state) => state.scouts.items);

  useEffect(() => {
    dispatch(fetchMechanicsThunk(undefined));
    dispatch(fetchCarWashesThunk());
    dispatch(fetchTowingProvidersThunk());
    dispatch(fetchScoutsThunk());
  }, [dispatch]);

  const stats: StatCardData[] = [
    {
      id: "mechanics",
      label: "Total Mechanics",
      value: mechanics.length,
      icon: "wrench",
    },
    {
      id: "carwash",
      label: "Total Car Washes",
      value: carWashes.length,
      icon: "droplet",
    },
    {
      id: "towing",
      label: "Towing Providers",
      value: towingProviders.length,
      icon: "truck",
    },
    {
      id: "scouts",
      label: "Total Scouts",
      value: scouts.length,
      icon: "radar",
    },
  ];

  const recentActivity: ActivityItem[] = [
    ...mechanics.map(
      (m): ActivityItem => ({
        id: m.id,
        name: m.name,
        serviceType: "Mechanic",
        dateAdded: m.dateAdded,
      }),
    ),
    ...carWashes.map(
      (c): ActivityItem => ({
        id: c.id,
        name: c.name,
        serviceType: "Car Wash",
        dateAdded: c.dateAdded,
      }),
    ),
    ...towingProviders.map(
      (p): ActivityItem => ({
        id: p.id,
        name: p.name,
        serviceType: "Towing",
        dateAdded: p.dateAdded,
      }),
    ),
    ...scouts.map(
      (s): ActivityItem => ({
        id: s.id,
        name: s.name,
        serviceType: "Scout",
        dateAdded: s.dateAdded,
      }),
    ),
  ]
    .filter((item) => item.dateAdded) // list endpoints don't return dateAdded, so this will mostly be empty until backend adds it
    .sort(
      (a, b) =>
        new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
    )
    .slice(0, 10);

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <h1 className="text-xl sm:text-2xl font-bold text-voita-text">
        Overview
      </h1>
      <StatsGrid stats={stats} />
      <RecentActivityTable items={recentActivity} />
    </div>
  );
}
