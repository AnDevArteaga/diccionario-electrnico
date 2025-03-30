export const getImageUrl = (image: string, formato: string) => {
  return `data:image/${formato};base64,${image}`
}