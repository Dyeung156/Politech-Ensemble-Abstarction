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

def list_files_in_folder(project_id, folder_path, branch):
    """List all files in the specified GitLab repository folder."""
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

print(list_files_in_folder(PROJECT_ID, FOLDER_PATH, BRANCH))


# curl --header "PRIVATE-TOKEN: glpat--XzVwnXLk92DGrmvprNQ" "https://gitlab.com/api/v4/projects/40896581/repository/tree?path=Seawulf_Output/GA/csv?ref_type=heads&ref=main"

# curl --header "PRIVATE-TOKEN: glpat--XzVwnXLk92DGrmvprNQ" "https://gitlab.com/api/v4/projects/40896581/repository/tree?path=Seawulf_Output/GA/csv&ref=main"
