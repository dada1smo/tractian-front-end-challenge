import { TreeItem } from './tree';

export function mergeObjectsById(objects: TreeItem[]) {
  const map = new Map();

  function merge(obj: TreeItem) {
    if (!map.has(obj.id)) {
      map.set(obj.id, { ...obj, children: [] });
    }
    const existing = map.get(obj.id);
    existing.children = mergeChildren([...existing.children, ...obj.children]);
    return existing;
  }

  function mergeChildren(children: TreeItem[]) {
    const childMap = new Map();
    for (const child of children) {
      if (!childMap.has(child.id)) {
        childMap.set(child.id, merge(child));
      } else {
        const existing = childMap.get(child.id);
        existing.children = mergeChildren([
          ...existing.children,
          ...child.children,
        ]);
      }
    }
    return Array.from(childMap.values());
  }

  return Array.from(new Set(objects.map(merge)));
}
