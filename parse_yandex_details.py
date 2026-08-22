import json

def parse():
    with open('store-prefetch.json', 'r') as f:
        data = f.read()
        start = data.find('{')
        end = data.rfind('}') + 1
        json_str = data[start:end]
        d = json.loads(json_str)
        resources = d.get('resources', {})
        photos_folder_id = "7c5b7a503c98fcc12c64f938fe56e0485ed69fc3b66c4e8617c2619de920cc07"
        children_ids = resources.get(photos_folder_id, {}).get('children', [])
        
        for child_id in children_ids:
            child = resources.get(child_id)
            if child and child.get('type') == 'file':
                # Print everything in meta
                print(f"Name: {child.get('name')}")
                print(f"Meta: {json.dumps(child.get('meta', {}), indent=2)}")
                print("-" * 20)

if __name__ == "__main__":
    parse()
