'use client';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { menus } from "data/menus";
import Link from "next/link";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileNav() {
  const path = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <div className="lg:hidden flex justify-between w-full">
      <Sheet open={isSheetOpen}>
        <SheetTrigger onClick={() => setIsSheetOpen(!isSheetOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-left">Internal AbsenDulu</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start text-sm font-medium">
              {menus.map((menu, index) => {
                return (
                  <div key={index}>
                    {menu.subMenu ? (
                      <Collapsible className='group'>
                        <CollapsibleTrigger className='flex items-center rounded-md justify-between w-full py-2 px-4 text-gray-700 hover:bg-gray-100' >
                          <span>
                            {menu.name}
                          </span>
                          <span className='transition-transform group-data-[state=open]:rotate-90'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                          </span>

                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          {menu.subMenu.map((submenu, index) => (
                            <div key={index}>
                              <Link href={submenu.path} onClick={() => setIsSheetOpen(false)}>
                                <span className={`flex py-2 px-8 ${path === submenu.path ? 'text-gray-900 bg-gray-100' : 'text-gray-500'} hover:bg-gray-100`}>
                                  {submenu.name}
                                </span>
                              </Link>
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link href={menu.path} onClick={() => setIsSheetOpen(false)}>
                        <span className={`flex py-2 px-4 ${path === menu.path ? 'text-gray-900 bg-gray-100' : 'text-gray-700'} rounded-md hover:bg-gray-100`}>
                          {menu.name}
                        </span>
                      </Link>
                    )}
                  </div>
                )
              }
              )}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
      <span className="sr-only">Home</span>
    </div>
  )
}
