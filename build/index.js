var W={SIM_RESOLUTION:128,DYE_RESOLUTION:1024,CAPTURE_RESOLUTION:512,DENSITY_DISSIPATION:1,VELOCITY_DISSIPATION:0.2,PRESSURE:0.8,PRESSURE_ITERATIONS:20,CURL:30,INITIAL:!0,SPLAT_AMOUNT:5,SPLAT_RADIUS:0.25,SPLAT_FORCE:6000,SPLAT_KEY:"Space",SHADING:!0,COLORFUL:!0,COLOR_UPDATE_SPEED:10,COLOR_PALETTE:[],HOVER:!0,BACK_COLOR:"#000000",TRANSPARENT:!1,BRIGHTNESS:0.5,BLOOM:!0,BLOOM_ITERATIONS:8,BLOOM_RESOLUTION:256,BLOOM_INTENSITY:0.8,BLOOM_THRESHOLD:0.6,BLOOM_SOFT_KNEE:0.7,SUNRAYS:!0,SUNRAYS_RESOLUTION:196,SUNRAYS_WEIGHT:1},n=[],NE=[],x=!1,_E=!1,IE=!1,VA={splats(){n.push(Math.random()*W.SPLAT_AMOUNT*4+W.SPLAT_AMOUNT)},splat(K,s,i,S,O=void 0){NE.push([K,s,i,S,O])},screenshot(){IE=!0},pause(K=!1){if(x)x=!1;else x=!0;if(K)_E=!0;else _E=!1},config(K){Object.assign(W,K)},simulation(K,s={}){Object.assign(W,s),LE();function i(){}function S(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[30,0,300]}let O=[],C=[];O.push(new S);const{gl:A,ext:z}=BE(K);if(!z.supportLinearFiltering)W.DYE_RESOLUTION=512,W.SHADING=!1,W.BLOOM=!1,W.SUNRAYS=!1;function BE(E){const _={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let N=E.getContext("webgl2",_);const I=!!N;if(!I)N=E.getContext("webgl",_)||E.getContext("experimental-webgl",_);let J,Q;if(I)N.getExtension("EXT_color_buffer_float"),Q=N.getExtension("OES_texture_float_linear");else J=N.getExtension("OES_texture_half_float"),Q=N.getExtension("OES_texture_half_float_linear");N.clearColor(0,0,0,1);const q=I?N.HALF_FLOAT:J.HALF_FLOAT_OES;let Z,$,V;if(I)Z=T(N,N.RGBA16F,N.RGBA,q),$=T(N,N.RG16F,N.RG,q),V=T(N,N.R16F,N.RED,q);else Z=T(N,N.RGBA,N.RGBA,q),$=T(N,N.RGBA,N.RGBA,q),V=T(N,N.RGBA,N.RGBA,q);return i("send","event",I?"webgl2":"webgl",Z==null?"not supported":"supported"),{gl:N,ext:{formatRGBA:Z,formatRG:$,formatR:V,halfFloatTexType:q,supportLinearFiltering:Q}}}function T(E,_,N,I){if(!RE(E,_,N,I))switch(_){case E.R16F:return T(E,E.RG16F,E.RG,I);case E.RG16F:return T(E,E.RGBA16F,E.RGBA,I);default:return null}return{internalFormat:_,format:N}}function RE(E,_,N,I){let J=E.createTexture();E.bindTexture(E.TEXTURE_2D,J),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_MIN_FILTER,E.NEAREST),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_MAG_FILTER,E.NEAREST),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_WRAP_S,E.CLAMP_TO_EDGE),E.texParameteri(E.TEXTURE_2D,E.TEXTURE_WRAP_T,E.CLAMP_TO_EDGE),E.texImage2D(E.TEXTURE_2D,0,_,4,4,0,N,I,null);let Q=E.createFramebuffer();return E.bindFramebuffer(E.FRAMEBUFFER,Q),E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,J,0),E.checkFramebufferStatus(E.FRAMEBUFFER)==E.FRAMEBUFFER_COMPLETE}function CE(){let E=f(W.CAPTURE_RESOLUTION),_=D(E.width,E.height,z.formatRGBA.internalFormat,z.formatRGBA.format,z.halfFloatTexType,A.NEAREST);OE(_);let N=FE(_);N=wE(N,_.width,_.height);let J=SE(N,_.width,_.height).toDataURL();bE("fluid.png",J),URL.revokeObjectURL(J)}function FE(E){A.bindFramebuffer(A.FRAMEBUFFER,E.fbo);let _=E.width*E.height*4,N=new Float32Array(_);return A.readPixels(0,0,E.width,E.height,A.RGBA,A.FLOAT,N),N}function wE(E,_,N){let I=new Uint8Array(E.length),J=0;for(let Q=N-1;Q>=0;Q--)for(let q=0;q<_;q++){let Z=Q*_*4+q*4;I[Z+0]=y(E[J+0])*255,I[Z+1]=y(E[J+1])*255,I[Z+2]=y(E[J+2])*255,I[Z+3]=y(E[J+3])*255,J+=4}return I}function y(E){return Math.min(Math.max(E,0),1)}function SE(E,_,N){let I=document.createElement("canvas"),J=I.getContext("2d");I.width=_,I.height=N;let Q=J.createImageData(_,N);return Q.data.set(E),J.putImageData(Q,0,0),I}function bE(E,_){let N=document.createElement("a");N.download=E,N.href=_,document.body.appendChild(N),N.click(),document.body.removeChild(N)}class JE{constructor(E,_){this.vertexShader=E,this.fragmentShaderSource=_,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(E){let _=0;for(let I=0;I<E.length;I++)_+=GA(E[I]);let N=this.programs[_];if(N==null){let I=Y(A.FRAGMENT_SHADER,this.fragmentShaderSource,E);N=QE(this.vertexShader,I),this.programs[_]=N}if(N==this.activeProgram)return;this.uniforms=qE(N),this.activeProgram=N}bind(){A.useProgram(this.activeProgram)}}class H{constructor(E,_){this.uniforms={},this.program=QE(E,_),this.uniforms=qE(this.program)}bind(){A.useProgram(this.program)}}function QE(E,_){let N=A.createProgram();if(A.attachShader(N,E),A.attachShader(N,_),A.linkProgram(N),!A.getProgramParameter(N,A.LINK_STATUS))console.trace(A.getProgramInfoLog(N));return N}function qE(E){let _=[],N=A.getProgramParameter(E,A.ACTIVE_UNIFORMS);for(let I=0;I<N;I++){let J=A.getActiveUniform(E,I).name;_[J]=A.getUniformLocation(E,J)}return _}function Y(E,_,N){_=PE(_,N);const I=A.createShader(E);if(A.shaderSource(I,_),A.compileShader(I),!A.getShaderParameter(I,A.COMPILE_STATUS))console.trace(A.getShaderInfoLog(I));return I}function PE(E,_){if(_==null)return E;let N="";return _.forEach((I)=>{N+="#define "+I+"\n"}),N+E}const M=Y(A.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),fE=Y(A.VERTEX_SHADER,`
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`),xE=Y(A.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
`),yE=Y(A.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`),uE=Y(A.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`),vE=Y(A.FRAGMENT_SHADER,`
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }
`),hE=Y(A.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    #define SCALE 25.0

    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`),dE=`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif

    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif

    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif

    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`,mE=Y(A.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`),cE=Y(A.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`),pE=Y(A.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`),nE=Y(A.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
`),sE=Y(A.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;

    #define ITERATIONS 16

    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;

        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;

        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;

        float color = texture2D(uTexture, vUv).a;

        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }

        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
