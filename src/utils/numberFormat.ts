export const numberFormat = (val:number):string => {
  if (!isNaN(val)) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '';
};
