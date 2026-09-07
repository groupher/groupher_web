@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  if (uv.y < 0.5) {
    return vec4f(1.0, 0.0, 0.0, 1.0);
  }
  return vec4f(0.0, 0.0, 1.0, 1.0);
}
