import { Bot, ChartPie } from "lucide-react";
import React from 'react';

type NavItem = {
  title: string;
  key: string;
  icon?: React.ElementType;
  children?: NavItem[];
  keys?: string[];
  titles?: string[]
};
type RouteType = {
  path: string;
  redirect?: string;
  element?: string;
};
const routeSetting: NavItem[] = [
  { key: "dashboard", title: "Dashboard", icon: ChartPie },
  {
    key: "system",
    title: "Admin",
    icon: Bot,
    children: [
      { key: "user", title: "Users", icon: Bot},
      { key: "role", title: "Roles", icon: Bot},
      { key: "menu", title: "Menu", icon: Bot},
      { key: "permission", title: "Permissions", icon: Bot},
      { key: "group", title: "Group", icon: Bot},
    ],
  },
];
function treeToList(tree:NavItem[]) {
  const menuMap = new Map<string,string[]>();
  const routes:RouteType[] = [];
  function traverse(node:NavItem,keys:string[]=[],titles:string[]=[]) {
    node.keys = [...keys,node.key];
    node.titles = [...titles,node.title];
    const fullpath:string = '/'+node.keys.join('/');
    if (node.children&&node.children.length>0) {
      node.children.forEach(child => traverse(child,node.keys??[],node.titles??[]));
      routes.push({
        path:fullpath,
        redirect:fullpath+'/'+node.children[0].key
      })
    }else{
      menuMap.set(fullpath,[...node.titles]);
      routes.push({
        path:fullpath,
        element:fullpath
      })
    }
  }

  tree.forEach(node => traverse(node));
  return {menuMap,routes};
}
const {menuMap,routes} = treeToList(routeSetting);
export { menuMap, routes, routeSetting, type NavItem };

