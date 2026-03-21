# 🔧 芝秀月嫂 - 一頁式專屬網頁靜態範本指南

歡迎使用「芝秀月嫂」一頁式網頁範本！這個範本專為「到府月嫂」打造，不需要任何後台伺服器，直接支援 **Github Pages** 免費靜態網頁發佈。
為了方便您未來的新增或修改，所有的文案、圖片、設定都統一集中寫在一個小檔案中：`data/content.json`。

---

## 🚀 第一步：如何建立自己的網頁倉庫與發布？

如果您想要為自己（或是新的月嫂）建立一個一頁式網頁，請按照以下步驟進行：

### 1. 取得這份程式碼
- 如果您已經有 Github 帳號，請直接 **Fork** 此倉庫 (Repository)。
- 或者，將整包檔案下載為 ZIP，然後在您的 Github 建立一個新的倉庫（例如：`amy-nanny-web`），並將所有檔案上傳推送到該倉庫的 `main` 分支。

### 2. 開啟 Github Pages 發布功能
1. 來到您的新 Github 倉庫頁面。
2. 點擊上方的 **Settings** 標籤。
3. 在左側選單往下找，點擊 **Pages**。
4. 在 `Build and deployment` 區塊中：
   - Source: 選擇 `Deploy from a branch`。
   - Branch: 選擇 `main`（或 master），資料夾選 `/(root)`。
   - 點擊 **Save**。
5. 等待約 2~5 分鐘，頁面上方會顯示您的公開網址（例如：`https://你的帳號.github.io/amy-nanny-web/`），點擊網址即可看見您的網站！

---

## 🎯 第二步：如何修改網站內容（文案與圖片）

所有的內容都被抽離到了 `data/content.json`。您不需要懂得寫網頁程式，只需修改此檔案即可。

### 📝 在 Github 上修改的步驟：
1. 在 Github 倉庫清單中，進入 `data` 資料夾。
2. 點擊 `content.json`。
3. 點擊右上角的小鉛筆圖示 (Edit this file)。
4. 找到對應的欄位並將引號 `""` 內的文字或網址替換成您的資料（**注意：請勿不小心刪除引號或逗號！**）。
5. 完成後點擊右上角的綠色按鈕 **Commit changes** 來儲存。
6. 等待 2~5 分鐘，重新整理您的網站，內容就會自動更新。

### 📖 主要欄位說明：

| 區塊名稱 | 欄位 | 說明 |
| --- | --- | --- |
| **品牌設定 (brand)** | `name` | 品牌主名稱 (例如：心馨到府) |
| | `subtitle` | 子名稱／月嫂姓名 (例如：芝秀月嫂) |
| | `serviceArea` | 服務地區 (用於各種文案替換) |
| **首圖區塊 (hero)** | `mainTitleHtml` | 大標題 (支援 HTML 如 `<br>` 換行) |
| | `imageUrl` | 封面大圖的圖片網址 |
| **信任標章 (trustBadges)**| `title`, `subtitle` | 首圖旁邊的四個小方塊特點宣告 |
| **服務項目 (services)**| `title`, `items` | 修改四大照護模組的名稱與細項列表 |
| **月子膳食 (mealGallery)**| `imageUrl`, `description`| 膳食介紹區塊的照片與文案修改 |
| **家長見證 (testimonials)**| `quote`, `author`, `imageUrl`| 編輯家長留下的評價內容與頭像圖片 |
| **預約檔期 (booking)** | `statusLines` | 編輯目前的預約狀態文字 (滿檔/熱烈預約中) |
| **聯絡方式 (contacts)** | `line.url`, `phone.value` | 修改您的 Line 連結、電話、FB 粉絲專頁網址 |

---

## 🎨 圖示變更 (Icon)

範本採用 FontAwesome 圖示。如果您想更換小圖示：
1. 前往 [FontAwesome 6.4 Icons](https://fontawesome.com/icons) 搜尋免費圖示。
2. 複製圖示代碼 (例如：`fa-solid fa-baby`)。
3. 在 `content.json` 中的 `icon` 欄位貼上替換即可。

## 📸 圖片建議

當您在修改 `hero.imageUrl`, `mealGallery.imageUrl` 或是客戶頭像時，建議使用以下方式取得圖片網址：
- 如果您有自己的照片，請先上傳到您的 Github 倉庫中的 `images` 資料夾（您可以自己建立一個），並在 json 中填入相對路徑，例如：`images/my-photo.jpg`。
- 也可以使用圖床服務或是 [Unsplash](https://unsplash.com/) 免費圖庫的圖片 URL。

---

## ⚠️ 常見問題 (FAQ)

**Q：為什麼我修改了 json，網站卻沒有更新？**
A：有兩個可能：
1. Github Pages 重新打包需要幾分鐘時間，請稍候再看。
2. 可能是您瀏覽器的「快取」未清除，請在網站上按下 `Ctrl + F5` (Windows) 或 `Cmd + Shift + R` (Mac) 強制重新整理。
3. 在編輯 json 時不小心刪除了引號或花括號，導致 json 格式錯誤。您可以使用 [JSONLint](https://jsonlint.com/) 檢查您的程式碼是否有報錯。

**祝您接案順利！** 🎉
