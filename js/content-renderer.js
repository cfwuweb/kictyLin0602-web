// ===================================
// 主網站 - 內容加載和渲染
// ===================================

let siteData = {};

// === 頁面初始化 ===
document.addEventListener('DOMContentLoaded', function() {
    loadSiteContent();
    setupNavigation();
});

// === 加載內容 ===
async function loadSiteContent() {
    try {
        // 添加時間戳以強制刷新快取（GitHub Pages 快取問題）
        const timestamp = new Date().getTime();
        const response = await fetch(`data/content.json?v=${timestamp}`, {
            cache: 'no-store'  // 強制不使用快取
        });
        siteData = await response.json();
        renderContent();
    } catch (error) {
        console.error('Error loading content:', error);
        // 即使加載失敗，頁面也不會損壞
    }
}

// === 渲染所有內容 ===
function renderContent() {
    if (siteData.brand) {
        updateBrandInfo();
    }
    if (siteData.hero) {
        updateHeroSection();
    }
    if (siteData.services && siteData.services.length > 0) {
        renderServices();
    }
    if (siteData.testimonials && siteData.testimonials.length > 0) {
        renderTestimonials();
    }
    if (siteData.availability) {
        updateAvailability();
    }
}

// ===================================
// 品牌信息更新
// ===================================

function updateBrandInfo() {
    const brand = siteData.brand;
    
    // 更新導覽列
    const navLinks = document.querySelectorAll('nav .flex-shrink-0 span');
    if (navLinks.length > 0) {
        navLinks[0].textContent = `${brand.name} ${brand.subtitle}`;
    }

    // 更新 Footer
    const footerText = document.querySelector('footer .text-center md\\:text-left p');
    if (footerText) {
        footerText.textContent = `提供${brand.serviceArea}地區最專業的產後居家照護。`;
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
    }

    // 更新主標題
    const titleEl = document.querySelector('.hero-bg h1');
    if (titleEl && hero.mainTitle) {
        titleEl.innerHTML = hero.mainTitle.replace(/\n/g, '<br>').replace(
            /溫柔守護者。/,
            '<span class="text-brand-green block mt-2">溫柔守護者。</span>'
        );
    }

    // 更新描述
    const descEl = document.querySelector('.hero-bg > div p');
    if (descEl && brand.description) {
        descEl.innerHTML = brand.description.replace(/\n/g, '<br class="hidden sm:block">');
    }
}

// ===================================
// 服務項目渲染
// ===================================

function renderServices() {
    const container = document.querySelector('#services ~ .max-w-6xl .grid');
    if (!container) return;

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
}

// ===================================
// 客戶見證渲染
// ===================================

function renderTestimonials() {
    const container = document.querySelector('#testimonials ~ .max-w-6xl .grid');
    if (!container) return;

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
}

// ===================================
// 檔期狀態更新
// ===================================

function updateAvailability() {
    const availability = siteData.availability;
    
    // 更新檔期文本
    const statusEl = document.querySelector('#contact .text-gray-800.text-lg.md\\:text-xl p:not(.line-through):not(.text-base)');
    if (statusEl) {
        statusEl.innerHTML = availability.status;
    }

    // 更新名額
    const spotsEl = document.querySelector('#contact .text-base.text-gray-600');
    if (spotsEl && availability.spotsLeft) {
        spotsEl.innerHTML = `為了維持最高品質的照護，芝秀每月僅服務一組家庭。<br class="hidden sm:block">
            強烈建議於驗孕拿到媽媽手冊後，盡早預約諮詢。`;
    }
}

// ===================================
// 導覽功能
// ===================================

function setupNavigation() {
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
}
