export const isPreviewMode = (): boolean => {
  return process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true'
}

export const featureFlags = {
  cinematicIntro: isPreviewMode(),
  scroll3D: isPreviewMode(),
  enhancedAnimations: isPreviewMode(),
} as const
