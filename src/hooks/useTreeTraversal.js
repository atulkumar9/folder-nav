import { v4 as uuidv4 } from "uuid";

const useTreeTraversal = (tree, setTree) => {
  const addItemAtId = (itemId, newItem, isFolder) => {
    const traverse = (tree, itemId, newItem, isFolder) => {
      if (itemId === tree.id) {
        tree.children.unshift({
          name: newItem,
          id: uuidv4(),
          children: isFolder ? [] : undefined,
        });
        return tree;
      }

      if (!tree.children) return tree;

      const children = tree.children.map((item) => {
        return traverse(item, itemId, newItem, isFolder);
      });

      return { ...tree, children };
    };
    setTree([traverse(tree[0], itemId, newItem, isFolder)]);
  };
  const deleteItem = (itemId) => {
    if (itemId === "0") {
      return [];
    }
    const traverse = (tree, itemId) => {
      if (itemId === tree.id) {
        tree.toDelete = true;
        return tree;
      }

      if (!tree.children) return tree;

      let children = tree.children.map((item) => {
        return traverse(item, itemId);
      });

      children = children.filter((child) => !child?.toDelete);

      return { ...tree, children };
    };
    setTree([traverse(tree[0], itemId)]);
  };
  const editNameAtId = (itemId, newName) => {
    const traverse = (tree, itemId, newName) => {
      if (itemId === tree.id) {
        tree.name = newName;
        return tree;
      }

      if (!tree.children) return tree;

      let children = tree.children.map((item) => {
        return traverse(item, itemId, newName);
      });

      return { ...tree, children };
    };
    setTree([traverse(tree[0], itemId, newName)]);
  };
  return { addItemAtId, deleteItem, editNameAtId };
};

export default useTreeTraversal;
