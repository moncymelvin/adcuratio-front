
import { Link } from "react-router-dom";
import React from "react";

const AdminNav = () => (



  <nav className="nav flex-column p-4 ">

  <Link to="/admin/employees" className="nav-link  text-red font-weight" > <i className="fas fa-home pr-2"></i> Employees </Link>
                    <Link to="/admin/employee" className="nav-link pt-3" > <i className="fas fa-users pr-2"></i> Add Employee</Link>
                </nav>


 
);

export default AdminNav;
