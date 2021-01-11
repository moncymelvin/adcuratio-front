import React from "react";

const EmployeeForm = ({ 
  handleSubmit, 
  handleChange,
  values, }) => {

    const {
      id,
      name,
      age,
      gender,
      email,
      phoneNo,
    } = values;


    return (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <input
        type="text"
        name="id"
        className="form-control"
        onChange={handleChange}
        value={id}
        autoFocus
        placeholder="ID"
        required
      />
      <br />

      <input
        type="text"
        name="name"
        className="form-control"
        onChange={handleChange}
        value={name}
        placeholder="Name"
        required
      />
      <br />

      <input
        type="text"
        name="age"
        className="form-control"
        onChange={handleChange}
        value={age}
        placeholder="Age"
        required
      />
      <br />

      <input
        type="text"
        name="gender"
        className="form-control"
        onChange={handleChange}
        value={gender}
        placeholder="Gender"
        required
      />
      <br />

      <input
        type="text"
        name="email"
        className="form-control"
        onChange={handleChange}
        value={email}
        placeholder="E-mail"
        required
      />
      <br />

      <input
      type="text"
      name="phoneNo"
      className="form-control"
      onChange={handleChange}
      value={phoneNo}
      placeholder="Phone No"
      required
    />
    <br />
      <button className="btn btn-outline-primary">Save</button>
    </div>
  </form>
    );
  };

export default EmployeeForm;
