import React from 'react'
import { useNavigate } from 'react-router-dom';
import cart from "../../assets/images/cart.gif";
import { Link } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  return (
   
    <header>
      <nav className="navbar navbar-expand-lg bg-transparent p-3">
        <div className="container">
          <a className="d-flex navbar-brand text-white flex-grow-1" href="#">
            <img
              src={cart}
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top me-3" onClick={()=>navigate("/")}
          /><p className='text-decoration-none'  onClick={()=>navigate("/")} style={{color:"#d51c9a"}}>XYZ</p> </a>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="sidebar offcanvas offcanvas-end"
           
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title text-white" id="offcanvasNavbarLabel">
                Offcanvas
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul
                className="navbar-nav d-flex justify-content-evenly flex-grow-1 pe-3"
              >
                <input
                  className="position-relative"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
               
                <li className="nav-item">
                  <a className="nav-link text-white" aria-current="page" href="#"
                    >Explore</a
                  >
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">Stats</a>
                </li>
                <li className="nav-item">
                  <Link to='/products' className="nav-link text-white" href="#">Products</Link>
                </li>
                <Link
                  className="nav-button p-2 text-decoration-none"
                  type="submit"
                  to='/registration'
                >
                 Register
                </Link>
                <Link
                  className="nav-button p-2 text-decoration-none"
                  type="submit"
                  to='/Login'
                >
                 Login
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>

  )
}

export default Nav