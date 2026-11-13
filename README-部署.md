# 眠伊 更新站（公开）

- 站点地址：https://ran-mian.github.io/mianyi-update/
- 托管：GitHub Pages（仓库 ran-mian/mianyi-update，main 分支根目录）
- Windows 安装包（>100MB，不进 Pages）：GitHub Releases
  https://github.com/ran-mian/mianyi-update/releases
- Android APK：downloads/mianyi-android-<ver>.apk（随仓库部署到 Pages）
- 清单：latest.json（Windows）、android.json（Android）、data/history.json（更新日志）

## 更新站字段约定

- Android ndroid.json：pk 支持相对路径或绝对 URL；ersionCode 用于比较；sha256 可选。
- Windows latest.json：url 支持相对路径或绝对 URL（这里用 Releases 绝对地址）；sha256 用于下载后校验。

## 发布新版本

1. 把 APK 放到 downloads/，更新 ndroid.json（versionName/versionCode/size/sha256/notes）
2. Windows 安装包执行 gh release create v<版本> <exe> --repo ran-mian/mianyi-update，把 latest.json.url 改为 Release 里的绝对地址
3. git add -A && git commit && git push，Pages 自动构建（约 30–60 秒）