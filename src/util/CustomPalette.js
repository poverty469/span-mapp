import Palette from "google-palette";

let CustomPalette = (paletteName, colorCount) => {
  const saturation = -1; // -2 -> 2
  const contrast = -4; // -5 -> 5
  let totalColors = colorCount;

  if (saturation < -2 || saturation > 2) {
    console.error("Saturation out of range: must be -2 - 2");
  }
  if (contrast < -5 || contrast > 5) {
    console.error("Contrast out of range: must be -5 - 5");
  }

  if (colorCount - contrast >= colorCount) {
    totalColors = colorCount - contrast;
  }

  let start = parseInt((totalColors / 2.0 - colorCount / 2.0).toFixed()); // default start
  const contrastShiftMag = Math.abs(contrast) / 2.0;
  start += parseInt(((saturation / 2.0) * contrastShiftMag).toFixed());

  if (start < 0) {
    start = 0;
  }
  if (start > totalColors - colorCount) {
    start = totalColors - colorCount;
  }

  const end = start + colorCount;

  return Palette(paletteName, totalColors).slice(start, end);
};

export { CustomPalette };
