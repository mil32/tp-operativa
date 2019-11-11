import { Injectable } from "@angular/core";
import { NetworkNode } from "../model/networkNode";
import { Connection } from "../model/connection";
import { FullNode } from "../model/fullNode";
import LocalNodes from "../data/nodes.json";
import LocalConnections from "../data/connections.json";
import { BehaviorSubject, Observable, of } from "rxjs";
import Graph from '../../data-structures/graph/Graph.js';
import GraphVertex from '../../data-structures/graph/GraphVertex.js';
import GraphEdge from '../../data-structures/graph/GraphEdge.js';
import travellingSalesman from '../../algorithms/travellingSalesman.js';

@Injectable({
  providedIn: "root"
})
export class GlobalService {
  private nodes = new Array<NetworkNode>();
  private connections = new Array<Connection>();
  private fullNodes = new Array<FullNode>();
  private selectedNodes: NetworkNode[] = [];
  private startNode: string;
  private endNode: string;

  fullNodesSubject: BehaviorSubject<FullNode[]>;
  fullNodes$: Observable<FullNode[]>;

  constructor() {
    this.nodes = LocalNodes.map(
      n =>
        new NetworkNode(n.id, n.name, n.address, n.stock, n.isInitial, n.isEnd)
    );
    this.connections = LocalConnections.map(
      conn =>
        new Connection(conn.id, conn.originNode, conn.endNode, conn.distance)
    );
    this.fullNodesSubject = new BehaviorSubject<FullNode[]>(this.fullNodes);
    this.fullNodes$ = this.fullNodesSubject.asObservable();
    this.setFullNodes();
  }

  createFullNodes(nodes: NetworkNode[]): FullNode[] {
    let ids = [];
    let finalArray: FullNode[] = [];
    nodes.forEach(node => ids.push(node.id));
    let filteredConnections = this.filterConnections(ids);
    nodes.forEach(node => {
      finalArray.push(new FullNode(node, filteredConnections));
    });
    return finalArray;
  }

  filterConnections(ids: number[]): Connection[] {
    let filteredConnections = this.connections.filter(
      conn => ids.includes(conn.originNode) && ids.includes(conn.endNode)
    );
    return filteredConnections;
  }

  setFullNodes(selectedNodes: NetworkNode[] = this.nodes): void {
    let finalArray = this.createFullNodes(selectedNodes);
    this.fullNodes = finalArray;
    this.fullNodesSubject.next(this.fullNodes);
  }

  getFullNodes(selectedNodes: NetworkNode[] = this.nodes): FullNode[] {
    this.setFullNodes(selectedNodes);
    return this.fullNodes;
  }

  getConnections(): Connection[] {
    return this.connections;
  }

  deleteConnection(id: number): void {
    this.connections = this.connections.filter(conn => conn.id != id);
    this.setFullNodes();
  }

  deleteNode(id: number): void {
    this.nodes = this.nodes.filter(node => node.id != id);
    this.connections = this.connections.filter(conn => conn.originNode != id);
    this.connections = this.connections.filter(conn => conn.endNode != id);
    this.setFullNodes();
  }

  getNodes(): NetworkNode[] {
    return this.nodes;
  }

  addNode(n: any): void {
    this.nodes.push(
      new NetworkNode(
        this.nodes.length,
        n.name,
        n.address,
        n.stock,
        n.isInitial,
        n.isEnd
      )
    );
    console.log("[GS] NODE ADDED >", this.nodes, this.connections);
    this.setFullNodes();
  }

  addConnection(con: any): void {
    this.connections.push(
      new Connection(
        this.connections.length,
        con.originNode,
        con.endNode,
        con.distance
      )
    );
    console.log("[GS] CONN ADDED >", this.nodes, this.connections);
    this.setFullNodes();
  }

  toggleStartNode(id: string): void {
    this.startNode = id;
    console.log("[START]> ", this.startNode);
  }
  toggleEndNode(id: string): void {
    this.endNode = id;
    console.log("[END]> ", this.endNode);
  }

  toggleNode(fullnode: any): void {
    let node = this.nodes.find(node => node.id == fullnode.id);
    if (this.selectedNodes.includes(node)) {
      let index = this.selectedNodes.indexOf(node);
      this.selectedNodes.splice(index, 1);
    } else {
      this.selectedNodes.push(node);
    }
  }

  economicPath(): void {
    let selectedFinalNodes = this.createFullNodes(this.selectedNodes);

    console.log("[ECONOMIC]", selectedFinalNodes);
    console.log("[start / end]", this.startNode, this.endNode);
  }

  

  travelAgent(): void {
    
    let selectedFinalNodes = this.createFullNodes(this.selectedNodes);
    const graph = new Graph(true);
    const graphEdges = new Array();
  
    selectedFinalNodes.forEach(node => {
      node.connections.forEach(connection => {
        graphEdges.push(new GraphEdge(new GraphVertex(connection.originNode),new GraphVertex(connection.endNode), connection.distance))
      });
    });
  
    graphEdges.forEach(graphEdge => {
      graph.addEdge(graphEdge);
    });
    console.log(graph);
    
    const salesmanPath = travellingSalesman(graph);
    console.log(salesmanPath);
     
  }
}
