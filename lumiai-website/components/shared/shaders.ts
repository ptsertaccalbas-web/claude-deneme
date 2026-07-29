import { ShaderMaterial, type ShaderMaterialParameters } from "three"

export const filmGrainVert = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`

export const filmGrainFrag = `uniform float uIntensity;uniform float uTime;varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
void main(){float g=hash(vUv+floor(uTime*24.));gl_FragColor=vec4(vec3(g),g*uIntensity*0.6);}`

export function createFilmGrainMaterial(params?: Partial<ShaderMaterialParameters>) {
  return new ShaderMaterial({
    uniforms: { uIntensity: { value: 0.1 }, uTime: { value: 0 } },
    vertexShader: filmGrainVert,
    fragmentShader: filmGrainFrag,
    transparent: true,
    depthWrite: false,
    ...params,
  })
}

export const liquidTransitionVert = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`

export const liquidTransitionFrag = `uniform float uProgress;uniform float uTime;uniform float uAmplitude;uniform sampler2D uTexture1;uniform sampler2D uTexture2;varying vec2 vUv;
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.*floor(p*7.*(1./49.));
vec4 x_=floor(j*7.);vec4 y_=floor(j-7.*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.zzzz;
vec4 t=1.-x*x-y*y;vec4 d=t*t*t;vec4 a=d*(x*x+y*y-1.5);vec4 b=d*(x*y);vec4 h=a+b;
return 2.2*h.x+1.85*h.y+1.57*h.z+1.32*h.w;}
void main(){vec2 uv=vUv;float n=snoise(vec3(uv*3.,uTime*.2));float d=n*uAmplitude*(1.-abs(uProgress-.5)*2.);vec2 duv=uv+vec2(d,d*.5);
vec4 t1=texture2D(uTexture1,duv);vec4 t2=texture2D(uTexture2,duv);float e=smoothstep(0.,1.,uProgress+n*.05);gl_FragColor=mix(t1,t2,e);}`

export function createLiquidTransitionMaterial(params?: Partial<ShaderMaterialParameters>) {
  return new ShaderMaterial({
    uniforms: {
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uAmplitude: { value: 0.08 },
      uTexture1: { value: null },
      uTexture2: { value: null },
    },
    vertexShader: liquidTransitionVert,
    fragmentShader: liquidTransitionFrag,
    transparent: true,
    depthWrite: false,
    ...params,
  })
}
