#!/bin/bash

# Set the path to your project directory
project_path="./src" # 修改为你项目的实际路径

# Initialize total size to 0
total_size=0

# Find all .ts files within 'styles' directories and calculate their sizes
while IFS= read -r file_path; do
    # This checks if the file path contains '/styles/' and ends with '.ts'
    if [[ $file_path == *"/styles/"* ]] && [[ $file_path == *".ts" ]]; then
        # Use `stat -f%z` on macOS to get the file size in bytes,
        # or `stat -c%s` on Linux
        size=$(stat -f%z "$file_path") # macOS版本: stat -f%z
        # size=$(stat -c%s "$file_path")  # Linux版本: stat -c%s
        # Convert file size from bytes to KB and add to total size
        total_size=$(echo "$total_size + $size/1024" | bc -l)
        # Output file size in KB with 2 decimal places
        size_kb=$(printf "%.2f" $(echo "$size/1024" | bc -l))
        echo "[Size: ${size_kb}KB] [File: $file_path]"
    fi
done < <(find "$project_path" -type f)

# Output the total size in KB rounded to 2 decimal places
total_size_kb=$(printf "%.2f" "$total_size")
echo "Total size of styled-components files: $total_size_kb KB"

