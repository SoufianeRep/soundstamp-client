
/**
 * Capitalize first letter of a string
 * @param string str
 * @returns string
 */
export function capitalize(str: string): string {
  return str.replace(str[0], str[0].toUpperCase())
}
