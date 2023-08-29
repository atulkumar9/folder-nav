import React, { useState, useRef, useEffect } from "react";
import FolderContent from "./FolderContent";
import Folder from "../svg/Folder";
import File from "../svg/File";
import Controls from "./Controls";
import InputItem from "./InputItem";
import useOutsideClick from "../hooks/useOutsideClick";

const Item = ({ itemData, addItemAtId, deleteItem, editNameAtId }) => {
  const isFolder = itemData?.children;
  const [expanded, setExpanded] = useState(false);
  const [fileTypeClicked, setFileTypeClicked] = useState(null);
  const [editName, setEditName] = useState(false);
  const itemNameRef = useRef();
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    setItemName(itemData.name);
  }, [itemData.name]);

  useOutsideClick(() => {
    setEditName(false);
    // editNameAtId(itemData.id, itemName);
  }, [itemNameRef]);

  const onExpandHandler = (e) => {
    if (!isFolder) return;
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const onAddItemClicked = (type) => {
    setFileTypeClicked(type);
    setExpanded(true);
  };

  const onItemNameChangeHandler = (e) => {
    e.stopPropagation();
    setItemName(e.target.value);
  };

  const onKeyDownHandler = (event) => {
    if (event.key === "Enter") {
      setEditName(false);
      editNameAtId(itemData.id, itemName);
    }
  };

  useEffect(() => {
    if (editName) {
      itemNameRef?.current?.focus();
    }
  }, [editName]);

  return (
    <>
      <div
        className={`item ${isFolder ? "folder" : "file"}`}
        onClick={onExpandHandler}
      >
        <span className="icon">{isFolder ? <Folder /> : <File />}</span>
        <input
          ref={itemNameRef}
          className={`item-name ${editName ? "edit" : ""}`}
          value={itemName}
          disabled={!editName ? "disabled" : ""}
          onChange={onItemNameChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <Controls
          isFolder={isFolder}
          onAddItemClicked={onAddItemClicked}
          deleteItem={deleteItem}
          itemId={itemData.id}
          onRenameClick={() => setEditName(true)}
        />
      </div>
      <div className="items-container">
        <InputItem
          fileTypeClicked={fileTypeClicked}
          addItemAtId={addItemAtId}
          itemId={itemData.id}
          setFileTypeClicked={setFileTypeClicked}
        />
        {expanded && (
          <FolderContent
            dirItems={itemData.children}
            onAddItemClick={setFileTypeClicked}
            addItemAtId={addItemAtId}
            deleteItem={deleteItem}
            editNameAtId={editNameAtId}
          />
        )}
      </div>
    </>
  );
};

export default Item;
