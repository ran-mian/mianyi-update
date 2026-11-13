# 眠伊 · 更新站部署说明

这是纯静态站点，任何能放文件的服务器 / 对象存储 / 内网都能用，不需要后端。

## 文件结构

```
update-site/
├─ index.html          更新中心首页
├─ assets/style.css    样式
├─ assets/app.js       读取 JSON 并填充页面
├─ latest.json         Windows 自动更新清单
├─ android.json        Android 版本清单
├─ data/history.json   更新日志
└─ downloads/          安装包（exe / apk）
```

## 部署

1. 把整个目录上传到站点根目录或子目录（例如 `/ranmian/`）；
2. 确保 `downloads/` 里的 exe / apk 可以直接访问（注意服务器对 .apk 的 MIME 与下载权限）；
3. 建议启用 HTTPS；Windows 端如果填的是 HTTP 地址，也能用，但部分网络环境可能拦截。

## 让 Windows 端走这个站点

眠伊 → 设置 → 关于与更新 → 「远程更新源」填：

```
https://你的域名/ranmian/
```

点「检查更新」即可读取 `latest.json`。也可以直接下载安装包覆盖安装。

## 安卓端

手机打开 `https://你的域名/ranmian/` 下载 APK；APK 安装后填电脑地址即可连接桌面端。

## 关于域名

你给的 `https://ssngis94/ranmian` 缺少顶级域名，不是公网可访问的地址。可用形式示例：

- 公网：`https://example.com/ranmian/`（需自己的域名 + 服务器/OSS）
- 内网：`http://192.168.1.100:8080/ranmian/`（同一 Wi-Fi 可直接访问）
- 免费静态托管：GitHub Pages / Cloudflare Pages / Vercel 等（需能访问）

本站所有路径都是相对路径，放在任何子目录都能直接工作。

## 本地预览

```powershell
# 任选其一
python -m http.server 8080 --directory .
npx serve .
```

然后访问 http://127.0.0.1:8080/ 。
