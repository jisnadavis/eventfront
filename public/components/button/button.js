export const createbutton = (text, elementpadre) => {
  const button = document.createElement('button')
  button.textContent = text
  button.className = text
  elementpadre.append(button)
  return button
}
