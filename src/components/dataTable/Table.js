import React from "react";
import ReactDOM from "react-dom";
import DataTable from "react-data-table-component";

import movies from "./DataTable";


const columns = [
  {
    id: 1,
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
    reorder: true,
  },
  {
    id: 2,
    name: "Director",
    selector: (row) => row.director,
    sortable: true,
    reorder: true,
  },
  {
    id: 3,
    name: "Runtime (m)",
    selector: (row) => row.runtime,
    sortable: true,
    right: true,
    reorder: true,
  },
];

const Table = () => {
  return (
    <div>
      {" "}
      <DataTable
        title="Movies"
        columns={columns}
        data={movies}
        defaultSortFieldId={1}
      
        pagination
        selectableRows
      />
    </div>
  );
};

export default Table;
