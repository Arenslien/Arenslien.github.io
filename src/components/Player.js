import * as THREE from "three";
import { endsUpInValidPosition } from "../utilities/endsUpInValidPosition";

export const player = Player();

function Player() {
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(15, 15, 15), // 20
    new THREE.MeshLambertMaterial({
      color: "white",
      flatShading: true,
    })
  );

  body.castShadow = true;
  body.receiveShadow = true;
  body.position.z = 10;

  return body;
}

export const position = {
  currentRow: 0,
  currentTile: 0,
};

export const movesQueue = [];

export function queueMove(direction) {
  const isValidMove = endsUpInValidPosition(
    {
      rowIndex: position.currentRow,
      tileIndex: position.currentTile,
    },
    [...movesQueue, direction]
  );

  if (!isValidMove) return;

  movesQueue.push(direction);
}

export function stepCompleted() {
  const direction = movesQueue.shift();

  if (direction === "forward") position.currentRow += 1;
  if (direction === "backward") position.currentRow -= 1;
  if (direction === "right") position.currentTile += 1;
  if (direction === "left") position.currentTile -= 1;
}
