import { LocationType } from '../locations/types/LocationType';

export interface LocationTree extends LocationType {
  children: LocationTree[];
}

export function buildTree(data: LocationType[]): LocationTree[] {
  const children: LocationTree[] = [];
  const parents: LocationTree[] = [];

  data.forEach((location) => {
    if (location.parentId !== null) {
      children.push({ ...location, children: [] });
    }

    if (location.parentId === null) {
      parents.push({ ...location, children: [] });
    }
  });

  children.forEach((child) => {
    const parentIndex = parents.findIndex(
      (parent) => parent.id === child.parentId
    );

    if (parentIndex >= 0) {
      parents[parentIndex].children.push(child);
    }
  });

  return parents;
}
