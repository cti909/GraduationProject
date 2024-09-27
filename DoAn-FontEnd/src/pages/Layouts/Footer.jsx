import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-5/12 mb-6 md:mb-0 pr-5">
            <h5 className="uppercase font-bold mb-4 text-xl">
              Công ty chúng tôi
            </h5>
            <p>
              Chào mừng bạn đến với Website, nơi cung cấp dịch vụ thuê đất và
              trồng cây toàn diện. Chúng tôi cam kết mang lại giải pháp bền vững
              cho việc sử dụng đất, đồng thời giúp bạn góp phần bảo vệ môi
              trường và phát triển nông nghiệp xanh.
            </p>
          </div>
          <div className="w-full md:w-2/12 mb-6 md:mb-0">
            <h5 className="uppercase font-bold mb-4"> Công ty</h5>
            <ul>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Chi tiết công ty
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Quy tắt đạo đức
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Thỏa thuận dịch vụ
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Quyền riêng tư
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-3/12 mb-6 md:mb-0">
            <h5 className="uppercase font-bold mb-4">Giúp đỡ</h5>
            <ul>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Liên hệ trực tiếp
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Dịch vụ vận chuyển
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Các lựa chọn thanh toán
                </Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="hover:underline">
                  Phản hồi chất lượng sản phẩm
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-2/12 mb-6 md:mb-0">
            <h5 className="uppercase font-bold mb-4">Theo dõi chúng tôi</h5>
            <ul>
              <li className="mb-2">
                <Link
                  to="https://facebook.com"
                  className="text-gray-400 hover:text-white w-full"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="w-6 h-6" />
                  <span className="ml-2">Facebook</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="https://twitter.com"
                  className="text-gray-400 hover:text-white"
                >
                  <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
                  <span className="ml-2">Twitter</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="https://instagram.com"
                  className="text-gray-400 hover:text-white"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
                  <span className="ml-2">Instagram</span>
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="https://linkedin.com"
                  className="text-gray-400 hover:text-white"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                  <span className="ml-2">Linkedin</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
