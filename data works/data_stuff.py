import util 
import pandas as pd
import json

PARTIES = ["(2020, <Office.PRES: 'Presidential'>, <Party.DEM: 'Democratic'>)", "(2020, <Office.PRES: 'Presidential'>, <Party.REP: 'Republican'>)"]
DEMOCRATIC = 0
REPUBLICIAN = 1

ethnic_groups = ["RacialDemographic.HISPA","RacialDemographic.BLACK", "RacialDemographic.ASIAN"]
HISPANIC = 0
BLACK = 1
ASIAN = 2

#Description: returns a tuple that describes the average percent of each ethnic group in the map. The tuple format is:
#             (hispanic, black , asian)
#Parameters: df (Object) - dataframe containing the ensemble
#            num_districts (int) - the number of districts in a map
#            row (int) - the first row in df for the map 
#returns: a tuple with the average percents of each group
def ethnic_group_averages(df , num_districts : int, row : int):
    avg_percents = [0, 0 ,0]
    
    #look at the districts in the map
    for index in range(num_districts):
        length = len(ethnic_groups)
        total_population = df.iloc[row + index]["RacialDemographic.TOTAL"]
        
        #get the percent for each group in the map
        for group_index in range(0, length):
            group_population = df.iloc[row + index][ethnic_groups[group_index]] 
            ethnic_group_percent = group_population/total_population
            
            avg_percents[group_index] += ethnic_group_percent
    
    #average the percents for each group
    for i in range(len(avg_percents)):
        avg_percents[i] = avg_percents[i]/num_districts
        
    return tuple(avg_percents)

def party_district_counts(df , num_districts : int, row : int):
    democrat_counts = 0
    republician_counts = 0
    
    #look at the districts in the map
    for index in range(num_districts):
        dem_voters = df.iloc[row + index][PARTIES[DEMOCRATIC]] 
        rep_voters = df.iloc[row + index][PARTIES[REPUBLICIAN]]
        
        if dem_voters > rep_voters:
            democrat_counts += 1
        else:
            republician_counts += 1
        
    return democrat_counts, republician_counts

def create_data(file_path):
    df = pd.read_csv(file_path) 

    row = 0
    cur_map = 0 
    num_districts = util.get_num_districts(file_path)
    
    map_data = []
    
    #go thru each row in the dataframe
    while row < len(df):    
        hispanic_percent, black_percent, asian_percent = ethnic_group_averages(df, num_districts, row)
        democrat_maps, republician_maps = party_district_counts(df, num_districts, row)
        data_entry = [cur_map, hispanic_percent, black_percent, asian_percent, democrat_maps, republician_maps]
        map_data.append(data_entry)
        
        #move row to the next map
        row += num_districts
        cur_map += 1
        
    map_df = pd.DataFrame(map_data, columns=["map_id", "hispanic_percent", "black_percent", "asian_percent", "democrat_count", "republican_count"])
    map_df.to_csv("data works/map_data.csv", index = False)
    
if __name__ == "__main__":
    file_path = "data works/output.csv"
    create_data(file_path)
