import styled from "@emotion/styled";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { glowVariables, glowCvarText, GlowEntry } from "./glowsState";

const GlowDisplay = ({ glow }: { glow: GlowEntry }): JSX.Element => {
  return (
    <>
      <div>
        <GlowBox {...glow} />
        <span>{glow.name}</span>
      </div>
    </>
  );
};

interface GlowProps {
  r: string;
  g: string;
  b: string;
}

function getGlowCss(g: GlowProps) {
  const toU8 = (floatStr: string) => Math.floor(parseFloat(floatStr) * 256);
  return `rgb(${toU8(g.r)}, ${toU8(g.g)}, ${toU8(g.b)})`;
}

const GlowBox = styled("div")<GlowProps>`
  width: 50px;
  height: 50px;
  display: block;
  background-color: ${(p: GlowProps) => getGlowCss(p)};
  box-shadow: 0 0 6px 4px ${(p: GlowProps) => getGlowCss(p)};
`;

export default function GlowsDisplay(): JSX.Element {
  const [glowData] = useRecoilState(glowVariables);
  const cvarText = useRecoilValue(glowCvarText);
  return (
    <div>
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
`;
