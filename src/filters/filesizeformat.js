"use strict";


module.exports = function filesizeformat(input, binary) {
  const kwargs = getKwargs(arguments);
  binary = (kwargs.binary !== undefined) ? kwargs.binary : binary;

  const base = binary ? 1024 : 1000;
  const bytes = parseFloat(input);
  const units = [
    'Bytes',
    (binary ? 'KiB' : 'kB'),
    (binary ? 'MiB' : 'MB'),
    (binary ? 'GiB' : 'GB'),
    (binary ? 'TiB' : 'TB'),
    (binary ? 'PiB' : 'PB'),
    (binary ? 'EiB' : 'EB'),
    (binary ? 'ZiB' : 'ZB'),
    (binary ? 'YiB' : 'YB')
  ];

  if (bytes === 1) {
    return '1 Byte';
  } else if (bytes < base) {
    return bytes + ' Bytes';
  } else {
    return units.reduce(function (match, unit, index) {
      const size = Math.pow(base, index);
      if (bytes >= size) {
        return (bytes/size).toFixed(1) + ' ' + unit;
      }
      return match;
    });
  }
};

function getKwargs(args) {
  const kwargs = [].pop.call(args);
  return (typeof kwargs === 'object' && kwargs.__keywords) ? kwargs : {};
}
