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
        console.log('  - 聯絡方式:', Object.keys(siteData.contacts || {}).length);
        
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

        // 3. 更新聯絡信息（Footer 和 CTA 按鈕）
        if (siteData.contacts) {
            updateContactLinks();
            updateFooterContacts();
        }
        
        console.log('✅ 所有內容渲染完成！');
        
    } catch (error) {
        console.error('❌ 渲染失敗:', error);
    }
}

// ===================================
// 服務項目渲染
// ===================================
function renderServices() {
    console.log('📌 渲染服務項目...');
    
    const serviceSection = document.getElementById('services');
    if (!serviceSection) {
        console.warn('⚠️ 找不到 id=services 的區段');
        return;
    }
    
    let container = null;
    const nextSection = serviceSection.parentElement;
    if (nextSection) {
        container = nextSection.querySelector('.grid');
    }
    
    if (!container) {
        console.warn('⚠️ 找不到服務項目容器');
        const allGrids = document.querySelectorAll('section + div .grid, section .grid');
        if (allGrids.length > 0) {
            container = allGrids[0];
            console.log('✓ 使用備選容器');
        }
    }
    
    if (!container) {
        console.error('❌ 無法找到容器');
        return;
    }
    
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

// ===================================
// 聯絡信息渲染
// ===================================

/**
 * 更新頁面中的聯絡連結（購物動作按鈕）
 */
function updateContactLinks() {
    console.log('📌 更新聯絡連結...');
    
    if (!siteData.contacts) return;
    
    const contacts = siteData.contacts;
    
    // 更新 CTA 按鈕（LINE 諮詢）
    if (contacts.line && contacts.line.url) {
        const lineButtons = document.querySelectorAll('a[href*="line"], a:has(i.fa-brands.fa-line)');
        lineButtons.forEach(btn => {
            if (btn.href.includes('line') || btn.textContent.includes('LINE')) {
                btn.href = contacts.line.url;
                btn.textContent = `${contacts.line.displayText}`;
                console.log('✓ LINE 按鈕已更新');
            }
        });
    }
    
    // 更新 Facebook 連結
    if (contacts.facebook && contacts.facebook.url) {
        const fbLinks = document.querySelectorAll('a[href*="facebook"]');
        fbLinks.forEach(link => {
            link.href = contacts.facebook.url;
            console.log('✓ Facebook 連結已更新');
        });
    }
    
    // 更新 Instagram 連結
    if (contacts.instagram && contacts.instagram.url) {
        const igLinks = document.querySelectorAll('a[href*="instagram"]');
        igLinks.forEach(link => {
            link.href = contacts.instagram.url;
            console.log('✓ Instagram 連結已更新');
        });
    }
}

/**
 * 更新 Footer 中的聯絡信息
 */
function updateFooterContacts() {
    console.log('📌 更新 Footer 聯絡方式...');
    
    if (!siteData.contacts) return;
    
    const contacts = siteData.contacts;
    const footer = document.querySelector('footer');
    if (!footer) {
        console.warn('⚠️ 找不到 footer 元素');
        return;
    }
    
    // 尋找或創建聯絡方式容器
    let contactsContainer = footer.querySelector('[data-contacts-container]');
    
    if (!contactsContainer) {
        // 如果沒有，就在 social links 之前或之後創建一個
        const socialLinksDiv = footer.querySelector('.flex.gap-5');
        if (socialLinksDiv) {
            contactsContainer = document.createElement('div');
            contactsContainer.className = 'flex flex-col md:flex-row gap-6 text-center md:text-left text-sm';
            contactsContainer.setAttribute('data-contacts-container', 'true');
            socialLinksDiv.parentElement.insertBefore(contactsContainer, socialLinksDiv);
        }
    }
    
    if (contactsContainer) {
        let html = '';
        
        // 添加電話
        if (contacts.phone) {
            html += `
                <div class="flex items-center justify-center md:justify-start gap-2">
                    <i class="${contacts.phone.icon} text-brand-green"></i>
                    <a href="${contacts.phone.url}" class="text-gray-600 hover:text-brand-green transition">
                        ${contacts.phone.value}
                    </a>
                </div>
            `;
        }
        
        // 添加 LINE
        if (contacts.line) {
            html += `
                <div class="flex items-center justify-center md:justify-start gap-2">
                    <i class="${contacts.line.icon} text-green-500"></i>
                    <a href="${contacts.line.url}" class="text-gray-600 hover:text-green-500 transition" target="_blank">
                        ${contacts.line.value}
                    </a>
                </div>
            `;
        }
        
        contactsContainer.innerHTML = html;
        console.log('✓ Footer 聯絡方式已更新');
    } else {
        console.warn('⚠️ 無法創建聯絡方式容器');
    }
    
    // 更新社群媒體連結
    updateSocialLinks();
}

/**
 * 更新社群媒體連結
 */
function updateSocialLinks() {
    console.log('📌 更新社群媒體連結...');
    
    if (!siteData.contacts) return;
    
    const contacts = siteData.contacts;
    const socialContainer = document.querySelector('footer .flex.gap-5');
    
    if (!socialContainer) {
        console.warn('⚠️ 找不到社群媒體容器');
        return;
    }
    
    // 清空舊的
    socialContainer.innerHTML = '';
    
    // Facebook
    if (contacts.facebook && contacts.facebook.url) {
        const fbLink = document.createElement('a');
        fbLink.href = contacts.facebook.url;
        fbLink.target = '_blank';
        fbLink.className = 'w-12 h-12 rounded-full bg-brand-stone flex items-center justify-center text-gray-600 hover:text-white hover:bg-brand-green transition text-xl';
        fbLink.innerHTML = `<i class="${contacts.facebook.icon}"></i>`;
        socialContainer.appendChild(fbLink);
        console.log('✓ Facebook 圖標已添加');
    }
    
    // Instagram
    if (contacts.instagram && contacts.instagram.url) {
        const igLink = document.createElement('a');
        igLink.href = contacts.instagram.url;
        igLink.target = '_blank';
        igLink.className = 'w-12 h-12 rounded-full bg-brand-stone flex items-center justify-center text-gray-600 hover:text-white hover:bg-brand-green transition text-xl';
        igLink.innerHTML = `<i class="${contacts.instagram.icon}"></i>`;
        socialContainer.appendChild(igLink);
        console.log('✓ Instagram 圖標已添加');
    }
}

// === 調試輔助函數 ===
window.debugContent = function() {
    console.log('=== 內容加載調試信息 ===');
    console.log('已加載:', contentLoaded);
    console.log('完整數據:', siteData);
    console.log('服務項目:', siteData.services);
    console.log('見證:', siteData.testimonials);
    console.log('聯絡信息:', siteData.contacts);
    
    console.log('=== 聯絡信息詳情 ===');
    if (siteData.contacts) {
        Object.entries(siteData.contacts).forEach(([key, value]) => {
            console.log(`${key}:`, value);
        });
    }
};

// 頁面加載完成日誌
window.addEventListener('load', function() {
    console.log('✅ content-renderer.js 已完全初始化');
    if (contentLoaded) {
        console.log('✅ 內容已成功加載並渲染');
    } else {
        console.warn('⚠️ 內容尚未加載');
    }
});
