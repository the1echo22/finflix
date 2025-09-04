// 전역 변수
let posts = [];
let currentCategory = 'all';

// SEO 메타 태그 동적 업데이트 함수
function updateMetaTags(post) {
    if (!post) return;
    
    // 기본 메타 태그 업데이트
    document.title = `${post.title} | FinFlix - 금융 교육 플랫폼`;
    
    // 메타 설명 업데이트
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = post.excerpt;
    }
    
    // Open Graph 태그 업데이트
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = post.title;
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        ogDescription.content = post.excerpt;
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 메인 페이지에서만 블로그 기능 초기화
    if (document.getElementById('blogGrid')) {
        loadPosts();
        renderPosts();
        setupEventListeners();
    }
});

// 이벤트 리스너 설정
function setupEventListeners() {
    // 카테고리 필터
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            renderPosts();
        });
    });
}

// 교육 콘텐츠 데이터
function loadPosts() {
    posts = [
        // 금융 기초 교육
        {
            id: 'what-is-stock',
            title: '주식이란 무엇인가? 초보자를 위한 완벽 가이드',
            category: 'education',
            emoji: '📚',
            excerpt: '주식의 개념부터 작동 원리까지 초보자를 위한 완벽한 주식 입문 가이드. 주식 투자를 시작하기 전 꼭 알아야 할 기초 지식.',
            url: 'what-is-stock.html',
            date: '2025.09.04',
            readTime: 15,
            image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop'
        },
        {
            id: 'understanding-inflation',
            title: '인플레이션이란? 물가 상승이 우리 생활에 미치는 영향',
            category: 'economy',
            emoji: '🌏',
            excerpt: '인플레이션의 개념과 원인, 그리고 우리 일상생활에 미치는 영향을 쉽게 설명합니다.',
            url: 'understanding-inflation.html',
            date: '2025.09.04',
            readTime: 20,
            image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&h=400&fit=crop'
        },
        {
            id: 'what-is-etf',
            title: 'ETF란 무엇인가? 분산투자의 가장 쉬운 방법',
            category: 'education',
            emoji: '💹',
            excerpt: 'ETF(상장지수펀드)의 개념과 장단점, 종류별 특징을 초보자도 이해하기 쉽게 설명합니다.',
            url: 'what-is-etf.html',
            date: '2025.09.04',
            readTime: 18,
            image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=400&fit=crop'
        },
        // 경제 뉴스 분석 (객관적)
        {
            id: 'jackson-hole-analysis',
            title: '잭슨홀 미팅이란? 세계 경제를 움직이는 연례 심포지엄',
            category: 'economy',
            emoji: '🏦',
            excerpt: '매년 8월 와이오밍에서 열리는 잭슨홀 경제 심포지엄의 역사와 중요성을 알아봅니다.',
            url: 'jackson-hole-powell-rate-cut.html',
            date: '2025.08.20',
            readTime: 12,
            image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=400&fit=crop'
        },
        {
            id: 'understanding-interest-rates',
            title: '금리란 무엇인가? 돈의 가격을 이해하는 기초 가이드',
            category: 'economy',
            emoji: '💰',
            excerpt: '기준금리가 우리 경제와 일상생활에 미치는 영향을 쉽게 풀어서 설명합니다.',
            url: 'understanding-interest-rates.html',
            date: '2025.08.15',
            readTime: 14,
            image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop'
        },
        // 투자 이론 교육
        {
            id: 'portfolio-theory',
            title: '포트폴리오 이론: 계란을 한 바구니에 담지 마라',
            category: 'education',
            emoji: '🎯',
            excerpt: '현대 포트폴리오 이론과 자산배분의 기초를 배워 리스크를 관리하는 방법을 알아봅니다.',
            url: 'portfolio-theory.html',
            date: '2025.08.10',
            readTime: 16,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
        },
        {
            id: 'compound-interest',
            title: '복리의 마법: 아인슈타인이 인류 최대의 발명이라 부른 이유',
            category: 'education',
            emoji: '📈',
            excerpt: '복리의 원리와 장기 투자의 중요성을 실제 계산 예시와 함께 설명합니다.',
            url: 'compound-interest.html',
            date: '2025.08.05',
            readTime: 10,
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop'
        },
        // 금융 용어 설명
        {
            id: 'financial-terms-guide',
            title: '금융 용어 사전: PER, PBR, ROE 등 꼭 알아야 할 지표들',
            category: 'education',
            emoji: '📖',
            excerpt: '투자를 시작하기 전 반드시 알아야 할 금융 용어와 지표들을 쉽게 정리했습니다.',
            url: 'financial-terms.html',
            date: '2025.07.30',
            readTime: 25,
            image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&h=400&fit=crop'
        },
        // 암호화폐 시장 분석
        {
            id: 'bitcoin-volatility-analysis',
            title: '비트코인 가격 변동성 이해하기: 시장 분석과 리스크 관리',
            category: 'coin',
            emoji: '🪙',
            excerpt: '비트코인 가격 변동성의 원인과 시장 메커니즘을 분석합니다. 암호화폐 투자의 리스크와 변동성 관리 방법.',
            url: 'bitcoin-120k-crash-30k.html',
            date: '2025.08.18',
            readTime: 15,
            image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=400&fit=crop'
        },
        {
            id: 'ethereum-market-analysis',
            title: '이더리움 시장 분석: 스마트 컨트렉트와 DeFi 생태계',
            category: 'coin',
            emoji: '🔷',
            excerpt: '이더리움 네트워크의 기술적 특징과 DeFi 생태계를 분석합니다. 스마트 컨트렉트 플랫폼의 이해.',
            url: 'ethereum-10k-trump.html',
            date: '2025.08.17',
            readTime: 12,
            image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800&h=400&fit=crop'
        },
        {
            id: 'altcoin-ecosystem',
            title: '알트코인 생태계 이해: 도지코인, 솔라나, 리플의 기술적 차이',
            category: 'coin',
            emoji: '🌐',
            excerpt: '주요 알트코인들의 기술적 특징과 사용 사례를 비교 분석합니다. 각 코인의 장단점과 투자 리스크.',
            url: 'dogecoin-1-dollar-musk.html',
            date: '2025.08.16',
            readTime: 10,
            image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop'
        },
        // 시장 이해
        {
            id: 'how-stock-market-works',
            title: '주식시장은 어떻게 작동하는가? 거래소와 시장 메커니즘',
            category: 'education',
            emoji: '🏛️',
            excerpt: '주식이 거래되는 과정과 시장의 작동 원리를 단계별로 알아봅니다.',
            url: 'how-market-works.html',
            date: '2025.07.25',
            readTime: 17,
            image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop'
        },
        // 실용 가이드
        {
            id: 'opening-brokerage-account',
            title: '증권계좌 개설 가이드: 처음 시작하는 투자자를 위한 단계별 안내',
            category: 'guide',
            emoji: '🏦',
            excerpt: '국내 주요 증권사 비교와 계좌 개설 방법을 상세히 안내합니다.',
            url: 'brokerage-account-guide.html',
            date: '2025.07.20',
            readTime: 12,
            image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=400&fit=crop'
        },
        // 기업 분석
        {
            id: 'tesla-analysis',
            title: '테슬라 주가 분석: 전기차 시장과 자율주행 기술의 미래',
            category: 'stock',
            emoji: '🚗',
            excerpt: '테슬라의 비즈니스 모델과 전기차 시장 전망을 분석합니다.',
            url: 'tesla-714-target.html',
            date: '2025.08.15',
            readTime: 15,
            image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=400&fit=crop'
        },
        {
            id: 'nvidia-chips',
            title: '엔비디아 AI 칩 시장 분석: GPU 기술과 경쟁 전망',
            category: 'stock',
            emoji: '💻',
            excerpt: 'AI 시대 엔비디아의 기술 경쟁력과 시장 지배력을 분석합니다.',
            url: 'nvidia-blackwell-chip.html',
            date: '2025.08.14',
            readTime: 12,
            image: 'https://images.unsplash.com/photo-1591238372408-0c6a303c1e3b?w=800&h=400&fit=crop'
        },
        // 부동산 시장
        {
            id: 'real-estate-seoul',
            title: '서울 아파트 시장 분석: 가격 동향과 정책 영향',
            category: 'economy',
            emoji: '🏘️',
            excerpt: '서울 부동산 시장의 현황과 정부 정책이 가격에 미치는 영향을 분석합니다.',
            url: 'seoul-apartment-15-billion.html',
            date: '2025.08.12',
            readTime: 14,
            image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=400&fit=crop'
        },
        // 원자재 시장
        {
            id: 'gold-market',
            title: '금 시장 분석: 안전자산으로서의 금의 가치',
            category: 'economy',
            emoji: '🌟',
            excerpt: '금 가격에 영향을 미치는 요인과 투자 방법을 알아봅니다.',
            url: 'gold-3000-dollars.html',
            date: '2025.08.08',
            readTime: 10,
            image: 'https://images.unsplash.com/photo-1593380090147-a2192b72f9ae?w=800&h=400&fit=crop'
        }
    ];
}

