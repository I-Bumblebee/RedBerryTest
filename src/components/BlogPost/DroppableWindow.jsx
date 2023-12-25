import "./DroppableWindow.css";
import { ReactComponent as ImageIcon } from "../../assets/image-icon.svg";
import { ReactComponent as XIcon } from "../../assets/x-icon.svg";
import { ReactComponent as AddFileIcon } from "../../assets/add-file-icon.svg";
import { useRef, useState } from "react";

function DroppableWindow({ onFileSelect, hidden, title }) {
    const fileInputRef = useRef(null);
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type.includes("image")) {
            onFileSelect(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.includes("image")) {
            onFileSelect(file);
            console.log(file.name);
        }
    };

    const handleClick = (event) => {
        event.preventDefault();
        fileInputRef.current.click();
    };

    const clear = () => {
        onFileSelect(null);
    };

    return (
        <>
            <h2>ატვირთეთ ფოტო</h2>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                tabIndex={0}
                className={`droppable-window  ${hidden && "not-visible"}`}
            >
                <AddFileIcon className="add-file-icon" />
                <input
                    ref={fileInputRef}
                    className="image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    hidden={true}
                />
                <div className="file-input-label">
                    <span>ჩააგდე ფაილი აქ ან</span>
                    <button
                        onClick={handleClick}
                        className="choose-file-button"
                    >
                        აირჩიეთ ფაილი
                    </button>
                </div>
            </div>
            <div className={`image-preview-title ${!hidden && "not-visible"}`}>
                <ImageIcon className="image-icon" />
                {title}
                <XIcon className="x-icon" onClick={clear} />
            </div>
        </>
    );
}

export default DroppableWindow;
