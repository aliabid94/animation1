//card1.frag: fragment shader for the swiss cheese card.

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
  vec4 diffuse_color = vec4 (0.0, 1.0, 1.0, 1.0);
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  
  float x = vertTexCoord[0];
  float y = vertTexCoord[1];
  
  bool hole = false;
  gl_FragColor = vec4(diffuse * diffuse_color.rgb, 0.5);
  
  for (float i = (1.0/6.0); i < 0.95; i += (1.0/3.0))
  {
    for (float j = (1.0/6.0); j < 0.95; j += (1.0/3.0))
	{
	  if (sqrt(pow((x - i), 2) + pow((y - j), 2)) < 0.1)
	    hole = true;
	}
  }
  
  if (hole)
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  
}
