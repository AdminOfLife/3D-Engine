#ifndef _SPHERE_GUARD
#define _SPHERE_GUARD

#include "collision.h"

typedef struct Sphere {

    CollisionSphere collisionData;
    Instance instance;

} Sphere;

typedef struct SphereGroupe {

    CollisionObject* collisionData;
    int nbSpheres;
    int nbMax;
    Model* model;
    GLuint program;
    GLuint texture;

} SphereGroupe;

SphereGroupe SphereGroupe_Create(int nbMax, Model* model, GLuint program, GLuint texture);
void SphereGroupe_Draw(SphereGroupe sphereGroupe, float* mondeToCam, float* camToClip);
void Sphere_Add(SphereGroupe* sphereGroupe, Vec3 position, Vec3 direction);

void Sphere_Draw(Sphere sphere, float* mondeToCam, float* camToClip);
Sphere* initGroupeSphere(Instance instance, int nombre);

#endif // SPHERE

