"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { MapPin, DollarSign, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
const CACHE_KEY = "find-aid:workers:v1";
const CACHE_TTL_MS = 5 * 60 * 1000;

type Worker = {
  id: string | number;
  name: string;
  image: string | null;
  status: string;
  position: string;
  salaryRange: string;
  currentLocation: string;
  preferredWorkLocation: string;
  rating: number;
  experience: string;
};

type StaffProfileRow = {
  user_id: string | number;
  first_name: string | null;
  last_name: string | null;
  status: string | null;
  role: string | null;
  salary_range: string | null;
  state: string | null;
  preferred_work_location: string | null;
  rating: number | string | null;
  experience: string | null;
  profile_image: string | null;
};

export default function FindAidPage() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [positionDropdownOpen, setPositionDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchWorkers() {
      setError(null);
      let hadCache = false;
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as { ts: number; data: Worker[] };
            if (Date.now() - parsed.ts < CACHE_TTL_MS) {
              setWorkers(parsed.data);
              setLoading(false);
              hadCache = true;
            }
          } catch {}
        }
      }
      setRefreshing(true);
      const baseSelect =
        "user_id, first_name, last_name, status, role, salary_range, state, preferred_work_location, rating, experience, profile_image, verified";
      let resultData: StaffProfileRow[] | null = null;
      let errMsg: string | null = null;
      const attempt1 = await supabase
        .from("staff_profile")
        .select(baseSelect)
        .eq("verified", true);
      if (attempt1.error) {
        errMsg = attempt1.error.message;
      }
      if (attempt1.data && attempt1.data.length > 0) {
        resultData = attempt1.data as StaffProfileRow[];
      }
      if (!resultData) {
        const attempt2 = await supabase
          .from("staff_profile")
          .select(baseSelect)
          .eq("status", "verified");
        if (!attempt2.error && attempt2.data && attempt2.data.length > 0) {
          resultData = attempt2.data as StaffProfileRow[];
          errMsg = null;
        } else if (attempt2.error) {
          errMsg = attempt2.error.message;
          const msgLower = (errMsg ?? "").toLowerCase();
          if (
            msgLower.includes("invalid input syntax") ||
            msgLower.includes("boolean")
          ) {
            const attempt3 = await supabase
              .from("staff_profile")
              .select(baseSelect)
              .eq("status", true);
            if (!attempt3.error && attempt3.data && attempt3.data.length > 0) {
              resultData = attempt3.data as StaffProfileRow[];
              errMsg = null;
            } else if (attempt3.error) {
              errMsg = attempt3.error.message;
            }
          }
        }
      }
      if (!isMounted) return;
      const mapped: Worker[] =
        (resultData as StaffProfileRow[] | null)?.map((row) => ({
          id: row.user_id,
          name: (row.first_name ?? "").trim() || "Unnamed",
          image: row.profile_image ?? "/placeholder.svg?height=200&width=200",
          status: row.status ?? "Available to work",
          position: row.role ?? "",
          salaryRange: row.salary_range ?? "",
          currentLocation: row.state ?? "",
          preferredWorkLocation: row.preferred_work_location ?? "Open",
          rating:
            typeof row.rating === "number"
              ? row.rating
              : Number(row.rating ?? 0),
          experience: row.experience ?? "",
        })) ?? [];
      setWorkers(mapped);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ ts: Date.now(), data: mapped }),
          );
        } catch {}
      }
      setError(mapped.length === 0 && errMsg ? errMsg : null);
      setRefreshing(false);
      if (!hadCache) setLoading(false);
    }
    fetchWorkers();
    return () => {
      isMounted = false;
    };
  }, []);

  // Extract unique positions and states
  const positions = Array.from(
    new Set(workers.map((w) => w.position).filter(Boolean)),
  );
  const states = Array.from(
    new Set(workers.map((w) => w.currentLocation).filter(Boolean)),
  );

  // Filter workers based on selected filters
  const filteredWorkers = workers.filter((worker) => {
    const matchesPosition =
      !selectedPosition || worker.position === selectedPosition;
    const matchesState =
      !selectedState || worker.currentLocation === selectedState;
    return matchesPosition && matchesState;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 lg:px-6 text-center mt-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Find Your Perfect Household Staff
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Browse through our carefully vetted professionals and find the
            perfect match for your household needs
          </p>
        </div>
      </section>

      {/* Workers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Filters */}
          <div className="mb-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Workers
            </h2>

            <div className="flex flex-row gap-2 md:gap-4 items-stretch md:justify-end">
              {/* Position Filter Dropdown */}
              <div className="relative">
                <Button
                  onClick={() => setPositionDropdownOpen(!positionDropdownOpen)}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                  {selectedPosition || "All Positions"}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${positionDropdownOpen ? "rotate-180" : ""}`}
                  />
                </Button>
                {positionDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-max">
                    <button
                      onClick={() => {
                        setSelectedPosition(null);
                        setPositionDropdownOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg"
                    >
                      All Positions
                    </button>
                    {positions.map((position) => (
                      <button
                        key={position}
                        onClick={() => {
                          setSelectedPosition(position);
                          setPositionDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        {position}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* State Filter Dropdown */}
              <div className="relative">
                <Button
                  onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                  {selectedState || "All States"}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${stateDropdownOpen ? "rotate-180" : ""}`}
                  />
                </Button>
                {stateDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-max">
                    <button
                      onClick={() => {
                        setSelectedState(null);
                        setStateDropdownOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg"
                    >
                      All States
                    </button>
                    {states.map((state) => (
                      <button
                        key={state}
                        onClick={() => {
                          setSelectedState(state);
                          setStateDropdownOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        {state}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedPosition || selectedState) && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedPosition && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
                    Position: {selectedPosition}
                    <button onClick={() => setSelectedPosition(null)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedState && (
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 flex items-center gap-1">
                    State: {selectedState}
                    <button onClick={() => setSelectedState(null)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="mb-8">
            {loading ? (
              <div className="flex items-center gap-2 text-gray-600">
                <Spinner className="size-5" />
                <span>Loading verified professionals…</span>
              </div>
            ) : error ? (
              <p className="text-red-600">Failed to load workers: {error}</p>
            ) : (
              <p className="text-gray-600">
                Showing {filteredWorkers.length} verified professionals{" "}
                {refreshing && (
                  <span className="ml-2 text-sm text-gray-500">
                    (refreshing…)
                  </span>
                )}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
            {!loading && filteredWorkers.length > 0 ? (
              filteredWorkers.map((worker) => (
                <Card
                  key={worker.id}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      setSelectedWorker(worker);
                      setIsModalOpen(true);
                    }
                  }}
                  className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col md:cursor-default md:pointer-events-none md:hover:cursor-default cursor-pointer"
                >
                  <CardContent className="p-6 flex flex-col flex-grow">
                    {/* Worker Image */}
                    <div className="relative mb-4">
                      <Image
                        src={worker.image || "/placeholder.svg"}
                        alt={worker.name}
                        width={200}
                        height={200}
                        className="w-full h-32 md:h-48 object-cover rounded-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 hover:bg-green-100 text-[10px] md:text-sm px-1 md:px-3 py-0 md:py-1 whitespace-nowrap">
                        {worker.status}
                      </Badge>
                    </div>

                    {/* Worker Info */}
                    <div className="space-y-3 flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h3 className="font-semibold text-sm md:text-lg text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
                          {worker.name}
                        </h3>
                        <span className="text-green-600 font-medium text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis md:ml-2">
                          {worker.position}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {worker.currentLocation}
                        </span>
                      </div>

                      <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span>{worker.salaryRange}</span>
                      </div>

                      <div className="hidden md:block space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>Preferred: {worker.preferredWorkLocation}</span>
                        </div>
                      </div>

                      <div className="hidden md:flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {worker.experience} experience
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium">{worker.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-12">
                <p className="text-gray-600 text-lg">
                  No workers found matching your filters. Try adjusting your
                  selection.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Worker Detail Modal - Mobile Only */}
      {isModalOpen && selectedWorker && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white w-full mx-4 mb-4 mt-20 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b flex items-center justify-between p-3 rounded-t-2xl">
              <h2 className="text-lg font-bold text-gray-900">
                Worker Details
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-3">
              {/* Worker Image */}
              <div className="relative">
                <Image
                  src={selectedWorker.image || "/placeholder.svg"}
                  alt={selectedWorker.name}
                  width={300}
                  height={300}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <Badge className="absolute top-4 right-4 bg-green-100 text-green-800 hover:bg-green-100 text-sm px-3 py-1">
                  {selectedWorker.status}
                </Badge>
              </div>

              {/* Worker Info */}
              <div className="space-y-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-0.5">
                    {selectedWorker.name}
                  </h3>
                  <p className="text-sm text-green-600 font-medium">
                    {selectedWorker.position}
                  </p>
                </div>

                {/* Salary Range */}
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <DollarSign className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">Salary Range</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedWorker.salaryRange}
                    </p>
                  </div>
                </div>

                {/* Current Location */}
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">Current Location</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedWorker.currentLocation}
                    </p>
                  </div>
                </div>

                {/* Preferred Work Location */}
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-600">Preferred Location</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedWorker.preferredWorkLocation}
                    </p>
                  </div>
                </div>

                {/* Experience and Rating */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Experience</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedWorker.experience}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Rating</p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-sm">★</span>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedWorker.rating}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recruit Button */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
