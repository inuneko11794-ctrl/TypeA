# BATTLE BANK-KUN PWA v8.1

競輪パターン分析アプリをPWA化しました。

## 含まれるファイル
- `index.html` … 本体（PWA対応済み）
- `manifest.json` … アプリ情報
- `sw.js` … Service Worker（キャッシュ・オフライン対応）
- `icon-192.png` / `icon-512.png` … アプリアイコン

## 使い方

### ローカルで試す（おすすめ）
```bash
# このフォルダで
python3 -m http.server 8080
```
ブラウザで `http://localhost:8080` を開く。

### インストール方法
1. Chrome / Edge / Safari で開く
2. アドレスバーの「インストール」またはメニューから「ホーム画面に追加」
3. スマホなら「ホーム画面に追加」

### デプロイ
- Netlify / Vercel / GitHub Pages / Cloudflare Pages などにこのフォルダをそのままアップロード
- HTTPS必須（PWAインストールのため）

## 注意
- データはブラウザの localStorage に保存されます
- オフライン時もキャッシュされたページは使えます（CDN依存部分は初回オンライン時にキャッシュ）
- アイコンは簡易生成です。本格的なものに差し替えたい場合は `icon-192.png` と `icon-512.png` を上書きしてください

---
元の単一HTMLをPWA対応にしたものです。機能はそのままです。
