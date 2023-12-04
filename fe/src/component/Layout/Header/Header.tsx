import React from 'react';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import { logout } from '../../../redux/slice/authSlice';
import { useDispatch } from 'react-redux';


const Header : React.FC = () =>{
    // const [active, setActive] = useState(window.location.pathname);
    // const [openNav, setOpenNav] = useState(false);
    const nava = useNavigate()
    // const handleNav = (elm)=>{
    //     setActive(elm)
    //     setOpenNav(false)
    // }
    // const openNavMobile = ()=>{
    //     setOpenNav(!openNav)
    // }
    const goHome = ()=>{
        nava('/')
    }
    const handleKeyEnter =(event: any)=>{
        if (event.key === 'Enter' && event.target.value.length > 0) {
                nava("/search/"+ event.target.value)
          }
    }
    const dispatch = useDispatch()
    return (
       <header className='header'>
           <nav className='nav_main '>
               <img className='logo_header' onClick={goHome}  src={logo}/>
               <div className='search-header'>
               <input placeholder='Enter Search....' onKeyPress={handleKeyEnter}/>
               <i className="fa-solid fa-magnifying-glass"></i>
               </div>
               <div className="navbar-user">
               <div style={{cursor:'pointer'}} onClick={()=>{
                    dispatch(logout())
                }}  className='exits_quantity'>
                        <i className="fa-solid fa-right-from-bracket "></i>
                    </div>
                    {/* <Link to={'/checkout'} className='exits_quantity'>
                        <i className="fa-solid fa-bell"></i>
                        <span className='quantity_header quantity_notify'>2</span>
                    </Link>
                    <Link to={'/mess'} className='exits_quantity'>
                        <i className="fa-solid fa-envelope"></i>
                        <span className='quantity_header quantity_mess'>5</span>

                    </Link>
                    
                    <Link to={'/profile'}><i className="fa fa-user"></i></Link>
                    <Link to={'/setting'}><i className="fa-solid fa-gear"></i></Link> */}

               </div>
               
           </nav>
       </header>
    );
}

export default Header;