#ifndef _SHADER_GUARD
#define _SHADER_GUARD

typedef struct Shader {

    unsigned int id;
    int nbUniform;
    char** uniformName;
    int* uniformLoc;
    int nbAttrib;
    char** attribName;
    int* attribLoc;
    unsigned int lastWrite;
    char vertexFile[128];
    char fragmentFile[128];

} Shader;

Shader Shader_Create(const char* vertexFile, const char* fragmentFile);
void Shader_SendUniform(Shader* shader, const char* name, int type, void* data);
void Shader_SendUniformArray(Shader* shader, const char* name, int type, int nb, void* data);
void Shader_Refresh(Shader* shader);

#endif // SHADER

