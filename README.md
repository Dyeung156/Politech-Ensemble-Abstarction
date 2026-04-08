##Cluster Visulization Techniques
The front end portion that illustrates the data using 

##Data Works 
The Python scripts that fetch the data from Gitlab and analyze it.

#Gitlab Script (Preprocessing) 
- The Python script that uses the Gitlab API to get data from the Politech research group.
- Relies on a Gitlab token in the .env file that will need to be refreshed every so often
- Outputs the data garthered into a CSV file 

#Data Stuff (Data Analysis) 
- The Python script that takes the CSV file from the Gitlab script and organizes the districts into clusters based on anchor points
- Uses functions from the other sub scripts to get information on anchor points (Opportunity districts, Median Margin of Victory, and Number of Democratic Districts)
- Outputs all the data garthered into JSON files (one per anchor point) 

#Cluster Summaries 
- Python script that reviews the clusters made and outputs the ranges for each of them
- Produces 2 new JSON files for the summaries 
