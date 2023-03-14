import './Side_bar.css';
import logo from './lsbulogo.png';
import 'react-icons/fa';
import { FaHome, FaEdit, FaFileAlt, FaQuestion } from "react-icons/fa";
import "react-icons/tb";





const SideBar = () => {

    return (
        <div className="sidebar"> 

            <nav>

                <ul>
                    <li className='logo'>
                        <a href='#'>
                        <img id='logo' src={logo} alt="My Image" />
                        <span className='lsbu'>LSBU</span>
                        </a>
                    </li>
                    <li className='nav'>
                        <a href='#'>
                            <div className='icon'><FaHome /></div>
                            <span className='nav-item'>Home</span>
                        </a>
                    </li>
                    <li className='nav'>
                        <a href='#'>
                        <div className='icon'><FaEdit /></div>
                        <span className='nav-item'>Edit</span>
                        </a>
                    </li>
                    <li className='nav'>
                        <a href='#'>
                        <div className='icon'><FaFileAlt /></div>
                        <span className='nav-item'>Log</span>
                        </a>
                    </li>
                    <li className='nav'>
                        <a href='#'>
                        <div className='icon'><FaQuestion /></div>
                        <span className='nav-item'>FAQ</span>
                        </a>
                    </li>

                </ul>
            </nav>
       
         
        </div>
      );
    }

export default SideBar;