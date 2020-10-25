import styled from "@emotion/styled";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import getGlowCvars from "../redux/glows/getGlowCvars";
import getGlowsCvarText from "../redux/glows/getGlowsCvarText";
import { GlowCvar } from "../redux/glows/glowsModel";
import * as glowActions from "../redux/glows/glowsSlice";

const GlowDisplay = ({ glow }: { glow: GlowCvar }): JSX.Element => {
  return (
    <GlowCvarBox>
      <GlowBox {...glow} />
      <pre>{glow.name}</pre>
      <span>{glow.description}</span>
    </GlowCvarBox>
  );
};

function getGlowCss(g: GlowCvar) {
  return `rgb(${g.r}, ${g.g}, ${g.b})`;
}

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
