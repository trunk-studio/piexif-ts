react-native-piexif-ts
========

[![Actions Status](https://github.com/{holwech}/{piexif-ts}/workflows/{main.yml}/badge.svg)](https://github.com/{holwech}/{piexif-ts}/actions)

This repository is forked from [piexifjs](https://github.com/hMatoba/piexifjs) and all praise should go to the creator of this great library.

Fix of the Typescript version of the original [piexifjs](https://github.com/hMatoba/piexifjs) as I was having trouble using it. See original documentation for how to use it.

## Install
`npm i piexif-ts`

How to Use
----------

It's very similar to the javascript library, but with some slight differences. Below is an example of how you can use this:

```typescript
import piexif, { IExif, IExifElement, TagValues } from 'piexif-ts';

var file = evt.target.files[0];

var zeroth: IExifElement = {};
var exif: IExifElement = {};
var gps: IExifElement = {};
zeroth[TagValues.ImageIFD.Make] = "Make";
zeroth[TagValues.ImageIFD.XResolution] = [777, 1];
zeroth[TagValues.ImageIFD.YResolution] = [777, 1];
zeroth[TagValues.ImageIFD.Software] = "Piexifjs";
exif[TagValues.ExifIFD.DateTimeOriginal] = "2010:10:10 10:10:10";
exif[TagValues.ExifIFD.LensMake] = "LensMake";
exif[TagValues.ExifIFD.Sharpness] = 777;
exif[TagValues.ExifIFD.LensSpecification] = [[1, 1], [1, 1], [1, 1], [1, 1]];
gps[TagValues.GPSIFD.GPSVersionID] = [7, 7, 7, 7];
gps[TagValues.GPSIFD.GPSDateStamp] = "1999:99:99 99:99:99";
var exifObj: IExif = {"0th":zeroth, "Exif":exif, "GPS":gps};
var exifStr = piexif.dump(exifObj);

var reader = new FileReader();
reader.onload = function(e) {
    var inserted = piexif.insert(exifStr, e.target.result);

    var image = new Image();
    image.src = inserted;
    image.width = 200;
    var el = $("<div></div>").append(image);
    $("#resized").prepend(el);

};
reader.readAsDataURL(file);
```

Note also that in `tsconfig.json` the following setting needs to be set to `commonjs` for some reason. I am not sure why, so if someone could explain me, please do.

```json
{
...
  "compilerOptions": {
    "module": "commonjs", 
    ...
  }
}
```

[Read the Docs](https://piexifjs.readthedocs.io/en/2.0/index.html)

Dependency
----------

No dependency. Piexifjs just needs standard JavaScript environment.

Environment
-----------

Both client-side and server-side. Piexifjs is transpiled as Universal Module Definition(https://github.com/umdjs/umd).

Issues
------

Give me details. Environment, code, input, output. I can do nothing with abstract.

License
-------

This software is released under the MIT License, see LICENSE.txt.

