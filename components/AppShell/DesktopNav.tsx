'use client'
import Link from 'next/link';
import { menus } from "data/menus";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { usePathname } from 'next/navigation';

export default function DesktopNav() {
  const path = usePathname();
  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid items-start px-4 text-sm font-medium">
        {menus.map((menu, index) => {
          return (
            <div key={index}>
              {menu.subMenu ? (
                <Collapsible className='group'>
                  <CollapsibleTrigger className='flex items-center rounded-md justify-between w-full py-2 px-4 text-neutral-500 hover:bg-neutral-100' >
                    <span>
                      {menu.name}
                    </span>
                    <span className='transition-transform group-data-[state=open]:rotate-90'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </span>

                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {menu.subMenu.map((submenu, index) => (
                      <div key={index}>
                        <Link href={submenu.path}>
                          <span className={`flex py-2 px-8 rounded-md ${path === submenu.path ? 'text-neutral-900 bg-neutral-100' : 'text-gray-500'} hover:bg-neutral-100`}>
                            {submenu.name}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link href={menu.path}>
                  <span className={`flex py-2 px-4 ${path === menu.path ? 'text-neutral-900 bg-gray-100' : 'text-gray-500'} rounded-md hover:bg-neutral-100`}>
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
  );
}

