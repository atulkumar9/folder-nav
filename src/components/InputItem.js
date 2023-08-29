import React, { useState, useRef, useEffect } from "react";
import { ItemType } from "../constants/ItemType";
import useOutsideClick from "../hooks/useOutsideClick";
import Folder from "../svg/Folder";
import File from "../svg/File";

const InputItem = ({
  fileTypeClicked,
  addItemAtId,
  itemId,
  setFileTypeClicked,
}) => {
  const [value, setValue] = useState("");
  const [visible, setVisibility] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setVisibility(fileTypeClicked !== null);
  }, [fileTypeClicked]);

  useEffect(() => {
    if (visible) {
      inputRef?.current?.focus();
    }
  }, [visible]);

  useOutsideClick(() => {
    setVisibility(false);
    setValue("");
    setFileTypeClicked(null);
  }, [inputRef]);

  const onKeyDownHandler = (event) => {
    if (event.key === "Enter") {
      addItemAtId(itemId, value, fileTypeClicked === ItemType.FOLDER);
      setVisibility(false);
      setValue("");
      setFileTypeClicked(null);
    }
  };

  return (
    <>
      {visible && (
        <div className="input-box-container">
          <span className="icon">
            {fileTypeClicked === ItemType.FOLDER ? <Folder /> : <File />}
          </span>
          <input
            ref={inputRef}
            type="text"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDownHandler}
            value={value}
            className="ipnut-box item-name"
          />
        </div>
      )}
    </>
  );
};

export default InputItem;
