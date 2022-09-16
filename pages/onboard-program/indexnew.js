import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { createFakeServer } from '@mui/x-data-grid-generator';
import {
  getOrgentities
} from "../../store/actions/org_entities.actions";
import { useDispatch, useSelector } from 'react-redux';
import {  Pagination } from "../../Components/datatables";

const SERVER_OPTIONS = {
  useCursorPagination: false,
};

const { columns, initialState, useQuery } = createFakeServer({}, SERVER_OPTIONS);

export default function ServerPaginationGrid() {

  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const org_entities = useSelector((state) => state.org_entities);
  const dispatch = useDispatch();

  const queryOptions = React.useMemo(
    () => ({
      page,
      pageSize,
    }),
    [page, pageSize],
  );

  const { isLoading, data, pageInfo } = useQuery(queryOptions);

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
  }, [org_entities.get_org_entities]);

  const fetchUsers = (page1, size = pageSize) => {
    // setLoading(true);
    const post_data = {
      page: page1,
      perPage: size,
      // search: search,
    };
    dispatch(getOrgentities(post_data));
    // setLoading(false);
  };

  // Some API clients return undefined while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = React.useState(
    pageInfo?.totalRowCount || 0,
  );

  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageInfo?.totalRowCount !== undefined
        ? pageInfo?.totalRowCount
        : prevRowCountState,
    );
  }, [pageInfo?.totalRowCount, setRowCountState]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        rowCount={rowCountState}
        loading={isLoading}
        rowsPerPageOptions={[10]}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        columns={columns}
        initialState={initialState}
      />
    </div>
  );
}
