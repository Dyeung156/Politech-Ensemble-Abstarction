import pandas as pd

#Description: returns the number of districts in a map 
#parameters: file_path (str) - path to the csv file 
#returns: int - the number of districts in a map
def get_num_districts(file_path) -> int:
    df = pd.read_csv(file_path) 
    
    length = len(df)
    #go thru the dataframe until the district number resets (starts at 1)
    for row_index in range(1, length):
        if df.iloc[row_index]["District"] == 1:
            #the dataframe is 0-indexed so the current row index would suffice
            return row_index
        
#Description: recursively converts a nested dict's keys to int
#parameters: indices_dict (dict) - nested dict where the keys are str
#            levels (int) - current level in the nested dict (start at the highest level)
#no output 
def convert_json_keys(indices_dict, levels : int):
    if levels == 0:
        return
    
    # Modify the current level's keys in place (without reassignment)
    for key in list(indices_dict.keys()):  
        value = indices_dict.pop(key)       
        indices_dict[float(key)] = value     

    #go thru each level in the nested dict
    for key in list(indices_dict.keys()):
        # If the value is a dictionary, recurse into it
        if isinstance(indices_dict[key], dict):
            convert_json_keys(indices_dict[key], levels - 1)