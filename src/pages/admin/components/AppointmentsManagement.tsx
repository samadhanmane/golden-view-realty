
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Clock, 
  User, 
  Home, 
  FileText,
  Plus
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProperties } from '@/data/mockData';

// Mock appointments data
const generateRandomDate = () => {
  const start = new Date();
  const end = new Date();
  end.setDate(end.getDate() + 30);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

const generateAppointment = (id: number, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
  const property = mockProperties[Math.floor(Math.random() * mockProperties.length)];
  const users = ['John Smith', 'Emily Johnson', 'Michael Williams', 'Sophia Brown', 'Robert Davis', 'Emma Miller'];
  
  return {
    id: `APT${id.toString().padStart(4, '0')}`,
    propertyId: property.id,
    propertyTitle: property.title,
    propertyImage: property.imageUrl,
    date: generateRandomDate(),
    timeSlot: ['9:00 AM - 10:00 AM', '11:00 AM - 12:00 PM', '2:00 PM - 3:00 PM', '4:00 PM - 5:00 PM'][
      Math.floor(Math.random() * 4)
    ],
    clientName: users[Math.floor(Math.random() * users.length)],
    clientEmail: `client${id}@example.com`,
    clientPhone: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
    ownerName: 'Golden View Realty',
    status: status,
    agentNotes: status === 'completed' ? 'Client was very interested. Requested additional information about financing options.' : '',
    ownerNotes: status === 'completed' ? 'Property requires minor repairs before finalizing sale. Owner willing to negotiate on price.' : '',
  };
};

const mockAppointments = [
  ...Array(8).fill(null).map((_, i) => generateAppointment(i + 1, 'pending')),
  ...Array(6).fill(null).map((_, i) => generateAppointment(i + 9, 'confirmed')),
  ...Array(5).fill(null).map((_, i) => generateAppointment(i + 15, 'completed')),
  ...Array(3).fill(null).map((_, i) => generateAppointment(i + 20, 'cancelled')),
];

const AppointmentsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesSearch = 
      appointment.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === 'all') return matchesSearch;
    return appointment.status === activeTab && matchesSearch;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Pending</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-600">Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-green-600">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Schedule New Appointment
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">
            All Appointments ({mockAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({mockAppointments.filter(a => a.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="confirmed">
            Confirmed ({mockAppointments.filter(a => a.status === 'confirmed').length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({mockAppointments.filter(a => a.status === 'completed').length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({mockAppointments.filter(a => a.status === 'cancelled').length})
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Card className="shadow-sm">
        <CardHeader className="py-4">
          <CardTitle className="text-lg font-medium">
            {activeTab === 'all' ? 'All Appointments' : 
              activeTab === 'pending' ? 'Pending Appointments' :
              activeTab === 'confirmed' ? 'Confirmed Appointments' :
              activeTab === 'completed' ? 'Completed Appointments' : 'Cancelled Appointments'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Appointment ID</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <img
                        src={appointment.propertyImage}
                        alt={appointment.propertyTitle}
                        className="w-10 h-10 rounded object-cover mr-3"
                      />
                      <span className="font-medium">{appointment.propertyTitle}</span>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.clientName}</TableCell>
                  <TableCell>{formatDate(appointment.date)}</TableCell>
                  <TableCell>{appointment.timeSlot}</TableCell>
                  <TableCell>
                    {getStatusBadge(appointment.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {appointment.status === 'pending' && (
                          <>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              Confirm Appointment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <XCircle className="mr-2 h-4 w-4 text-red-600" />
                              Reject Appointment
                            </DropdownMenuItem>
                          </>
                        )}
                        {appointment.status === 'confirmed' && (
                          <>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Reschedule
                            </DropdownMenuItem>
                          </>
                        )}
                        {appointment.status === 'completed' && (
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Add Notes
                          </DropdownMenuItem>
                        )}
                        {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Appointment
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentsManagement;
