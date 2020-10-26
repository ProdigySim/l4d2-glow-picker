import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import getGlowsCvarText from "../redux/glows/getGlowsCvarText";

const GlowsCvarOutput = () => {
  const [isCopied, setIsCopied] = useState(false);
  const cvarText = useSelector(getGlowsCvarText);

  useEffect(() => {
    // When cvar text changes, reset the "copied" state.
    setIsCopied(false);
  }, [cvarText]);
  return (
    <div>
      <h2>Generated Glows</h2>
      <p>Copy paste these into your autoexec.</p>
      <div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(cvarText);
            setIsCopied(true);
          }}
        >
          {isCopied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>
      <CvarOutput>{cvarText}</CvarOutput>
    </div>
  );
};

const CvarOutput = styled.pre`
  border: 2px dotted white;
  background-color: #4a505a;
  border-radius: 8px;
  padding: 8px;
`;

export default GlowsCvarOutput;
