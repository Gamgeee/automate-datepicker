export abstract class ClockItem {
  public get id(): string { return `atp-ci-${this._uniqueId}`; }
  public get top(): string { return this._top; }
  public get left(): string { return this._left; }

  protected readonly _degreeStart = 180;

  private _top: string;
  private _left: string;

  private _degree: number;
  private _itemRadiusInRem: number = 1;

  private _uniqueId: string;

  constructor() {
    this._uniqueId = Math.random().toString().substring(2);
  }

  protected _setPositions(degree: number, itemDiameterInRem?: number): void {
    this._degree = degree;
    this._itemRadiusInRem = itemDiameterInRem ? (itemDiameterInRem / 2) : this._itemRadiusInRem;

    this._calculatePositions();
  }

  private _calculatePositions(): void {
    let theta = this._degree;
    theta = Math.PI * theta / 180; // convert to radians.

    const itemRadiusInPx = this._itemRadiusInRem * 16;

    const clockRadiusInPx = 104;
    const itemsCircleRadiusInPx = 80;
    const circlesDiff = clockRadiusInPx - itemsCircleRadiusInPx;
    const itemsCircleCenter = clockRadiusInPx - itemRadiusInPx;

    const radius = clockRadiusInPx - circlesDiff;
    const centerX = itemsCircleCenter;
    const centerY = itemsCircleCenter;
    const x = centerX + radius * Math.cos(theta);
    const y = centerY - radius * Math.sin(theta);

    this._top = `${x}px`;
    this._left = `${y}px`;
  }
}
