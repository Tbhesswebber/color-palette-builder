import { scenes, useSceneValues } from "../../logics/sceneLogic";

export function Scenes() {
  const { scene } = useSceneValues();

  const Scene = scenes[scene];

  return <Scene />;
}
