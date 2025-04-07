export async function jsonToMap(filePath: string): Promise<Map<string, number[]>> {
    const response = await fetch(filePath);


    const jsonData = await response.json();
    const dataMap: Map<string, number[]> = new Map<string, number[]>();

    if (jsonData && typeof jsonData === 'object' && !Array.isArray(jsonData)) 
    {
        Object.entries(jsonData).forEach(([key, value]) => {
            // check that the value is an array of only numbers 
            if (Array.isArray(value) && value.every(item => typeof item === 'number'))
                dataMap.set(key, value);
            else 
                console.warn(`Skipping entry with key "${key}" because its value is not a number array`);
        });
    }

    return dataMap;

}