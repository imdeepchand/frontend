import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const Navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        Navigate('/login')
    }
    return (
        <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Blogs</a>
          <button className='btn btn-sm' onClick={logout}>Logout</button>
        </div>
      </nav>
    )
}
export default Navbar;