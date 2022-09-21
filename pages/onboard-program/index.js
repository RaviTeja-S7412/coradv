import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/Layout";
import {
  getOrgentities,
  createOrgentity,
  get_singleentity,
  updateOrgentity,
  deleteOrgentity,
} from "../../store/actions/org_entities.actions";
import { Pagination } from "../../Components/datatables";
import { PlusIcon } from "@heroicons/react/outline";
import Input from "../../Components/Input";
import { useRouter } from "next/router";
import Modal from "../../Components/Modal";
import Button from "../../Components/Button";
import Spinner from "../../Components/Spinner";

 // datagrid
import { DataGrid, GridToolbar, GridActionsCellItem  } from '@mui/x-data-grid';
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

const Onboard = () => {
  const dispatch = useDispatch();
  
  const [modallabel, setModallabel] = useState("Create");

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10
  })

  const [userData, setUserdata] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const fetchUsers = (page1, size = pageState.pageSize) => {
    const post_data = {
      page: page1,
      perPage: size,
      search: "",
    };
    dispatch(getOrgentities(post_data));
  };

  useEffect(() => {
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
          label="Edit"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          onClick={() => handleEdit(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteOutline />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
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
    <>
      <Layout>
        <div className="card mb-5 mt-0 mx-5 p-0 h-70 overflow-y-hidden">
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              components={{
                Toolbar: GridToolbar,
              }}
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
