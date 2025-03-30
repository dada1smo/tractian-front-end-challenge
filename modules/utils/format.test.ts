import { formatIntoTreeItem } from './format';

const location = {
  id: 'A',
  name: 'Location A',
  parentId: null,
};

const asset = {
  gatewayId: 'HND116',
  id: 'B',
  locationId: 'A1.1',
  name: 'Sensor 1 - energy',
  parentId: null,
  sensorId: 'OOJ718',
  sensorType: 'energy',
  status: 'operating',
};

const formattedLocation = {
  id: 'A',
  name: 'Location A',
  parentId: null,
  category: 'location',
  lineage: ['A'],
  children: [],
};

const formattedAsset = {
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

test('format location into tree item', () => {
  expect(formatIntoTreeItem('location', location)).toStrictEqual(
    formattedLocation
  );
});

test('format asset into tree item', () => {
  expect(formatIntoTreeItem('component', asset)).toStrictEqual(formattedAsset);
});
