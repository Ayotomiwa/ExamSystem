import { useState } from "react";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import './Register.css';


const Register = () => {
  const [id, idChange] = useState("");
  const [name, nameChange] = useState("");
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");
  const navigate = useNavigate();

  const isvalid = () => {
    let isProceed = true;
    let errorMessage = "Missing:";
    if (id === null || id === "") {
      isProceed = false;
      errorMessage += " id";
    }
    if (name === null || name === "") {
      isProceed = false;
      errorMessage += " Full name";
    }
    if (password === null || password === "") {
      isProceed = false;
      errorMessage += " Password";
    }
    if (email === null || email === "") {
      isProceed = false;
      errorMessage += " Email";
    }

    if (!isProceed) {
      toast.warning(errorMessage);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
        isProceed = false;
        toast.warning("Please enter the valid email");
      }
      if (/ /.test(id)) {
        isProceed = false;
        toast.warning("Please enter the valid username");
      }
    }
    return isProceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let regObj = { id, name, email, password };
    if (isvalid()) {
      //console.log(regObj);

      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regObj),
      })
        .then((res) => {
          toast.success("Registered Successfully");
          navigate("/login");
        })
        .catch((err) => {
          toast.error("Failed: " + err.message);
        });
    }
  };
  return (
    <div className="full-page">
        <div
          className="container"
        >
          <form className="form" onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">
                <h1>Register</h1>
              </div>
              <div className="card-body">
                <div className="row">
                  <div>
                    <div className="nameGroup">
                      <label>
                        Full name<span className="errmsg">*</span>
                      </label>
                      <input
                        value={name}
                        onChange={(e) => nameChange(e.target.value)}
                        className="name"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="emailGroup">
                      <label>
                        Email<span className="errmsg">*</span>
                      </label>
                      <input
                        value={email}
                        onChange={(e) => emailChange(e.target.value)}
                        className="email"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="usernameGroup">
                      <label>
                        Username <span className="errmsg">*</span>
                      </label>
                      <input
                        value={id}
                        onChange={(e) => idChange(e.target.value)}
                        className="username"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="passwordGroup">
                      <label>
                        Password <span className="errmsg">*</span>
                      </label>
                      <input
                        value={password}
                        onChange={(e) => passwordChange(e.target.value)}
                        type="password"
                        className="password"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="registerBtn">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Register;
