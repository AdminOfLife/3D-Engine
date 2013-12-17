#version 330 core

in vec3 fPosition_view;
in vec3 fNormal_view;
in vec2 texCoord;
in mat4 fWorldToView;

in vec3 fPosition;

layout(binding = 0) uniform sampler2D tex_color;
layout(binding = 2) uniform sampler2D shadowMap;

uniform vec3 lightPos[10];
uniform vec3 lightColor[10];
uniform vec3 matDiff;
uniform vec3 matSpec;
uniform int matShininess;

vec3 normal_view;

out vec3 outputColor;

struct Light {

    vec3 pos;
    vec3 vector; // Vecteur du fragment évalué à la source de lumière
    vec3 color;
    float intensity;
};

float calcAttenuation(vec3 lightVec);
vec3 computeDiffuse(Light light);
vec3 computeSpecular(Light light);
Light computePointLight(vec3 lightPos, vec3 color);
Light computeDirectionalLight(vec3 vector, vec3 color);

vec3 sunPos = vec3(0, 0, 500000);
vec3 sunColor = vec3(1, .8, .7);

void main() {

    vec3 diffColor = vec3(0);
    vec3 specColor = vec3(0);
    normal_view = normalize(fNormal_view);

    for (int i = 0; i < 10 ; i++)
    {
        Light light = computePointLight(lightPos[i], lightColor[i]);

        diffColor += computeDiffuse(light);
        specColor += computeSpecular(light);
    }
    Light sun = computeDirectionalLight(sunPos, sunColor);

    diffColor += computeDiffuse(sun);
    specColor += computeSpecular(sun);

    outputColor = (texture(tex_color, texCoord).rgb * diffColor * matDiff) + (specColor * matSpec);
//    outputColor = (texture(shadowMap, texCoord).rgb*2-1);
//    outputColor = normal_view;
//    outputColor = lightPos[6];
//    outputColor = fPosition_view;
//    outputColor = vec3((1-fPosition_view.z)/1000.);
//    outputColor = vec3(gl_FragCoord.z);

}

#define ATTEN_CONST 1
#define ATTEN_LINEAR 0.01
#define ATTEN_QUADRA 0.0001

float calcAttenuation(vec3 lightVec) {

    float distance = length(lightVec);

    return 1. / (ATTEN_CONST +
                (ATTEN_LINEAR * distance) +
                (ATTEN_QUADRA * distance * distance) );

}

Light computeDirectionalLight(vec3 vector, vec3 color) {

    vector = vec3(fWorldToView * vec4(vector, 0));

    Light direcLight;
    direcLight.pos = vector; // En théorie à l'infini, donc a vérifier cette ligne
    direcLight.vector = normalize(vector); // Lampe à l'infini
    direcLight.color = color;
    direcLight.intensity = 1;
    return direcLight;
}

Light computePointLight(vec3 lightPos, vec3 color) {

    lightPos = vec3(fWorldToView * vec4(lightPos, 1));

    Light pointLight;
    pointLight.pos = lightPos;
    pointLight.color = color;
    pointLight.vector = normalize(lightPos - fPosition_view);
    pointLight.intensity = calcAttenuation(lightPos - fPosition_view);
    return pointLight;
}

vec3 computeDiffuse(Light light) {

    return light.color * (light.intensity * max(dot(light.vector, normal_view), 0.));
}

vec3 computeSpecular(Light light) {

//    vec3 viewVector = normalize(-camPosition.xyz);
//    vec3 reflectedLight = 2.0 * dot(light.vector, normal) * normal - light.vector;

//    vec4 camPosition = normalize(fWorldToView * vec4(position, 1));
//    vec4 reflectedLight = reflect(-normalize(fWorldToView * vec4(light.pos, 1) - camPosition), normalize(vec4(transpose(inverse(mat3(fWorldToView))) * normal, 0)));
    vec3 reflectedLight = reflect(-normalize(light.pos - fPosition_view), normal_view);
    if (dot(normal_view, light.vector) <= 0.0)
        return vec3(0);
    else
        return light.intensity * light.color * pow( max( dot(normalize(reflectedLight), normalize(-fPosition_view)), 0.), clamp(matShininess, 100., 10000));

}
