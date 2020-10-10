import { atom, selector } from "recoil";

import glowData from "./glow_data.json";

export type GlowEntry = typeof glowData[0];
export const glowVariables = atom({
  key: "glowVariables",
  default: glowData,
});

export const glowCvarText = selector({
  key: "glowCvarText",
  get: ({ get }) => {
    const data = get(glowVariables);
    return data
      .flatMap((g) => {
        const cvarBase = g.name;
        return [
          `${cvarBase}_r "${g.r}";`,
          `${cvarBase}_g "${g.g}";`,
          `${cvarBase}_b "${g.b}";`,
        ];
      })
      .join("\n");
  },
});
