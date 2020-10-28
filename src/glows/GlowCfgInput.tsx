import React, { ChangeEvent, useRef } from "react";
import { FileDrop } from "react-file-drop";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { setGlowsFromCfg } from "../redux/glows/glowsSlice";

const GlowCfgInput = (): React.ReactElement => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const onFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    void updateGlowsFromFiles(files);
  };
  const updateGlowsFromFiles = async (files: FileList | null) => {
    if (files && files.length > 0) {
      const text = await files[0].text();
      dispatch(setGlowsFromCfg(text));
    }
  };
  const onTargetClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <FileDropContainer>
      <div>
        <FileDrop onTargetClick={onTargetClick} onDrop={updateGlowsFromFiles}>
          <button>Browse</button>
          <DropOverlay>
            <DropOverlayModal>
              Drop a CFG file anywhere to load your glows.
            </DropOverlayModal>
          </DropOverlay>
        </FileDrop>
        for a .cfg file or drag one here.
      </div>
      <HiddenInput
        onChange={onFileInputChange}
        ref={fileInputRef}
        type="file"
      />
    </FileDropContainer>
  );
};

const FileDropContainer = styled.div`
  .file-drop {
    display: inline-block;
    padding-right: 8px;
  }
  .file-drop-target {
    display: inline-block;
  }
`;
const HiddenInput = styled.input`
  display: none;
`;

const DropOverlay = styled.div`
  display: none;
  .file-drop-dragging-over-frame & {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

const DropOverlayModal = styled.div`
  width: 320px;
  height: 320px;
  border: 4px dashed grey;
  background-color: white;
  border-radius: 16px;
  text-align: center;
  padding: 16px;
  font-size: 24px;
  display: flex;
  align-items: center;
  color: black;
`;

export default GlowCfgInput;
