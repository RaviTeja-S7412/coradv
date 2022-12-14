import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/Layout";
import {
  getOrgentities,
  createOrgentity,
  get_singleentity,
  updateOrgentity,
  deleteOrgentity,
} from "../../store/actions/org_entities.actions";
import { Search, Pagination } from "../../Components/datatables";
import { PencilIcon, TrashIcon, PlusIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";
import Input from "../../Components/Input";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../../Components/Modal";
import Button from "../../Components/Button";
import Spinner from "../../Components/Spinner";
import ArrowCircleUpIconTray from "../../Components/icons/ArrowCircleUpIconTray";

 // datagrid
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';

const Onboard = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [modallabel, setModallabel] = useState("Create");
  const [searchText, setSearchtext] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageChange, setPagechange] = useState(false);

  const [userData, setUserdata] = useState([]);
  const [org_entity_name, setOrg_entity_name] = useState("");
  const [org_region, setOrg_region] = useState("");
  const [level, setLevel] = useState("");
  const [street_address, setStreet_address] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [contact_name, setContact_name] = useState("");
  const [contact_email, setContact_email] = useState("");
  const [contact_phone, setContact_phone] = useState("");
  const [no_liscence_purchase, setNo_liscence_purchase] = useState("");
  const [liscence_expiry, setLiscence_expiry] = useState("");
  const [entity_id, setEntity_id] = useState("");

  const org_entities = useSelector((state) => state.org_entities);
  const Router = useRouter();


  const handleEdit = (id) => {
    setLoading(true);
    setModallabel("Update");
    dispatch(get_singleentity({ id: id }));
    setLoading(false);
  };

  const handleCreate = () => {
    setLoading(true);
    setModallabel("Create");
    setOrg_entity_name("");
    setOrg_region("");
    setLevel("");
    setStreet_address("");
    setState("");
    setCountry("");
    setZip_code("");
    setPhone_no("");
    setContact_name("");
    setContact_email("");
    setContact_phone("");
    setNo_liscence_purchase("");
    setLiscence_expiry("");
    setEntity_id("");
    setLoading(false);
  };

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Want to delete this Organization Entity.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Organization Entity has been deleted!", {
          icon: "success",
        });
        dispatch(deleteOrgentity({ entity_id: id }));
        setPagechange(false);
      } else {
        swal("Organization Entity is safe!");
      }
    });
  };

  useEffect(() => {
    if (!org_entities.get_singleorg_entity) {
      setOrg_entity_name(
        org_entities.entity_data && org_entities.entity_data.org_entity_name
      );
      setOrg_region(
        org_entities.entity_data && org_entities.entity_data.org_region
      );
      setLevel(org_entities.entity_data && org_entities.entity_data.level);
      setStreet_address(
        org_entities.entity_data && org_entities.entity_data.street_address
      );
      setState(org_entities.entity_data && org_entities.entity_data.state);
      setCountry(org_entities.entity_data && org_entities.entity_data.country);
      setZip_code(
        org_entities.entity_data && org_entities.entity_data.zip_code
      );
      setPhone_no(
        org_entities.entity_data && org_entities.entity_data.phone_no
      );
      setContact_name(
        org_entities.entity_data && org_entities.entity_data.contact_name
      );
      setContact_email(
        org_entities.entity_data && org_entities.entity_data.contact_email
      );
      setContact_phone(
        org_entities.entity_data && org_entities.entity_data.contact_phone
      );
      setNo_liscence_purchase(
        org_entities.entity_data &&
          org_entities.entity_data.no_licence_purchased
      );
      setLiscence_expiry(
        org_entities.entity_data && org_entities.entity_data.licence_expiry
      );
      setEntity_id(org_entities.entity_data && org_entities.entity_data._id);
    }
  }, [org_entities.get_singleorg_entity]);

