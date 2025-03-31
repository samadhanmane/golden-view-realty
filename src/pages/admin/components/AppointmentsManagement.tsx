import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Calendar,
  Clock, 
  Download, 
  MoreHorizontal, 
  Search,
  Phone,
  CheckCircle,
  XCircle,
  Eye as EyeIcon, // Import renamed to EyeIcon to avoid confusion
  FileText,
  PlusCircle
} from "lucide-react";

// Mock appointment data
const mockAppointments = [
  {
    id: 1,
    property: 'Luxury Villa in Beverly Hills',
    client: 'John Smith',
    dateTime: '2023-08-15T14:00:00',
    status: 'Confirmed',
    type: 'Viewing',
    notes: 'Client interested in pool and garden',
  },
  {
    id: 2,
    property: 'Modern Apartment in Downtown LA',
    client: 'Emily Johnson',
    dateTime: '2023-08-16T11:30:00',
    status: 'Pending',
    type: 'Inspection',
    notes: 'Check for water leaks',
  },
  {
    id: 3,
    property: 'Beachfront House in Malibu',
    client: 'Michael Brown',
    dateTime: '2023-08-17T16:00:00',
    status: 'Completed',
    type: 'Signing',
    notes: 'Documents signed and approved',
  },
  {
    id: 4,
    property: 'Cozy Cottage in Santa Monica',
    client: 'Sarah Lee',
    dateTime: '2023-08-18T09:00:00',
    status: 'Cancelled',
    type: 'Viewing',
    notes: 'Client cancelled due to travel issues',
  },
  {
    id: 5,
    property: 'Spacious Loft in Arts District',
    client: 'David Kim',
    dateTime: '2023-08-19T13:00:00',
    status: 'Confirmed',
    type: 'Inspection',
    notes: 'Check for structural integrity',
  },
];

const AppointmentsManagement: React.FC = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (value: string) => {
    setFilterStatus(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const searchMatch =
      appointment.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.client.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = filterStatus ? appointment.status === filterStatus : true;
    return searchMatch && statusMatch;
  });

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedAppointments.length / appointmentsPerPage);
  const paginatedAppointments = sortedAppointments.slice(
    (currentPage - 1) * appointmentsPerPage,
    currentPage * appointmentsPerPage
  );

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const dashboardStats = {
    totalAppointments: appointments.length,
    confirmedAppointments: appointments.filter(a => a.status === 'Confirmed').length,
    pendingAppointments: appointments.filter(a => a.status === 'Pending').length,
    cancelledAppointments: appointments.filter(a => a.status === 'Cancelled').length,
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Appointments</p>
                <h3 className="text-3xl font-bold">{dashboardStats.totalAppointments}</h3>
              </div>
              <div className="p-3 bg-gray-100 rounded-md">
                <Calendar className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Confirmed Appointments</p>
                <h3 className="text-3xl font-bold">{dashboardStats.confirmedAppointments}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-md">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Pending Appointments</p>
                <h3 className="text-3xl font-bold">{dashboardStats.pendingAppointments}</h3>
              </div>
              <div className="p-3 bg-amber-100 rounded-md">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Cancelled Appointments</p>
                <h3 className="text-3xl font-bold">{dashboardStats.cancelledAppointments}</h3>
              </div>
              <div className="p-3 bg-red-100 rounded-md">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9 w-full md:w-60"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Status Filter */}
          <Select onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by status" defaultValue={filterStatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          {/* Export Button */}
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          {/* Create Button */}
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Appointment
          </Button>
        </div>
      </div>
      
      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Appointments</CardTitle>
          <CardDescription>Manage and track all property appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAppointments.map(appointment => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.id}</TableCell>
                  <TableCell>{appointment.property}</TableCell>
                  <TableCell>{appointment.client}</TableCell>
                  <TableCell>
                    {new Date(appointment.dateTime).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        appointment.status === 'Confirmed'
                          ? 'default'
                          : appointment.status === 'Pending'
                          ? 'secondary'
                          : appointment.status === 'Cancelled'
                          ? 'destructive'
                          : 'outline'
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{appointment.type}</TableCell>
                  <TableCell>{appointment.notes}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <EyeIcon className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          Contact Client
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Documents
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Appointment details modal (omitted for brevity) */}
    </div>
  );
};

export default AppointmentsManagement;
