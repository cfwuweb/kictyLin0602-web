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
        console.log('✅ JSON 數據加載成功');
        
        contentLoaded = true;
        renderAllContent();
        
    } catch (error) {
        console.error('❌ JSON 加載失敗:', error.message);
    }
}

// === 設定元素的文字/HTML ===
function setElement(id, content, isHtml = false) {
    const el = document.getElementById(id);
    if (el) {
        if (isHtml) {
            el.innerHTML = content;
        } else {
            el.textContent = content;
        }
    }
}

// === 主渲染函數 ===
function renderAllContent() {
    console.log('🎨 開始渲染頁面內容...');
    
    try {
        if (siteData.brand) renderBrand();
        if (siteData.hero) renderHero();
        if (siteData.trustBadges) renderTrustBadges();
        if (siteData.servicesHeader) renderServicesHeader();
        if (siteData.services) renderServices();
        if (siteData.mealGallery) renderMealGallery();
        if (siteData.testimonialsHeader) renderTestimonialsHeader();
        if (siteData.testimonials) renderTestimonials();
        if (siteData.booking) renderBooking();
        if (siteData.contacts) renderContacts();
        
        console.log('✅ 所有內容渲染完成！');
    } catch (error) {
        console.error('❌ 渲染失敗:', error);
    }
}

// 渲染品牌資訊
function renderBrand() {
    setElement('page-title', siteData.brand.pageTitle);
    setElement('nav-brand-name', siteData.brand.name);
    setElement('nav-brand-subtitle', siteData.brand.subtitle);
    setElement('footer-brand', `${siteData.brand.name} ${siteData.brand.subtitle}`);
    setElement('footer-desc', siteData.brand.description);
    if (document.getElementById('footer-copyright')) {
        document.getElementById('footer-copyright').innerHTML = `&copy; ${siteData.brand.copyrightYear} ${siteData.brand.copyrightName}.<br class="md:hidden"> All rights reserved.`;
    }
}

// 渲染 Hero 區塊
function renderHero() {
    setElement('hero-tagline', siteData.hero.tagline);
    setElement('hero-title', siteData.hero.mainTitleHtml, true);
    setElement('hero-desc', siteData.hero.description, true);
    setElement('hero-cta1', `<i class="fa-brands fa-line mr-2"></i>${siteData.hero.cta1Text}`, true);
    setElement('hero-cta2', siteData.hero.cta2Text);
    
    const heroImg = document.getElementById('hero-img');
    if (heroImg && siteData.hero.imageUrl) {
        heroImg.src = siteData.hero.imageUrl;
    }
}

// 渲染信任標章
function renderTrustBadges() {
    const container = document.getElementById('trust-badges');
    if (!container) return;
    
    container.innerHTML = '';
    siteData.trustBadges.forEach(badge => {
        container.innerHTML += `
            <div class="flex items-center gap-4 p-2">
                <div class="w-14 h-14 shrink-0 ${badge.bgClass} rounded-full flex items-center justify-center ${badge.textClass}">
                    <i class="${badge.icon} text-3xl"></i>
                </div>
                <div>
                    <p class="font-bold text-base md:text-lg text-text-main">${badge.title}</p>
                    <p class="text-sm text-gray-500">${badge.subtitle}</p>
                </div>
            </div>
        `;
    });
}

// 渲染服務項目 Header
function renderServicesHeader() {
    setElement('services-title', siteData.servicesHeader.title);
    setElement('services-desc', siteData.servicesHeader.description);
}

