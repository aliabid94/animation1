//card2.frag: fragment shader for the mandelbrot card

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 

  vec4 diffuse_color = vec4 (1.0, 0.0, 0.0, 1.0);
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 1.0);
  
  float cx = 3.0 * vertTexCoord[0] - 2.1;
  float cy = 3.0 * vertTexCoord[1] - 1.5;

  float px = 0.0;
  float py = 0.0;
  
  for (int i = 0; i < 21; i++)
  {
    float dx = px * px - py * py + cx;
	float dy = px * py + px * py + cy;
	px = dx;
	py = dy;
  }
  
  if (sqrt(px * px + py * py) < 2)
  {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }

}