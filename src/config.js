// Change these to the client's real shop details
export const SHOP = {
  name: 'Hayat Mobile Center',
  phone: '0300 1234567',
  whatsapp: '923001234567', // country code, no + or spaces
  address: 'Shop #12, Main Market, Lahore',
  hours: 'Mon–Sat, 10 am – 9 pm',
}

export const formatPrice = (n) => 'Rs ' + Number(n).toLocaleString('en-PK')