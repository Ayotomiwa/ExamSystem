import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const username = sessionStorage.getItem("username");
        if (!username) {
          navigate("/login");
        }
      }, []);
    
      if (!sessionStorage.getItem("username")) {
        return navigate("/login");
      }
    return (
        <div>
            <div className="header">
                <Link to={'/'}>Home</Link>
                <Link to={'/login'}>Logout</Link>
            </div>
            <h1 className="text-center">Welcome to the Exam timer</h1>
        </div>

     );
}
 
export default Home;