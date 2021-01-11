import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createEmployee } from "../../../functions/employe";
import EmployeeForm from "../../../components/forms/EmployeeForm";
import './style.css';

const initialState = {
  id: "",
  name: "",
  age: "",
  gender: "",
  email: "",
  phoneNo: "",
};

const EmployeeCreate = ({ history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState(initialState);

  // const [name, setName] = useState("");
  // const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    createEmployee(values, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setValues("");
        history.push("/admin/employees");

        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err);
        //  if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, " ----- ", e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className=" hardlight col">
          <div class="row p-4  ">
            <div class=" container bg-white rounded">
              <div class="container p-3 w-80  ">
                {loading ? (
                  <h4 className="text-danger">Loading..</h4>
                ) : (
                  <h4 class="font-weight-bold">Add Employee</h4>
                )}

                <EmployeeForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  setValues={setValues}
                  values={values}
                />

                <p className="text-secondary">Note: These fields are not currently validated, please provide unique Id to add an employee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCreate;
