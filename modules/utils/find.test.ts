import { AssetType } from '../assets/types/AssetType';
import { findParentItem, findParents } from './find';
import { formatIntoTreeItem } from './format';
import { TreeItem } from './tree';

const childOfAsset: TreeItem = {
  id: 'C',
  locationId: null,
  parentId: 'B',
  name: 'Sensor 1 - energy',
  sensorType: 'energy',
  category: 'component',
  lineage: ['C'],
  children: [],
};

const childOfLocation: TreeItem = {
  id: 'D',
  locationId: 'A1.1',
  parentId: null,
  name: 'Sensor 1 - energy',
  sensorType: 'energy',
  category: 'component',
  lineage: ['D'],
  children: [],
};

const parentAsset: AssetType = {
  id: 'B',
  locationId: 'A1.1',
  name: 'Asset B',
  parentId: null,
};

const parentLocation = {
  id: 'A1.1',
  name: 'Location A1.1',
  parentId: 'A1',
};

const grandparentLocation = {
  id: 'A1',
  name: 'Location A1',
  parentId: null,
};

const parentAssetAsTreeItem = {
  ...formatIntoTreeItem('asset', parentAsset),
  children: [childOfAsset],
};

const parentLocationAsTreeItem = {
  ...formatIntoTreeItem('location', parentLocation),
  children: [childOfLocation],
};

const grandparentLocationAsTreeItem = {
  ...formatIntoTreeItem('location', grandparentLocation),
  children: [parentLocationAsTreeItem],
};

test('find parent asset', () => {
  expect(
    findParentItem(childOfAsset, 'parentId', 'asset', [parentAsset])
  ).toStrictEqual(parentAssetAsTreeItem);
});

test('find parent location', () => {
  expect(
    findParentItem(childOfLocation, 'locationId', 'location', [parentLocation])
  ).toStrictEqual(parentLocationAsTreeItem);
});

test('find grandparent location', () => {
  expect(
    findParentItem(parentLocationAsTreeItem, 'parentId', 'location', [
      grandparentLocation,
    ])
  ).toStrictEqual(grandparentLocationAsTreeItem);
});

test('find parent tree', () => {
  expect(
    findParents(childOfLocation, [parentLocation, grandparentLocation], [])
  ).toStrictEqual(grandparentLocationAsTreeItem);
});
