// ===================================
// 內容管理面板 - JavaScript
// ===================================

let contentData = {};

// === 頁面初始化 ===
document.addEventListener('DOMContentLoaded', function() {
    loadContent();
    setupTabSwitching();
    setupSaveButton();
});

// === 加載內容 ===
async function loadContent() {
    try {
        const response = await fetch('data/content.json');
        contentData = await response.json();
        renderAllForms();
    } catch (error) {
        showToast('加載內容失敗，請檢查 JSON 文件', 'error');
        console.error('Error loading content:', error);
    }
}

// === 渲染所有表單 ===
function renderAllForms() {
    renderServices();
    renderTestimonials();
    renderHeroForm();
    renderAvailabilityForm();
}

// ===================================
// 1. 服務項目管理
// ===================================

function renderServices() {
    const container = document.getElementById('servicesList');
    container.innerHTML = '';

    contentData.services.forEach((service, index) => {
        const card = document.createElement('div');
        card.className = 'border border-gray-200 p-6 rounded-lg bg-gray-50';
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-800">服務項目 ${index + 1}</h3>
                <button class="delete-service-btn px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" data-index="${index}">
                    <i class="fa-solid fa-trash mr-1"></i>刪除
                </button>
            </div>

            <div class="space-y-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">圖示代碼</label>
                    <input type="text" class="service-icon w-full px-3 py-2 border border-gray-300 rounded-lg" 
                           value="${service.icon}" data-index="${index}" 
                           placeholder="例：fa-solid fa-person-breastfeeding">
                    <p class="text-xs text-gray-500 mt-1">
                        <i class="fa-solid fa-info-circle mr-1"></i>
                        使用 FontAwesome，訪問 <a href="https://fontawesome.com/icons" target="_blank" class="text-blue-500 hover:underline">fontawesome.com</a>
                    </p>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">標題</label>
                    <input type="text" class="service-title w-full px-3 py-2 border border-gray-300 rounded-lg" 
                           value="${service.title}" data-index="${index}">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">服務項目列表（每行一項）</label>
                    <textarea class="service-items w-full px-3 py-2 border border-gray-300 rounded-lg h-24" 
                              data-index="${index}">${service.items.join('\n')}</textarea>
                </div>
            </div>
        `;
        container.appendChild(card);

        // 綁定刪除事件
        card.querySelector('.delete-service-btn')?.addEventListener('click', deleteService);
        
        // 綁定輸入事件
        card.querySelector('.service-icon').addEventListener('change', updateService);
        card.querySelector('.service-title').addEventListener('change', updateService);
        card.querySelector('.service-items').addEventListener('change', updateService);
    });
}

function updateService(e) {
    const index = parseInt(e.target.dataset.index);
    const container = e.target.closest('.border');
    
    contentData.services[index].icon = container.querySelector('.service-icon').value;
    contentData.services[index].title = container.querySelector('.service-title').value;
    contentData.services[index].items = container.querySelector('.service-items').value
        .split('\n')
        .map(item => item.trim())
        .filter(item => item);
}

function deleteService(e) {
    const index = parseInt(e.target.closest('.delete-service-btn').dataset.index);
    if (confirm(`確定要刪除「${contentData.services[index].title}」嗎？`)) {
        contentData.services.splice(index, 1);
        renderServices();
    }
}

document.addEventListener('click', function(e) {
    if (e.target.closest('#addServiceBtn')) {
        const newService = {
            id: Math.max(...contentData.services.map(s => s.id), 0) + 1,
            icon: 'fa-solid fa-star',
            title: '新服務項目',
            items: ['項目 1', '項目 2', '項目 3']
        };
        contentData.services.push(newService);
        renderServices();
    }
});

// ===================================
// 2. 客戶見證管理
// ===================================

function renderTestimonials() {
    const container = document.getElementById('testimonialsList');
    container.innerHTML = '';

    contentData.testimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'border border-gray-200 p-6 rounded-lg bg-gray-50';
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-800">見證 ${index + 1}: ${testimonial.author}</h3>
                <button class="delete-testimonial-btn px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" data-index="${index}">
                    <i class="fa-solid fa-trash mr-1"></i>刪除
                </button>
            </div>

            <div class="space-y-3">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">客戶評語</label>
                    <textarea class="testimonial-quote w-full px-3 py-2 border border-gray-300 rounded-lg h-20" 
                              data-index="${index}">${testimonial.quote}</textarea>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">客戶名稱</label>
                        <input type="text" class="testimonial-author w-full px-3 py-2 border border-gray-300 rounded-lg" 
                               value="${testimonial.author}" data-index="${index}">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">客戶說明</label>
                        <input type="text" class="testimonial-type w-full px-3 py-2 border border-gray-300 rounded-lg" 
                               value="${testimonial.type}" data-index="${index}" 
                               placeholder="例：第一胎 新手媽媽 (30天)">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">頭像圖片 URL</label>
                    <input type="text" class="testimonial-image w-full px-3 py-2 border border-gray-300 rounded-lg" 
                           value="${testimonial.imageUrl}" data-index="${index}">
                    <p class="text-xs text-gray-500 mt-1">
                        <i class="fa-solid fa-info-circle mr-1"></i>
                        可使用 <a href="https://unsplash.com" target="_blank" class="text-blue-500 hover:underline">Unsplash</a> 或其他圖片網站的 URL
                    </p>
                </div>
            </div>
        `;
        container.appendChild(card);

        // 綁定刪除事件
        card.querySelector('.delete-testimonial-btn')?.addEventListener('click', deleteTestimonial);
        
        // 綁定輸入事件
        card.querySelector('.testimonial-quote').addEventListener('change', updateTestimonial);
        card.querySelector('.testimonial-author').addEventListener('change', updateTestimonial);
        card.querySelector('.testimonial-type').addEventListener('change', updateTestimonial);
        card.querySelector('.testimonial-image').addEventListener('change', updateTestimonial);
    });
}

