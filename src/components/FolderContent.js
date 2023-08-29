import React from "react";
import Item from "./Item";

const FolderContent = ({ dirItems, addItemAtId, deleteItem, editNameAtId }) => {
  return (
    <>
      {dirItems?.length > 0 && (
        <div>
          {dirItems.map((item) => {
            return (
              <Item
                itemData={item}
                addItemAtId={addItemAtId}
                deleteItem={deleteItem}
                editNameAtId={editNameAtId}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default FolderContent;
