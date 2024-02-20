import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOrders from "./orders/dashboard_orders";
import DashboardSubs from "./subs/dashboard_subs";
import DashboardProfileEdit from "./dashboard_profile_edit";
import DashbooardHome from "./dashboard_home/dashboard_home";
import DashboardTrainers from "./trainers/dashboard_trainers";

const DashboardHome = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Tabs defaultValue="home" className="">
        <div className="flex items-center justify-center w-full">
          <TabsList className="bg-[#1d2120]">
            <TabsTrigger value="home" className="text-white">
              Home
            </TabsTrigger>
            <TabsTrigger value="account" className="text-white">
              Orders
            </TabsTrigger>
            <TabsTrigger value="password" className="text-white">
              Subscription
            </TabsTrigger>
            <TabsTrigger value="trainers" className="text-white">
              Trainers
            </TabsTrigger>
            <TabsTrigger value="subs" className="text-white">
              Profile
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="home" className="">
          <DashbooardHome />
        </TabsContent>
        <TabsContent value="account" className="">
          <DashboardOrders />
        </TabsContent>
        <TabsContent value="password">
          <DashboardSubs />
        </TabsContent>
        <TabsContent value="trainers">
          <DashboardTrainers />
        </TabsContent>
        <TabsContent value="subs">
          <DashboardProfileEdit />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardHome;
