class Shaders {
  static vertexShader: string = `#version 300 es
in vec4 a_position;
in vec4 a_color;

uniform mat4 u_matrix;

out vec4 vertex_Color;

void main() {
  gl_Position = u_matrix * a_position;

  vertex_Color = a_color;
}
  `;

  static fragmentShader: string = `#version 300 es
  precision highp float;

  in vec4 vertex_Color;
  
  out vec4 outColor;
 
  void main() {
    outColor = vertex_Color;
  }
`;
}

export default Shaders;
