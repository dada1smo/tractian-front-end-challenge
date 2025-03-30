import { AssetType } from '@/modules/assets/types/AssetType';
import { LocationType } from '@/modules/locations/types/LocationType';
import { TreeItem } from '@/modules/utils/tree';
import { findAssetParent } from './filter';

const locations: LocationType[] = [
  {
    id: 'A',
    name: 'Location A',
    parentId: null,
  },
  {
    id: 'A1',
    name: 'Location A1',
    parentId: 'A',
  },
  {
    id: 'A1.1',
    name: 'Location A1.1',
    parentId: 'A1',
  },
];

const treeItem: TreeItem = {
  gatewayId: 'HND116',
  id: 'B',
  locationId: 'A1.1',
  name: 'Sensor 1 - energy',
  parentId: null,
  sensorId: 'OOJ718',
  sensorType: 'energy',
  status: 'operating',
  category: 'component',
  lineage: ['B'],
  children: [],
};

const expectedTreeItem: TreeItem = {
  id: 'A',
  name: 'Location A',
  parentId: null,
  category: 'location',
  lineage: ['A'],
  children: [
    {
      id: 'A1',
      name: 'Location A1',
      parentId: 'A',
      category: 'location',
      lineage: ['A', 'A1'],
      children: [
        {
          id: 'A1.1',
          name: 'Location A1.1',
          parentId: 'A1',
          category: 'location',
          lineage: ['A', 'A1', 'A1.1'],
          children: [treeItem],
        },
      ],
    },
  ],
};

const assets: AssetType[] = [];

test('find asset parents', () => {
  expect(findAssetParent('location', treeItem, locations)).toBe(
    expectedTreeItem
  );
});
