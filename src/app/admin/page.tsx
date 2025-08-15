"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminWords from "@/components/admin-words";
import AdminSentences from "@/components/admin-sayings";
import AdminInfo from "@/components/admin-phrases";

export default function AdminDashboard() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-600 dark:text-white">
        Panel de Administración
      </h1>

      <Tabs defaultValue="words" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger
            value="words"
            className="cursor-pointer text-gray-500 data-[state=active]:text-orange-800 hover:text-orange-800 transition-all rounded-md"
          >
            Palabras
          </TabsTrigger>
          <TabsTrigger
            value="sentences"
            className="cursor-pointer text-gray-500 data-[state=active]:text-orange-800 hover:text-orange-800 transition-all rounded-md"
          >
            Refranes
          </TabsTrigger>
          <TabsTrigger
            value="info"
            className="cursor-pointer text-gray-500 data-[state=active]:text-orange-800 hover:text-orange-800 transition-all rounded-md"
          >
            Frases Proverbiales
          </TabsTrigger>
        </TabsList>
        <TabsContent value="words">
          <AdminWords />
        </TabsContent>
        <TabsContent value="sentences">
          <AdminSentences />
        </TabsContent>
        <TabsContent value="info">
          <AdminInfo />
        </TabsContent>
      </Tabs>
    </div>
  );
}
