// ===================================
// 主網站 - 內容加載和渲染
// ===================================

let siteData = {};

// === 頁面初始化 ===
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 頁面已加載，開始加載內容...');
    loadSiteContent();
    setupNavigation();
});

// === 加載內容 ===
async function loadSiteContent() {
    try {
        // 添加時間戳以強制刷新快取（GitHub Pages 快取問題）
        const timestamp = new Date().getTime();
        const jsonUrl = `data/content.json?v=${timestamp}`;
        
        console.log(`📤 正在加載：${jsonUrl}`);
        
        const response = await fetch(jsonUrl, {
            cache: 'no-store'  // 強制不使用快取
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        siteData = await response.json();
        console.log('✅ JSON 加載成功', siteData);
        renderContent();
        console.log('✅ 內容渲染完成');
    } catch (error) {
        console.error('❌ 加載內容失敗:', error);
        console.error('錯誤詳情:', error.message);
        // 即使加載失敗，頁面也不會損壞
    }
}

// === 渲染所有內容 ===
function renderContent() {
    console.log('🎨 開始渲染內容...');
    
    if (siteData.brand) {
        console.log('更新品牌信息...');
        updateBrandInfo();
    }
    if (siteData.hero) {
        console.log('更新首屏內容...');
        updateHeroSection();
    }
    if (siteData.services && siteData.services.length > 0) {
        console.log(`渲染 ${siteData.services.length} 個服務項目...`);
        renderServices();
    }
    if (siteData.testimonials && siteData.testimonials.length > 0) {
        console.log(`渲染 ${siteData.testimonials.length} 個見證...`);
        renderTestimonials();
    }
    if (siteData.availability) {
        console.log('更新檔期狀態...');
        updateAvailability();
    }
}

// ===================================
// 品牌信息更新
// ===================================

function updateBrandInfo() {
    const brand = siteData.brand;
    
    // 更新導覽列
    const navBrand = document.querySelector('nav .flex-shrink-0 span:nth-child(2)');
    if (navBrand) {
        navBrand.innerHTML = `${brand.name} <span class="text-base font-sans font-normal text-gray-500 ml-1">${brand.subtitle}</span>`;
        console.log('✓ 導覽列已更新');
    } else {
        console.warn('⚠️ 找不到導覽列品牌元素');
    }

    // 更新 Footer
    const footerBrand = document.querySelector('footer .text-center.md\\:text-left .flex.items-center.justify-center span');
    if (footerBrand) {
        footerBrand.textContent = `${brand.name} ${brand.subtitle}`;
        console.log('✓ Footer 品牌已更新');
    } else {
        console.warn('⚠️ 找不到 Footer 品牌元素');
    }

    const footerDesc = document.querySelector('footer .text-center.md\\:text-left p');
    if (footerDesc) {
        footerDesc.textContent = `提供${brand.serviceArea}地區最專業的產後居家照護。`;
        console.log('✓ Footer 描述已更新');
    } else {
        console.warn('⚠️ 找不到 Footer 描述元素');
    }
}

// ===================================
// 首屏內容更新
// ===================================

function updateHeroSection() {
    const hero = siteData.hero;
    const brand = siteData.brand;

    // 更新標籤
    const taglineEl = document.querySelector('.hero-bg .inline-block');
    if (taglineEl) {
        taglineEl.textContent = hero.tagline;
        console.log('✓ 首屏標籤已更新');
    } else {
        console.warn('⚠️ 找不到首屏標籤元素');
    }

    // 更新主標題
    const titleEl = document.querySelector('.hero-bg h1');
    if (titleEl && hero.mainTitle) {
        titleEl.innerHTML = hero.mainTitle
            .replace(/\n/g, '<br>')
            .replace(/溫柔守護者。/, '<span class="text-brand-green block mt-2">溫柔守護者。</span>');
        console.log('✓ 首屏主標題已更新');
    } else {
        console.warn('⚠️ 找不到首屏主標題元素');
    }

    // 更新描述
    const sections = document.querySelectorAll('.hero-bg > div > div');
    for (let section of sections) {
        const p = section.querySelector('p.text-lg');
        if (p && brand.description) {
            p.innerHTML = brand.description.replace(/\n/g, '<br class="hidden sm:block">');
            console.log('✓ 品牌描述已更新');
            break;
        }
    }
}

// ===================================
// 服務項目渲染
// ===================================

function renderServices() {
    const servicesSection = document.getElementById('services');
    if (!servicesSection) {
        console.warn('⚠️ 找不到 #services 區域');
        return;
    }

    const container = servicesSection.parentElement.querySelector('.grid');
    if (!container) {
        console.warn('⚠️ 找不到服務項目容器');
        return;
    }

    container.innerHTML = '';

    siteData.services.forEach((service) => {
        const card = document.createElement('div');
        card.className = 'bg-brand-stone p-6 md:p-8 rounded-2xl hover:shadow-lg transition group border border-gray-100';
        card.innerHTML = `
            <div class="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-green text-3xl mb-6 group-hover:scale-110 transition">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="font-serif font-bold text-xl md:text-2xl mb-4 text-text-main">${service.title}</h3>
            <ul class="text-gray-700 space-y-3 text-base">
                ${service.items.map(item => `
                    <li class="flex items-start">
                        <i class="fa-solid fa-check text-brand-green mt-1 mr-3 shrink-0"></i>
                        ${item}
                    </li>
                `).join('')}
            </ul>
        `;
        container.appendChild(card);
    });
    
    console.log(`✓ ${siteData.services.length} 個服務項目已渲染`);
}

// ===================================
// 客戶見證渲染
// ===================================

function renderTestimonials() {
    const testimonialsSection = document.getElementById('testimonials');
    if (!testimonialsSection) {
        console.warn('⚠️ 找不到 #testimonials 區域');
        return;
    }

    const container = testimonialsSection.parentElement.querySelector('.grid');
    if (!container) {
        console.warn('⚠️ 找不到見證容器');
        return;
    }

    container.innerHTML = '';

    siteData.testimonials.forEach((testimonial) => {
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
    });
    
    console.log(`✓ ${siteData.testimonials.length} 個見證已渲染`);
}

// ===================================
// 檔期狀態更新
// ===================================

function updateAvailability() {
    const availability = siteData.availability;
    
    // 查找檔期狀態位置
    const contactSection = document.getElementById('contact');
    if (!contactSection) {
        console.warn('⚠️ 找不到 #contact 區域');
        return;
    }

    // 更新檔期文本
    const allParagraphs = contactSection.querySelectorAll('p');
    let statusUpdated = false;
    let slotsUpdated = false;

    allParagraphs.forEach(p => {
        // 查找包含年份的段落（檔期狀態）
        if (p.textContent.includes('年') && !statusUpdated) {
            if (!p.classList.contains('line-through') && !p.classList.contains('text-base')) {
                p.innerHTML = availability.status;
                statusUpdated = true;
                console.log('✓ 檔期狀態已更新');
            }
        }
    });

    if (!statusUpdated) {
        console.warn('⚠️ 找不到檔期狀態文本');
    }
}

// ===================================
// 導覽功能
// ===================================

function setupNavigation() {
    console.log('⚙️ 設置導覽功能...');
    
    // 手機版選單切換
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('#mobile-menu a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // 平滑滾動
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 導覽列 Logo 返回頂部
    const navLogo = document.querySelector('nav .flex-shrink-0');
    if (navLogo) {
        navLogo.style.cursor = 'pointer';
        navLogo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
    
    console.log('✓ 導覽功能已設置');
}

// === 導出調試函數 ===
window.debugContentLoader = function() {
    console.log('=== 內容加載調試信息 ===');
    console.log('已加載的數據:', siteData);
    console.log('服務項目數:', siteData.services?.length || 0);
    console.log('見證數:', siteData.testimonials?.length || 0);
};

console.log('✅ content-renderer.js 已加載');
