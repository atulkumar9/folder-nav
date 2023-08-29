import React from "react";
import { ItemType } from "../constants/ItemType";

const Controls = ({
  isFolder,
  onAddItemClicked,
  deleteItem,
  itemId,
  onRenameClick,
}) => {
  const onAddItemClickHandler = (e, type) => {
    e.stopPropagation();
    onAddItemClicked(type);
  };

  const onRenameHandler = (e) => {
    e.stopPropagation();
    onRenameClick();
  };

  const onDeleteHandler = (e) => {
    e.stopPropagation();
    deleteItem(itemId);
  };

  return (
    <div className="add-item-container">
      <p onClick={onRenameHandler}>
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/color/48/border-color.png"
          alt="border-color"
        />
      </p>
      {isFolder && (
        <>
          <p onClick={(e) => onAddItemClickHandler(e, ItemType.FILE)}>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/parakeet/48/add-file.png"
              alt="add-file"
            />
          </p>
          <p onClick={(e) => onAddItemClickHandler(e, ItemType.FOLDER)}>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/add-folder.png"
              alt="add-folder"
            />
          </p>
        </>
      )}
      <p onClick={onDeleteHandler}>
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/color/48/filled-trash.png"
          alt="filled-trash"
        />
      </p>
    </div>
  );
};

export default Controls;
