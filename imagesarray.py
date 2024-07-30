import os


def get_files_in_folder(folder_path):
    files = []

    # Iterate over all files and directories in the folder
    for file_name in os.listdir(folder_path):
        # Check if the path represents a file (not a directory)
        if os.path.isfile(os.path.join(folder_path, file_name)):
            files.append(file_name)

    return files


# Specify the folder path
folder_path = './Images'  # Replace with the actual folder path

# Get the array of file names
file_names = get_files_in_folder(folder_path)

# Print the file names
print(file_names)
