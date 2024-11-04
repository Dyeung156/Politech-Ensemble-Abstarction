import os
import requests
import base64
from dotenv import load_dotenv

from urllib.parse import quote

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
#returns: dict() - JSON file of the file content 
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

#Description: extract the values of a JSON file
#parameters: content (dict()) - JSON file content being extracted
#returns: dict() - extracted content 
def extract_values(content):
    values = []
    for line in content.splitlines():
        values.append(line)
    return values

# Main execution
if __name__ == "__main__":
    # List all files in the specified folder
    file_paths = list_files_in_folder(PROJECT_ID, FOLDER_PATH, BRANCH)

    all_values = []
    # Fetch content for each file and extract values
    for file_path in file_paths:
        content = get_file_content(PROJECT_ID, file_path, BRANCH)
        if content:
            values = extract_values(content)
            all_values.extend(values)

    print("Extracted Values from All Files:", all_values)
    