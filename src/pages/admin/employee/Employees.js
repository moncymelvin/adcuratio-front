import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getEmployee } from "../../../functions/employe";
import EmployeeForm from "../../../components/forms/EmployeeForm";
import './style.css';

const Employees = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () =>
    getEmployee().then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setEmployees(res.data);
    });

  const showEmp = () => (
    <div className="table-responsive">
    <table className="table table-bordered ">
      <thead className="thead-light">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Age</th>
          <th scope="col">Gender</th>
          <th scope="col">E-mail</th>
          <th scope="col">Phone No</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.id}</b>
            </td>
            <td>{p.name}</td>
            <td>{p.age}</td>
            <td>{p.gender}</td>
            <td>{p.email}</td>
            <td>{p.phoneNo}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );

  return (
    <div className="  container-fluid">
      <div className=" row">
        <div className=" col-md-2   mh-100">
          <AdminNav />
        </div>

        <div className=" hardlight col ">
          <div className="row p-4  ">
       
            <div className=" container bg-white rounded">
              <div className="container p-3 w-80  ">
                {loading ? (
                  <h4 className="text-danger">Loading..</h4>
                ) : (
                  <h4 className="font-weight-bold">All Employees</h4>
                )}

                {showEmp()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
