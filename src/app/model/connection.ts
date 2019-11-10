export class Connection {
  id: number;
  originNode: number;
  endNode: number;
  distance: number;

  constructor(
    id?: number,
    originNode?: number,
    endNode?: number,
    distance?: number
  ) {
    this.id = id;
    this.originNode = originNode;
    this.endNode = endNode;
    this.distance = distance;
  }
}
