const toDegree = (
  value: number,
  loc: [string, string],
): [number, number, number, string] => {
  let locVal = '';
  if (value < 0) {
    locVal = loc[0];
  } else if (value > 0) {
    locVal = loc[1];
  }

  const abs = Math.abs(value);
  const degree = Math.floor(abs);
  const minute = Math.floor((abs - degree) * 60);
  const second = Math.floor(((abs - degree) * 60 - minute) * 60 * 1000) / 1000;

  return [degree, minute, second, locVal];
};
const toRational = (value: number): [number, number] => {
  const gcd = (a: number, b: number): number => {
    if (b < 0.0000001) {
      return a;
    }

    return gcd(b, Math.floor(a % b));
  };

  const len = value.toString().length - 2;
  const denominator = Math.pow(10, len);
  const numerator = value * denominator;
  const divisor = gcd(numerator, denominator);

  return [numerator / divisor, denominator / divisor];
};

export const GPSHelper = {
  latitudeToDMS: (
    latitude: number,
  ): {
    GPSLatitudeRef: string;
    GPSLatitude: [[number, number], [number, number], [number, number]];
  } => {
    const [degree, minute, second, ref] = toDegree(latitude, ['S', 'N']);

    return {
      GPSLatitudeRef: ref,
      GPSLatitude: [toRational(degree), toRational(minute), toRational(second)],
    };
  },

  longitudeToDMS: (
    longitude: number,
  ): {
    GPSLongitudeRef: string;
    GPSLongitude: [[number, number], [number, number], [number, number]];
  } => {
    const [degree, minute, second, ref] = toDegree(longitude, ['W', 'E']);

    return {
      GPSLongitudeRef: ref,
      GPSLongitude: [
        toRational(degree),
        toRational(minute),
        toRational(second),
      ],
    };
  },
  dmsRationalToDeg: (dmsArray: Array<Array<number>>, ref: string): number => {
    if (ref !== 'S' && ref !== 'W' && ref !== 'N' && ref !== 'E') {
      throw new Error(
        '"dmsRationalToDeg", 2nd argument must be "N", "S", "E" or "W"',
      );
    }
    const sign = ref === 'S' || ref === 'W' ? -1.0 : 1.0;
    const deg =
      dmsArray[0][0] / dmsArray[0][1] +
      dmsArray[1][0] / (dmsArray[1][1] * 60.0) +
      dmsArray[2][0] / (dmsArray[2][1] * 3600.0);

    return sign * deg;
  },
};
