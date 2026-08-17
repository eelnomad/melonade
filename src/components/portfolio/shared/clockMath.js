// Math helpers for the clock-hand field.

// Interpolate between two angles the short way round, by blending unit vectors.
export function blendAngle(a, b, f) {
    const vx = Math.cos(a) * (1 - f) + Math.cos(b) * f
    const vy = Math.sin(a) * (1 - f) + Math.sin(b) * f
    return Math.atan2(vy, vx)
}

export function easeInOut(t) {
    t = Math.max(0, Math.min(1, t))
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}
