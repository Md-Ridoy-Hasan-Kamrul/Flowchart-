import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import { useState, useCallback } from 'react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import PopupModal from '../../components/PopupModal/PopupModal';

// Constants for better organization
const NODE_STYLES = {
  base: {
    border: '2px solid black',
    borderRadius: '10px',
    padding: 10,
    color: 'black',
    fontWeight: '500',
    width: 220,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  colors: {
    red: '#fecaca',
    green: '#bbf7d0',
    blue: '#bfdbfe',
    orange: '#fde68a',
    purple: '#ddd6fe',
    white: '#fff',
    lightBlue: '#e0f2fe',
  },
};

const ANIMATION_CONFIG = {
  node: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: 'spring', damping: 10, stiffness: 100 },
  },
  edge: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  },
};

// Data organized in a more maintainable way
const FLOW_DATA = {
  initialNodes: [
    {
      id: '1',
      data: { label: 'Experiment & Design' },
      position: { x: 100, y: 300 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.white },
    },
  ],

  groupMap: {
    red: ['2', '3', '4'],
    green: ['5', '6'],
    blue: ['7', '8', '9', '10'],
    orange: ['11', '12'],
    purple: ['13'],
  },

  allNodes: [
    {
      id: '2',
      data: { label: 'Could you survive a natural disaster?' },
      position: { x: 450, y: 30 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.red },
    },
    {
      id: '3',
      data: { label: 'How do we grow healthy communities?' },
      position: { x: 700, y: 30 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.red },
    },
    {
      id: '4',
      data: { label: 'How can I become better, faster, harder, stronger?' },
      position: { x: 575, y: 100 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.red },
    },
    {
      id: '5',
      data: { label: 'What on Earth?' },
      position: { x: 450, y: 180 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.green },
    },
    {
      id: '6',
      data: { label: 'What creates a criminal' },
      position: { x: 700, y: 180 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.green },
    },
    {
      id: '7',
      data: { label: 'Can you be a sporting superstar' },
      position: { x: 450, y: 260 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.blue },
    },
    {
      id: '8',
      data: { label: 'What is the journey from farm to fork?' },
      position: { x: 700, y: 260 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.blue },
    },
    {
      id: '9',
      data: { label: 'How do we use technology to improve our lives?' },
      position: { x: 450, y: 330 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.blue },
    },
    {
      id: '10',
      data: { label: 'Why does it taste like that?' },
      position: { x: 700, y: 330 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.blue },
    },
    {
      id: '11',
      data: { label: 'Human Sciences' },
      position: { x: 450, y: 410 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.orange },
    },
    {
      id: '12',
      data: { label: 'Physical Sciences' },
      position: { x: 700, y: 410 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.orange },
    },
    {
      id: '13',
      data: { label: 'Worlding With Wilderness' },
      position: { x: 575, y: 490 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.purple },
    },
  ],

  raceNodes: {
    red: [
      {
        id: 'r1',
        data: { label: 'Where do I come from?' },
        position: { x: 1000, y: 30 },
        style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.red },
      },
      {
        id: 'r2',
        data: { label: 'How does sports science improve performance?' },
        position: { x: 1000, y: 100 },
        style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.red },
      },
    ],
    green: [
      {
        id: 'r3',
        data: { label: 'What does it mean to be human?' },
        position: { x: 1000, y: 180 },
        style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.green },
      },
    ],
    blue: [
      {
        id: 'r4',
        data: { label: 'Are we eating our environment?' },
        position: { x: 1000, y: 260 },
        style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.blue },
      },
      {
        id: 'r5',
        data: { label: 'How can we explore the stars?' },
        position: { x: 1000, y: 330 },
        style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.blue },
      },
    ],
    orange: [
      {
        id: 'r6',
        data: { label: 'Pre-VCE Physical Science' },
        position: { x: 1000, y: 410 },
        style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.orange },
      },
      {
        id: 'r7',
        data: { label: 'Pre-VCE Human Science' },
        position: { x: 1000, y: 480 },
        style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.orange },
      },
    ],
    purple: [
      {
        id: 'r8',
        data: { label: 'VET Conservation and Ecosystem Management' },
        position: { x: 1000, y: 560 },
        style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.purple },
      },
      {
        id: 'r9',
        data: { label: 'VET Animal Care' },
        position: { x: 1000, y: 630 },
        style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.purple },
      },
      {
        id: 'r10',
        data: { label: 'CHESS Research Matters' },
        position: { x: 1000, y: 700 },
        style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.purple },
      },
    ],
  },

  finalDestinations: {
    r1: ['vce2', 'vce7'],
    r2: ['vce2', 'vce3'],
    r3: ['vce4'],
    r4: ['vce7', 'vce8'],
    r5: ['vce2', 'vce5'],
    r6: ['vce5', 'vce6'],
    r7: ['vce4', 'vce7'],
    r8: ['vce8'],
    r9: ['vce7', 'vce8'],
  },

  vceNodes: [
    {
      id: 'vce1',
      data: { label: 'VCE-VM' },
      position: { x: 1450, y: 0 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.lightBlue },
    },
    {
      id: 'vce2',
      data: { label: 'VCE Health & Human development' },
      position: { x: 1450, y: 70 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.lightBlue },
    },
    {
      id: 'vce3',
      data: { label: 'VCE PE' },
      position: { x: 1450, y: 140 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.lightBlue },
    },
    {
      id: 'vce4',
      data: { label: 'VCE Psychology' },
      position: { x: 1450, y: 210 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.lightBlue },
    },
    {
      id: 'vce5',
      data: { label: 'VCE Physics' },
      position: { x: 1450, y: 280 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.lightBlue },
    },
    {
      id: 'vce6',
      data: { label: 'VCE Chemistry' },
      position: { x: 1450, y: 350 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.lightBlue },
    },
    {
      id: 'vce7',
      data: { label: 'VCE Biology' },
      position: { x: 1450, y: 420 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.lightBlue },
    },
    {
      id: 'vce8',
      data: { label: 'VCE Environmentally Science' },
      position: { x: 1450, y: 490 },
      style: { ...NODE_STYLES.base, background: NODE_STYLES.colors.lightBlue },
    },
  ],
};

