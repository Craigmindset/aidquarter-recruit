import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Star, Phone } from "lucide-react";

export default function RecruitmentPage() {
  const selectedCandidates = [
    {
      id: 1,
      name: "Blessing Adebayo",
      position: "Nanny",
      image: "/placeholder.svg?height=80&width=80",
      status: "Selected",
      rating: 4.9,
      experience: "7 years",
      location: "Abuja",
      phone: "+234 801 234 5678",
      skills: ["Child Care", "First Aid", "Cooking"],
      salaryRange: "₦60,000 - ₦80,000",
    },
    {
      id: 2,
      name: "Emeka Okonkwo",
      position: "Driver",
      image: "/placeholder.svg?height=80&width=80",
      status: "Selected",
      rating: 4.7,
      experience: "8 years",
      location: "Lagos",
      phone: "+234 802 345 6789",
      skills: ["Defensive Driving", "Vehicle Maintenance", "Navigation"],
      salaryRange: "₦45,000 - ₦55,000",
    },
  ];

  return (
    <div className="space-y-6 min-w-0 overflow-x-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Recruitment Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your selected candidates and schedule interviews
          </p>
        </div>
        <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
          Find More Candidates
        </Button>
      </div>

      {/* Selected Candidates */}
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Selected Candidates
          </h2>
          <Badge
            variant="outline"
            className="text-gray-600 dark:text-gray-400 dark:border-gray-700"
          >
            {selectedCandidates.length}/3 Selected
          </Badge>
        </div>

        {selectedCandidates.length === 0 ? (
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Calendar className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No candidates selected
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start by browsing and selecting candidates for your household
                needs
              </p>
              <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
                Browse Candidates
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCandidates.map((candidate) => (
              <Card
                key={candidate.id}
                className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={candidate.image || "/placeholder.svg"}
                        alt={candidate.name}
                      />
                      <AvatarFallback>
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {candidate.name}
                      </h3>
                      <p className="text-green-600 dark:text-green-400 font-medium">
                        {candidate.position}
                      </p>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-1 dark:bg-green-900 dark:text-green-300">
                        {candidate.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="dark:text-gray-300">
                        {candidate.rating} rating
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <span className="dark:text-gray-300">
                        {candidate.location}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      Experience: {candidate.experience}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      Salary: {candidate.salaryRange}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 2).map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs dark:bg-gray-700 dark:text-gray-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 2 && (
                      <Badge
                        variant="secondary"
                        className="text-xs dark:bg-gray-700 dark:text-gray-300"
                      >
                        +{candidate.skills.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Interview
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="dark:border-gray-700 dark:hover:bg-gray-700"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Interview Schedule */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Upcoming Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>BA</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Blessing Adebayo
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Nanny Position
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-medium text-gray-900 dark:text-white">
                  Tomorrow, 2:00 PM
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Video Call
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Reschedule
              </Button>
            </div>

            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No other interviews scheduled</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
