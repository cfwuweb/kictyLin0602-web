# 🔧 官網內容管理指南

歡迎使用芝秀月嫂官網的簡易內容管理系統！以下是詳細步驟。

---

## 📋 快速開始

### 1️⃣ 訪問管理面板
在瀏覽器中打開以下地址：
```
http://localhost:8000/admin.html
```
或直接點擊官網上的「管理面板」連結。

### 2️⃣ 編輯內容
- 在管理面板中選擇要編輯的內容類別（服務項目、客戶見證等）
- 修改文字、圖示或圖片
- 點擊「保存所有更改」按鈕

### 3️⃣ 完成！
更改會自動保存到 `data/content.json` 並立即顯示在官網上。

---

## 🎯 各部分編輯指南

### 服務項目管理
自動生成四個服務項目卡片。您可以：
- ✏️ 修改標題
- 🎨 更改圖示代碼（從 [FontAwesome](https://fontawesome.com/icons) 複製）
- 📝 編輯項目列表（每行一項）
- ➕ 點擊「新增服務項目」按鈕增加新卡片
- 🗑️ 點擊「刪除」移除卡片

**例子：**
```
圖示代碼：fa-solid fa-heart-pulse
標題：嬰幼兒 CPR+AED
項目：
定期複訓認證
24小時待命
```

---

### 客戶見證管理
編輯客戶評論和頭像。您可以：
- 💬 修改客戶評語
- 👤 編輯客戶名稱和身份
- 🖼️ 更換頭像圖片 URL
- ➕ 增加新的客戶見證
- 🗑️ 删除不需要的見證

**頭像圖片建議：**
- 使用 [Unsplash](https://unsplash.com) 免費圖片
- 複製圖片的「Copy URL」
- 推薦尺寸：150×150 像素

---

### 首屏文案編輯
修改主頁面最頂部的內容：
- 📌 品牌名稱 → 會顯示在導覽列
- 📌 副標題
- 📌 服務地區
- 📌 首屏標籤（如「📍 專注服務大新竹」）
- 📌 主標題
- 📌 品牌簡介

---

### 檔期狀態管理
更新預約檔期信息：
- 📅 目前檔期狀態（例：2026年 07月 - 12月：熱烈預約中）
- 🎟️ 剩餘名額

修改後會自動更新在官網的聯絡區域。

---

## 🎨 圖示選擇指南

所有圖示都來自 [FontAwesome 6.4](https://fontawesome.com/icons)

### 常用圖示：
| 用途 | 圖示代碼 |
|------|--------|
| 産婦護理 | `fa-solid fa-person-breastfeeding` |
| 嬰兒 | `fa-solid fa-baby` |
| 食物 | `fa-solid fa-bowl-rice` |
| 清潔 | `fa-solid fa-spray-can-sparkles` |
| 心臟 | `fa-solid fa-heart-pulse` |
| 水滴 | `fa-solid fa-droplet` |
| 人群 | `fa-solid fa-users` |
| 證書 | `fa-solid fa-certificate` |

### 怎樣找圖示？
1. 進入 [fontawesome.com/icons](https://fontawesome.com/icons)
2. 在搜尋框輸入關鍵字（例：「baby」）
3. 點擊選中的圖示
4. 複製圖示代碼（格式：`fa-solid fa-[名稱]`）
5. 貼到管理面板即可

---

## 💾 保存與備份

### 自動保存
編輯完成後，點擊「保存所有更改」按鈕：
- ✅ 會自動下載一個 `content.json` 文件
- ✅ 同時保存到本地存儲器

### 手動更新 JSON（進階）
如果您熟悉 JSON 格式，可以直接編輯 `data/content.json` 文件：
```
/workspaces/kictyLin0602-web/data/content.json
```

每次修改保存後，官網會自動讀取新數據。

---

## ❌ 常見問題

### Q: 頁面顯示不出新內容？
**A:** 
1. 確保點擊了「保存所有更改」按鈕
2. 刷新網頁（按 F5）
3. 清除瀏覽器快取（Ctrl+Shift+Delete）

### Q: 圖片無法顯示？
**A:** 
- 檢查 URL 是否完整（以 `https://` 開頭）
- 確保圖片網站未被封鎖
- 試試其他圖片 URL

### Q: 圖示顯示為方框？
**A:** 
- 圖示代碼可能有誤
- 重新複製正確的代碼
- 確認使用了 FontAwesome 的圖示代碼

### Q: JSON 文件損壞了怎麼辦？
**A:** 
1. 在 VS Code 中打開 `data/content.json`
2. 複製本指南最下方的「原始 JSON 模板」
3. 貼上替換整個文件內容

---

## 📁 檔案結構說明

```
/workspaces/kictyLin0602-web/
├── index.html              ← 官網首頁
├── admin.html              ← 📌 管理面板（編輯內容在此）
├── css/
│   ├── styles.css          ← 官網樣式
│   └── admin.css           ← 管理面板樣式
├── js/
│   ├── script.js           ← 官網功能
│   ├── content-renderer.js ← 內容加載和顯示
│   └── admin.js            ← 管理面板功能
└── data/
    └── content.json        ← 📌 所有內容數據（會自動更新）
```

---

## 🚀 下一步建議

1. **增加更多客戶見證** → 在客戶見證頁面添加新見證
2. **更新服務描述** → 根據實際情況修改服務項目
3. **定期更新檔期** → 月底更新預約檔期狀態
4. **備份重要數據** → 定期下載保存 `content.json`

---

## 🆘 需要幫助？

如有任何問題，查看以下：
- FontAwesome 圖示庫：https://fontawesome.com/icons
- Unsplash 免費圖片：https://unsplash.com
- JSON 格式驗證：https://jsonlint.com

---

**祝您使用愉快！** 🎉
