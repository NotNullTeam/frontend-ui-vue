import { defineStore } from 'pinia';

export interface GraphNode {
  id: string;
  type: string;
  status: string;
  name: string;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export const useGraphStore = defineStore('graph', {
  state: () => ({
    nodes: [] as GraphNode[],
    edges: [] as GraphEdge[],
    selectedNodeId: null as string | null,
  }),
  actions: {
    addNode(node: GraphNode) {
      this.nodes.push(node);
    },
    addEdge(edge: GraphEdge) {
      this.edges.push(edge);
    },
    selectNode(id: string) {
      this.selectedNodeId = id;
    },
  },
});
