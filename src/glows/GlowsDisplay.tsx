import styled from "@emotion/styled";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SketchPicker } from "react-color";
import InvisibleButton from "../common/InvisibleButton";
import getGlowCvars from "../redux/glows/getGlowCvars";
import getGlowsCvarText from "../redux/glows/getGlowsCvarText";
import { GlowCvar } from "../redux/glows/glowsModel";
import * as glowActions from "../redux/glows/glowsSlice";

const GlowDisplay = ({ glow }: { glow: GlowCvar }): JSX.Element => {
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const { r, g, b } = glow;
  return (
    <GlowCvarBox>
      <div>
        <InvisibleButton onClick={() => setShowPicker(!showPicker)}>
          <GlowBox {...glow} />
        </InvisibleButton>
        {showPicker && (
          <PickerPopover>
            <PickerBackdrop
              onClick={() => setShowPicker(false)}
            ></PickerBackdrop>
            <SketchPicker
              disableAlpha={true}
              color={{ r, g, b }}
              onChange={(e) =>
                dispatch(
                  glowActions.setGlowColor({ name: glow.name, value: e.rgb })
                )
              }
            />
          </PickerPopover>
        )}
      </div>
      <pre>{glow.name}</pre>
      <span>{glow.description}</span>
    </GlowCvarBox>
  );
};

function getGlowCss(g: GlowCvar) {
  return `rgb(${g.r}, ${g.g}, ${g.b})`;
}

const PickerPopover = styled.div`
  position: absolute;
`;

const PickerBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const GlowCvarBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 16px 0;
`;
const GlowBox = styled("div")<GlowCvar>`
  width: 50px;
  height: 50px;
  display: block;
  background-color: ${(p: GlowCvar) => getGlowCss(p)};
  box-shadow: 0 0 6px 4px ${(p: GlowCvar) => getGlowCss(p)};
`;

export default function GlowsDisplay(): JSX.Element {
  const glowData = useSelector(getGlowCvars);
  const cvarText = useSelector(getGlowsCvarText);
  const shouldCloneToColorblind = useSelector(
    (s) => s.glows.flags.cloneToColorblind
  );
  const dispatch = useDispatch();
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={shouldCloneToColorblind}
          onChange={({ currentTarget: { checked } }) =>
            dispatch(glowActions.setCloneToColorblind(!!checked))
          }
        />
        Clone colors to colorblind cvars.
      </label>
      <GlowGrid>
        {glowData.map((gd) => (
          <GlowDisplay glow={gd} key={gd.name} />
        ))}
      </GlowGrid>
      <pre>{cvarText}</pre>
    </div>
  );
}

const GlowGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 16px auto;

  > div {
    flex: 0 0 25%;
  }
`;
