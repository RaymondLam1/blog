---
title: Vscode markdown 文件图片保存位置设置
category:
  - 软件
tag:
  - vscode
---

Vscode markdown 文件图片保存位置设置

<!-- more -->

# Vscode markdown 文件图片保存位置设置

::: info
1. 在VS Code中，按下Ctrl + ,，打开设置界面。
2. 在搜索框中输入markdown.copy, 找到Markdown> Copy Files:Destination
3. 新增配置项 key 为 "**/*.md" , value 为 你的目标路径。比如我想将图片放在 assets 目录下 markdown文件同名的目录下，那么我就可以设置为 assets/${documentBaseName}/${fileName}， 其中 ${documentBaseName} 代表markdown文件的文件名，${fileName} 代表图片的文件名。
:::