// 渲染服務項目
function renderServices() {
    const serviceSection = document.getElementById('services');
    if (!serviceSection) return;
    
    let container = serviceSection.querySelector('.grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    siteData.services.forEach((service) => {
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
            <div class="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-green text-4xl mb-6 group-hover:scale-110 transition">
                <i class="${service.icon}"></i>
            </div>
            <h3 class="font-serif font-bold text-xl md:text-2xl mb-4 text-text-main">${service.title}</h3>
            <ul class="text-gray-700 space-y-3 text-base">
                ${itemsHtml}
            </ul>
        `;
        container.appendChild(card);
    });
}

// 渲染月子膳食區塊
function renderMealGallery() {
    const container = document.getElementById('meal-images-container');
    if (container && siteData.mealGallery.images) {
        container.innerHTML = '';
        siteData.mealGallery.images.forEach(imgUrl => {
            container.innerHTML += `<img src="${imgUrl}" alt="健康月子餐" class="rounded-2xl shadow-md w-full h-48 md:h-80 object-cover hover:scale-105 transition duration-300">`;
        });
    } else {
        // Fallback for single image (if container hasn't changed or config is old)
        const img = document.getElementById('meal-img');
        if (img && siteData.mealGallery.imageUrl) img.src = siteData.mealGallery.imageUrl;
    }
    
    setElement('meal-title', siteData.mealGallery.title);
    setElement('meal-desc', siteData.mealGallery.description, true);
    
    const tagsContainer = document.getElementById('meal-tags');
    if (tagsContainer && siteData.mealGallery.tags) {
        tagsContainer.innerHTML = '';
        siteData.mealGallery.tags.forEach(tag => {
            tagsContainer.innerHTML += `<span class="bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-base font-medium border border-orange-100">${tag}</span>`;
        });
    }
}

// 渲染見證 Header
function renderTestimonialsHeader() {
    setElement('testimonials-title', siteData.testimonialsHeader.title);
    setElement('testimonials-desc', siteData.testimonialsHeader.description);
}

// 渲染見證列表
function renderTestimonials() {
    const section = document.getElementById('testimonials');
    if (!section) return;
    
    let container = section.querySelector('.grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    siteData.testimonials.forEach(testimonial => {
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

// 渲染預約狀態
function renderBooking() {
    setElement('booking-title', siteData.booking.title);
    setElement('booking-status-header', siteData.booking.statusHeader);
    
    const linesContainer = document.getElementById('booking-status-lines');
    if (linesContainer && siteData.booking.statusLines) {
        linesContainer.innerHTML = siteData.booking.statusLines.join('');
    }
    
    setElement('booking-note', siteData.booking.note, true);
}

// 渲染聯絡方式
function renderContacts() {
    const contacts = siteData.contacts;
    if (!contacts) return;
    
    // 更新 CTA 連結
    if (contacts.line?.url) {
        const heroCta1 = document.getElementById('hero-cta1');
        if (heroCta1) heroCta1.href = contacts.line.url;
        
        const bookingCta1 = document.getElementById('booking-cta1');
        if (bookingCta1) {
            bookingCta1.href = contacts.line.url;
            bookingCta1.innerHTML = `<i class="${contacts.line.icon} text-3xl"></i> ${contacts.line.displayText}`;
        }
    }
    
    if (contacts.quote?.url) {
        const bookingCta2 = document.getElementById('booking-cta2');
        if (bookingCta2 && contacts.quote.url !== '#') {
            bookingCta2.href = contacts.quote.url;
            bookingCta2.innerHTML = `<i class="${contacts.quote.icon} text-2xl"></i> ${contacts.quote.displayText}`;
        }
    }
    
    // 渲染 Footer Social Links 和文字聯絡
    updateFooterContacts(contacts);
}

function updateFooterContacts(contacts) {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    let contactsContainer = footer.querySelector('[data-contacts-container]');
    if (!contactsContainer) {
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
        if (contacts.phone && contacts.phone.value) {
            html += `
                <div class="flex items-center justify-center md:justify-start gap-2">
                    <i class="${contacts.phone.icon} text-brand-green"></i>
                    <a href="${contacts.phone.url}" class="text-gray-600 hover:text-brand-green transition">
                        ${contacts.phone.value}
                    </a>
                </div>
            `;
        }
        if (contacts.line && contacts.line.value) {
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
    }
    
    const socialContainer = footer.querySelector('.flex.gap-5');
    if (socialContainer) {
        socialContainer.innerHTML = '';
        if (contacts.facebook && contacts.facebook.url) {
            socialContainer.innerHTML += `
                <a href="${contacts.facebook.url}" target="_blank" class="w-12 h-12 rounded-full bg-brand-stone flex items-center justify-center text-gray-600 hover:text-white hover:bg-brand-green transition text-2xl">
                    <i class="${contacts.facebook.icon}"></i>
                </a>
            `;
        }
        if (contacts.instagram && contacts.instagram.url) {
            socialContainer.innerHTML += `
                <a href="${contacts.instagram.url}" target="_blank" class="w-12 h-12 rounded-full bg-brand-stone flex items-center justify-center text-gray-600 hover:text-white hover:bg-brand-green transition text-2xl">
                    <i class="${contacts.instagram.icon}"></i>
                </a>
            `;
        }
    }
}