`),iE=Y(A.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`),gE=Y(A.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }`,z.supportLinearFiltering?null:["MANUAL_FILTERING"]),lE=Y(A.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`),oE=Y(A.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`),tE=Y(A.FRAGMENT_SHADER,`
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),aE=Y(A.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`),rE=Y(A.FRAGMENT_SHADER,`
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`),j=(()=>{return A.bindBuffer(A.ARRAY_BUFFER,A.createBuffer()),A.bufferData(A.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),A.STATIC_DRAW),A.bindBuffer(A.ELEMENT_ARRAY_BUFFER,A.createBuffer()),A.bufferData(A.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),A.STATIC_DRAW),A.vertexAttribPointer(0,2,A.FLOAT,!1,0,0),A.enableVertexAttribArray(0),(E,_=!1)=>{if(E==null)A.viewport(0,0,A.drawingBufferWidth,A.drawingBufferHeight),A.bindFramebuffer(A.FRAMEBUFFER,null);else A.viewport(0,0,E.width,E.height),A.bindFramebuffer(A.FRAMEBUFFER,E.fbo);if(_)A.clearColor(0,0,0,1),A.clear(A.COLOR_BUFFER_BIT);A.drawElements(A.TRIANGLES,6,A.UNSIGNED_SHORT,0)}})();let L,U,g,l,k,o,u,WE,ZE=NA("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAQKADAAQAAAABAAAAQAAAAABGUUKwAAAeK0lEQVR4AT3aBbRuVdUG4HW5hNLdSHd3CyjdEtLd3Y1wKZHuLgFJRenuBqW7u7tTlu8zx//9ZwwG8J397b3WnG/NtU9bYokl+nfffdf//e9/96uuuqrPN998/ZRTTukbb7xxP/zww/u+++7bf/vb3/YddtihP/roo32SSSbpL7zwQj/99NP7Vltt1X/88ce+8sor13Vvv/12Hzp0aF999dX7Bx980P/617/2WWedtX/55Zd9++237zPMMEP/05/+1DfYYIP+0EMP9amnnrq/9957/ZZbbum//PJLf+yxx/pJJ53URxtttL7WWmv1P//5z/3bb7/t9913X63t9ddf7wsvvHBff/31+6GHHtovu+yyPuecc/YbbrihH3300fXshRZaqF900UW1zv/85z991FFHrfXce++9ffjhh+/nnXdeXe8e7tsuv/zy+vKEE07YDzzwwNpoz4/FPfnkk32VVVbpd911V7/66qv7Mccc0y+99NI+yiij9KWWWqoffPDB/frrr6+HWfjss8/e77jjju6ev/vd72ojNrfiiiv21lo98Pzzz6/fnXjiif0f//hH33rrrWujFr7JJpvU/d5///1+wQUX9N12261PNdVUfbnlluvDDTdc//TTT+vzW2+9tY844oj9q6++6i+++GKffPLJaz3W+fXXX1fx3N/6vv/++3rOG2+8Uc/66KOP+njjjVff22OPPXr7+OOPq4oqftZZZ3VdtLkxxhijX3zxxd0XFGeOOebof/zjH/tee+1VC7nnnnv6uuuuWwt55ZVXqurbbLNNH3fccdWv77333t0innrqqX7QQQf1tddeu3uWh88zzzz9m2++6WONNVZt7txzz61njDTSSP2AAw7oM888c1988cX77bffXgvdaKON+rBhw/oEE0xQKJltttn6Lrvs0k844YS+5ppr9i233LK/8847tTYo23bbbfurr75ahYYQaFUk9/Zd31twwQX7yCOP3JuO6cIzzzxTEJppppmqUzrrc50dMmRIf+211/rPP//cF1lkkeqKToK3ii+66KL98ccf74cddlhfZ511+gMPPNCnnXbavsACC9RGJ5tssv7Pf/6zFrLrrrvWxp5++ulC3DXXXFMFff7557uigjy6TTzxxP3zzz8vNM0999zVHDT6wx/+0H/44Yc+6aST1vXW869//aufccYZfZxxxql1oLIGQp/naQLaLbvssoVkdF9ttdUKTUPcaJZZZmnbbbddW2yxxVoW2rKolg0oTgtn0KTluvbggw+2VVddtWXxLbxvJ598cptuuulaqt/CxxZet2hHW2ONNdr444/fbrrpppYCtUCxhUr1WXShpRMtm2tZaJtxxhlbEFf3iP60LLq+Hzq18Lxlg/X9l156qT3yyCP17JtvvrmFw23eeedtvhO0tf3337+eEU1pKVRbYYUV2hZbbNGuu+46KG/Rl5ZN138HPW333Xdv1tJwRJfxjcDoIjHSAb9bb731+u9///uC0MMPP1y8JnogN+aYY5aYqSYhAm1dG3vssTtagPRRRx3VL7zwwu67BImwTTHFFP1vf/tbJ2r3339/T+H7lFNO+f/d9nkWXx3NQquDUObaaaaZpr/55pt9n332qa6iVZrQ05zSEDq133771f1Qw/OJIo2xt3POOafEkMin+L2BK9VNhfumm25am3rrrbf68ccf36effvp+2223lYh88sknxbtUvT7DJ4W54oor+tlnn103tWgLALt0qzaGYoR0zz337F988UUPKop/xx13XBXYIs8888wqqE0RS4JrU6eeempPt8shUIuKe4Zn0g+/41o777xzv+SSS+q7zz33XLmaooK6vaA1rXj55ZeLvhpMY9wHpDuOuRne/v3vfy9h2nHHHTue//rXv64v4h6r0TkbmWiiiTpx+u9//1uL9eC77767ukjEPJDlsUnCR5zYKx7TC87gc0oNGRBEYzbccMNyH88gnksuuSSKVhe5FEvlNoQN8o499tjSp2WWWaZ0gaYQa41TQAJ+5ZVXlk3TtBtvvLGa9Nlnn5VQN/bA71XYZiyanbAYAsOaQMoiRhhhhE683Cj873PNNVc93Pep/vLLL19dJXooQt0hhig9++yz5QTuwUp15c477ywnIcC+S4/cCxVlCcW3Ps2QP6i3Qi+99NKFsJ9++qlHa6rwHMyawZzS/+pXvypas1CiOfroo1c2WWmllaqAHAXyhqZDw6LmJWpZeEsh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");const b=new H(fE,xE),KE=new H(M,yE),t=new H(M,uE),UE=new H(M,vE),$E=new H(M,hE),v=new H(M,mE),P=new H(M,cE),h=new H(M,pE),jE=new H(M,nE),a=new H(M,sE),B=new H(M,iE),X=new H(M,gE),r=new H(M,lE),e=new H(M,oE),w=new H(M,tE),d=new H(M,aE),m=new H(M,rE),R=new JE(M,dE);function YE(){let E=f(W.SIM_RESOLUTION),_=f(W.DYE_RESOLUTION);const{halfFloatTexType:N,formatRGBA:I,formatRG:J,formatR:Q}=z,q=z.supportLinearFiltering?A.LINEAR:A.NEAREST;if(A.disable(A.BLEND),L==null)L=EE(_.width,_.height,I.internalFormat,I.format,N,q);else L=zE(L,_.width,_.height,I.internalFormat,I.format,N,q);if(U==null)U=EE(E.width,E.height,J.internalFormat,J.format,N,q);else U=zE(U,E.width,E.height,J.internalFormat,J.format,N,q);g=D(E.width,E.height,Q.internalFormat,Q.format,N,A.NEAREST),l=D(E.width,E.height,Q.internalFormat,Q.format,N,A.NEAREST),k=EE(E.width,E.height,Q.internalFormat,Q.format,N,A.NEAREST),eE(),EA()}function eE(){let E=f(W.BLOOM_RESOLUTION);const{halfFloatTexType:_,formatRGBA:N}=z,I=z.supportLinearFiltering?A.LINEAR:A.NEAREST;o=D(E.width,E.height,N.internalFormat,N.format,_,I),C.length=0;for(let J=0;J<W.BLOOM_ITERATIONS;J++){let Q=E.width>>J+1,q=E.height>>J+1;if(Q<2||q<2)break;let Z=D(Q,q,N.internalFormat,N.format,_,I);C.push(Z)}}function EA(){let E=f(W.SUNRAYS_RESOLUTION);const{halfFloatTexType:_,formatR:N}=z,I=z.supportLinearFiltering?A.LINEAR:A.NEAREST;u=D(E.width,E.height,N.internalFormat,N.format,_,I),WE=D(E.width,E.height,N.internalFormat,N.format,_,I)}function D(E,_,N,I,J,Q){A.activeTexture(A.TEXTURE0);let q=A.createTexture();A.bindTexture(A.TEXTURE_2D,q),A.texParameteri(A.TEXTURE_2D,A.TEXTURE_MIN_FILTER,Q),A.texParameteri(A.TEXTURE_2D,A.TEXTURE_MAG_FILTER,Q),A.texParameteri(A.TEXTURE_2D,A.TEXTURE_WRAP_S,A.CLAMP_TO_EDGE),A.texParameteri(A.TEXTURE_2D,A.TEXTURE_WRAP_T,A.CLAMP_TO_EDGE),A.texImage2D(A.TEXTURE_2D,0,N,E,_,0,I,J,null);let Z=A.createFramebuffer();A.bindFramebuffer(A.FRAMEBUFFER,Z),A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_2D,q,0),A.viewport(0,0,E,_),A.clear(A.COLOR_BUFFER_BIT);let $=1/E,V=1/_;return{texture:q,fbo:Z,width:E,height:_,texelSizeX:$,texelSizeY:V,attach(F){return A.activeTexture(A.TEXTURE0+F),A.bindTexture(A.TEXTURE_2D,q),F}}}function EE(E,_,N,I,J,Q){let q=D(E,_,N,I,J,Q),Z=D(E,_,N,I,J,Q);return{width:E,height:_,texelSizeX:q.texelSizeX,texelSizeY:q.texelSizeY,get read(){return q},set read($){q=$},get write(){return Z},set write($){Z=$},swap(){let $=q;q=Z,Z=$}}}function AA(E,_,N,I,J,Q,q){let Z=D(_,N,I,J,Q,q);return KE.bind(),A.uniform1i(KE.uniforms.uTexture,E.attach(0)),j(Z),Z}function zE(E,_,N,I,J,Q,q){if(E.width==_&&E.height==N)return E;return E.read=AA(E.read,_,N,I,J,Q,q),E.write=D(_,N,I,J,Q,q),E.width=_,E.height=N,E.texelSizeX=1/_,E.texelSizeY=1/N,E}function NA(E){let _=A.createTexture();A.bindTexture(A.TEXTURE_2D,_),A.texParameteri(A.TEXTURE_2D,A.TEXTURE_MIN_FILTER,A.LINEAR),A.texParameteri(A.TEXTURE_2D,A.TEXTURE_MAG_FILTER,A.LINEAR),A.texParameteri(A.TEXTURE_2D,A.TEXTURE_WRAP_S,A.REPEAT),A.texParameteri(A.TEXTURE_2D,A.TEXTURE_WRAP_T,A.REPEAT),A.texImage2D(A.TEXTURE_2D,0,A.RGB,1,1,0,A.RGB,A.UNSIGNED_BYTE,new Uint8Array([255,255,255]));let N={texture:_,width:1,height:1,attach(J){return A.activeTexture(A.TEXTURE0+J),A.bindTexture(A.TEXTURE_2D,_),J}},I=new Image;return I.onload=()=>{N.width=I.width,N.height=I.height,A.bindTexture(A.TEXTURE_2D,_),A.texImage2D(A.TEXTURE_2D,0,A.RGB,A.RGB,A.UNSIGNED_BYTE,I)},I.src=E,N}function _A(){let E=[];if(W.SHADING)E.push("SHADING");if(W.BLOOM)E.push("BLOOM");if(W.SUNRAYS)E.push("SUNRAYS");R.setKeywords(E)}if(_A(),YE(),W.INITIAL)XE(parseInt(Math.random()*W.SPLAT_AMOUNT*4+W.SPLAT_AMOUNT));let HE=Date.now(),c=0;ME();function ME(){const E=IA();if(LE())YE();if(JA(E),QA(),IE)CE(),IE=!1;if(!x)qA(E);OE(null),requestAnimationFrame(ME)}function IA(){let E=Date.now(),_=(E-HE)/1000;return _=Math.min(_,0.016666),HE=E,_}function LE(){let E=G(K.clientWidth),_=G(K.clientHeight);if(K.width!=E||K.height!=_)return K.width=E,K.height=_,!0;return!1}function JA(E){if(!W.COLORFUL)return;if(c+=E*W.COLOR_UPDATE_SPEED,c>=1)c=XA(c,0,1),O.forEach((_)=>{_.color=p()})}function QA(){if(n.length>0)XE(n.pop());if(NE.length>0){const E=NE.pop(),_=E[0]/K.clientWidth;console.log(_);const N=1-E[1]/K.clientHeight,I=E[2]/2,J=E[3]/2;let Q;if(E[4]!=null){const q=TE(E[4]),Z=kE(q.h,q.s,W.BRIGHTNESS);Z.r*=0.15,Z.g*=0.15,Z.b*=0.15,Q=Z}else Q=p();Q.r*=10,Q.g*=10,Q.b*=10,AE(_,N,I,J,Q)}O.forEach((E)=>{if(E.moved)E.moved=!1,YA(E)})}function qA(E){A.disable(A.BLEND),e.bind(),A.uniform2f(e.uniforms.texelSize,U.texelSizeX,U.texelSizeY),A.uniform1i(e.uniforms.uVelocity,U.read.attach(0)),j(l),w.bind(),A.uniform2f(w.uniforms.texelSize,U.texelSizeX,U.texelSizeY),A.uniform1i(w.uniforms.uVelocity,U.read.attach(0)),A.uniform1i(w.uniforms.uCurl,l.attach(1)),A.uniform1f(w.uniforms.curl,W.CURL),A.uniform1f(w.uniforms.dt,E),j(U.write),U.swap(),r.bind(),A.uniform2f(r.uniforms.texelSize,U.texelSizeX,U.texelSizeY),A.uniform1i(r.uniforms.uVelocity,U.read.attach(0)),j(g),t.bind(),A.uniform1i(t.uniforms.uTexture,k.read.attach(0)),A.uniform1f(t.uniforms.value,W.PRESSURE),j(k.write),k.swap(),d.bind(),A.uniform2f(d.uniforms.texelSize,U.texelSizeX,U.texelSizeY),A.uniform1i(d.uniforms.uDivergence,g.attach(0));for(let N=0;N<W.PRESSURE_ITERATIONS;N++)A.uniform1i(d.uniforms.uPressure,k.read.attach(1)),j(k.write),k.swap();if(m.bind(),A.uniform2f(m.uniforms.texelSize,U.texelSizeX,U.texelSizeY),A.uniform1i(m.uniforms.uPressure,k.read.attach(0)),A.uniform1i(m.uniforms.uVelocity,U.read.attach(1)),j(U.write),U.swap(),X.bind(),A.uniform2f(X.uniforms.texelSize,U.texelSizeX,U.texelSizeY),!z.supportLinearFiltering)A.uniform2f(X.uniforms.dyeTexelSize,U.texelSizeX,U.texelSizeY);let _=U.read.attach(0);if(A.uniform1i(X.uniforms.uVelocity,_),A.uniform1i(X.uniforms.uSource,_),A.uniform1f(X.uniforms.dt,E),A.uniform1f(X.uniforms.dissipation,W.VELOCITY_DISSIPATION),j(U.write),U.swap(),!z.supportLinearFiltering)A.uniform2f(X.uniforms.dyeTexelSize,L.texelSizeX,L.texelSizeY);A.uniform1i(X.uniforms.uVelocity,U.read.attach(0)),A.uniform1i(X.uniforms.uSource,L.read.attach(1)),A.uniform1f(X.uniforms.dissipation,W.DENSITY_DISSIPATION),j(L.write),L.swap()}function OE(E){if(W.BLOOM)UA(L.read,o);if(W.SUNRAYS)$A(L.read,L.write,u),jA(u,WE,1);if(E==null||!W.TRANSPARENT)A.blendFunc(A.ONE,A.ONE_MINUS_SRC_ALPHA),A.enable(A.BLEND);else A.disable(A.BLEND);if(!W.TRANSPARENT)WA(E,OA(LA(W.BACK_COLOR)));if(E==null&&W.TRANSPARENT)ZA(E);KA(E)}function WA(E,_){UE.bind(),A.uniform4f(UE.uniforms.color,_.r,_.g,_.b,1),j(E)}function ZA(E){$E.bind(),A.uniform1f($E.uniforms.aspectRatio,K.width/K.height),j(E)}function KA(E){let _=E==null?A.drawingBufferWidth:E.width,N=E==null?A.drawingBufferHeight:E.height;if(R.bind(),W.SHADING)A.uniform2f(R.uniforms.texelSize,1/_,1/N);if(A.uniform1i(R.uniforms.uTexture,L.read.attach(0)),W.BLOOM){A.uniform1i(R.uniforms.uBloom,o.attach(1)),A.uniform1i(R.uniforms.uDithering,ZE.attach(2));let I=DA(ZE,_,N);A.uniform2f(R.uniforms.ditherScale,I.x,I.y)}if(W.SUNRAYS)A.uniform1i(R.uniforms.uSunrays,u.attach(3));j(E)}function UA(E,_){if(C.length<2)return;let N=_;A.disable(A.BLEND),v.bind();let I=W.BLOOM_THRESHOLD*W.BLOOM_SOFT_KNEE+0.0001,J=W.BLOOM_THRESHOLD-I,Q=I*2,q=0.25/I;A.uniform3f(v.uniforms.curve,J,Q,q),A.uniform1f(v.uniforms.threshold,W.BLOOM_THRESHOLD),A.uniform1i(v.uniforms.uTexture,E.attach(0)),j(N),P.bind();for(let Z=0;Z<C.length;Z++){let $=C[Z];A.uniform2f(P.uniforms.texelSize,N.texelSizeX,N.texelSizeY),A.uniform1i(P.uniforms.uTexture,N.attach(0)),j($),N=$}A.blendFunc(A.ONE,A.ONE),A.enable(A.BLEND);for(let Z=C.length-2;Z>=0;Z--){let $=C[Z];A.uniform2f(P.uniforms.texelSize,N.texelSizeX,N.texelSizeY),A.uniform1i(P.uniforms.uTexture,N.attach(0)),A.viewport(0,0,$.width,$.height),j($),N=$}A.disable(A.BLEND),h.bind(),A.uniform2f(h.uniforms.texelSize,N.texelSizeX,N.texelSizeY),A.uniform1i(h.uniforms.uTexture,N.attach(0)),A.uniform1f(h.uniforms.intensity,W.BLOOM_INTENSITY),j(_)}function $A(E,_,N){A.disable(A.BLEND),jE.bind(),A.uniform1i(jE.uniforms.uTexture,E.attach(0)),j(_),a.bind(),A.uniform1f(a.uniforms.weight,W.SUNRAYS_WEIGHT),A.uniform1i(a.uniforms.uTexture,_.attach(0)),j(N)}function jA(E,_,N){b.bind();for(let I=0;I<N;I++)A.uniform2f(b.uniforms.texelSize,E.texelSizeX,0),A.uniform1i(b.uniforms.uTexture,E.attach(0)),j(_),A.uniform2f(b.uniforms.texelSize,0,E.texelSizeY),A.uniform1i(b.uniforms.uTexture,_.attach(0)),j(E)}function YA(E){if(x&&!_E)return;let _=E.deltaX*W.SPLAT_FORCE,N=E.deltaY*W.SPLAT_FORCE;AE(E.texcoordX,E.texcoordY,_,N,E.color)}function XE(E){for(let _=0;_<E;_++){const N=p();N.r*=10,N.g*=10,N.b*=10;const I=Math.random(),J=Math.random(),Q=1000*(Math.random()-0.5),q=1000*(Math.random()-0.5);AE(I,J,Q,q,N)}}function AE(E,_,N,I,J){B.bind(),A.uniform1i(B.uniforms.uTarget,U.read.attach(0)),A.uniform1f(B.uniforms.aspectRatio,K.width/K.height),A.uniform2f(B.uniforms.point,E,_),A.uniform3f(B.uniforms.color,N,I,0),A.uniform1f(B.uniforms.radius,zA(W.SPLAT_RADIUS/100)),j(U.write),U.swap(),A.uniform1i(B.uniforms.uTarget,L.read.attach(0)),A.uniform3f(B.uniforms.color,J.r,J.g,J.b),j(L.write),L.swap()}function zA(E){let _=K.width/K.height;if(_>1)E*=_;return E}K.addEventListener("mousedown",(E)=>{let _=G(E.offsetX),N=G(E.offsetY),I=O.find((J)=>J.id==-1);if(I==null)I=new S;DE(I,-1,_,N)}),setTimeout(()=>{K.addEventListener("mousemove",(E)=>{let _=O[0],N=G(E.offsetX),I=G(E.offsetY);GE(_,N,I)})},500),window.addEventListener("mouseup",()=>{VE(O[0])}),K.addEventListener("touchstart",(E)=>{const _=E.targetTouches;while(_.length>=O.length)O.push(new S);for(let N=0;N<_.length;N++){let I=G(_[N].pageX),J=G(_[N].pageY);DE(O[N+1],_[N].identifier,I,J)}},{passive:!1,capture:!0}),K.addEventListener("touchmove",(E)=>{const _=E.targetTouches;for(let N=0;N<_.length;N++){let I=O[N+1],J=G(_[N].pageX),Q=G(_[N].pageY);GE(I,J,Q)}},{passive:!1,capture:!0}),window.addEventListener("touchend",(E)=>{const _=E.changedTouches;for(let N=0;N<_.length;N++){let I=O.find((J)=>J.id==_[N].identifier);if(I==null)continue;VE(I)}}),window.addEventListener("keydown",(E)=>{if(E.code===W.SPLAT_KEY)n.push(parseInt(Math.random()*W.SPLAT_AMOUNT*4+W.SPLAT_AMOUNT))});function DE(E,_,N,I){E.id=_,E.down=!0,E.moved=!1,E.texcoordX=N/K.width,E.texcoordY=1-I/K.height,E.prevTexcoordX=E.texcoordX,E.prevTexcoordY=E.texcoordY,E.deltaX=0,E.deltaY=0,E.color=p()}function GE(E,_,N){if(E.prevTexcoordX=E.texcoordX,E.prevTexcoordY=E.texcoordY,E.texcoordX=_/K.width,E.texcoordY=1-N/K.height,E.deltaX=HA(E.texcoordX-E.prevTexcoordX),E.deltaY=MA(E.texcoordY-E.prevTexcoordY),W.HOVER)E.moved=Math.abs(E.deltaX)>0||Math.abs(E.deltaY)>0;else E.moved=E.down}function VE(E){E.down=!1}function HA(E){let _=K.width/K.height;if(_<1)E*=_;return E}function MA(E){let _=K.width/K.height;if(_>1)E/=_;return E}function p(){let E,_;if(W.COLOR_PALETTE.length==0)E=Math.random(),_=1;else{const I=Math.floor(Math.random()*W.COLOR_PALETTE.length),J=W.COLOR_PALETTE[I],Q=TE(J);E=Q.h,_=Q.s}let N=kE(E,_,W.BRIGHTNESS);return N.r*=0.15,N.g*=0.15,N.b*=0.15,N}function TE(E){E=E.replace("#","");const _=parseInt(E.substring(0,2),16)/255,N=parseInt(E.substring(2,4),16)/255,I=parseInt(E.substring(4,6),16)/255,J=Math.max(_,N,I),Q=Math.min(_,N,I);let q,Z,$;if(J===Q)q=0;else if(J===_)q=((N-I)/(J-Q)+6)%6;else if(J===N)q=(I-_)/(J-Q)+2;else q=(_-N)/(J-Q)+4;if(q/=6,J===0)Z=0;else Z=(J-Q)/J;return $=J,{h:q,s:Z,v:$}}function LA(E){E=E.replace("#","");const _=parseInt(E.substr(0,2),16),N=parseInt(E.substr(2,2),16),I=parseInt(E.substr(4,2),16);return{r:_,g:N,b:I}}function kE(E,_,N){let I,J,Q,q,Z,$,V,F;switch(q=Math.floor(E*6),Z=E*6-q,$=N*(1-_),V=N*(1-Z*_),F=N*(1-(1-Z)*_),q%6){case 0:I=N,J=F,Q=$;break;case 1:I=V,J=N,Q=$;break;case 2:I=$,J=N,Q=F;break;case 3:I=$,J=V,Q=N;break;case 4:I=F,J=$,Q=N;break;case 5:I=N,J=$,Q=V;break}return{r:I,g:J,b:Q}}function OA(E){return{r:E.r/255,g:E.g/255,b:E.b/255}}function XA(E,_,N){let I=N-_;if(I==0)return _;return(E-_)%I+_}function f(E){let _=A.drawingBufferWidth/A.drawingBufferHeight;if(_<1)_=1/_;let N=Math.round(E),I=Math.round(E*_);if(A.drawingBufferWidth>A.drawingBufferHeight)return{width:I,height:N};else return{width:N,height:I}}function DA(E,_,N){return{x:_/E.width,y:N/E.height}}function G(E){let _=window.devicePixelRatio||1;return Math.floor(E*_)}function GA(E){if(E.length==0)return 0;let _=0;for(let N=0;N<E.length;N++)_=(_<<5)-_+E.charCodeAt(N),_|=0;return _}}},kA=VA;export{kA as default};
