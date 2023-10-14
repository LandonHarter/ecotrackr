import requests

# Define the API endpoint URL
url = 'https://api.regulations.gov/v4/documents'

# Define the query parameters based on your requirements
params = {
    'filter[searchTerm]': 'water',
    'filter[documentType]': 'Rule',
    'api_key': '25CKqi9ue8honKVgpVnOLchv2qysgxtgXqyFirdw'
}

# Make the GET request
response = requests.get(url, params=params)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    data = response.json()
    # Process the JSON response data as needed
    print(data)
else:
    # Handle any errors here
    print(f"Request failed with status code {response.status_code}")