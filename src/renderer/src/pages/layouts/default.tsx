import { Outlet } from "react-router-dom"
import * as Collapsible from '@radix-ui/react-collapsible';
import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"
import { useState } from "react";


export const Default = () => {
  const [isSidebarOpen,setIsSibarOpen] = useState(true)
  return (
    <Collapsible.Root
      defaultOpen
      onOpenChange={setIsSibarOpen}
      className="h-screen w-screen text-red-100 flex"
    >
      <div className='h-screen w-screen text-rotion-100 flex'>
        <Sidebar />
        <div className='flex-1 flex flex-col max-h-screen'>
          <Header isSidebarOpen={isSidebarOpen} />

          <Outlet />
        </div>
      </div>
    </Collapsible.Root>
  )
}
