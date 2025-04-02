import { ColorRGBA, Position, Rotation } from "../../type";
import { ObjectData } from "../../index";
import { Matrix4 } from "../../../maths";

type TriangleData = {
  position: Position;
  verticesPositions: [Position, Position, Position];
  rotation: Rotation;
  color: ColorRGBA;
};

function translate(data: number[]): number[] {
  const matrix = Matrix4.translate(Matrix4.xRotation(Math.PI), -50, -75, -15);

  for (let index = 0; index < data.length; index += 3) {
    const vector = Matrix4.transformVector(matrix, [
      data[index + 0],
      data[index + 1],
      data[index + 2],
      1,
    ]);
    data[index + 0] = vector[0];
    data[index + 1] = vector[1];
    data[index + 2] = vector[2];
  }

  return data;
}

export default function (data: TriangleData[], vertexSize: number): ObjectData {
  const [triangles, colors]: [number[], number[]] = data.reduce(
    (_result, triangleData) =>
      [
        [
          ..._result[0],
          ...triangleData.verticesPositions[0],
          ...triangleData.verticesPositions[1],
          ...triangleData.verticesPositions[2],
        ],
        [
          ..._result[1],
          ...triangleData.color,
          ...triangleData.color,
          ...triangleData.color,
        ],
      ] as [number[], number[]],
    [[], []] as [number[], number[]]
  );

  return {
    attributesData: {
      a_color: {
        vertices: colors,
        vertexSize: 4,
      },
      a_position: {
        vertices: translate(triangles),
        vertexSize,
      },
    },
    verticesCount: triangles.length / vertexSize,
    position: data[0].position,
    rotation: data[0].rotation,
  };
}

export { TriangleData };
