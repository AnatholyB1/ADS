import { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { useLoading } from "@/hook/loading";

const BabylonSnake = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { showLoading, hideLoading, setNumberState } = useLoading();

  useEffect(() => {
    // Create an engine
    const engine = new BABYLON.Engine(ref.current, true);

    // Create a scene
    const scene = new BABYLON.Scene(engine);

    // Create a camera
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2,
      2,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.attachControl(ref.current, true);

    // Create a light
    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Load a GLTF resource
    BABYLON.SceneLoader.ImportMesh(
      "",
      "/ct_scan__japanese_pit_viper/",
      "scene.gltf",
      scene,
      (meshes) => {
        // called when the resource is loaded
        hideLoading();
        meshes[0].scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);

        // Create a sphere to represent the point
        const sphere = BABYLON.MeshBuilder.CreateSphere(
          "point",
          { diameter: 0.05 },
          scene
        );
        sphere.position = new BABYLON.Vector3(0.8, 0.1, -0.05); // Adjust the position as needed

        // Create a black material
        const blackMaterial = new BABYLON.StandardMaterial(
          "blackMaterial",
          scene
        );
        blackMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        sphere.material = blackMaterial;

        // Add an action manager to the sphere
        sphere.actionManager = new BABYLON.ActionManager(scene);
        sphere.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickTrigger,
            () => {
              // Create an animation for the camera's radius
              const zoomAnimation = new BABYLON.Animation(
                "zoomAnimation",
                "radius",
                30,
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
              );

              // Animation keys
              const keys = [];
              keys.push({ frame: 0, value: camera.radius });
              keys.push({ frame: 30, value: 1.5 }); // Adjust the zoom level as needed

              zoomAnimation.setKeys(keys);

              // Start the animation
              camera.animations = [];
              camera.animations.push(zoomAnimation);
              scene.beginAnimation(camera, 0, 30, false);

              // Set the camera target
              camera.setTarget(sphere.position);

              // Display a legend
              const legend = document.createElement("div");
              legend.innerText = "This is a point of interest";
              legend.style.position = "absolute";
              legend.style.top = "55%";
              legend.style.left = "50%";
              legend.style.transform = "translate(-50%, -50%)";
              legend.style.backgroundColor = "white";
              legend.style.padding = "10px";
              legend.style.border = "1px solid black";
              legend.style.borderRadius = "5px";
              legend.style.zIndex = "1000";
              legend.style.fontFamily = "Arial";
              legend.style.fontSize = "16px";
              legend.style.fontWeight = "bold";
              legend.style.display = "flex";
              legend.style.alignItems = "center";
              legend.style.justifyContent = "space-between";

              // Create a close button
              const closeButton = document.createElement("button");
              closeButton.innerText = "✖";
              closeButton.style.marginLeft = "10px";
              closeButton.style.background = "none";
              closeButton.style.border = "none";
              closeButton.style.cursor = "pointer";
              closeButton.style.fontSize = "16px";
              closeButton.style.fontWeight = "bold";
              closeButton.onclick = () => {
                document.body.removeChild(legend);
              };

              document.body.appendChild(legend);
            }
          )
        );
      },
      (event) => {
        // called while loading is progressing
        showLoading();
        setNumberState((event.loaded / event.total) * 100);
      },
      (message, exception) => {
        // called when loading has errors
        hideLoading();
        console.error("An error happened", message, exception);
      }
    );

    // Render the scene
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Resize the engine when the window is resized
    window.addEventListener("resize", () => {
      engine.resize();
    });

    // Clean up on unmount
    return () => {
      engine.dispose();
    };
  }, []);

  return <canvas id="snake" className="w-screen h-screen" ref={ref} />;
};

export default BabylonSnake;
