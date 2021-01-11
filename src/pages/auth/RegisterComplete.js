import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    console.log("status=",passwordShown)
  };


  // const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    // console.log(window.location.href);
    // console.log(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }


    var re = {
      'upper' : /[A-Z]/,
      'lower' : /[a-z]/,
      'digit'   : /[0-9]/,
      'special'   : /[!@#$%^&*]/,
  };


  if (password.length < 8) {
    toast.error("Password must be at least 8 characters long");
    return;
  }

  if(!re.upper.test(password)) 
    {
      toast.error("Atleast one Uppercase required");
      return;
    }

    if(!re.lower.test(password)) 
    {
      toast.error("Atleast one Lowercase required");
      return;
    }

    if(!re.digit.test(password)) 
    {
      toast.error("Atleast one Digit required");
      return;
    }

    if(!re.special.test(password)) 
    {
      toast.error("Atleast one Special Character required");
      return;
    }

    

    try {

      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));

        // redirect
        history.push("admin/employees");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (



    <form onSubmit={handleSubmit}>
  <div className="form-group row">
  
    <div className="col-sm-10">
    <div class="input-group pr-4">
      <input type="text" readonly className="form-control py-2 border-right-0 border" id="staticEmail" value={email}/>
      </div></div>
  </div>
  <div className="form-group row">
   
    <div className="col-sm-10 ">
  

    <div class="input-group pr-4">
    <input class="form-control py-2 border-right-0 border" type={passwordShown ? "text" : "password"} value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} autoFocus
      />
    <span class="input-group-append">
        <button class="btn btn-outline-secondary border-left-0 border" type="button" onClick={togglePasswordVisiblity}>
            <i class="fa fa-eye password-icon" />
        </button>
    </span>
</div>


    
      
    </div>
  </div>

  <div className="form-group row">
    
    <div className="col-sm-10">
     <button type="submit" className="btn btn-raised bg-info w-100 text-white">
       Complete Registration
     </button>
    </div>
  </div>
</form>




// <form onSubmit={handleSubmit}>
// <input type="email" className="form-control" value={email} disabled />

// <input
//   type="password"
//   className="form-control"
//   value={password}
//   onChange={(e) => setPassword(e.target.value)}
//   placeholder="Password"
//   autoFocus
// />
// <br />
// <button type="submit" className="btn btn-raised">
//   Complete Registration
// </button>
// </form>


  
  );

  return (
    <div className="container p-5">
      <div className="row border border-dark bg-light rounded p-4 w-60">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
