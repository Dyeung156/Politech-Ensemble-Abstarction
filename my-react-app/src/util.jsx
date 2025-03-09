// description: turns a string into an array [int]
// parameters: str_tuple (str) - the string to convert to an array
// returns: an array with only integers in it 
export function strToArr(str_tuple){
    return str_tuple
    .match(/\d+/g)
    .map(num => parseFloat(num));
}