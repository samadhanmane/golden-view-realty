
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, Download, FileSpreadsheet, BarChart, PieChart, LineChart } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const ReportsManagement: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Reports & Analytics</h2>
        <div className="flex items-center space-x-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="finance">Financial</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Property Listings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center border border-dashed rounded-lg">
                  <div className="text-center">
                    <BarChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Property Listings Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">User Registration Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center border border-dashed rounded-lg">
                  <div className="text-center">
                    <LineChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">User Registration Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Appointment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center border border-dashed rounded-lg">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Appointment Statistics Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center border border-dashed rounded-lg">
                  <div className="text-center">
                    <BarChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Revenue Chart</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="properties">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Available Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-primary/10 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">All Properties Report</h3>
                        <p className="text-sm text-gray-500 mb-3">Complete listing of all properties with details</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-green-100 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Featured Properties Report</h3>
                        <p className="text-sm text-gray-500 mb-3">Details on featured and premium listings</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-amber-100 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Properties by Location</h3>
                        <p className="text-sm text-gray-500 mb-3">Geographic distribution of properties</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Properties by Type</h3>
                        <p className="text-sm text-gray-500 mb-3">Breakdown of properties by category and type</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Available Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-primary/10 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">All Users Report</h3>
                        <p className="text-sm text-gray-500 mb-3">Complete listing of all registered users</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Property Owners Report</h3>
                        <p className="text-sm text-gray-500 mb-3">Details of all property owners and their listings</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">New Registrations</h3>
                        <p className="text-sm text-gray-500 mb-3">Monthly breakdown of new user registrations</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-red-100 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Inactive Users</h3>
                        <p className="text-sm text-gray-500 mb-3">List of users without recent activity</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="appointments">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Available Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-primary/10 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">All Appointments Report</h3>
                        <p className="text-sm text-gray-500 mb-3">Complete listing of all scheduled appointments</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-amber-100 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Pending Appointments</h3>
                        <p className="text-sm text-gray-500 mb-3">List of all pending appointment requests</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-green-100 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Completed Appointments</h3>
                        <p className="text-sm text-gray-500 mb-3">Details of all completed property viewings</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-red-100 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Cancelled Appointments</h3>
                        <p className="text-sm text-gray-500 mb-3">Analysis of cancelled appointments</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="finance">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Available Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-green-100 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Revenue Report</h3>
                        <p className="text-sm text-gray-500 mb-3">Monthly and annual revenue analysis</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Transaction History</h3>
                        <p className="text-sm text-gray-500 mb-3">Complete transaction records for all properties</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Commission Report</h3>
                        <p className="text-sm text-gray-500 mb-3">Agent commission breakdown</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start">
                      <div className="p-2 bg-amber-100 rounded-md mr-4">
                        <FileSpreadsheet className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Financial Projections</h3>
                        <p className="text-sm text-gray-500 mb-3">Revenue projections based on current listings</p>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Export to Excel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsManagement;
