
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import PropertiesManagement from './components/PropertiesManagement';
import UsersManagement from './components/UsersManagement';
import AppointmentsManagement from './components/AppointmentsManagement';
import ReportsManagement from './components/ReportsManagement';
import DealsManagement from './components/DealsManagement';
import { LayoutDashboard, Home, UserCheck, Calendar, FileText, LogOut, Building, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { checkIsAdmin } from '@/utils/authUtils';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is admin
    if (!checkIsAdmin()) {
      toast({
        title: "Access denied",
        description: "You don't have permission to access the admin dashboard",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);
  
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-bgLight">
      {/* Admin Header */}
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Golden View Realty Admin</h1>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-white border-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/')}
            >
              <Home className="mr-2 h-4 w-4" /> View Site
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2">
            <TabsTrigger value="dashboard" className="flex items-center">
              <LayoutDashboard className="mr-2 h-4 w-4" /> 
              <span className="hidden md:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="properties" className="flex items-center">
              <Building className="mr-2 h-4 w-4" /> 
              <span className="hidden md:inline">Properties</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <UserCheck className="mr-2 h-4 w-4" /> 
              <span className="hidden md:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> 
              <span className="hidden md:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="deals" className="flex items-center">
              <Award className="mr-2 h-4 w-4" /> 
              <span className="hidden md:inline">Successful Deals</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" /> 
              <span className="hidden md:inline">Reports</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Total Properties</h3>
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <p className="text-3xl font-bold">152</p>
                <p className="text-sm text-gray-500 mt-2">12 new this month</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Active Users</h3>
                  <UserCheck className="h-6 w-6 text-blue-500" />
                </div>
                <p className="text-3xl font-bold">5,342</p>
                <p className="text-sm text-gray-500 mt-2">+7.4% from last month</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Appointments</h3>
                  <Calendar className="h-6 w-6 text-green-500" />
                </div>
                <p className="text-3xl font-bold">42</p>
                <p className="text-sm text-gray-500 mt-2">12 pending, 30 confirmed</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Deals Closed</h3>
                  <Award className="h-6 w-6 text-yellow-500" />
                </div>
                <p className="text-3xl font-bold">15</p>
                <p className="text-sm text-gray-500 mt-2">$7.5M total value</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4 py-1">
                    <p className="text-sm font-medium">New property listing added</p>
                    <p className="text-xs text-gray-500">Today, 9:41 AM</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 py-1">
                    <p className="text-sm font-medium">User Michael Johnson registered</p>
                    <p className="text-xs text-gray-500">Today, 8:27 AM</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4 py-1">
                    <p className="text-sm font-medium">Appointment scheduled with Sarah Davies</p>
                    <p className="text-xs text-gray-500">Yesterday, 4:15 PM</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 py-1">
                    <p className="text-sm font-medium">Property #RT45692 marked as sold</p>
                    <p className="text-xs text-gray-500">Yesterday, 11:32 AM</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4 py-1">
                    <p className="text-sm font-medium">Appointment with Jack Wilson cancelled</p>
                    <p className="text-xs text-gray-500">Oct 10, 3:50 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Upcoming Appointments</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Property Viewing</p>
                      <p className="text-xs text-gray-500">Today, 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Client Meeting</p>
                      <p className="text-xs text-gray-500">Today, 4:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Property Assessment</p>
                      <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="properties">
            <PropertiesManagement />
          </TabsContent>
          
          <TabsContent value="users">
            <UsersManagement />
          </TabsContent>
          
          <TabsContent value="appointments">
            <AppointmentsManagement />
          </TabsContent>
          
          <TabsContent value="deals">
            <DealsManagement />
          </TabsContent>
          
          <TabsContent value="reports">
            <ReportsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
