const convertMoney = (number) => {
    const formattedNumber = number.toLocaleString('vi-VN') + 'đ';
    return formattedNumber;
  };
export default convertMoney;
  