import os
import requests
import base64
from dotenv import load_dotenv

from urllib.parse import quote

import csv

# Load environment variables from the .env file
load_dotenv()

# GitLab API and repo details
GITLAB_API_URL = "https://gitlab.com/api/v4"
PROJECT_ID = os.getenv("PROJECT_ID")
FOLDER_PATH = os.getenv("FOLDER_PATH")
BRANCH = "main"  
#personal access token
GITLAB_TOKEN = os.getenv("GITLAB_TOKEN")

#Description: get all file paths in a folder
#parameters: projec_id (int) - the Gitlab project id storing the folder
#            folder_path (String) - the folder path from the url
#            branch (String) - which branch of the project 
#returns: List(String) - list containing the file paths in a folder
def list_files_in_folder(project_id, folder_path, branch):
    url = f"{GITLAB_API_URL}/projects/{project_id}/repository/tree"
    headers = {"PRIVATE-TOKEN": GITLAB_TOKEN}
    params = {"path": folder_path, "ref": branch, "per_page": 100}

    file_paths = []
    while True:
        #send GET request to Gitlab
        response = requests.get(url, headers=headers, params=params)
        
        #success
        if response.status_code == 200:
            files = response.json()
            #get all paths for "blob" (file) types in the folder and add them
            file_paths.extend([file["path"] for file in files if file["type"] == "blob"])
            # Check for more pages and update the url
            if "next" in response.links:
                url = response.links["next"]["url"]
            else:
                break
        else:
            print(f"Error listing folder contents: {response.status_code}")
            break
    return file_paths

#Description: get the contents of a file 
#parameters: project_id (int) - Gitlab project id
#            file_path (String) - file path from the url 
#            branch (String) - which branch of the project 
#returns: dict() - python dict containing the JSON content  
def get_file_content(project_id, file_path, branch):
    url = f"{GITLAB_API_URL}/projects/{project_id}/repository/files/{quote(file_path, safe = "_")}"
    headers = {"PRIVATE-TOKEN": GITLAB_TOKEN}
    params = {"ref": branch}

    #send a request for the file
    response = requests.get(url, headers=headers, params=params)
    #success
    if response.status_code == 200:
        file_info = response.json()
        #translate file content from base 64 to utf-8
        content = base64.b64decode(file_info["content"]).decode("utf-8")
        return content
    else:
        print(f"Error fetching file {file_path}: {response.status_code}")
        return None

#Description: extract the values of a JSON file with an ensemble map 
#             and save to a csv file
#parameters: content (dict()) - JSON file content being extracted
#            map_index (int) - which map is being extracted  
#returns: None
def extract_values(content, map_index): 
    csv_reader = csv.DictReader(content.splitlines())
    
    # Get fieldnames
    fieldnames = csv_reader.fieldnames
    #change '' to District
    fieldnames[0] = "District"
    #add Map column
    fieldnames = ["Map"] + fieldnames
    
    # Open a new CSV file to write to
    with open('data works/output.csv', mode='a', newline='') as outfile:
        csv_writer = csv.DictWriter(outfile, fieldnames=fieldnames)

        # Write the header (field names)
        if map_index == 0:
            csv_writer.writeheader()

        # Write each row as a dictionary
        for row in csv_reader:
            row["Map"] = map_index
            csv_writer.writerow(row)

# Main execution
if __name__ == "__main__":
    # List all files in the specified folder
    file_paths = list_files_in_folder(PROJECT_ID, FOLDER_PATH, BRANCH)

    #file that will contain the CSV values
    csv_path = "data works/output.csv"
    
    # Delete the file if it exists (to get updated values)
    if os.path.exists(csv_path):
        os.remove(csv_path)
    
    # Fetch content for each file and extract values
    length = len(file_paths)
    for index in range(0,length):
        content = get_file_content(PROJECT_ID, file_paths[index], BRANCH)
        if content:
            values = extract_values(content, index)
        
    # Open the CSV file in read mode
    with open(csv_path, mode='r') as file:
        csv_reader = csv.DictReader(file)
    
        row_count = sum(1 for row in csv_reader)
        
    print(f"There are {row_count} rows.")
    
