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
        {
            id: 'compound-interest-magic',
            title: '💎 복리의 마법: 월 10만원이 10년 후 2억이 되는 비밀',
            category: 'education',
            emoji: '💎',
            excerpt: '아인슈타인이 인류 최대의 발명이라 부른 복리. 월 10만원 적금이 어떻게 10년 후 2억이 되는지, 복리 투자의 놀라운 힘을 실제 계산과 함께 알아봅니다.',
            url: 'compound-interest-magic.html',
            date: '2025.01.05',
            readTime: 15,
            image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop'
        },
        {
            id: 'portfolio-diversification',
            title: '🎯 분산투자의 정석: 달걀을 한 바구니에 담지 마라',
            category: 'education',
            emoji: '🎯',
            excerpt: '포트폴리오 이론의 핵심인 분산투자. 리스크를 줄이면서 수익을 극대화하는 자산배분 전략과 실전 가이드를 제공합니다.',
            url: 'portfolio-diversification.html',
            date: '2025.01.05',
            readTime: 13,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
        },
        {
            id: 'dollar-cost-averaging',
            title: '📈 적립식 투자의 힘: 달러 코스트 애버리징(DCA) 완벽 가이드',
            category: 'education',
            emoji: '📈',
            excerpt: '시장 타이밍을 맞출 필요 없는 투자 전략 DCA. 매달 10만원이 어떻게 안정적인 수익을 만드는지, 실제 데이터와 함께 알아봅니다.',
            url: 'dollar-cost-averaging.html',
            date: '2025.01.05',
            readTime: 12,
            image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop'
        },
        {
            id: 'risk-management',
            title: '🛡️ 투자 리스크 관리: 자산을 지키는 7가지 전략',
            category: 'education',
            emoji: '🛡️',
            excerpt: '성공적인 투자의 핵심은 수익이 아닌 리스크 관리입니다. 포트폴리오를 보호하고 장기 성과를 높이는 체계적인 리스크 관리 방법을 알아봅니다.',
            url: 'risk-management.html',
            date: '2025.01.05',
            readTime: 15,
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop'
        },
        {
            id: 'market-cycles',
            title: '🔄 시장 사이클의 이해: 경기 순환과 투자 타이밍',
            category: 'education',
            emoji: '🔄',
            excerpt: '주식 시장의 4계절을 이해하고 각 국면별 최적 투자 전략을 배웁니다. 역사적 데이터와 함께 시장 사이클의 패턴을 분석합니다.',
            url: 'market-cycles.html',
            date: '2025.01.05',
            readTime: 18,
            image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=800&h=400&fit=crop'
        },
        // 실제 기사들
        {
            id: 'jackson-hole',
            title: '잭슨홀 미팅 서프라이즈: 연준 9월 빅컷 가능성',
            category: 'economy',
            emoji: '🏦',
            excerpt: '파월 의장의 잭슨홀 연설 분석과 시장 전망',
            url: 'jackson-hole-powell-rate-cut.html',
            date: '2025.08.20',
            readTime: 12,
            image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=400&fit=crop'
        },
        {
            id: 'bok-rate',
            title: '한은 금리 동결 막전막후! 환율 1400원 vs 부동산',
            category: 'economy',
            emoji: '💰',
            excerpt: '한국은행 금통위 결정과 시장 영향 분석',
            url: 'bok-rate-freeze-dilemma.html',
            date: '2025.08.15',
            readTime: 14,
            image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop'
        },
        {
            id: 'kb-financial',
            title: 'KB금융 목표가 10만원! 배당 수익률 분석',
            category: 'stock',
            emoji: '💵',
            excerpt: 'KB금융 실적 전망과 배당 투자 전략',
            url: 'kb-financial-100k-dividend.html',
            date: '2025.08.10',
            readTime: 16,
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
        },
        {
            id: 'apple-ai',
            title: '애플 AI폰 출시! 목표가 250달러 상향',
            category: 'stock',
            emoji: '📱',
            excerpt: '애플 인텔리전스와 아이폰 16 전망',
            url: 'apple-250-ai-phone.html',
            date: '2025.08.05',
            readTime: 10,
            image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop'
        },
        {
            id: 'china-deflation',
            title: '중국 디플레이션 경고! 부동산 위기 심화',
            category: 'economy',
            emoji: '🏗️',
            excerpt: '중국 경제 둔화와 글로벌 영향 분석',
            url: 'china-deflation-real-estate.html',
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
        {
            id: 'yen-carry',
            title: '엔캐리 트레이드 청산! 글로벌 시장 충격',
            category: 'economy',
            emoji: '💴',
            excerpt: '일본 엔화 강세와 글로벌 증시 영향',
            url: 'yen-carry-trade-unwinding.html',
            date: '2025.07.25',
            readTime: 17,
            image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop'
        },
        {
            id: 'us-real-estate',
            title: '미국 상업용 부동산 위기! 은행 부실 우려',
            category: 'economy',
            emoji: '🏢',
            excerpt: '미국 오피스빌딩 공실률과 은행 리스크',
            url: 'us-commercial-real-estate.html',
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
                    <img src="${post.image}" alt="${post.title}" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iIzY2NjZmMSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkZpbkZsaXg8L3RleHQ+PC9zdmc+';">
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