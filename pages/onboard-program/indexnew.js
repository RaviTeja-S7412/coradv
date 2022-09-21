import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { getOrgentities } from "../../store/actions/org_entities.actions";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "../../Components/datatables";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

export default function ServerPaginationGrid() {

  const [pageState, setPageState] = React.useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 2
  })

  const org_entities = useSelector((state) => state.org_entities);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (org_entities.get_org_entities && !pageState.isLoading) {
      setPageState(old => ({ ...old, isLoading: true }))
      fetchUsers(pageState.page);
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
        pageState.page,
        pageState.pageSize,
        displayColumns
      );
      setPageState(old => ({ ...old, isLoading: false, data: udata, total: org_entities.total_count }));
    }
  }, [pageState.page, pageState.pageSize, org_entities.get_org_entities]);

  const fetchUsers = (page1, size = pageState.pageSize) => {
    const post_data = {
      page: page1,
      perPage: size,
      search: "",
    };
    dispatch(getOrgentities(post_data));
  };

  const columns = [
    {
      field: 'actions',
      type: 'actions',
      headerName: "Action",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditOutlined />}
          label="Delete"
          // onClick={deleteUser(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteOutline />}
          label="Delete"
          // onClick={deleteUser(params.id)}
        />
      ],
    },
    { field: "serial", headerName: "S.No" },
    { field: "org_id", headerName: "Org ID" },
    { field: "org_name", headerName: "Organization Name", width: 200 },
    { field: "org_hirarchy", headerName: "Organization Hirarchy", width: 200 },
    { field: "location", headerName: "Location" },
  ];


  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={pageState.data}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        rowsPerPageOptions={[10, 30, 50, 70, 100]}
        pagination
        page={pageState.page - 1}
        pageSize={pageState.pageSize}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPageState(old => ({ ...old, page: newPage + 1 }))
          fetchUsers(newPage + 1)
        }}
        onPageSizeChange={(newPageSize) => {
          setPageState(old => ({ ...old, pageSize: newPageSize }))
          fetchUsers(pageState.page, newPageSize)
        }}
        columns={columns}
      />
    </div>
  );
}
