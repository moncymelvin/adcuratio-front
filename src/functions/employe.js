import axios from "axios";



  export const createEmployee = async (employee, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/employee`,employee, {
    headers: {
      authtoken,
    },
  });

  export const getEmployee = async () =>
  await axios.get(`${process.env.REACT_APP_API}/employees`);