/*   const columns = useMemo(
    () => [
      {
        name: "Action",
        cell: (row) => (
          <>
            <PencilIcon
              className="nav-icon favicon w-5 h-5 mr-1 stroke-blue-500 cursor-pointer"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => handleEdit(row.id)}
            />
            <TrashIcon
              className="nav-icon favicon w-5 h-5 ml-1 stroke-red-500 cursor-pointer"
              onClick={() => handleDelete(row.id)}
            />
          </>
        ),
        grow: 0.5,
      },
      {
        name: "S.No",
        selector: (row) => `${row.serial}`,
        sortable: true,
        width: "100px",
      },
      {
        name: "Org ID",
        selector: (row) => `${row.org_id}`,
        sortable: true,
        width: "100px",
      },
      {
        name: "Org Name",
        selector: (row) => `${row.org_name}`,
        sortable: true,
      },
      {
        name: "Org Hirarchy",
        selector: (row) => `${row.org_name}`,
        sortable: true,
      },
      {
        name: "Location",
        selector: (row) => `${row.location}`,
        sortable: true,
      },
      {
        name: "Users",
        cell: (row) => (
          <span className="font-medium text-sky-700 cursor-pointer bg-slate-200 px-2 py-2 rounded shadow-lg flex">
            <PlusCircleIcon className="w-5 h-5" /> &nbsp; Add Users
          </span>
        ),
        sortable: true,
      },
      {
        name: "Centers",
        cell: (row) => (
          <Link href="#">
            <span className="font-medium text-sky-700 cursor-pointer px-4 py-2 underline">
              Add Centers
            </span>
          </Link>
        ),
        sortable: true,
      },
    ],
    []
  ); */

  const handlePageChange = (page) => {
    fetchUsers(page);
    setCurrentPage(page);
    setPagechange(true);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    fetchUsers(page, newPerPage);
    setPerPage(newPerPage);
  };

  const searchData = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers(currentPage);
  };

  const fetchUsers = (page1, size = perPage, search = searchText) => {
    setLoading(true);
    const post_data = {
      page: page1,
      perPage: size,
      search: search,
    };
    dispatch(getOrgentities(post_data));
    setLoading(false);
  };

  useEffect(() => {
    if (org_entities.get_org_entities && !pageChange) {
      fetchUsers(currentPage);
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
        currentPage,
        perPage,
        displayColumns
      );
      setData(udata);
      setTotalRows(org_entities.total_count);
    }
    const user_data = JSON.parse(localStorage.getItem("user_data"));
    setUserdata(user_data);
  }, [org_entities.get_org_entities]);

  useEffect(() => {
    if (org_entities.is_org_entity_added) {
      document.getElementById("staticBackdrop").classList.remove("show");
      document.getElementById("staticBackdrop").style.display = "none";
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((el) => el.classList.remove("modal-backdrop"));
      setTimeout(() => {
        Router.push("/onboard-program", { shallow: true });
      }, 2000);
    }
  }, [org_entities.is_org_entity_added, org_entities.message]);

  const addOrgentity = (e) => {
    e.preventDefault();
    var fdata = {
      org_entity_name: org_entity_name,
      org_region: org_region,
      level: level,
      street_address: street_address,
      state: state,
      country: country,
      zip_code: zip_code,
      phone_no: phone_no,
      contact_name: contact_name,
      contact_email: contact_email,
      contact_phone: contact_phone,
      no_licence_purchased: no_liscence_purchase,
      licence_expiry: liscence_expiry,
    };
    if (entity_id) {
      fdata["modified_by"] = userData.user_id;
      fdata["entity_id"] = entity_id;
      dispatch(updateOrgentity(fdata));
    } else {
      fdata["created_by"] = userData.user_id;
      dispatch(createOrgentity(fdata));
    }
    setPagechange(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <>
      <Layout>
        <div className="card mb-5 mt-0 mx-5 p-0 h-70 overflow-y-hidden">

          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              rowsPerPageOptions={[10,20,50,100]}
              components={{ Toolbar: GridToolbar }} 
              pageSize={perPage}
              onPageSizeChange={(perPage) => setPerPage(perPage)}
              pagination
            />
          </div>

          
          {/* <DataTable
            title="Onboard Programs"
            columns={columns}
            data={data}
            progressPending={loading}
            // progressComponent={<CustomLoader />}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationDefaultPage={currentPage}
            onChangeRowsPerPage={handlePerRowsChange}
            paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
            onChangePage={handlePageChange}
            subHeader
            subHeaderComponent={
              <>
                {/* <button
                  className="rounded-full float-left inline-block px-2 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light">
                  <ArrowCircleUpIconTray />
                </button> 
                <Search
                  submitFunction={searchData}
                  setSearchtext={setSearchtext} />
              </>
            }
            // customStyles={customStyles}
          /> */}
        </div>
        <div className="text-white ml-auto mr-5 text-right rounded">
          <button
            className="rounded-full index-add-btn p-3"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={handleCreate}
          >
            <PlusIcon className="text-white w-5 h-5 rte-cls" />
          </button>
        </div>
      </Layout>

      {loading ? (
        <Spinner />
      ) : (
        <Modal
          target="staticBackdrop"
          modalHeader={
            <h5
              className="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalLabel"
            >
              {modallabel} Organization Entity
            </h5>
          }
          modalBody={
            <form className="pt-3" method="post" onSubmit={addOrgentity}>
              <div className="grid md:grid-cols-3 md:gap-2">
                <Input
                  type="text"
                  name="org_entity_name"
                  style="input-text"
                  label="Organization Entity Name"
                  value={org_entity_name}
                  handleChange={(value) => setOrg_entity_name(value)}
                  errorMessage={
                    org_entities && org_entities.errorInput == "org_entity_name"
                      ? org_entities.message
                      : ""
                  }
                  required={true}
                />
                <Input
                  type="text"
                  name="org_region"
                  style="input-text"
                  label="Organization Region"
                  value={org_region}
                  handleChange={(value) => setOrg_region(value)}
                  errorMessage={
                    org_entities && org_entities.errorInput == "org_region"
                      ? org_entities.message
                      : ""
                  }
                  required={true}
                />
                <Input
                  type="text"
                  name="level"
                  value={level}
                  style="input-text"
                  label="Level"
                  handleChange={(value) => setLevel(value)}
                  required={true}
                  errorMessage={
                    org_entities && org_entities.errorInput == "level"
                      ? org_entities.message
                      : ""
                  }
                />
                <Input
                  type="text"
                  name="street_address"
                  value={street_address}
                  style="input-text"
                  label="Street Address"
                  handleChange={(value) => setStreet_address(value)}
                  required={true}
                  errorMessage={
                    org_entities && org_entities.errorInput == "street_address"
                      ? org_entities.message
                      : ""
                  }
                />
                <Input
                  type="text"
                  name="state"
                  value={state}
                  style="input-text"
                  label="State"
                  handleChange={(value) => setState(value)}
                  required={true}
                  errorMessage={
                    org_entities && org_entities.errorInput == "state"
                      ? org_entities.message
                      : ""
                  }
                />
                <Input
                  type="text"
                  name="country"
                  value={country}
                  style="input-text"
                  label="Country"
                  handleChange={(value) => setCountry(value)}
                  required={true}
                  errorMessage={
                    org_entities && org_entities.errorInput == "country"
                      ? org_entities.message
                      : ""
                  }
                />
                <Input
                  type="number"
                  name="zip_code"
                  value={zip_code}
                  style="input-text"
                  label="Zip Code"
                  handleChange={(value) => setZip_code(value)}
                  required={true}
                  errorMessage={
                    org_entities && org_entities.errorInput == "zip_code"
                      ? org_entities.message
                      : ""
                  }
                />
                <Input
                  type="text"
                  name="phone_no"
                  value={phone_no}
                  style="input-text"
                  label="Phone No"
                  handleChange={(value) => setPhone_no(value)}
                  required={true}
                  errorMessage={
                    org_entities && org_entities.errorInput == "phone_no"
                      ? org_entities.message
                      : ""
                  }
                />
                <Input
                  type="text"
                  name="contact_name"
                  value={contact_name}
                  style="input-text"
                  label="Contact Name"
                  handleChange={(value) => setContact_name(value)}
                  required={true}
                  errorMessage={
                    org_entities && org_entities.errorInput == "contact_name"
                      ? org_entities.message
                      : ""
                  }
                />
                <Input
                  type="email"
                  name="contact_email"
                  value={contact_email}
                  style="input-text"
                  label="Contact Email"
                  handleChange={(value) => setContact_email(value)}
                  required={true}
                  errorMessage={
                    org_entities && org_entities.errorInput == "contact_email"
                      ? org_entities.message
                      : ""
                  }
                />
                <Input
                  type="text"
                  name="contact_phone"
                  value={contact_phone}
                  style="input-text"
                  label="Contact Phone"
                  handleChange={(value) => setContact_phone(value)}
                  required={true}
                  errorMessage={
                    org_entities && org_entities.errorInput == "contact_phone"
                      ? org_entities.message
                      : ""
                  }
                />
                <Input
                  type="text"
                  name="no_liscence_purchase"
                  value={no_liscence_purchase}
                  style="input-text"
                  label="Licence Purchase No"
                  handleChange={(value) => setNo_liscence_purchase(value)}
                  required={true}
                  errorMessage={
                    org_entities &&
                    org_entities.errorInput == "no_liscence_purchase"
                      ? org_entities.message
                      : ""
                  }
                />
                <Input
                  type="date"
                  name="liscence_expiry"
                  value={liscence_expiry}
                  style="input-text"
                  label="Licence Expiry"
                  handleChange={(value) => setLiscence_expiry(value)}
                  required={true}
                  errorMessage={
                    org_entities && org_entities.errorInput == "liscence_expiry"
                      ? org_entities.message
                      : ""
                  }
                />
              </div>
              <Button type="submit" bcolor="blue" title="Submit" />
              &nbsp;
              <Button
                type="button"
                bcolor="blue"
                title="Cancel"
                modalclose={true}
              />
            </form>
          }
          modalFooter={""}
        />
      )}
    </>
  );
};

export default Onboard;
