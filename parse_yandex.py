import json
import re

def parse():
    with open('store-prefetch.json', 'r') as f:
        data = f.read()
        # Find the JSON part. The sed might have left some noise.
        start = data.find('{')
        end = data.rfind('}') + 1
        json_str = data[start:end]
        
        try:
            d = json.loads(json_str)
        except Exception as e:
            print(f"Error parsing JSON: {e}")
            return

        resources = d.get('resources', {})
        photos_folder_id = "7c5b7a503c98fcc12c64f938fe56e0485ed69fc3b66c4e8617c2619de920cc07"
        photos_folder = resources.get(photos_folder_id, {})
        children_ids = photos_folder.get('children', [])
        
        image_list = []
        for child_id in children_ids:
            child = resources.get(child_id)
            if child and child.get('type') == 'file':
                image_list.append({
                    'name': child.get('name'),
                    'size': child.get('meta', {}).get('size'),
                    'mimetype': child.get('meta', {}).get('mimetype'),
                    'preview': child.get('meta', {}).get('lPreview')
                })
        
        print(json.dumps(image_list, indent=2))

if __name__ == "__main__":
    parse()
