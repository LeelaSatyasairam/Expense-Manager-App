import * as React from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Import Link
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

// Sample navigation data
const data = {
  navMain: [
    {
      title: "Expense Manager",
      url: "", // Not used for parent titles
      items: [
        {
          title: "Expense Categories",
          url: "/categories",
        },
        {
          title: "Expense Types",
          url: "/type",
        },
        {
          title: "Expenses",
          url: "/expense",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/"); // Redirect to login page
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
                  {/* Parent title - optional */}
                  <span className="font-medium cursor-default">{item.title}</span>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link to={subItem.url}>{subItem.title}</Link> {/* ✅ Updated */}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
