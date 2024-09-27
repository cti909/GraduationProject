import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSeedling, faMountainSun } from '@fortawesome/free-solid-svg-icons';

const navConfig = [
  {
    title: 'Người dùng',
    path: 'user',
    icon: <FontAwesomeIcon icon={faUsers} />,
  },
  {
    title: 'Cây trồng',
    path: '/plant',
    icon: <FontAwesomeIcon icon={faSeedling} />,
  },
  {
    title: 'Xác thực đất',
    path: '/land',
    icon: <FontAwesomeIcon icon={faMountainSun} />,
  },
];

export default navConfig;
