// ===================================
// 主網站 - 內容動態渲染
// ===================================

let siteData = {};
let contentLoaded = false;

// === 頁面初始化 ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 頁面已加載，開始加載 JSON 內容...');
    loadSiteContent();
});

// === 加載 JSON 內容 ===
async function loadSiteContent() {
    try {
        const timestamp = new Date().getTime();
        const url = `data/content.json?v=${timestamp}`;
        
        console.log(`📤 正在加載：${url}`);
        
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        siteData = await response.json();
        console.log('✅ JSON 數據加載成功:');
        console.log('  - 服務項目:', siteData.services?.length || 0);
        console.log('  - 客戶見證:', siteData.testimonials?.length || 0);
        
        contentLoaded = true;
        renderAllContent();
        
    } catch (error) {
        console.error('❌ JSON 加載失敗:', error.message);
    }
}

// === 主渲染函數 ===
function renderAllContent() {
    console.log('🎨 開始渲染頁面內容...');
    
    try {
        // 1. 清空並重新渲染服務項目
        if (siteData.services && siteData.services.length > 0) {
            renderServices();
        }
        
        // 2. 清空並重新渲染客戶見證
        if (siteData.testimonials && siteData.testimonials.length > 0) {
            renderTestimonials();
        }
        
        console.log('✅ 所有內容渲染完成！');
        
    } catch (error) {
        console.error('❌ 渲染失敗:', error);
    }
}

// ===================================
// 服務項目渲染（最重要！）
// ===================================
function renderServices() {
    console.log('📌 渲染服務項目...');
    
    // 方法 1: 找到服務區段後的網格容器
    const serviceSection = document.getElementById('services');
    if (!serviceSection) {
        console.warn('⚠️ 找不到 id=services 的區段');
        return;
    }
    
    // 從 id=services 開始，找到最近的 .grid
    let container = null;
    let current = serviceSection;
    
    // 向下查找（在 services 的同級或子級中尋找）
    const nextSection = serviceSection.parentElement;
    if (nextSection) {
        container = nextSection.querySelector('.grid');
    }
    
    if (!container) {
        console.warn('⚠️ 找不到服務項目容器 (.grid)');
        console.warn('嘗試備選方案...');
        // 備選：全頁面搜索第一個 .grid（應該是服務項目）
        const allGrids = document.querySelectorAll('section + div .grid, section .grid');
        if (allGrids.length > 0) {
            container = allGrids[0];
            console.log('✓ 使用備選容器');
        }
    }
    
    if (!container) {
        console.error('❌ 無法找到任何容器');
        return;
    }
    
    // 清空並渲染
    console.log(`清空舊内容，渲染 ${siteData.services.length} 個服務項目...`);
    container.innerHTML = '';
    
    siteData.services.forEach((service, index) => {
        const card = document.createElement('div');
        card.className = 'bg-brand-stone p-6 md:p-8 rounded-2xl hover:shadow-lg transition group border border-gray-100';
        
        let itemsHtml = '';
        if (service.items && Array.isArray(service.items)) {
            itemsHtml = service.items.map(item => `
                <li class="flex items-start">
                    <i class="fa-solid fa-check text-brand-green mt-1 mr-3 shrink-0"></i>
                    ${item}
                </li>
            `).join('');
        }
        
        card.innerHTML = `
            <div class="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-green text-3xl mb-6 group-hover:scale-110 transition">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="font-serif font-bold text-xl md:text-2xl mb-4 text-text-main">${service.title}</h3>
            <ul class="text-gray-700 space-y-3 text-base">
                ${itemsHtml}
            </ul>
        `;
        
        container.appendChild(card);
        console.log(`  ✓ 服務 ${index + 1}: "${service.title}" (${service.items?.length || 0} 項)`);
    });
    
    console.log(`✅ ${siteData.services.length} 個服務項目已渲染`);
}

// ===================================
// 客戶見證渲染
// ===================================
function renderTestimonials() {
    console.log('📌 渲染客戶見證...');
    
    const testimonialSection = document.getElementById('testimonials');
    if (!testimonialSection) {
        console.warn('⚠️ 找不到 id=testimonials 的區段');
        return;
    }
    
    let container = null;
    const nextSection = testimonialSection.parentElement;
    if (nextSection) {
        // 找到見證區段後第二個 .grid（因為服務項目是第一個）
        const allGrids = nextSection.querySelectorAll('.grid');
        if (allGrids.length > 1) {
            container = allGrids[1];
        } else if (allGrids.length > 0) {
            container = allGrids[0];
        }
    }
    
    if (!container) {
        console.warn('⚠️ 找不到見證容器');
        return;
    }
    
    console.log(`清空舊內容，渲染 ${siteData.testimonials.length} 個見證...`);
    container.innerHTML = '';
    
    siteData.testimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'bg-brand-stone p-8 rounded-2xl relative shadow-sm';
        
        card.innerHTML = `
            <i class="fa-solid fa-quote-left text-5xl text-brand-green/20 absolute top-6 left-6"></i>
            <p class="text-gray-800 text-lg relative z-10 mb-8 mt-6 leading-relaxed">
                「${testimonial.quote}」
            </p>
            <div class="flex items-center gap-4 border-t border-gray-200 pt-6">
                <div class="w-14 h-14 shrink-0 bg-gray-300 rounded-full overflow-hidden">
                    <img src="${testimonial.imageUrl}" alt="${testimonial.author}" class="w-full h-full object-cover">
                </div>
                <div>
                    <p class="font-bold text-lg text-text-main">${testimonial.author}</p>
                    <p class="text-base text-gray-500">${testimonial.type}</p>
                </div>
            </div>
        `;
        
        container.appendChild(card);
        console.log(`  ✓ 見證 ${index + 1}: ${testimonial.author}`);
    });
    
    console.log(`✅ ${siteData.testimonials.length} 個見證已渲染`);
}

// === 調試輔助函數 ===
window.debugContent = function() {
    console.log('=== 內容加載調試信息 ===');
    console.log('已加載:', contentLoaded);
    console.log('完整數據:', siteData);
    console.log('服務項目:', siteData.services);
    console.log('見證:', siteData.testimonials);
    
    // 檢查 DOM
    console.log('=== DOM 檢查 ===');
    console.log('id=services:', document.getElementById('services') ? '✓ 存在' : '✗ 不存在');
    console.log('id=testimonials:', document.getElementById('testimonials') ? '✓ 存在' : '✗ 不存在');
    console.log('.grid 數量:', document.querySelectorAll('.grid').length);
};

// 頁面加載完成日誌
window.addEventListener('load', function() {
    console.log('✅ content-renderer.js 已完全初始化');
    if (contentLoaded) {
        console.log('✅ 內容已成功加載並渲染');
    } else {
        console.warn('⚠️ 內容尚未加載，請檢查 JSON');
    }
});
