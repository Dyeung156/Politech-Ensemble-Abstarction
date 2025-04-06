export default interface point{
    x: number,
    y: number
  }

export function pointArrToStr(arr: point[])
{
  let result = ""
  for (const pointValues of arr)
    result += `${pointValues.x},${pointValues.y} `

  return result
}