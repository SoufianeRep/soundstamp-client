
/**
 * Capitalize first letter of a string
 * @param string str
 * @returns string
 */
export function capitalize(str: string): string {
  return str.replace(str[0], str[0].toUpperCase())
}

export function generatePassword(length: number): string {
  const stock = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let password = ""
  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * stock.length)
    password += stock.substring(random, random + 1)
  }
  return password
}
