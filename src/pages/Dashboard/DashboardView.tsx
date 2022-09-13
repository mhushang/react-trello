import React from "react";
import { IStateProps } from "./model";

import "./Dashboard.css";

export const DashboardView: React.FC<IStateProps> = ({
  columns,
  tasksList,
}) => {


  return (
      <main className="dashboard">
        <div className="dashboard-body">
          {columns.map((column) => (
            <div key={column.id}>
              {column.title}
            </div>
          ))}
        </div>
      </main>
  );
};
