/* eslint-disable prettier/prettier */
import React from "react";
import { items } from "./navItems";

export default function SettingsGrid() {
  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((it) => {
          const Icon = it.icon as React.ComponentType<any>;
          return (
            <a
              key={it.title}
              href={it.url}
              className="flex items-center gap-3 p-4 border rounded-lg hover:shadow-md transition-colors bg-white dark:bg-slate-800"
              aria-label={it.title}
            >
              <div className="p-2 rounded-md bg-slate-100 dark:bg-slate-700">
                <Icon className="w-6 h-6 text-slate-700 dark:text-slate-200" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-slate-500">Go to {it.title}</div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
