export abstract class ClockItem {
  public get id(): string { return `atp-ci-${this._uniqueId}`; }
  public get top(): string { return this._top; }
  public get left(): string { return this._left; }
  /** Angle used for layout (0° = 3 o'clock, 90° = 12 o'clock, counterclockwise). Use for hand rotation. */
  public get degree(): number { return this._degree; }

  protected readonly _degreeStart = 180;

  private _top!: string;
  private _left!: string;

  private _degree!: number;
  private _itemRadiusInRem: number = 1;

  private _uniqueId: string;

  constructor() {
    this._uniqueId = Math.random().toString().substring(2);
  }

  protected _setPositions(degree: number, itemDiameterInRem: number | null): void {
    this._degree = degree;
    this._itemRadiusInRem = itemDiameterInRem ? (itemDiameterInRem / 2) : this._itemRadiusInRem;

    this._calculatePositions();
  }

  private _calculatePositions(): void {
    let theta = this._degree;
    theta = Math.PI * theta / 180; // convert to radians.

    const itemRadiusInPx = this._itemRadiusInRem * 16;

    // Match .clock-circle size (16rem = 256px at 16px root)
    const clockRadiusInPx = 128;
    const marginFromEdgeInPx = 24; // gap from clock edge to items ring
    const itemsCircleRadiusInPx = clockRadiusInPx - marginFromEdgeInPx;
    const itemsCircleCenter = clockRadiusInPx - itemRadiusInPx;

    const radius = itemsCircleRadiusInPx;
    const centerX = itemsCircleCenter;
    const centerY = itemsCircleCenter;
    const x = centerX + radius * Math.cos(theta);
    const y = centerY - radius * Math.sin(theta);

    this._top = `${x}px`;
    this._left = `${y}px`;
  }
}
