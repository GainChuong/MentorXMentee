import os
import re

def main():
    public_dir = os.path.abspath("public")
    build_dir = os.path.abspath("build")
    
    # 1. Get list of all public assets relative to public/
    public_assets = []
    for root, dirs, files in os.walk(public_dir):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, public_dir)
            # Normalize to forward slashes for matching in JS/CSS/HTML
            rel_path_slashes = rel_path.replace(os.path.sep, '/')
            # Exclude files we don't want to replace references to
            if file in ["index.html", "robots.txt", "Cựu SV.code-workspace"]:
                continue
            public_assets.append(rel_path_slashes)
            
    print(f"Found {len(public_assets)} public assets to patch.")
    
    # Target prefix
    target_prefix = "/giangk244111398/mentor-app/"
    
    # 2. Walk through build/ and modify files
    modified_count = 0
    for root, dirs, files in os.walk(build_dir):
        for file in files:
            if not file.endswith(('.html', '.js', '.css')):
                continue
                
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                
            original_content = content
            
            # For each public asset, replace relative and base absolute paths
            for asset in public_assets:
                # We need to escape special regex characters in asset name
                escaped_asset = re.escape(asset)
                
                # Replace patterns:
                # - "./asset" or "/asset" inside quotes (single or double)
                # - "asset" if it is preceded by ./ or / in quotes
                
                # Double quotes patterns
                content = re.sub(r'"\./' + escaped_asset + r'"', f'"{target_prefix}{asset}"', content)
                content = re.sub(r'"/' + escaped_asset + r'"', f'"{target_prefix}{asset}"', content)
                
                # Single quotes patterns
                content = re.sub(r"'\./" + escaped_asset + r"'", f"'{target_prefix}{asset}'", content)
                content = re.sub(r"'/" + escaped_asset + r"'", f"'{target_prefix}{asset}'", content)
                
                # url() patterns in CSS
                content = re.sub(r'url\(\s*[\'"]?\./' + escaped_asset + r'[\'"]?\s*\)', f'url("{target_prefix}{asset}")', content)
                content = re.sub(r'url\(\s*[\'"]?/' + escaped_asset + r'[\'"]?\s*\)', f'url("{target_prefix}{asset}")', content)
                content = re.sub(r'url\(\s*[\'"]?' + escaped_asset + r'[\'"]?\s*\)', f'url("{target_prefix}{asset}")', content)

            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Patched assets in: {os.path.relpath(file_path, build_dir)}")
                modified_count += 1
                
    print(f"Successfully patched {modified_count} files in the build folder.")

if __name__ == "__main__":
    main()
