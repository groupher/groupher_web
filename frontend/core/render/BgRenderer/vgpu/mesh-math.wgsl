// Shared Flow/Liquid math for production runtime and the isolated POC.
export fn random2(value: vec2f) -> f32 {
  var mixed = fract(vec3f(value.x, value.y, value.x) * vec3f(0.1031, 0.1030, 0.0973));
  mixed += dot(mixed, mixed.yzx + vec3f(33.33));
  return fract((mixed.x + mixed.y) * mixed.z);
}

export fn valueNoise(value: vec2f, seed: f32) -> f32 {
  let cell = floor(value);
  let local = fract(value);
  let blend = local * local * (vec2f(3.0) - 2.0 * local);
  let offset = seed * 0.017;
  let a = random2(cell + offset);
  let b = random2(cell + vec2f(1.0, 0.0) + offset);
  let c = random2(cell + vec2f(0.0, 1.0) + offset);
  let d = random2(cell + vec2f(1.0, 1.0) + offset);

  return mix(mix(a, b, blend.x), mix(c, d, blend.x), blend.y);
}

export fn rotateUv(value: vec2f, angleDegrees: f32) -> vec2f {
  let angle = radians(angleDegrees);
  let cosine = cos(angle);
  let sine = sin(angle);
  return vec2f(value.x * cosine - value.y * sine, value.x * sine + value.y * cosine);
}

export fn liquidBlob(
  uv: vec2f,
  center: vec2f,
  radius: f32,
  wobble: f32,
  melt: f32,
  phase: f32,
) -> f32 {
  let delta = uv - center;
  let angle = atan2(delta.y, delta.x);
  let edge = 1.0 + wobble * (
    sin(angle * 2.0 + phase) * 0.08 +
    sin(angle * 3.0 - phase * 1.4) * 0.05
  );
  let safeRadius = max(radius * edge, 0.01);
  let innerRadius = safeRadius * mix(0.86, 0.34, melt);
  return 1.0 - smoothstep(innerRadius, safeRadius, length(delta));
}
