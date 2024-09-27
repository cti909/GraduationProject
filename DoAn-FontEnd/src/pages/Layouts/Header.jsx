import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "./../../assets/images/AgriLogo.png";
import {
  faCircleDollarToSlot,
  faClipboardList,
  faHeart,
  faHouse,
  faMountainSun,
  faSackDollar,
  faSeedling,
  faStore,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { setUserAction } from "../../redux/actions/authAction";
import { NavbarTime } from "./NavbarTime";
import convertMoney from "../../utils/convertMoney";
import { CUSTOMER, FARMER } from "../../constants/roleUser";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";

const ControlNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);

  // Nếu trạng thái user trong Redux store là một object rỗng, thì lấy dữ liệu từ Local Storage và cập nhật vào Redux store
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (Object.keys(user).length === 0) {
      if (accessToken) {
        dispatch(setUserAction());
      } else {
        navigate("/login");
      }
    }
  }, [dispatch, navigate, user]);

  return (
    <>
      <div className="bg-slate-300 text-black">
        <div className="container mx-auto flex items-center justify-between py-1">
          {/* <p>Welcome to web</p> */}
          <NavbarTime />
          <div className="flex items-center justify-between">
            <h5 className="mr-2">Xin chào:</h5>
            <h5 className="font-medium text-green-900 mr-2">{user.email}</h5>
            <h5 className="font-medium mr-2">
              <FontAwesomeIcon icon={faSackDollar} />{" "}
              {user.accountBalance && convertMoney(user.accountBalance)}
            </h5>
            <Link
              to="/logout"
              className="text-red-500 hover:text-red-900 hover:underline"
            >
              Đăng xuất
            </Link>
          </div>
        </div>
      </div>
      <header className="bg-gray-900 text-white">
        <div className="container">
          <Navbar expand="lg" className="container mx-auto py-3">
            <Link
              className="navbar-brand text-2xl font-bold mr-3 rounded-lg"
              to="/"
            >
              <img style={{ width: "30px" }} src={Logo} alt="Logo" />
            </Link>
            <Navbar.Toggle
              className="bg-slate-100 text-white hover:bg-blue-700 focus:bg-blue-700"
              aria-controls="basic-navbar-nav"
              onClick={() => setIsOpen(!isOpen)}
            />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className={`${
                isOpen ? "block" : "hidden"
              } md:flex md:items-center md:justify-between`}
            >
              <Nav className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0 ">
                <Nav.Link
                  as={Link}
                  to="/"
                  className="uppercase font-medium hover:bg-sky-700 text-white hover:border-2  hover:rounded-full"
                >
                  <FontAwesomeIcon icon={faHouse} className="mr-1" />
                  Trang chủ
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/plant"
                  className="uppercase font-medium hover:bg-sky-700 text-white hover:border-2  hover:rounded-full"
                >
                  <FontAwesomeIcon icon={faSeedling} className="mr-1" />
                  Cây trồng
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/land"
                  className="uppercase font-medium hover:bg-sky-700 text-white hover:border-2  hover:rounded-full"
                >
                  <FontAwesomeIcon icon={faMountainSun} className="mr-1" />
                  Đất
                </Nav.Link>
                {user && user.role == FARMER && (
                  <Nav.Link
                    as={Link}
                    to="/land-management"
                    className="uppercase font-medium hover:bg-sky-700 text-white hover:border-2  hover:rounded-full"
                  >
                    <FontAwesomeIcon icon={faClipboardList} className="mr-1" />
                    Quản lý đất
                  </Nav.Link>
                )}

                {user && user.role == CUSTOMER && (
                  <Nav.Link
                    as={Link}
                    to="/subscribe"
                    className="uppercase font-medium hover:bg-sky-700 text-white hover:border-2  hover:rounded-full"
                  >
                    <FontAwesomeIcon icon={faStore} className="mr-1" />
                    Đất thuê
                  </Nav.Link>
                )}

                <Nav.Link
                  as={Link}
                  to="/classification"
                  className="uppercase font-medium hover:bg-sky-700 text-white hover:border-2  hover:rounded-full"
                >
                  <FontAwesomeIcon icon={faSearchengin} className="mr-1" />
                  Nhận diện
                </Nav.Link>
              </Nav>

              {/* Search Form and Icons */}
              <div className="flex items-center space-x-4 md:mt-0">
                <form className="flex items-center bg-white rounded-full px-2 py-1">
                  <input
                    className="w-48 bg-transparent border-none text-gray-900 focus:outline-none"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    type="submit"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-5.2-5.2"
                      ></path>
                      <circle cx="10" cy="10" r="7"></circle>
                    </svg>
                  </button>
                </form>
                <Link className="hover:text-gray-600 text-white" to="#">
                  <FontAwesomeIcon icon={faHeart} className="w-6 h-6" />
                </Link>
                <Link
                  className="hover:text-gray-600 text-white"
                  to="/transaction"
                >
                  <FontAwesomeIcon
                    icon={faCircleDollarToSlot}
                    className="w-6 h-6"
                  />
                </Link>
                <NavDropdown
                  title={<FontAwesomeIcon icon={faUser} className="w-6 h-6" />}
                  // key="start"
                  drop="start"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#">
                    Thông tin tài khoản
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#">Cài đặt</NavDropdown.Item>
                  <NavDropdown.Item href="#">Sự kiện</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout">Đăng xuất</NavDropdown.Item>
                </NavDropdown>
              </div>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
    </>
  );
};

export default ControlNavbar;