// 포스트 렌더링
function renderPosts() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;
    
    // 카테고리 필터링
    let filteredPosts = posts;
    if (currentCategory !== 'all') {
        filteredPosts = posts.filter(post => post.category === currentCategory);
    }
    
    // HTML 생성 - 전체 카드 클릭 가능
    const postsHTML = filteredPosts.map(post => `
        <article class="blog-card" onclick="window.location.href='${post.url}'" style="cursor: pointer;">
            <div class="card-gradient-border"></div>
            ${post.image ? `
                <div class="blog-image">
                    <img src="${post.image}" alt="${post.title}" loading="lazy">
                    <div class="image-overlay">
                        <span class="blog-category-badge ${post.category}">${getCategoryLabel(post.category)}</span>
                    </div>
                </div>
            ` : ''}
            <div class="blog-content">
                <div class="blog-header">
                    <span class="blog-emoji pulse">${post.emoji || '📝'}</span>
                    <div class="meta-info">
                        <span class="blog-date">${post.date}</span>
                        <span class="read-time">📖 ${post.readTime}분</span>
                    </div>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-footer">
                    <div class="hover-indicator">
                        <span>지금 읽기</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7 14L11 10L7 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="engagement-stats">
                        <span>🔥 ${Math.floor(Math.random() * 900 + 100)}</span>
                        <span>💬 ${Math.floor(Math.random() * 50 + 10)}</span>
                    </div>
                </div>
            </div>
        </article>
    `).join('');
    
    grid.innerHTML = postsHTML || '<p style="text-align: center; grid-column: 1/-1;">아직 게시된 글이 없습니다.</p>';
}

// 카테고리 라벨 반환
function getCategoryLabel(category) {
    const labels = {
        'education': '📚 금융 교육',
        'economy': '🌏 경제 이해',
        'guide': '📋 실용 가이드',
        'stock': '📈 주식',
        'coin': '🪙 코인',
        'hot': '🔥 핫이슈'
    };
    return labels[category] || category;
}

// 토스트 메시지
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// 검색 기능 (선택적)
function searchPosts(query) {
    if (!query) {
        renderPosts();
        return;
    }
    
    const searchResults = posts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    
    const grid = document.getElementById('blogGrid');
    if (searchResults.length === 0) {
        grid.innerHTML = `<p style="text-align: center; grid-column: 1/-1;">검색 결과가 없습니다.</p>`;
    } else {
        // 검색 결과로 렌더링
        currentCategory = 'all';
        posts = searchResults;
        renderPosts();
        posts = []; // 원래 posts 복원을 위해
        loadPosts();
    }
}