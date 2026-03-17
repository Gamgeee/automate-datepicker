export function calcDegreesFromEvent(
  ev: MouseEvent,
  clockRect: DOMRect,
  step: number
): number {
  const targetX = clockRect.width / 2;
  const targetY = clockRect.height / 2;
  const Vx = Math.round((ev.clientX - clockRect.left) - targetX);
  const Vy = Math.round(targetY - (ev.clientY - clockRect.top));
  let radians = -Math.atan2(Vy, Vx);
  radians += 2.5 * Math.PI;
  let degrees = Math.round((radians * 180) / Math.PI);
  const degMod = degrees % step;
  if (degMod === 0) {
    return degrees;
  }
  if (degMod >= step / 2) {
    degrees = degrees + (step - degMod);
  } else {
    degrees = degrees - degMod;
  }
  return degrees;
}
