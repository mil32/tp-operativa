export class NetworkNode {
  id: number;
  name: string;
  address: string;
  stock: number;
  isInitial: Boolean;
  isEnd: Boolean;

  constructor(
    id?: number,
    name?: string,
    address?: string,
    stock?: number,
    isInitial?: Boolean,
    isEnd?: Boolean
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.stock = stock;
    this.isInitial = isInitial;
    this.isEnd = isEnd;
  }
}
