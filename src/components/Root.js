import React from "react";
import { useUpdateData, useApi } from "../contexts/apiContext";
import FolderContent from "./FolderContent";
import useTreeTraversal from "../hooks/useTreeTraversal";

const Root = () => {
  const { data, isLoading } = useApi();
  const setData = useUpdateData();
  const { addItemAtId, deleteItem, editNameAtId } = useTreeTraversal(
    data,
    setData
  );

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <FolderContent
          dirItems={data}
          addItemAtId={addItemAtId}
          deleteItem={deleteItem}
          editNameAtId={editNameAtId}
        />
      )}
    </div>
  );
};

export default Root;
