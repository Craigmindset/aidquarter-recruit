"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Mock data for aid workers
const aidWorkers = [
  {
    id: 1,
    name: "Adunni Okafor",
    image: "/placeholder.svg?height=200&width=200",
    status: "Available to work",
    position: "Housekeeper",
    salaryRange: "₦40,000 - ₦50,000",
    currentLocation: "Lagos",
    preferredWorkLocation: "Lagos only",
    rating: 4.8,
    experience: "5 years",
  },
  {
    id: 2,
    name: "Blessing Adebayo",
    image: "/placeholder.svg?height=200&width=200",
    status: "Available to work",
    position: "Nanny",
    salaryRange: "₦60,000 - ₦80,000",
    currentLocation: "Abuja",
    preferredWorkLocation: "Open",
    rating: 4.9,
    experience: "7 years",
  },
  {
    id: 3,
    name: "Emeka Okonkwo",
    image: "/placeholder.svg?height=200&width=200",
    status: "Available to work",
    position: "Driver",
    salaryRange: "₦45,000 - ₦55,000",
    currentLocation: "Lagos",
    preferredWorkLocation: "Lagos only",
    rating: 4.7,
    experience: "8 years",
  },
  {
    id: 4,
    name: "Fatima Ibrahim",
    image: "/placeholder.svg?height=200&width=200",
    status: "Available to work",
    position: "Housekeeper",
    salaryRange: "₦35,000 - ₦45,000",
    currentLocation: "Kano",
    preferredWorkLocation: "Open",
    rating: 4.6,
    experience: "4 years",
  },
  {
    id: 5,
    name: "Grace Okoro",
    image: "/placeholder.svg?height=200&width=200",
    status: "Available to work",
    position: "Nanny",
    salaryRange: "₦55,000 - ₦70,000",
    currentLocation: "Port Harcourt",
    preferredWorkLocation: "Open",
    rating: 4.8,
    experience: "6 years",
  },
  {
    id: 6,
    name: "Ibrahim Musa",
    image: "/placeholder.svg?height=200&width=200",
    status: "Available to work",
    position: "Driver",
    salaryRange: "₦50,000 - ₦60,000",
    currentLocation: "Abuja",
    preferredWorkLocation: "Abuja only",
    rating: 4.9,
    experience: "10 years",
  },
  {
    id: 7,
    name: "Chioma Nwankwo",
    image: "/placeholder.svg?height=200&width=200",
    status: "Available to work",
    position: "Housekeeper",
    salaryRange: "₦42,000 - ₦52,000",
    currentLocation: "Lagos",
    preferredWorkLocation: "Lagos only",
    rating: 4.7,
    experience: "5 years",
  },
  {
    id: 8,
    name: "Aisha Mohammed",
    image: "/placeholder.svg?height=200&width=200",
    status: "Available to work",
    position: "Nanny",
    salaryRange: "₦65,000 - ₦85,000",
    currentLocation: "Lagos",
    preferredWorkLocation: "Open",
    rating: 4.9,
    experience: "9 years",
  },
];

export default function FindAidPage() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [positionDropdownOpen, setPositionDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);

  // Extract unique positions and states
  const positions = Array.from(new Set(aidWorkers.map((w) => w.position)));
  const states = Array.from(new Set(aidWorkers.map((w) => w.currentLocation)));

  // Filter workers based on selected filters
  const filteredWorkers = aidWorkers.filter((worker) => {
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
        <div className="container mx-auto px-4 lg:px-6 text-center">
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
            <p className="text-gray-600">
              Showing {filteredWorkers.length} verified professionals
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredWorkers.length > 0 ? (
              filteredWorkers.map((worker) => (
                <Card
                  key={worker.id}
                  className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
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
                      <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 hover:bg-green-100">
                        {worker.status}
                      </Badge>
                    </div>

                    {/* Worker Info */}
                    <div className="space-y-3 flex-grow">
                      <div>
                        <h3 className="font-semibold text-sm md:text-lg text-gray-900 break-words">
                          {worker.name}
                        </h3>
                        <p className="text-green-600 font-medium text-sm">
                          {worker.position}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{worker.currentLocation}</span>
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

                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Recruit
                      </Button>
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
    </div>
  );
}
