import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Login.css';


const LogIn = () => {
  const [id, idUpdate] = useState("");
  const [password, passwordUpdate] = useState("");
  const navigate = useNavigate("");

  useEffect(()=>{
    sessionStorage.clear();

  },[]);

  const proceedLogin = (e) => {
    e.preventDefault();
    if (validation()) {
      fetch("http://localhost:8000/user/"+id).then((res)=>{
        return res.json();
      }).then((resp)=>{
        console.log(resp);
        if (Object.keys(resp).length === 0) {
            toast.error('User not found');
        } else {
            if (resp.password === password) {
                toast.success('Verification successful');
                sessionStorage.setItem('username', id);
                navigate('/home')
            }else{
                toast.error('Incorrect Password');
            }
        }
    }).catch((err) => {
        toast.error('Login Failed due to :' + err.message);
    });

    }
  };

  const validation = () => {
    let result = true;
    if (id === null || id === "") {
      result = false;
      toast.warning("Please enter a valid username");
    }
    if (password === null || password === "") {
      result = false;
      toast.warning("Please enter a valid Password");
    }
    return result;
  };
  return (
    <div className="full-page">
      <div
        className="container"
      >
        <form onSubmit={proceedLogin} className="form">
          <div className="card">
            <div className="card-header">
              <h1>Log in</h1>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  Username<span className="errmsg">*</span>
                </label>
                <input
                  value={id}
                  onChange={(e) => idUpdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
              <div className="form-group">
                <label>
                  Password<span className="errmsg">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => passwordUpdate(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </div>
            <div className="footerz card-footer">
              <button type="submit" className="btn btn-dark">
                Login
              </button>
              <Link className="btn btn-success" to={"/register"}>
                New user
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
