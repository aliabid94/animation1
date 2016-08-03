//card3.frag fragment shader for the duck card

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D texture;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;


void main() { 
  vec4 center_color = texture2D(texture, vertTexCoord.xy);
  float x = vertTexCoord.x;
  float y = vertTexCoord.y;  
  vec4 left_color = texture2D(texture, vec2(x - 0.01, y));
  vec4 right_color = texture2D(texture, vec2(x + 0.01, y));
  vec4 up_color = texture2D(texture, vec2(x, y + 0.01));
  vec4 down_color = texture2D(texture, vec2(x, y - 0.01));
  
  float center_intensity = 0.2989 * center_color[0] + 0.5870 * center_color[1] + 0.1140 * center_color[2];
  float left_intensity = 0.2989 * left_color[0] + 0.5870 * left_color[1] + 0.1140 * left_color[2];
  float right_intensity = 0.2989 * right_color[0] + 0.5870 * right_color[1] + 0.1140 * right_color[2];
  float up_intensity = 0.2989 * up_color[0] + 0.5870 * up_color[1] + 0.1140 * up_color[2];
  float down_intensity = 0.2989 * down_color[0] + 0.5870 * down_color[1] + 0.1140 * down_color[2];
  
  float intensity = clamp((left_intensity + right_intensity + up_intensity + down_intensity - center_intensity * 4.0), 0.0, 1.0);
  vec3 color = vec3(intensity, intensity, intensity);
  
  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  gl_FragColor = vec4(diffuse * color, 1.0);
  
  
  
  //your code here
}
