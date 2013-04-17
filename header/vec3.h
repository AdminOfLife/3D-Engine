#ifndef _VEC3_GUARD
#define _VEC3_GUARD

typedef struct Vec3 {

    float x;
    float y;
    float z;

} Vec3;

void Vec3_Mul_Scal(Vec3* vec, float scal);
Vec3 Vec3_Mul_Scal_out(Vec3 vec, float scal);
void Vec3_Mul(Vec3 *p, Vec3 a);
void Vec3_Add(Vec3* a, Vec3 b);
void Vec3_Normalise(Vec3* vec);
void setVec3(Vec3* vec, float x, float y, float z);
void afficheVec3(Vec3 a);

#endif // VEC3

