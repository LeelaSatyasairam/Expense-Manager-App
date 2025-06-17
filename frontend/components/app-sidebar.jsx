import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "../components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Expense Manager",
      items: [
        { title: "Expense Categories", url: "/categories" },
        { title: "Expense Types", url: "/type" },
        { title: "Expenses", url: "/expense" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const username = localStorage.getItem("name");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("personid");
    navigate("/");
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between px-4 py-2 cursor-default select-none">
              <div className="flex flex-col">
                <span className="font-medium text-2xl">{username}</span>
                <span className="text-sm underline">Welcome to Expense Manager</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-sidebar-primary-foreground hover:text-red-600 transition-colors"
                title="Logout"
                aria-label="Logout"
                style ={{cursor: "pointer"}}
              >
                <FaSignOutAlt size={24} />
              </button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <span className="font-medium cursor-pointer">{item.title}</span>
                </SidebarMenuButton>
                {item.items?.length > 0 && (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={subItem.url}>{subItem.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
