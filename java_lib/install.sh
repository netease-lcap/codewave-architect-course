#!/bin/bash

# 检查jar文件夹是否存在
if [ -d "jar" ]; then
    # 获取jar文件夹下的一层子文件夹列表
    subfolders=$(find jar -mindepth 1 -maxdepth 1 -type d)
    for folder in $subfolders; do
        install_script="$folder/install.sh"
        if [ -f "$install_script" ]; then
            echo "Adding execute permission to $install_script..."
            chmod +x $install_script
            echo "Executing $install_script in $folder..."
            (cd "$folder" &&./install.sh)
        else
            echo "install.sh not found in $folder"
        fi
    done
else
    echo "The 'jar' folder does not exist."
fi