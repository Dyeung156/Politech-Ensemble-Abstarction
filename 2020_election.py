import pandas as pd
import json
import util

PARTIES = ["(2020, <Office.PRES: 'Presidential'>, <Party.DEM: 'Democratic'>)", "(2020, <Office.PRES: 'Presidential'>, <Party.REP: 'Republican'>)"]
DEMOCRATIC = 0
REPUBLICIAN = 1
NATIONAL_MARGIN = 8.4 #in DEM favor

#source for national margin
#https://projects.fivethirtyeight.com/polls/president-general/2020/national/

#map tuple to describe the map 
def create_map_tuple(df , num_districts : int, row : int):
    district_counts = [0, 0, 0]
    
    #look at the districts in the map
    for index in range(num_districts):
        dem_voters = df.iloc[row + index][PARTIES[DEMOCRATIC]] 
        rep_voters = df.iloc[row + index][PARTIES[REPUBLICIAN]]
        
        #get the district margin first 
        PVI = abs(dem_voters - rep_voters) / (dem_voters + rep_voters)
        
        #account for national margin
        PVI -= NATIONAL_MARGIN
        
        if PVI < 10:
            district_counts[-1] += 1
        elif dem_voters > rep_voters:
            district_counts[DEMOCRATIC] += 1
        else:
            district_counts[REPUBLICIAN] += 1
            
    return tuple(district_counts)

def political_party_maps(file_path):
    df = pd.read_csv(file_path) 
    maps_info = list()

    row = 0
    cur_map = 0 
    num_districts = util.get_num_districts(file_path)
    
    #go thru each row in the dataframe
    while row < len(df): 
        #create the map tuple for each map and add it to the list
        maps_info.append( (cur_map, create_map_tuple(df, num_districts, row)) )
        
        #move row to the next map
        row += num_districts
        cur_map += 1
        
    return maps_info
