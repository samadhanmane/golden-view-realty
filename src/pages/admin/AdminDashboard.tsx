
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  Clock, 
  FileText, 
  LogOut, 
  Calendar, 
  ChevronDown, 
  Search,
  Download,
  PlusCircle,
  Building,
  BellRing
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PropertiesManagement from './components/PropertiesManagement';
import AppointmentsManagement from './components/AppointmentsManagement';
import UsersManagement from './components/UsersManagement';
import ReportsManagement from './components/ReportsManagement';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Mock data for dashboard overview
  const dashboardStats = {
    properties: 152,
    newProperties: 12,
    users: 583,
    newUsers: 41,
    appointments: 87,
    pendingAppointments: 23,
    completedDeals: 76,
    revenue: 450000
  };
  
  // Mock data for recent activities
  const recentActivities = [
    { id: 1, type: 'property', action: 'New property listed', time: '10 mins ago', user: 'John Smith' },
    { id: 2, type: 'appointment', action: 'Appointment confirmed', time: '2 hours ago', user: 'Michael Brown' },
    { id: 3, type: 'user', action: 'New user registered', time: '5 hours ago', user: 'Emily Wilson' },
    { id: 4, type: 'property', action: 'Property sold', time: '1 day ago', user: 'Sarah Johnson' },
    { id: 5, type: 'appointment', action: 'Appointment requested', time: '1 day ago', user: 'David Lee' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Golden View</h1>
          <p className="text-sm text-gray-500">Admin Dashboard</p>
        </div>
        
        <div className="px-3 py-2">
          <Button 
            variant="ghost" 
            className={`w-full justify-start mb-1 ${activeTab === 'overview' ? 'bg-primary/10 text-primary' : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard Overview
          </Button>
          
          <Button 
            variant="ghost" 
            className={`w-full justify-start mb-1 ${activeTab === 'properties' ? 'bg-primary/10 text-primary' : ''}`}
            onClick={() => handleTabChange('properties')}
          >
            <Building className="mr-2 h-4 w-4" />
            Properties
          </Button>
          
          <Button 
            variant="ghost" 
            className={`w-full justify-start mb-1 ${activeTab === 'appointments' ? 'bg-primary/10 text-primary' : ''}`}
            onClick={() => handleTabChange('appointments')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Appointments
            <Badge className="ml-auto bg-primary">23</Badge>
          </Button>
          
          <Button 
            variant="ghost" 
            className={`w-full justify-start mb-1 ${activeTab === 'users' ? 'bg-primary/10 text-primary' : ''}`}
            onClick={() => handleTabChange('users')}
          >
            <Users className="mr-2 h-4 w-4" />
            Users
          </Button>
          
          <Button 
            variant="ghost" 
            className={`w-full justify-start mb-1 ${activeTab === 'reports' ? 'bg-primary/10 text-primary' : ''}`}
            onClick={() => handleTabChange('reports')}
          >
            <FileText className="mr-2 h-4 w-4" />
            Reports
          </Button>
          
          <div className="mt-8 pt-4 border-t border-gray-100">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="flex justify-between items-center px-6 py-4">
            <div>
              <h1 className="text-xl font-semibold">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'properties' && 'Manage Properties'}
                {activeTab === 'appointments' && 'Manage Appointments'}
                {activeTab === 'users' && 'Manage Users'}
                {activeTab === 'reports' && 'Reports & Analytics'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  className="pl-9 w-60" 
                  placeholder="Search..." 
                />
              </div>
              
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <BellRing className="h-5 w-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <ScrollArea className="h-[300px]">
                    <div className="p-2 space-y-2">
                      <DropdownMenuItem className="cursor-pointer p-3 hover:bg-gray-100 rounded-md">
                        <div>
                          <p className="font-medium">New Appointment Request</p>
                          <p className="text-sm text-gray-500">Michael Brown requested an appointment</p>
                          <p className="text-xs text-gray-400 mt-1">10 minutes ago</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer p-3 hover:bg-gray-100 rounded-md">
                        <div>
                          <p className="font-medium">Property Listed</p>
                          <p className="text-sm text-gray-500">New property "Luxury Villa" has been listed</p>
                          <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer p-3 hover:bg-gray-100 rounded-md">
                        <div>
                          <p className="font-medium">User Registration</p>
                          <p className="text-sm text-gray-500">Emily Wilson has registered as a new user</p>
                          <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </ScrollArea>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-center text-primary font-medium">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Admin Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                      <span>A</span>
                    </div>
                    <span>Admin</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-500">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Properties</p>
                        <h3 className="text-3xl font-bold">{dashboardStats.properties}</h3>
                        <p className="text-green-600 text-xs mt-2">
                          +{dashboardStats.newProperties} this month
                        </p>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-md">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Registered Users</p>
                        <h3 className="text-3xl font-bold">{dashboardStats.users}</h3>
                        <p className="text-green-600 text-xs mt-2">
                          +{dashboardStats.newUsers} this month
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-md">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Appointments</p>
                        <h3 className="text-3xl font-bold">{dashboardStats.appointments}</h3>
                        <p className="text-amber-600 text-xs mt-2">
                          {dashboardStats.pendingAppointments} pending
                        </p>
                      </div>
                      <div className="p-3 bg-amber-100 rounded-md">
                        <Calendar className="h-6 w-6 text-amber-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                        <h3 className="text-3xl font-bold">${dashboardStats.revenue.toLocaleString()}</h3>
                        <p className="text-green-600 text-xs mt-2">
                          {dashboardStats.completedDeals} completed deals
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-md">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Button className="bg-primary">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Property
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Button>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  <Users className="mr-2 h-4 w-4" />
                  Add New User
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download Reports
                </Button>
              </div>
              
              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="font-semibold text-lg">Recent Activity</h3>
                  </div>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                      {recentActivities.map(activity => (
                        <div key={activity.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-start">
                            <div className="mr-4">
                              {activity.type === 'property' && (
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Building className="h-5 w-5 text-primary" />
                                </div>
                              )}
                              {activity.type === 'appointment' && (
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                  <Calendar className="h-5 w-5 text-amber-600" />
                                </div>
                              )}
                              {activity.type === 'user' && (
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                  <Users className="h-5 w-5 text-blue-600" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{activity.action}</p>
                              <p className="text-sm text-gray-500">{activity.user}</p>
                              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Upcoming Appointments */}
                <Card>
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="font-semibold text-lg">Upcoming Appointments</h3>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">Property Viewing</h4>
                          <Badge className="bg-blue-600">Today</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Luxury Villa in Los Angeles</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            2:00 PM
                          </span>
                          <span>Michael Brown</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 border border-gray-100 rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">Property Inspection</h4>
                          <Badge variant="outline">Tomorrow</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Modern Condo in New York</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            11:30 AM
                          </span>
                          <span>David Lee</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-50 border border-gray-100 rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">Document Signing</h4>
                          <Badge variant="outline">May 15, 2023</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Beach House in Miami</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            10:00 AM
                          </span>
                          <span>Sarah Johnson</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" className="w-full mt-4 text-primary">
                      View All Appointments
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'properties' && <PropertiesManagement />}
          {activeTab === 'appointments' && <AppointmentsManagement />}
          {activeTab === 'users' && <UsersManagement />}
          {activeTab === 'reports' && <ReportsManagement />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