export default function FlowchartPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    FLOW_DATA.initialNodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loaded, setLoaded] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  // Handle node clicks with better organization
  const handleNodeClick = useCallback(
    (_, node) => {
      if (node.id === '1' && !loaded) {
        loadInitialNodes();
        return;
      }

      const foundGroup = Object.entries(FLOW_DATA.groupMap).find(([_, ids]) =>
        ids.includes(node.id)
      );
      if (foundGroup) {
        loadGroupNodes(foundGroup[0]);
        return;
      }

      if (node.id.startsWith('r')) {
        loadDestinationNodes(node);
      }
    },
    [loaded]
  );

  const loadInitialNodes = () => {
    const newEdges = FLOW_DATA.allNodes.map((n) => ({
      id: `e1-${n.id}`,
      source: '1',
      target: n.id,
      ...ANIMATION_CONFIG.edge,
    }));
    setNodes([...FLOW_DATA.initialNodes, ...FLOW_DATA.allNodes]);
    setEdges(newEdges);
    setLoaded(true);
  };

  const loadGroupNodes = (groupColor) => {
    const raceNodes = FLOW_DATA.raceNodes[groupColor] || [];
    const newEdges = raceNodes.map((n) => ({
      id: `e1-${n.id}`,
      source: '1',
      target: n.id,
      ...ANIMATION_CONFIG.edge,
    }));
    setNodes([FLOW_DATA.initialNodes[0], ...raceNodes]);
    setEdges(newEdges);
  };

  const loadDestinationNodes = (node) => {
    const targetIds = FLOW_DATA.finalDestinations[node.id] || [];
    const destNodes = FLOW_DATA.vceNodes.filter((n) =>
      targetIds.includes(n.id)
    );
    const color = node.style?.background || '#000';

    const newEdges = targetIds.map((vceId) => ({
      id: `e-${node.id}-${vceId}`,
      source: node.id,
      target: vceId,
      ...ANIMATION_CONFIG.edge,
      style: { stroke: color },
    }));

    setNodes([FLOW_DATA.initialNodes[0], node, ...destNodes]);
    setEdges([
      {
        id: `e1-${node.id}`,
        source: '1',
        target: node.id,
        ...ANIMATION_CONFIG.edge,
        style: { stroke: node.style?.background || 'black' },
      },
      ...newEdges,
    ]);
  };

  return (
    <div className='w-full h-[90vh] relative'>
      <ReactFlowProvider>
        <AnimatePresence mode='wait'>
          <motion.div
            key={'flowchart'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='w-full h-full'
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={handleNodeClick}
              fitView
              nodesDraggable={true}
              nodesConnectable={false}
            >
              <Background />
              <Controls />
            </ReactFlow>
          </motion.div>
        </AnimatePresence>
      </ReactFlowProvider>

      <PopupModal
        isOpen={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
        onConfirm={() => setShowWelcomePopup(false)}
        message='Welcome to the Flowchart! Click "Experiment & Design" to begin exploring.'
      />
    </div>
  );
}
