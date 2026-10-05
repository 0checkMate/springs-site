// Business-wide details. Replace every [PLACEHOLDER] before launch.
export const site = {
  legalName: 'SPRINGS AGRITECH',
  brandFirst: 'SPRINGS',
  brandSecond: 'MUSHROOMS',
  phone: '254729066995',
  email: '[EMAIL]',
  location: 'kericho, kenya',
  hours: '8:00am to 6:00pm',
  // International format, digits only, no plus sign (for example the country code followed by the number)
  whatsapp: '254729066995',
};

export const waLink = (text = '') =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
