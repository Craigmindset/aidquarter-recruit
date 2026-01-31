"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Search,
  Filter,
  UserX,
  Eye,
  CreditCard,
} from "lucide-react";

export default function EmployeesPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showFireDialog, setShowFireDialog] = useState(false);
  const [fireReason, setFireReason] = useState("");
  const [fireDetails, setFireDetails] = useState("");

  const employees = [
    {
      id: 1,
      firstName: "Grace",
      lastName: "Okoro",
      position: "Nanny",
      image: "/placeholder.svg?height=80&width=80",
      status: "Active",
      vettedAddress: "15 Admiralty Way, Lekki Phase 1, Lagos",
      contactNumber: "+234 801 234 5678",
      alternativeNumber: "+234 802 345 6789",
      email: "grace.okoro@email.com",
      guarantorNames: ["Mrs. Adunni Okafor", "Mr. Tunde Okoro"],
      guarantorAddress: "23 Victoria Island, Lagos",
      driversLicenseId: "LAG123456789",
      dateOfEmployment: "2024-06-15",
      salary: 60000,
      rating: 4.9,
      experience: "6 years",
    },
    {
      id: 2,
      firstName: "Ibrahim",
      lastName: "Musa",
      position: "Driver",
      image: "/placeholder.svg?height=80&width=80",
      status: "Active",
      vettedAddress: "42 Gwarinpa Estate, Abuja",
      contactNumber: "+234 803 456 7890",
      alternativeNumber: "+234 804 567 8901",
      email: "ibrahim.musa@email.com",
      guarantorNames: ["Alhaji Sani Musa", "Mrs. Khadija Ibrahim"],
      guarantorAddress: "18 Wuse 2, Abuja",
      driversLicenseId: "ABJ987654321",
      dateOfEmployment: "2024-08-01",
      salary: 50000,
      rating: 4.7,
      experience: "8 years",
    },
    {
      id: 3,
      firstName: "Chioma",
      lastName: "Nwankwo",
      position: "Housekeeper",
      image: "/placeholder.svg?height=80&width=80",
      status: "Active",
      vettedAddress: "7 New Haven, Enugu",
      contactNumber: "+234 805 678 9012",
      alternativeNumber: "+234 806 789 0123",
      email: "chioma.nwankwo@email.com",
      guarantorNames: ["Mr. Emeka Nwankwo", "Mrs. Ngozi Okafor"],
      guarantorAddress: "12 Independence Layout, Enugu",
      driversLicenseId: "N/A",
      dateOfEmployment: "2024-09-10",
      salary: 45000,
      rating: 4.6,
      experience: "4 years",
    },
  ];

  const handleViewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
  };

  const handleFireEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setShowFireDialog(true);
  };

  const confirmFireEmployee = () => {
    // Handle firing logic here
    setShowFireDialog(false);
    setSelectedEmployee(null);
    setFireReason("");
    setFireDetails("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Employee Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your current household staff
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
          Add New Employee
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Search employees..."
                className="pl-10 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employee Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {employees.length}
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {employees.filter((e) => e.status === "Active").length}
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Monthly Payroll
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              ₦
              {employees
                .reduce((sum, emp) => sum + emp.salary, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Avg. Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {(
                employees.reduce((sum, emp) => sum + emp.rating, 0) /
                employees.length
              ).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Card
            key={employee.id}
            className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={employee.image || "/placeholder.svg"}
                    alt={`${employee.firstName} ${employee.lastName}`}
                  />
                  <AvatarFallback>
                    {employee.firstName[0]}
                    {employee.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {employee.firstName} {employee.lastName}
                  </h3>
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    {employee.position}
                  </p>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-1 dark:bg-green-900 dark:text-green-300">
                    {employee.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span className="truncate dark:text-gray-300">
                    {employee.contactNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span className="truncate dark:text-gray-300">
                    {employee.email}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span className="truncate dark:text-gray-300">
                    {employee.vettedAddress.split(",")[0]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <span className="dark:text-gray-300">
                    {new Date(employee.dateOfEmployment).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-gray-600 dark:text-gray-400 mb-1">
                  Salary: ₦{employee.salary.toLocaleString()}/month
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Rating: {employee.rating}/5 ⭐
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 dark:border-gray-700 dark:hover:bg-gray-700"
                  onClick={() => handleViewEmployee(employee)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950 dark:border-gray-700"
                  onClick={() => handleFireEmployee(employee)}
                >
                  <UserX className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Employee Details Modal */}
      <Dialog
        open={!!selectedEmployee && !showFireDialog}
        onOpenChange={() => setSelectedEmployee(null)}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>

          {selectedEmployee && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={selectedEmployee.image || "/placeholder.svg"}
                    alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                  />
                  <AvatarFallback className="text-lg">
                    {selectedEmployee.firstName[0]}
                    {selectedEmployee.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedEmployee.firstName} {selectedEmployee.lastName}
                  </h3>
                  <p className="text-lg text-green-600 dark:text-green-400 font-medium">
                    {selectedEmployee.position}
                  </p>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300">
                    {selectedEmployee.status}
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <span className="dark:text-gray-300">
                        {selectedEmployee.contactNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <span className="dark:text-gray-300">
                        {selectedEmployee.alternativeNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <span className="dark:text-gray-300">
                        {selectedEmployee.email}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 mt-1" />
                      <span className="dark:text-gray-300">
                        {selectedEmployee.vettedAddress}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Employment Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <span className="dark:text-gray-300">
                        Started:{" "}
                        {new Date(
                          selectedEmployee.dateOfEmployment,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <span className="dark:text-gray-300">
                        Salary: ₦{selectedEmployee.salary.toLocaleString()}
                        /month
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Experience: {selectedEmployee.experience}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Rating: {selectedEmployee.rating}/5 ⭐
                      </p>
                    </div>
                    {selectedEmployee.driversLicenseId !== "N/A" && (
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Driver's License: {selectedEmployee.driversLicenseId}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Guarantor Information
                </h4>
                <div className="space-y-2">
                  {selectedEmployee.guarantorNames.map(
                    (name: string, index: number) => (
                      <p
                        key={index}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {name}
                      </p>
                    ),
                  )}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {selectedEmployee.guarantorAddress}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedEmployee(null)}
              className="dark:border-gray-700 dark:hover:bg-gray-700"
            >
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleFireEmployee(selectedEmployee)}
            >
              <UserX className="h-4 w-4 mr-2" />
              Fire Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Fire Employee Dialog */}
      <Dialog open={showFireDialog} onOpenChange={setShowFireDialog}>
        <DialogContent className="dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-red-600 dark:text-red-400">
              Fire Employee
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Are you sure you want to terminate {selectedEmployee?.firstName}{" "}
              {selectedEmployee?.lastName}? This action cannot be undone.
            </p>

            <div className="space-y-2">
              <Label htmlFor="reason" className="dark:text-gray-300">
                Reason for Termination *
              </Label>
              <Select value={fireReason} onValueChange={setFireReason}>
                <SelectTrigger className="dark:bg-gray-900 dark:border-gray-700 dark:text-white">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-900 dark:border-gray-700">
                  <SelectItem value="performance">Poor Performance</SelectItem>
                  <SelectItem value="misconduct">Misconduct</SelectItem>
                  <SelectItem value="attendance">Attendance Issues</SelectItem>
                  <SelectItem value="redundancy">
                    Position Redundancy
                  </SelectItem>
                  <SelectItem value="breach">Contract Breach</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details" className="dark:text-gray-300">
                Additional Details
              </Label>
              <Textarea
                id="details"
                placeholder="Provide additional details about the termination..."
                value={fireDetails}
                onChange={(e) => setFireDetails(e.target.value)}
                rows={3}
                className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowFireDialog(false)}
              className="dark:border-gray-700 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmFireEmployee}
              disabled={!fireReason}
            >
              Confirm Termination
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
