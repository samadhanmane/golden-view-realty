
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
import { Search, MoreHorizontal, Plus, Shield, ShieldAlert, User, UserCheck, UserX, Edit, Mail, Phone } from 'lucide-react';

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    role: "admin",
    status: "active",
    registeredDate: "2023-01-15T10:30:00Z",
    properties: 0
  },
  {
    id: 2,
    name: "David Thompson",
    email: "david.thompson@example.com",
    phone: "+1 (555) 234-5678",
    role: "agent",
    status: "active",
    registeredDate: "2023-02-10T14:45:00Z",
    properties: 15
  },
  {
    id: 3,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "+1 (555) 345-6789",
    role: "user",
    status: "active",
    registeredDate: "2023-03-05T09:15:00Z",
    properties: 0
  },
  {
    id: 4,
    name: "Michael Williams",
    email: "michael.williams@example.com",
    phone: "+1 (555) 456-7890",
    role: "property_owner",
    status: "active",
    registeredDate: "2023-02-20T11:00:00Z",
    properties: 3
  },
  {
    id: 5,
    name: "Sophia Brown",
    email: "sophia.brown@example.com",
    phone: "+1 (555) 567-8901",
    role: "user",
    status: "active",
    registeredDate: "2023-04-12T16:30:00Z",
    properties: 0
  },
  {
    id: 6,
    name: "Robert Davis",
    email: "robert.davis@example.com",
    phone: "+1 (555) 678-9012",
    role: "property_owner",
    status: "inactive",
    registeredDate: "2023-01-25T13:20:00Z",
    properties: 1
  },
  {
    id: 7,
    name: "Emma Miller",
    email: "emma.miller@example.com",
    phone: "+1 (555) 789-0123",
    role: "agent",
    status: "active",
    registeredDate: "2023-03-15T10:45:00Z",
    properties: 8
  },
  {
    id: 8,
    name: "Daniel Wilson",
    email: "daniel.wilson@example.com",
    phone: "+1 (555) 890-1234",
    role: "user",
    status: "inactive",
    registeredDate: "2023-02-05T09:00:00Z",
    properties: 0
  }
];

const UsersManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );
  
  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin':
        return <Badge className="bg-purple-600">Admin</Badge>;
      case 'agent':
        return <Badge className="bg-blue-600">Agent</Badge>;
      case 'property_owner':
        return <Badge className="bg-green-600">Property Owner</Badge>;
      case 'user':
        return <Badge variant="outline">User</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="flex items-center text-green-600"><UserCheck className="h-4 w-4 mr-1" /> Active</span>;
      case 'inactive':
        return <span className="flex items-center text-gray-500"><UserX className="h-4 w-4 mr-1" /> Inactive</span>;
      default:
        return <span>Unknown</span>;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader className="py-4">
          <CardTitle className="text-lg font-medium">Users List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact Information</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>Properties</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                        {user.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                        {user.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(user.status)}
                  </TableCell>
                  <TableCell>{formatDate(user.registeredDate)}</TableCell>
                  <TableCell>
                    {user.properties > 0 ? (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                        {user.properties} {user.properties === 1 ? 'Property' : 'Properties'}
                      </Badge>
                    ) : (
                      <span className="text-gray-400 text-sm">None</span>
                    )}
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
                          <User className="mr-2 h-4 w-4" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        {user.role !== 'admin' && (
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        {user.status === 'active' ? (
                          <DropdownMenuItem className="text-amber-600">
                            <UserX className="mr-2 h-4 w-4" />
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-green-600">
                            <UserCheck className="mr-2 h-4 w-4" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <ShieldAlert className="mr-2 h-4 w-4" />
                          Delete Account
                        </DropdownMenuItem>
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

export default UsersManagement;
