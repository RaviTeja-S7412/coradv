import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";
import { getOrgentities } from "../../store/actions/org_entities.actions";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../../Components/datatables";

export default function ServerPaginationGrid() {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(2);
  const [totalRows, setTotalRows] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);
  const [searchText, setSearchtext] = React.useState("");
  const [pageChange, setPagechange] = React.useState(false);
  const org_entities = useSelector((state) => state.org_entities);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (org_entities.get_org_entities) {
      fetchUsers(page);
    } else {
      const displayColumns = [
        "id",
        "org_id",
        "org_name",
        "org_hirarchy",
        "location",
      ];
      var udata = Pagination(
        org_entities.org_entities,
        org_entities.nextPage,
        page,
        pageSize,
        displayColumns
      );
      setData(udata);
      setTotalRows(org_entities.total_count);
    }
    console.log(udata);
  }, [org_entities.get_org_entities]);

  const fetchUsers = (page1, size = pageSize) => {
    // setLoading(true);
    const post_data = {
      page: page1,
      perPage: size,
      search: "",
    };

    dispatch(getOrgentities(post_data));
    // setLoading(false);
  };

  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = React.useState(totalRows || 0);

  const columns = [
    { field: "id" },
    { field: "org_id" },
    { field: "org_name" },
    { field: "org_hirarchy" },
    { field: "location" },
  ];

  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      totalRows !== undefined ? totalRows : prevRowCountState
    );
  }, [totalRows, setRowCountState]);

  const handlePageChange = (page) => {
    fetchUsers(page);
    setPage(page);
    setPagechange(true);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    fetchUsers(page, newPerPage);
    setPerPage(newPerPage);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        rowCount={rowCountState}
        // loading={isLoading}
        rowsPerPageOptions={[10, 20, 50]}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={(newPage) => handlePageChange(newPage)}
        onPageSizeChange={(newPageSize) =>
          handlePerRowsChange(newPageSize, page)
        }
        columns={columns}
        // initialState={initialState}
      />
    </div>
  );
}