function updateTestimonial(e) {
    const index = parseInt(e.target.dataset.index);
    const container = e.target.closest('.border');
    
    contentData.testimonials[index].quote = container.querySelector('.testimonial-quote').value;
    contentData.testimonials[index].author = container.querySelector('.testimonial-author').value;
    contentData.testimonials[index].type = container.querySelector('.testimonial-type').value;
    contentData.testimonials[index].imageUrl = container.querySelector('.testimonial-image').value;
}

function deleteTestimonial(e) {
    const index = parseInt(e.target.closest('.delete-testimonial-btn').dataset.index);
    if (confirm(`確定要刪除「${contentData.testimonials[index].author}」的見證嗎？`)) {
        contentData.testimonials.splice(index, 1);
        renderTestimonials();
    }
}

document.addEventListener('click', function(e) {
    if (e.target.closest('#addTestimonialBtn')) {
        const newTestimonial = {
            id: Math.max(...contentData.testimonials.map(t => t.id), 0) + 1,
            quote: '在此輸入客戶評語...',
            author: '新客戶名稱',
            type: '服務類型',
            imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
        };
        contentData.testimonials.push(newTestimonial);
        renderTestimonials();
    }
});

// ===================================
// 3. 首屏文案管理
// ===================================

function renderHeroForm() {
    const form = document.getElementById('heroForm');
    const hero = contentData.hero;
    const brand = contentData.brand;

    form.innerHTML = `
        <div class="border-t border-gray-200 pt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">品牌名稱</label>
            <input type="text" id="brandName" class="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                   value="${brand.name}">
        </div>

        <div class="border-t border-gray-200 pt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">副標題</label>
            <input type="text" id="brandSubtitle" class="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                   value="${brand.subtitle}">
        </div>

        <div class="border-t border-gray-200 pt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">服務地區</label>
            <input type="text" id="serviceArea" class="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                   value="${brand.serviceArea}">
        </div>

        <div class="border-t border-gray-200 pt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">首屏標籤</label>
            <input type="text" id="tagline" class="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                   value="${hero.tagline}">
        </div>

        <div class="border-t border-gray-200 pt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">首屏主標題</label>
            <textarea id="mainTitle" class="w-full px-3 py-2 border border-gray-300 rounded-lg h-12">${hero.mainTitle}</textarea>
        </div>

        <div class="border-t border-gray-200 pt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">品牌簡介</label>
            <textarea id="description" class="w-full px-3 py-2 border border-gray-300 rounded-lg h-16">${brand.description}</textarea>
        </div>
    `;

    // 綁定變更事件
    document.getElementById('brandName')?.addEventListener('change', saveHeroData);
    document.getElementById('brandSubtitle')?.addEventListener('change', saveHeroData);
    document.getElementById('serviceArea')?.addEventListener('change', saveHeroData);
    document.getElementById('tagline')?.addEventListener('change', saveHeroData);
    document.getElementById('mainTitle')?.addEventListener('change', saveHeroData);
    document.getElementById('description')?.addEventListener('change', saveHeroData);
}

