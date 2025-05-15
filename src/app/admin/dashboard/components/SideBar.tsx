"use client";

import {
  CalendarClock,
  MessageCircle,
  Settings,
  LogOut,
  CalendarPlus2,
} from "lucide-react";
import React from "react";
import { signOut } from "next-auth/react";
import { APP_NAME } from "@/app/constants";

interface ResponsiveDrawerProps {
  children: React.ReactNode;
}

const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="main-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-gray-50">
        {/* Page content */}
        <label
          htmlFor="main-drawer"
          className="btn btn-primary drawer-button lg:hidden m-4"
        >
          Open drawer
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="main-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="w-64 min-h-full flex flex-col justify-between bg-white">
          {/* Top section */}
          <div className="p-4">
            {/* Main navigation */}
            <ul className="menu text-base-content w-full">
              <li>
                <details open>
                  <summary>
                    <Settings />
                    {APP_NAME}
                  </summary>
                  <ul>
                    <li>
                      <a href="/admin/dashboard/new-event">
                        <CalendarPlus2 />
                        New Event
                      </a>
                    </li>
                    <li>
                      <a href="/admin/dashboard">
                        <CalendarClock />
                        Current Events
                      </a>
                    </li>
                    <li>
                      <a href="/admin/dashboard/send-sms">
                        <MessageCircle />
                        Send SMS
                      </a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>

          {/* Bottom section */}
          <div className="mt-auto p-4 border-t border-base-300">
            <ul className="menu text-base-content w-full">
              <li>
                <a onClick={() => signOut()}>
                  <LogOut />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveDrawer;
