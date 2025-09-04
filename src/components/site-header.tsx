import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { menuMap } from "@/routes";
import { useThemeStore } from '@/store/index';
import React from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router';
export function SiteHeader() {
  const location = useLocation();
  const intl = useIntl()
  const {mode,setMode} = useThemeStore();
  const pathname: string = location.pathname;
  const titles:string[] = menuMap.get(pathname)??[];
  return (
    <header className="sticky top-0 z-50 bg-background flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {titles.map((title, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink >
                    {intl.formatMessage({id:title})}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index !== titles.length - 1 && (
                  <BreadcrumbSeparator />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <Switch id="airplane-mode" checked={mode === 'dark'}
            // className="bg-white dark:bg-white data-[state=checked]:bg-black"
            onCheckedChange={(checked) => setMode(checked ? 'dark' : 'light')} />
        </div>
      </div>
    </header>
  )
}