function saveHeroData() {
    contentData.brand.name = document.getElementById('brandName')?.value || '';
    contentData.brand.subtitle = document.getElementById('brandSubtitle')?.value || '';
    contentData.brand.serviceArea = document.getElementById('serviceArea')?.value || '';
    contentData.hero.tagline = document.getElementById('tagline')?.value || '';
    contentData.hero.mainTitle = document.getElementById('mainTitle')?.value || '';
    contentData.brand.description = document.getElementById('description')?.value || '';
}

// ===================================
// 4. 檔期狀態管理
// ===================================

function renderAvailabilityForm() {
    const form = document.getElementById('availabilityForm');
    const availability = contentData.availability;

    form.innerHTML = `
        <div class="border border-yellow-200 bg-yellow-50 p-4 rounded-lg mb-4">
            <i class="fa-solid fa-lightbulb text-yellow-600 mr-2"></i>
            <span class="text-yellow-700">修改檔期狀態時，官網上會自動更新。</span>
        </div>

        <div class="border-t border-gray-200 pt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">目前檔期狀態</label>
            <input type="text" id="availabilityStatus" class="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                   value="${availability.status}" 
                   placeholder="例：2026年 07月 - 12月：熱烈預約中">
        </div>

        <div class="border-t border-gray-200 pt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">剩餘名額</label>
            <input type="number" id="spotsLeft" class="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                   value="${availability.spotsLeft}" min="0">
        </div>
    `;

    // 綁定變更事件
    document.getElementById('availabilityStatus')?.addEventListener('change', saveAvailabilityData);
    document.getElementById('spotsLeft')?.addEventListener('change', saveAvailabilityData);
}

function saveAvailabilityData() {
    contentData.availability.status = document.getElementById('availabilityStatus')?.value || '';
    contentData.availability.spotsLeft = document.getElementById('spotsLeft')?.value || '0';
}

// ===================================
// 標籤頁切換
// ===================================

function setupTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有活躍狀態
            tabBtns.forEach(b => {
                b.classList.remove('active', 'text-green-600', 'border-b-2', 'border-green-600');
                b.classList.add('text-gray-600');
            });
            tabContents.forEach(content => content.classList.add('hidden'));

            // 添加當前活躍狀態
            this.classList.add('active', 'text-green-600', 'border-b-2', 'border-green-600');
            this.classList.remove('text-gray-600');
            const tabName = this.dataset.tab;
            document.getElementById(tabName).classList.remove('hidden');
        });
    });
}

// ===================================
// 保存功能
// ===================================

function setupSaveButton() {
    document.getElementById('saveBtn').addEventListener('click', saveAllData);
}

function saveAllData() {
    // 確保所有表單數據都已保存
    saveHeroData();
    saveAvailabilityData();

    // 轉換為 JSON
    const jsonString = JSON.stringify(contentData, null, 2);

    // 創建下載連結
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // 同時保存到本地存儲（用於頁面刷新後恢復）
    localStorage.setItem('contentData', jsonString);

    showToast('內容已保存！請用下載的 JSON 文件替換 data/content.json');
}

// ===================================
// 提示信息
// ===================================

function showToast(message = '已保存成功！', type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.remove('hidden', 'bg-red-500', 'bg-yellow-500');
    toast.classList.add(`bg-${type === 'error' ? 'red' : type === 'warning' ? 'yellow' : 'green'}-500`);
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
