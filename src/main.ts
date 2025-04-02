import { Matrix4, degToRad } from "./maths";
import { ColorRGBA } from "./engine/type";

import Engine from "./engine";
import { App } from "./App";

import test from "./test";

const SCENE_OPTIONS = {
  width: 800,
  height: 600,
  pixelSize: 100,
  backgroundColor: [0.5, 0.5, 0.5, 1],
};
const CAMERA_OPTIONS = {
  radius: 200,
  aspect: SCENE_OPTIONS.width / SCENE_OPTIONS.height,
  zNear: 1,
  zFar: 2000,
  fieldOfView: degToRad(90),
  angle: degToRad(-10),
};

window.addEventListener("DOMContentLoaded", () => {
  const app = new App("app-container", "WebGL Renderer");
  app.render();

  const engine = new Engine(app.$container.querySelector("#scene")!, {
    width: SCENE_OPTIONS.width,
    height: SCENE_OPTIONS.height,
    backgroundColor: SCENE_OPTIONS.backgroundColor as ColorRGBA,
  });

  const projectionViewMatrix = Matrix4.multiply(
    // projection
    Matrix4.perspective(
      CAMERA_OPTIONS.fieldOfView,
      CAMERA_OPTIONS.aspect,
      CAMERA_OPTIONS.zNear,
      CAMERA_OPTIONS.zFar
    ),
    // view
    Matrix4.inverse(
      Matrix4.translate(
        Matrix4.yRotation(CAMERA_OPTIONS.angle),
        SCENE_OPTIONS.pixelSize / 2,
        -SCENE_OPTIONS.pixelSize / 2,
        CAMERA_OPTIONS.radius * 1.5
      )
    )
  );

  // test
  test(engine, projectionViewMatrix, SCENE_OPTIONS.pixelSize);
});
