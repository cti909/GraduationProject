import { useState } from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';
// import userService from '../../_mock/user';
import convertTime from 'src/utils/ConvertTime';
import convertMoney from 'src/utils/convertMoney';
// ----------------------------------------------------------------------

export const UserTableRow = ({ item, selected }) => {
  const [formData, setFormData] = useState({});

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}
      <TableCell component="th" scope="row" padding="normal">
        <Stack direction="row" alignItems="left" spacing={2}>
          {/* <Avatar alt={item.name} src={item.avatarUrl} /> */}
          <Typography variant="subtitle2" noWrap>
            {item.name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="left">{item.email}</TableCell>
      <TableCell align="left">{item.phoneNumber}</TableCell>
      <TableCell align="left">{item.address}</TableCell>
      <TableCell align="left">{item.role}</TableCell>
      <TableCell align="left">{convertMoney(item.accountBalance)}</TableCell>
      <TableCell align="left">{convertTime(item.createdAt)}</TableCell>
    </TableRow>
  );
};

UserTableRow.propTypes = {
  item: PropTypes.any,
  selected: PropTypes.any,
  // handleClick: PropTypes.func,
  // onSubmitUpdateUser: PropTypes.func,
  // onDeleteUser: PropTypes.func,
};
