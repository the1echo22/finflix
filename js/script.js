// 전역 변수
let posts = [];
let isAdmin = false;
let editingPostId = null;
let currentCategory = 'all';

// SEO 메타 태그 동적 업데이트 함수
function updateMetaTags(post) {
    if (!post) return;
    
    // 기본 메타 태그 업데이트
    document.title = `${post.title} | FinFlix - MZ 금융 투자 블로그`;
    
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
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && post.image) {
        ogImage.content = post.image;
    }
    
    // Twitter Card 태그 업데이트
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
        twitterTitle.content = post.title;
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
        twitterDescription.content = post.excerpt;
    }
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage && post.image) {
        twitterImage.content = post.image;
    }
    
    // 구조화 데이터 업데이트
    updateStructuredData(post);
}

// 구조화 데이터 업데이트 함수
function updateStructuredData(post) {
    const existingScript = document.querySelector('script[type="application/ld+json"][data-post="true"]');
    if (existingScript) {
        existingScript.remove();
    }
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "alternativeHeadline": post.excerpt.substring(0, 60),
        "image": post.image,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
            "@type": "Organization",
            "name": "FinFlix"
        },
        "publisher": {
            "@type": "Organization",
            "name": "FinFlix",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.finflix.org/images/logo.png"
            }
        },
        "description": post.excerpt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.finflix.org/post/${post.id}`
        }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-post', 'true');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
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

    // 폼 제출
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            savePost();
        });
    }
}

// 관리자 모드 토글
function toggleAdmin() {
    const password = prompt('관리자 비밀번호를 입력하세요:');
    // 실제로는 더 안전한 인증 방식을 사용해야 합니다
    if (password === '1234') { // 비밀번호를 원하는 것으로 변경하세요
        isAdmin = !isAdmin;
        document.getElementById('fab').classList.toggle('active', isAdmin);
        showToast(isAdmin ? '관리자 모드 활성화 🔓' : '관리자 모드 비활성화 🔒');
        renderPosts();
    } else if (password) {
        showToast('비밀번호가 틀렸습니다 ❌');
    }
}

// 포스트 로드
function loadPosts() {
    // 구글 애드센스를 위해 항상 하드코딩된 콘텐츠 표시
    // localStorage는 관리자가 추가한 글만 저장
    const defaultPosts = [
            {
                id: Date.now(),
                title: '🚨 비트코인 12만 달러 돌파! 이제 시작이다',
                category: 'coin',
                emoji: '🚀',
                excerpt: '트럼프 취임 전 역대 최고가 121,641달러 달성! 기요사키의 100만 달러 예측이 현실이 될까? 12월 5일 처음 10만 달러 돌파 후 단 한 달 만에 20% 상승!',
                content: `<div class="content-wrapper">
<div class="highlight-box">
📊 <strong>현재 비트코인 가격: $121,641</strong> (2024년 12월 기준)
<span class="price-indicator price-up">📈 +20% (12월 한 달간)</span>
</div>

<h2>🚀 비트코인 12만 달러 시대 개막!</h2>

<p>드디어 비트코인이 <strong>12만 달러를 돌파</strong>했다!</p>

<p>12월 5일 처음으로 10만 달러를 넘어선 지 단 한 달 만에 20% 상승한 것이다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$103,679</span>
    <span class="stat-label">12월 5일 (10만 돌파)</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$108,135</span>
    <span class="stat-label">12월 17일</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$121,641</span>
    <span class="stat-label">현재 가격</span>
  </div>
</div>

<h3>💌 트럼프 효과가 폭발한다</h3>

<p>트럼프 대통령 당선 이후 비트코인은 <strong>60% 상승</strong>했다.</p>

<p>11월 6일 당선 확정 당시 $76,243에서 현재 $121,641까지 직선 상승 중이다.</p>

<blockquote>
"미국을 세계 암호화폐 수도로 만들겠다" - 도널드 트럼프
</blockquote>

<h3>🎯 트럼프의 암호화폐 공약</h3>
<ul>
  <li>국가 비트코인 준비금 구축 검토</li>
  <li>SEC 의장 게리 겐슬러 교체</li>
  <li>취임 100일 내 암호화폐 자문 위원회 설치</li>
  <li>국내 비트코인 채굴 유리한 규제</li>
</ul>

<h3>🥊 버핏 vs 기요사키: 극과 극의 전망</h3>

<div class="chart-container">
  <p><strong>🎙️ 워런 버핏:</strong> "비트코인은 생산적 자산이 아니다. 쥐약과 같다"</p>
  <p><strong>🎙️ 로버트 기요사키:</strong> "비트코인 100만 달러 간다. 나는 73개를 보유 중이다"</p>
</div>

<h3>📊 12만 달러 돌파의 의미</h3>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">400%</span>
    <span class="stat-label">2024년 상승률</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">2.3조 달러</span>
    <span class="stat-label">시가총액</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">19,000개</span>
    <span class="stat-label">총 공급량(만개)</span>
  </div>
</div>

<h3>💡 MZ가 꼭 알아야 할 포인트</h3>

<ol>
  <li><strong>반감기 효과:</strong> 2024년 4월 반감기 이후 공급 감소로 가격 상승 압력</li>
  <li><strong>기관 투자:</strong> 비트코인 ETF로 기관 자금 대거 유입</li>
  <li><strong>금리 인하:</strong> 2025년 연준 금리 인하 기대감</li>
  <li><strong>규제 완화:</strong> 각국 정부의 우호적 태도 변화</li>
</ol>

<div class="highlight-box">
  <h3>🤔 지금 사야 할까?</h3>
  <p><strong>12만 달러가 비싸 보이지만...</strong></p>
  <ul>
    <li>기요사키 예측: 100만 달러 (현재의 8배)</li>
    <li>JP모건: 15만 달러 (2024년 말)</li>
    <li>캐시 우드: 50만 달러 (2025년)</li>
  </ul>
</div>

<h3>🎆 투자 전략 가이드</h3>

<div class="chart-container">
  <p><strong>🟢 초보자:</strong> 월 투자금의 5-10%만 투자, DCA(매달 정액 매수) 전략</p>
  <p><strong>🟡 중급자:</strong> 포트폴리오의 10-20%, 주식/코인 균형 배분</p>
  <p><strong>🔴 주의:</strong> 레버리지 금지, 전 재산 올인 절대 금지!</p>
</div>

<blockquote>
💡 <strong>Pro Tip:</strong> "비트코인은 디지털 금이다. 하지만 금보다 변동성이 10배 크다. 감당 가능한 금액만 투자하라!"
</blockquote>
</div>`,
                date: '2025-08-18T09:00:00.000Z',
                readTime: 8,
                image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 1,
                title: '엔비디아 시총 3.7조 달러 돌파! "블랙웰 칩 품귀현상"',
                category: 'stock',
                emoji: '🚀',
                excerpt: '차세대 AI 칩 블랙웰 매출 110억 달러 돌파. 마이크로소프트만 수만개 구매! 젠슨 황 "수요 미친듯이 많아"',
                content: `<div class="content-wrapper">
<div class="highlight-box">
📈 <strong>현재 엔비디아 주가: $154.31</strong> (역대 최고가)
<span class="price-indicator price-up">시가총액 3.77조 달러 (세계 1위)</span>
</div>

<h2>🔥 블랙웰 칩 대박! 분기 매출 110억 달러</h2>

<p>엔비디아가 <strong>완전 미쳤다!</strong></p>

<p>2025년 6월, 드디어 시가총액 <strong>3.77조 달러</strong>로 세계 1위 기업 등극.</p>

<p>차세대 AI 칩 '블랙웰'이 출시 첫 분기에만 110억 달러(약 15조원) 매출 달성했다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$44.1B</span>
    <span class="stat-label">2025 Q1 매출</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">69%↑</span>
    <span class="stat-label">전년 대비 성장</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">91%</span>
    <span class="stat-label">데이터센터 비중</span>
  </div>
</div>

<h3>💸 빅테크들 "블랙웰 못 사면 죽어!"</h3>

<blockquote>
"마이크로소프트가 벌써 블랙웰 GPU 수만 개 배치 완료. 1분기에만 100조 개 토큰 처리했다" - 콜레트 크레스 CFO
</blockquote>

<p>젠슨 황이 직접 말했다: <strong>"수요가 Amazing하다"</strong> (진짜 이렇게 말함ㅋㅋ)</p>

<p>블랙웰이 데이터센터 매출의 70% 차지.</p>

<p>이게 뭔 소리냐면, AI 회사들이 블랙웰 없으면 경쟁에서 진다는 얘기.</p>

<h3>📊 숫자로 보는 엔비디아 독점</h3>

<div class="chart-container">
  <p>💰 <strong>데이터센터 매출:</strong> 연간 1,152억 달러 (142% 성장)</p>
  <p>🤖 <strong>AI 추론 수요:</strong> OpenAI, 구글, MS 토큰 생성량 폭발적 증가</p>
  <p>🏭 <strong>블랙웰 점유율:</strong> 고성능 AI 칩 시장 사실상 독점</p>
</div>

<h3>🚨 리스크? 중국 수출 규제</h3>

<p>4월 미국 정부가 중국 수출 규제 강화. H20 칩 80억 달러 매출 날아갔다. 근데 웃긴 건? <strong>그래도 실적 박살냈다는 거.</strong> 중국 없어도 수요가 넘쳐서 문제없다는 뜻.</p>

<h3>🎯 MZ 투자 전략</h3>

<div class="highlight-box">
  <h4>지금 사야 할까? 🤔</h4>
  <ul>
    <li>✅ AI는 이제 시작. 로보틱스 시장도 대기 중</li>
    <li>✅ 경쟁사? AMD, 인텔은 아직 한참 멀었음</li>
    <li>⚠️ 주가 변동성 큼. 소액으로 분할 매수 추천</li>
    <li>⚠️ 단기 214% 상승. 조정 가능성 있음</li>
  </ul>
</div>

<blockquote>
💡 <strong>한 줄 요약:</strong> "AI 시대의 석유를 독점한 회사. 비싸 보여도 5년 뒤엔 싸 보일 수도?"
</blockquote>
</div>`,
                date: '2025-08-17T09:00:00.000Z',
                readTime: 6,
                image: 'https://images.unsplash.com/photo-1593380090147-a2192b72f9ae?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 2,
                title: '이더리움 1만 달러 간다? "트럼프 암호화폐 전략자산 지정"',
                category: 'coin',
                emoji: '💎',
                excerpt: 'ChatGPT "연말 1만달러 가능". 트럼프 미국 암호화폐 전략자산에 ETH 포함! 스테이킹 ETF도 곧?',
                content: `<div class="content-wrapper">
<div class="highlight-box">
💎 <strong>현재 이더리움 가격: $3,432</strong>
<span class="price-indicator price-up">📈 +8.28% (24시간)</span>
</div>

<h2>🚀 트럼프 "이더리움은 미국 전략자산"</h2>

<p>갑자기 터진 <strong>초특급 호재!</strong> 트럼프가 발표한 '미국 암호화폐 전략자산' 5개 중 하나로 이더리움 포함. 비트코인만 밀던 트럼프가 이더리움까지 인정했다는 건 <strong>게임 체인저</strong>다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$6,000</span>
    <span class="stat-label">2025 중반 예상</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$10,000</span>
    <span class="stat-label">2025 연말 목표</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$12,000</span>
    <span class="stat-label">스카라무치 예측</span>
  </div>
</div>

<h3>🤖 ChatGPT가 분석한 ETH 전망</h3>

<blockquote>
"단기 저항선 돌파 시 6,000달러 확정. 현재 시장 역동성 유지되면 연말 10,000달러 가능" - ChatGPT 4.0
</blockquote>

<p>AI가 이더리움 강세 예측하는 이유? <strong>DeFi, NFT, RWA(실물자산 토큰화)</strong> 생태계가 폭발적으로 성장 중. 특히 RWA 시장이 2025년 대세가 될 거라는데, 이더리움이 독점하고 있음.</p>

<h3>📊 기관들이 ETH 사는 진짜 이유</h3>

<div class="chart-container">
  <p>🏦 <strong>1,900달러 = 매집 구간:</strong> 장기 투자자들이 182만 개 매입</p>
  <p>📈 <strong>스테이킹 수익률:</strong> 연 4~5% (은행 이자 때먹음)</p>
  <p>🎯 <strong>ETF 승인 임박:</strong> 스테이킹 ETF 나오면 대박</p>
</div>

<h3>🔥 트럼프 효과 실화냐?</h3>

<p>에드워드 윌슨(난센 분석가): <strong>"SEC 위원장 교체되면 스테이킹 ETF 바로 승인"</strong></p>

<p>이게 뭔 소리냐면:</p>
<ul>
  <li>지금 ETF는 이더리움 '보유'만 가능</li>
  <li>스테이킹 ETF 나오면 '보유 + 이자' 가능</li>
  <li>기관 자금 미친듯이 들어온다는 얘기</li>
</ul>

<h3>⚠️ 리스크 체크</h3>

<div class="highlight-box">
  <p>📉 <strong>단기 조정:</strong> 1월 ETF 3.5억 달러 유출 (일시적)</p>
  <p>🔧 <strong>기술 이슈:</strong> 가스비 아직도 비쌈 (Layer 2로 해결 중)</p>
  <p>🥊 <strong>경쟁:</strong> 솔라나, 수이 등 신규 체인 위협</p>
</div>

<h3>💡 MZ 액션 플랜</h3>

<blockquote>
<strong>지금 사야할까?</strong><br>
✅ 3,000달러 밑으로 떨어지면 무조건 매수<br>
✅ 6,000달러까지는 홀딩 (중간에 팔지 마)<br>
✅ 투자금의 30% 이상은 금지 (변동성 주의)<br>
⚠️ 단타 ❌ 장투 ⭕ (최소 1년 이상)
</blockquote>

<p><strong>한 줄 요약:</strong> "비트코인이 디지털 금이면, 이더리움은 디지털 부동산. 트럼프도 인정한 마당에 안 사면 바보 아님?"</p>
</div>`,
                date: '2025-08-16T09:00:00.000Z',
                readTime: 7,
                image: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 3,
                title: '위너즈 코인 바닥 찍었다? "800% 반등 예측"',
                category: 'coin',
                emoji: '🏆',
                excerpt: '격투기 스포츠 플랫폼 실사용 확대. 대표 직접 나서 생태계 복구 중! 분석가 "2025년 $0.03 가능"',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🏆 <strong>현재 위너즈(WNZ) 가격: $0.001</strong>
<span class="price-indicator">📊 바닥권 = 기회?</span>
</div>

<h2>🔥 위너즈, 이제 반등할 차례?</h2>

<p><strong>주목!</strong> 98% 폭락했던 위너즈 코인이 바닥을 다지고 있다.</p>

<p>대표가 직접 나서서 프로젝트 재건에 나섰고, 실제 사용처가 늘어나고 있다.</p>

<p>일부 분석가들은 "2025년 말 800% 상승 가능"이라고 전망한다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$0.001</span>
    <span class="stat-label">현재 바닥가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$0.029</span>
    <span class="stat-label">2025 목표가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">807%</span>
    <span class="stat-label">예상 상승률</span>
  </div>
</div>

<h3>🥊 격투기 플랫폼 실사용 확대</h3>

<blockquote>
"위너즈는 세계 최초 격투기 특화 블록체인 플랫폼. 선수, 클럽, 팬 모두가 혜택받는 생태계 구축 중" - 위너즈 백서
</blockquote>

<p>단순 코인이 아니라 <strong>실제 사용되는 플랫폼</strong>이다.</p>

<p>UFC, K-1 같은 격투기 이벤트 티켓팅과 NFT 마켓플레이스 준비 중.</p>

<h3>📈 반등 신호 포착</h3>

<div class="chart-container">
  <p>✅ <strong>거래량 증가:</strong> 일 거래량 11만 달러로 회복</p>
  <p>✅ <strong>바닥 다지기:</strong> $0.001에서 강한 지지선 형성</p>
  <p>✅ <strong>개발 활발:</strong> 깃허브 업데이트 지속</p>
  <p>✅ <strong>커뮤니티 회복:</strong> 텔레그램 활동 재개</p>
</div>

<h3>💎 대표의 진심 어린 노력</h3>

<ul>
  <li><strong>투명성 강화:</strong> 매주 AMA 진행</li>
  <li><strong>로드맵 공개:</strong> 2025년 하반기 대형 파트너십 예고</li>
  <li><strong>바이백 계획:</strong> 수익의 20% 코인 소각</li>
  <li><strong>보상 프로그램:</strong> 장기 홀더 에어드랍</li>
</ul>

<h3>🎯 왜 지금이 기회인가?</h3>

<div class="highlight-box" style="background: linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%);">
  <p>💡 <strong>바닥가 매수 기회:</strong> 더 떨어질 곳이 없다</p>
  <p>🚀 <strong>생태계 확장:</strong> 실제 격투기 이벤트 연동</p>
  <p>🔥 <strong>커뮤니티 부활:</strong> 다이아몬드 핸드들만 남음</p>
  <p>📊 <strong>기술적 반등:</strong> RSI 과매도 구간</p>
</div>

<h3>🏅 유명인들도 여전히 지지</h3>

<p>"처음엔 실망했지만, 팀이 진짜 일하는 걸 보니 희망이 보인다"</p>

<p>"장기적으로 보면 격투기 산업과 블록체인 융합은 대세"</p>

<p>"바닥에서 조금씩 모으는 중. 리스크 관리는 필수!"</p>

<h3>💰 MZ 투자 전략</h3>

<blockquote style="background: linear-gradient(135deg, #d4f4dd 0%, #86efac 100%); padding: 1.5rem; border-radius: 12px;">
<strong>🎯 위너즈 투자 가이드</strong><br>
✅ 소액 분산 투자 (포폴의 5% 이내)<br>
✅ $0.001에서 1차 매수<br>
✅ $0.003 돌파 시 추가 매수<br>
⚠️ 단기 변동성 높음. 장기 관점 필수
</blockquote>

<p><strong>한 줄 정리:</strong> "98% 빠진 위너즈, 이제 올라갈 일만 남았다? 격투기 플랫폼 실사용 늘면서 800% 반등 가능성. 소액으로 도전해볼만!"</p>
</div>`,
                date: '2025-08-15T09:00:00.000Z',
                readTime: 6,
                image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 4,
                title: '솔라나 298달러 간다! "2025년 새로운 ATH 전망"',
                category: 'coin',
                emoji: '☀️',
                excerpt: '초당 5만건 처리, 수수료 0.001달러. DEX 거래량 폭발! 전문가 "연말 298달러 신고점 예상"',
                content: `<div class="content-wrapper">
<div class="highlight-box">
☀️ <strong>현재 솔라나 가격: $143</strong> (2025년 3월)
<span class="price-indicator">1월 $231 → 3월 $143 (조정 중)</span>
</div>

<h2>🚀 솔라나 2025년 폭등 시나리오</h2>

<p><strong>진짜 미친 속도!</strong> 초당 50,000건 처리하면서 수수료는 겨우 <strong>0.001달러</strong>. 이더리움이 10-50달러인 거 생각하면 말도 안 되는 가격. 이래서 "이더리움 킬러"라고 부르는 거다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$298</span>
    <span class="stat-label">2025년 목표가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$530</span>
    <span class="stat-label">낙관적 전망</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$1,000</span>
    <span class="stat-label">2030년 예측</span>
  </div>
</div>

<h3>📊 왜 지금 솔라나인가?</h3>

<blockquote>
"비트코인 반감기 효과 + 규제 명확성 = 2025년 솔라나 신고점 298달러" - 크립토뉴스 분석
</blockquote>

<p>최근 솔라나 기반 <strong>DEX 거래량이 미쳤다!</strong> 레이디움, 오르카 같은 DEX들이 매일 수십억 달러 거래. 왜? 빠르고 싸니까. 이더리움에서 100달러 수수료 낼 돈으로 솔라나에선 10만 번 거래 가능ㅋㅋ</p>

<h3>🔥 솔라나만의 킬링 포인트</h3>

<div class="chart-container">
  <p>⚡ <strong>속도:</strong> TPS 50,000 (이더리움 30 vs 솔라나 50,000)</p>
  <p>💰 <strong>수수료:</strong> $0.001 (커피값보다 싸다)</p>
  <p>🎮 <strong>게임/NFT:</strong> 스타아틀라스, 오렐리 등 대작 게임 런칭</p>
  <p>📱 <strong>모바일:</strong> Saga 폰 출시로 Web3 대중화</p>
</div>

<h3>⚠️ 리스크는 있다</h3>

<ul>
  <li><strong>네트워크 정전:</strong> 2025년 새 검증자 클라이언트로 해결 예정</li>
  <li><strong>중앙화 논란:</strong> 노드 운영 비용 높아서 소수만 운영</li>
  <li><strong>FTX 잔재:</strong> SBF 연관성은 이제 거의 청산됨</li>
</ul>

<h3>📈 전문가들 전망</h3>

<div class="highlight-box">
  <p>💎 <strong>2025년 전망:</strong></p>
  <ul>
    <li>보수적: $117 ~ $203</li>
    <li>중립적: $200 평균</li>
    <li>낙관적: $459 ~ $530</li>
  </ul>
  <p>📌 <strong>2030년:</strong> $580 ~ $3,000 (시장 상황에 따라)</p>
</div>

<h3>🎯 MZ 투자 전략</h3>

<blockquote>
<strong>솔라나 투자 체크리스트</strong><br>
✅ 143달러는 매수 타이밍 (1월 고점 대비 -38%)<br>
✅ 200달러 돌파 시 추가 매수<br>
✅ 포트폴리오의 10-15% 이내로 제한<br>
⚠️ 변동성 크니까 분할 매수 필수!
</blockquote>

<p><strong>한 줄 정리:</strong> "이더리움이 벤츠라면 솔라나는 테슬라. 빠르고 싸고 혁신적. 근데 가끔 서버 다운됨ㅋㅋ"</p>
</div>`,
                date: '2025-08-14T09:00:00.000Z',
                readTime: 7,
                image: 'https://images.unsplash.com/photo-1620541250720-cb7f1c13047f?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 5,
                title: '테슬라 714달러 목표가? "머스크 퇴진 시 -25% 경고"',
                category: 'stock',
                emoji: '🚗',
                excerpt: '2025년 30% 폭락 후 반등 조짐. FSD 6월 출시, 로보택시 임박! 근데 머스크가 정치질하면 주가 털림',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🚗 <strong>현재 테슬라 주가: $339</strong> (2025년 8월)
<span class="price-indicator price-down">📉 -30% (연초 대비)</span>
</div>

<h2>😱 테슬라 망했나? 아니다!</h2>

<p><strong>숫자가 충격적이다.</strong> 2025년 1분기 순이익 <strong>71% 폭락</strong>, 유럽 판매 <strong>45% 감소</strong>. 주가는 연초 대비 30% 빠졌다. 근데 게리 블랙(Future Fund)은 왜 목표가 <strong>714달러</strong>라고 하는 걸까?</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$714</span>
    <span class="stat-label">2029년 목표가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">-25%</span>
    <span class="stat-label">머스크 퇴진 시</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$422</span>
    <span class="stat-label">단기 목표가</span>
  </div>
</div>

<h3>📉 왜 이렇게 털렸나?</h3>

<blockquote>
"유럽에서 테슬라 1월 판매 9,945대... 작년 대비 -45%" - 유럽자동차제조사협회
</blockquote>

<ul>
  <li><strong>중국 BYD 추격:</strong> 가격은 절반, 성능은 비슷</li>
  <li><strong>정치 리스크:</strong> 머스크 트럼프 지지로 진보층 이탈</li>
  <li><strong>FSD 지연:</strong> "완전자율주행" 아직도 미완성</li>
  <li><strong>내부자 매도:</strong> 이사진이 7,650만 달러어치 팔아치움</li>
</ul>

<h3>🚀 그래도 살 이유가 있다?</h3>

<div class="chart-container">
  <p>🤖 <strong>FSD 무인 주행:</strong> 2025년 6월 오스틴에서 시작</p>
  <p>🚕 <strong>로보택시:</strong> 2025년 하반기 상용화 예정</p>
  <p>🔋 <strong>에너지 사업:</strong> 테슬라는 이제 배터리 회사</p>
  <p>💰 <strong>저가 모델:</strong> 2025년 1분기 생산 시작</p>
</div>

<h3>⚠️ 머스크 리스크 실화냐</h3>

<p>게리 블랙 경고: <strong>"머스크 나가면 주가 25% 증발, 시총 2,200억 달러 날아간다"</strong></p>

<p>최근 3개월간 내부자 매도:</p>
<ul>
  <li>로빈 덴홀름(회장): 22만주, 7,690만 달러</li>
  <li>킴벌 머스크(동생): 7.5만주, 2,760만 달러</li>  
  <li>CFO: 450만 달러어치 처분</li>
</ul>

<p>머스크는 "팔지 마라" 하면서 임원들은 팔고 있다? 🤔</p>

<h3>📊 애널리스트 전망</h3>

<div class="highlight-box">
  <p><strong>월가 평균 목표가: $306</strong></p>
  <ul>
    <li>최고: $500 (강력 매수)</li>
    <li>최저: $115 (강력 매도)</li>
    <li>18명 매수 vs 10명 매도 = 중립</li>
  </ul>
</div>

<h3>💡 MZ 투자 전략</h3>

<blockquote>
<strong>테슬라 투자 체크포인트</strong><br>
✅ 300달러 밑 = 분할 매수 시작<br>
✅ FSD/로보택시 성공 시 = 추가 매수<br>
⚠️ 머스크 정치 활동 = 리스크 모니터링<br>
❌ 전 재산 올인 = 절대 금지!
</blockquote>

<p><strong>한 줄 정리:</strong> "테슬라는 자동차 회사가 아니라 AI/에너지 회사. 근데 CEO가 트위터에서 정치질하면 주가 털림ㅋㅋ"</p>
</div>`,
                date: '2025-08-13T09:00:00.000Z',
                readTime: 8,
                image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 6,
                title: '🚨 삼성전자 테슬라 22.8조 수주! "AI 반도체 대반격 시작"',
                category: 'stock',
                emoji: '📱',
                excerpt: '테슬라 AI6 칩 독점 생산권 따냈다! 머스크 "165억 달러는 시작일 뿐". 2나노 수율 60% 돌파하면 TSMC 추월 가능?',
                content: `<div class="content-wrapper">
<div class="highlight-box">
📱 <strong>현재 삼성전자 주가: 55,800원</strong> (2025년 8월)
<span class="price-indicator price-up">📈 테슬라 수주 소식에 +5.2%</span>
</div>

<h2>💥 삼성, 드디어 터졌다!</h2>

<p><strong>대박 났다!</strong> 삼성전자가 <strong>테슬라 AI6 칩 22.8조원</strong> 수주 따냈다.</p>

<p>머스크가 직접 발표했다. "삼성이 우리 차세대 AI6 칩 만든다"고.</p>

<p>이게 얼마나 큰 건지 아냐? 삼성 작년 매출의 <strong>7.6%</strong>가 한 방에 들어온 거다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">22.8조원</span>
    <span class="stat-label">계약 규모</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">8년</span>
    <span class="stat-label">계약 기간</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">2나노</span>
    <span class="stat-label">생산 공정</span>
  </div>
</div>

<h3>🔥 머스크 "165억 달러는 최소한"</h3>

<blockquote>
"실제 생산량은 이보다 몇 배 높을 것. 도조 슈퍼컴퓨터, 로보택시, 휴머노이드 로봇 다 들어간다" - 일론 머스크
</blockquote>

<p>미친 거 아니야? 테슬라가 삼성한테 <strong>AI 미래를 통째로 맡긴 거다.</strong></p>

<p>텍사스 테일러 공장에서 2025년 7월부터 생산 시작. TSMC 애리조나 공장이랑 정면 승부다.</p>

<h3>⚡ 근데 수율은 괜찮아?</h3>

<div class="chart-container">
  <p>📊 <strong>2나노 수율:</strong> 삼성 40% → 60% (목표)</p>
  <p>🏆 <strong>TSMC:</strong> 현재 60-70% (여전히 앞서)</p>
  <p>🎯 <strong>목표:</strong> 2026년까지 70% 돌파</p>
</div>

<p>솔직히 TSMC가 아직 앞서긴 해. 근데 삼성이 <strong>GAA 기술</strong> 세계 최초로 썼잖아.</p>

<p>수율만 잡으면 게임 끝이야. 테슬라 물량으로 경험 쌓으면 금방 따라잡는다.</p>

<h3>🎯 HBM도 반격 시작</h3>

<ul>
  <li><strong>AMD와 계약:</strong> HBM3E 공급 확정</li>
  <li><strong>36GB HBM3E:</strong> 업계 최초 12단 개발</li>
  <li><strong>가격 인하:</strong> SK하이닉스보다 20% 싸게</li>
</ul>

<p>엔비디아한테 까였지만 AMD 잡았다. 이것도 작은 거 아니야.</p>

<h3>📈 파운드리 점유율 변화</h3>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">7.7%</span>
    <span class="stat-label">현재 점유율</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">15%</span>
    <span class="stat-label">2026년 목표</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">67.6%</span>
    <span class="stat-label">TSMC (여전히 1위)</span>
  </div>
</div>

<h3>🚀 엑시노스는 어떻게 됐어?</h3>

<blockquote>
"엑시노스 2500 발열 문제로 S25 탑재 무산. 2600에 히트패스블록 기술 도입 중" - 업계 관계자
</blockquote>

<p>이건 좀 아쉽네. 근데 2600은 진짜 다를 거라고 하던데?</p>

<h3>💰 주가 전망</h3>

<div class="highlight-box">
  <h4>삼성전자 시나리오 분석</h4>
  <ul>
    <li>🚀 <strong>낙관적:</strong> 테슬라 추가 수주 시 7만원 돌파</li>
    <li>📊 <strong>중립적:</strong> 현재 5만원대 박스권 유지</li>
    <li>📉 <strong>비관적:</strong> 수율 실패 시 4만원대 하락</li>
  </ul>
</div>

<h3>💡 MZ 투자 전략</h3>

<blockquote>
<strong>지금이 기회인 이유</strong><br>
✅ 5만원대 = 10년 최저점 수준<br>
✅ 테슬라 수주 = 게임 체인저<br>
✅ AI 시대 메모리 수요 폭발<br>
⚠️ 단기 변동성 크니까 분할 매수!
</blockquote>

<p><strong>한 줄 정리:</strong> "삼성이 드디어 일 냈다! 테슬라 22조 먹고 TSMC 추격 시작. 5만원대가 마지막 승차 기회일지도?"</p>
</div>`,
                date: '2025-08-12T09:00:00.000Z',
                readTime: 7,
                image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 7,
                title: '🏠 서울 아파트 10채 중 3채가 15억 넘었다 "마용성 MZ 몰린다"',
                category: 'economy',
                emoji: '🏠',
                excerpt: '성동구 MZ 비율 43% 역대 최고! 마포 평균가 15억 돌파. 경기도 하남시 175% 폭등. 부동산 조각투자로 월 6% 받는 법',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🏠 <strong>서울 아파트 평균가: 14억 572만원</strong> (2025년 7월)
<span class="price-indicator price-up">📈 3개월 새 1억원 상승</span>
</div>

<h2>🤯 서울 10채 중 3채가 15억 넘었다</h2>

<p><strong>충격적이다.</strong> 서울 아파트 <strong>27.7%가 15억원 초과</strong> 거래됐다.</p>

<p>2019년엔 10.6%였는데 3배 가까이 뛴 거야. 강남? 84.3%가 15억 넘어.</p>

<p>서초구는 더 심해. <strong>83.6%</strong>가 15억 초과. 사실상 15억 밑은 없다고 봐야 돼.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">27.7%</span>
    <span class="stat-label">15억 초과 비율</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">31.4억</span>
    <span class="stat-label">서초구 84㎡</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">27억</span>
    <span class="stat-label">강남구 84㎡</span>
  </div>
</div>

<h3>🔥 MZ는 왜 마용성으로 가나?</h3>

<blockquote>
"성동구 아파트 거래 중 20-30대 비율 43%, 서울 최고" - 부동산R114
</blockquote>

<div class="chart-container">
  <p>📍 <strong>성동구:</strong> MZ 비율 43% (서울 1위)</p>
  <p>📍 <strong>마포구:</strong> MZ 비율 38.5%</p>
  <p>📍 <strong>용산구:</strong> 전년 대비 2배 증가</p>
  <p>💡 <strong>이유:</strong> 직주근접 (출퇴근 30분 이내)</p>
</div>

<p>한국갤럽 조사 봐봐. 20-34세 60%가 "집 살 때 직주근접이 최우선"이래.</p>

<p>맞벌이에 주52시간 근무하는데 출퇴근 2시간? 미친 짓이지.</p>

<h3>🚀 경기도 폭등 지역 TOP 5</h3>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">174.7%</span>
    <span class="stat-label">하남시 상승률</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">163.9%</span>
    <span class="stat-label">과천시 상승률</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">115.7%</span>
    <span class="stat-label">성남시 상승률</span>
  </div>
</div>

<ul>
  <li><strong>하남시:</strong> 미사강변도시, 위례신도시 개발 (송파 인접)</li>
  <li><strong>과천시:</strong> 준강남, 국민평형 20억 돌파</li>
  <li><strong>성남시:</strong> 분당·판교 IT바이오 중심지</li>
  <li><strong>화성시:</strong> 104.7% 상승, GTX 호재</li>
</ul>

<h3>💰 MZ 전세 전략 변화</h3>

<blockquote>
"MZ 76.4%가 월세보다 전세 선호. 전세대출 이자가 월세보다 싸서" - 한국부동산원
</blockquote>

<p>49.6%는 "월세 지출 원치 않음", 39.2%는 "전세 대출이 더 경제적"이래.</p>

<p>근데 전세도 비싸잖아? 그래서 나온 게 <strong>'손품' 투자</strong>다.</p>

<h3>🎯 부동산 조각투자 열풍</h3>

<div class="highlight-box" style="background: linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%);">
  <p><strong>💎 1만원으로 건물주 되기</strong></p>
  <ul>
    <li><strong>상업용 부동산:</strong> 연 6% 배당</li>
    <li><strong>규제 없음:</strong> 정부 규제 적용 X</li>
    <li><strong>리츠 ETF:</strong> 주식처럼 사고팔기 가능</li>
  </ul>
  <p>월 100만원 투자 → 연 72만원 배당 (세전)</p>
</div>

<h3>📊 정부 대책이 역효과?</h3>

<blockquote>
"15억 초과 아파트 LTV 50% 허용 → 고가 아파트 거래 늘어 집값 더 올라" - 부동산 전문가
</blockquote>

<p>2024년 12월부터 규제지역 15억 초과도 대출 가능해졌어.</p>

<p>근데 이게 오히려 부자들한테만 유리한 거 아니야? 집값만 더 올랐잖아.</p>

<h3>💡 MZ 현실적 대안</h3>

<div class="highlight-box">
  <h4>🎯 지금 당장 할 수 있는 것</h4>
  <ul>
    <li>✅ 마용성 전세 → 경기 접경지 매매</li>
    <li>✅ GTX 역세권 노려라</li>
    <li>✅ 부동산 조각투자, 리츠로 시작</li>
    <li>✅ 전세 대출 활용 (월세보다 유리)</li>
    <li>✅ 2026-27년 공급 부족 대비</li>
  </ul>
</div>

<h3>🚨 2026년까지 상승 전망</h3>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">5,850</span>
    <span class="stat-label">2025 상반기 입주</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">-61.2%</span>
    <span class="stat-label">전년 대비 감소</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">2027년</span>
    <span class="stat-label">공급 회복 예상</span>
  </div>
</div>

<blockquote>
💡 <strong>Pro Tip:</strong> "서울은 이제 상속 아니면 못 산다. 경기도 GTX 역세권이나 부동산 조각투자가 답이다"
</blockquote>

<p><strong>한 줄 정리:</strong> "서울 27.7%가 15억 넘었다. MZ는 마용성 전세 살면서 리츠로 월 6% 받자. 집값? 포기하면 편해"</p>
</div>`,
                date: '2025-08-11T09:00:00.000Z',
                readTime: 8,
                image: 'https://images.unsplash.com/photo-1624811532681-e58a7e25f273?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 8,
                title: '💊 한미약품 44만원 간다? "GLP-1 삼중작용제 체중 -40% 성공"',
                category: 'stock',
                emoji: '💊',
                excerpt: '노보 위고비 -15%, 릴리 젭바운드 -25% 압도! 한미약품 HM15275 전임상 대박. 삼바로 위탁생산 1조 4천억 수주',
                content: `<div class="content-wrapper">
<div class="highlight-box">
💊 <strong>GLP-1 시장 규모: 700억 달러</strong> (2025년)
<span class="price-indicator price-up">📈 102조원 시장, 한국 기업 도전</span>
</div>

<h2>🚀 한미약품 체중 -40% 신화 쓴다</h2>

<p><strong>대박이다!</strong> 한미약품 삼중작용제가 <strong>체중 39.9% 감량</strong> 성공했다.</p>

<p>노보 위고비 -15%, 릴리 젭바운드 -25.3%인데 거의 2배야.</p>

<p>GLP-1/GIP/GCG 삼중작용? 쉽게 말하면 <strong>식욕+지방연소+대사</strong> 3개 다 잡는다는 거다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">-39.9%</span>
    <span class="stat-label">체중 감량</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">28.3만원</span>
    <span class="stat-label">현재 주가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">44만원</span>
    <span class="stat-label">목표 주가</span>
  </div>
</div>

<h3>🏆 국내 GLP-1 대장주 TOP 5</h3>

<h4>1️⃣ 한미약품 (128940) - 절대 강자</h4>
<div class="chart-container">
  <p>💊 <strong>HM15275:</strong> 삼중작용제, 체중 -39.9%</p>
  <p>🇺🇸 <strong>미국 임상:</strong> 1상 진행 중 (2025.4 종료)</p>
  <p>💰 <strong>머크 수출:</strong> efinopegdutide MASH 임상 2b</p>
  <p>🎯 <strong>2027년:</strong> 국내 출시 예정</p>
</div>

<blockquote>
"한미약품 삼중작용제가 게임체인저. 노보, 릴리 압도하는 효과" - NH투자증권
</blockquote>

<h4>2️⃣ 삼성바이오로직스 - 위탁생산 왕</h4>
<ul>
  <li><strong>5공장:</strong> 2025년 완공, 총 78.4만L (세계 1위)</li>
  <li><strong>노보 후보:</strong> 위고비 아시아 생산기지</li>
  <li><strong>수주 대박:</strong> 1조 4,637억원 계약</li>
</ul>

<h4>3️⃣ HLB생명과학 - 펩타이드 강자</h4>
<div class="highlight-box" style="background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);">
  <p>🏭 <strong>애니젠 인수:</strong> 600억원, 펩타이드 GMP 공장</p>
  <p>💊 <strong>5,000가지:</strong> 펩타이드 소재 보유</p>
  <p>🚀 <strong>장기지속형:</strong> 주사제 개발 중</p>
</div>

<h4>4️⃣ 펩트론 (087010) - 지속형 선구자</h4>
<p>지속형 GLP-1R 작용제로 <strong>월 1회 주사</strong> 개발 중. 편의성 극대화!</p>

<h4>5️⃣ 인벤티지랩 (389470) - 2개월 지속</h4>
<p><strong>IVL3005:</strong> 2개월 지속형 (업계 최장). 년 6번만 맞으면 끝!</p>

<h3>💰 글로벌 vs 한국 기업</h3>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$413B</span>
    <span class="stat-label">노보 시총</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">552조원</span>
    <span class="stat-label">유럽 1위</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">7천만명</span>
    <span class="stat-label">2028년 사용자</span>
  </div>
</div>

<h3>🎯 숨은 한국 수혜주</h3>

<ul>
  <li><strong>대웅제약:</strong> 패치형 비만치료제 (바늘 공포증 해결)</li>
  <li><strong>유한양행:</strong> FDA 허가 기대, 내분비 특화</li>
  <li><strong>한독:</strong> 리라글루타이드, 하루 1회 투여</li>
</ul>

<h3>📊 왜 한미약품인가?</h3>

<div class="chart-container">
  <p>✅ <strong>삼중작용제:</strong> 경쟁사 대비 2배 효과</p>
  <p>✅ <strong>머크 계약:</strong> 글로벌 빅파마 인정</p>
  <p>✅ <strong>2027 출시:</strong> 국내 최초 GLP-1 상용화</p>
  <p>✅ <strong>상승여력:</strong> 현재가 대비 55%</p>
</div>

<h3>⚠️ 투자 리스크</h3>

<div class="chart-container" style="background: #fee2e2;">
  <p>❌ <strong>임상 실패:</strong> 1상 결과 나빠지면 폭락</p>
  <p>❌ <strong>경쟁 심화:</strong> 조제 GLP-1 저가 공세</p>
  <p>❌ <strong>부작용:</strong> 췌장염, 갑상선암 우려</p>
  <p>❌ <strong>보험:</strong> 건보 적용 불투명</p>
</div>

<h3>💡 MZ 투자 전략</h3>

<blockquote>
<strong>K-바이오 GLP-1 포트폴리오</strong><br>
✅ 한미약품 40% (대장주)<br>
✅ 삼바로 30% (위탁생산)<br>
✅ HLB/펩트론 20% (기술주)<br>
✅ 대웅/유한 10% (다크호스)<br>
⚠️ 바이오는 도박! 여윳돈만 투자
</blockquote>

<h3>🔮 2030년 전망</h3>

<div class="highlight-box">
  <p><strong>시장 규모:</strong> 1,000억 달러 (145조원)</p>
  <p><strong>GDP 영향:</strong> 미국 GDP 1% 상승 예상</p>
  <p><strong>한국 기업:</strong> 글로벌 시장 5% 점유 목표</p>
</div>

<p><strong>한 줄 정리:</strong> "한미약품이 체중 -40% 신약 만들었다. 노보, 릴리 제쳤다고? 주가 44만원 가즈아!"</p>
</div>`,
                date: '2025-08-10T09:00:00.000Z',
                readTime: 9,
                image: 'https://images.unsplash.com/photo-1585241936939-be4099591252?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 9,
                title: '🚨 비트코인 12만 달러에서 3만 달러로? "역대급 대폭락 온다"',
                category: 'hot',
                emoji: '⚠️',
                excerpt: '해리 덴트 "엔비디아 98% 폭락, 나스닥 -86%, 비트코인 -75% 예측". 기요사키도 동의! 근데 매번 틀렸던 사람들인데?',
                content: `<div class="content-wrapper">
<div class="highlight-box" style="background: linear-gradient(135deg, #fee2e2 0%, #ef4444 100%);">
⚠️ <strong>폭락 경고: 비트코인 3만 달러, 엔비디아 -98%</strong>
<span class="price-indicator price-down">해리 덴트 & 로버트 기요사키 예측</span>
</div>

<h2>💣 "역사상 최악의 폭락이 온다"</h2>

<p><strong>또 시작이다.</strong> 해리 덴트가 이번엔 진짜라며 <strong>"모든 것이 폭락한다"</strong>고 경고했다.</p>

<p>비트코인 12만 달러? <strong>3만 달러로 간다.</strong> 엔비디아? <strong>98% 폭락.</strong> 나스닥? <strong>86% 증발.</strong></p>

<p>로버트 기요사키도 거들었다. "역사상 가장 큰 폭락에 대비하라"고.</p>

<p>근데 이 사람들... <strong>10년째 폭락 예언 중인데 매번 틀렸다.</strong></p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$30,000</span>
    <span class="stat-label">BTC 목표가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">-98%</span>
    <span class="stat-label">NVDA 폭락</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">-86%</span>
    <span class="stat-label">나스닥 예상</span>
  </div>
</div>

<h3>😱 덴트의 시나리오</h3>

<blockquote>
"세 종목 모두 상승세지만 하락 추세선 안에 있다. 이런 패턴은 역사적으로 급격한 조정 전에 나타났다" - 해리 덴트
</blockquote>

<p><strong>덴트 주장 요약:</strong></p>
<ul>
  <li>🔴 장기 금융 사이클 정점 도달</li>
  <li>🔴 AI 버블 = 닷컴 버블 2.0</li>
  <li>🔴 암호화폐 = 순수 투기 자산</li>
  <li>🔴 유동성 축소로 대량 매도 임박</li>
</ul>

<h3>🤡 근데 이 사람들 예측 성적표는?</h3>

<div class="chart-container" style="background: #fef3c7;">
  <p><strong>해리 덴트의 과거 예측:</strong></p>
  <p>❌ 2011년: "다우 3,000 간다" → 실제: 3만 돌파</p>
  <p>❌ 2016년: "다우 6,000 폭락" → 실제: 사상 최고</p>
  <p>❌ 2020년: "비트코인 제로" → 실제: 12만 달러</p>
  <p>❌ 2023년: "S&P 2,000" → 실제: 6,000 돌파</p>
</div>

<div class="chart-container" style="background: #dbeafe;">
  <p><strong>기요사키 예측:</strong></p>
  <p>✅ 2008년 금융위기 예측 (맞음)</p>
  <p>❌ 2012년: "하이퍼인플레이션" → 실제: 디플레</p>
  <p>❌ 2019년: "대폭락 임박" → 실제: 강세장</p>
  <p>✅ 비트코인 10만 달러 (맞음)</p>
</div>

<h3>📊 실제 데이터는 뭐라고 할까?</h3>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$4.2T</span>
    <span class="stat-label">글로벌 유동성 증가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">3.2%</span>
    <span class="stat-label">미국 GDP 성장</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">110%</span>
    <span class="stat-label">AI 수요 증가율</span>
  </div>
</div>

<h3>🎭 폭락론자 vs 현실</h3>

<div class="highlight-box">
  <h4>폭락론자들 주장</h4>
  <ul>
    <li>📉 "차트 패턴이 2000년 닷컴과 똑같다"</li>
    <li>📉 "밸류에이션 역사상 최고 수준"</li>
    <li>📉 "개미들 레버리지 사상 최대"</li>
  </ul>
  
  <h4>반박 논리</h4>
  <ul>
    <li>📈 AI는 인터넷보다 큰 혁명</li>
    <li>📈 기업 실적 역대 최고 갱신 중</li>
    <li>📈 연준 금리 인하 사이클 시작</li>
  </ul>
</div>

<h3>⚠️ 그래도 주의할 점은?</h3>

<blockquote>
"맨날 틀리는 시계도 하루에 두 번은 맞는다" - 월가 격언
</blockquote>

<ul>
  <li><strong>단기 조정 가능성:</strong> 10-20% 조정은 언제든 가능</li>
  <li><strong>레버리지 청산:</strong> 비트코인 10만 달러 밑 대량 청산</li>
  <li><strong>지정학적 리스크:</strong> 중동, 우크라이나 상황</li>
  <li><strong>블랙스완:</strong> 예측 못한 사건은 항상 존재</li>
</ul>

<h3>💡 MZ 대응 전략</h3>

<div class="chart-container">
  <h4>🟢 강세론자라면</h4>
  <ul>
    <li>조정 시 추가 매수 준비</li>
    <li>현금 20-30% 보유</li>
    <li>우량주 위주 투자</li>
  </ul>
  
  <h4>🔴 약세론자라면</h4>
  <ul>
    <li>헤지 포지션 구축</li>
    <li>금, 달러 비중 확대</li>
    <li>단기 국채 투자</li>
  </ul>
</div>

<h3>🎯 현실적 시나리오</h3>

<div class="highlight-box" style="background: linear-gradient(135deg, #d4f4dd 0%, #86efac 100%);">
  <p><strong>가장 가능성 높은 시나리오 (70%)</strong></p>
  <ul>
    <li>✅ 단기 10-15% 조정 후 재상승</li>
    <li>✅ 비트코인 9만 달러 지지선 테스트</li>
    <li>✅ 엔비디아 일시적 조정 후 회복</li>
    <li>✅ 2025년 하반기 신고점 경신</li>
  </ul>
</div>

<h3>😂 MZ식 해석</h3>

<blockquote>
<strong>덴트 & 기요사키 번역기:</strong><br>
"폭락 온다" = 나 책/강연 팔아야 됨<br>
"98% 하락" = 클릭수 필요함<br>
"역사상 최악" = 10년째 같은 소리<br>
"금 사라" = 내가 금 많이 샀음
</blockquote>

<p><strong>한 줄 정리:</strong> "늑대가 왔어요 10년째 외치는 할배들. 언젠간 맞겠지만 그때까지 얼마나 더 올라갈지는 아무도 몰라. 적당히 경계하되 공포에 팔지 마!"</p>
</div>`,
                date: '2025-08-25T09:00:00.000Z',
                readTime: 8,
                image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 10,
                title: '🎮 로블록스 주가 30% 폭락! "메타버스 거품 꺼지나"',
                category: 'stock',
                emoji: '🎮',
                excerpt: '일일 활성 사용자 8800만 명 돌파했는데 왜 폭락? 수익성 우려에 투자자 이탈. 그래도 Z세대 점유율 50% 넘어',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🎮 <strong>현재 로블록스 주가: $39.5</strong>
<span class="price-indicator price-down">📉 -30% (3개월)</span>
</div>

<h2>😱 로블록스 망했나? 아니다!</h2>

<p><strong>숫자는 좋은데 주가는 왜?</strong> DAU(일일 활성 사용자) <strong>8,880만 명</strong> 역대 최고 찍었는데 주가는 30% 폭락했다.</p>

<p>월가가 걱정하는 건? <strong>"언제 돈 벌어?"</strong> 이거 하나다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">8,880만</span>
    <span class="stat-label">DAU (역대 최고)</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">-$282M</span>
    <span class="stat-label">분기 순손실</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">51%</span>
    <span class="stat-label">Z세대 점유율</span>
  </div>
</div>

<h3>💸 왜 적자인가?</h3>

<ul>
  <li><strong>개발자 수수료:</strong> 매출의 25% 개발자에게 지급</li>
  <li><strong>인프라 비용:</strong> 9천만 명 동시접속 서버 유지비</li>
  <li><strong>AI 투자:</strong> 생성형 AI 게임 제작 툴 개발</li>
  <li><strong>안전 시스템:</strong> 미성년자 보호 시스템 구축</li>
</ul>

<h3>🚀 그래도 미래는 밝다</h3>

<blockquote>
"로블록스는 게임이 아니라 플랫폼이다. 유튜브처럼 될 것" - 아크 인베스트
</blockquote>

<p><strong>한 줄 정리:</strong> "적자지만 사용자는 폭증 중. 수익 모델만 찾으면 대박. 근데 그게 언제?"</p>
</div>`,
                date: '2025-08-09T09:00:00.000Z',
                readTime: 5,
                image: 'https://images.unsplash.com/photo-1610795224311-d002f8516119?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 11,
                title: '💰 금 온스당 3000달러 간다! "연준 금리인하 + 중앙은행 매집"',
                category: 'economy',
                emoji: '💰',
                excerpt: '2025년 금값 사상 최고 경신. 중국 중앙은행 5개월 연속 매입! 전문가 "안전자산 수요 폭발, 3000달러 돌파 임박"',
                content: `<div class="content-wrapper">
<div class="highlight-box">
💰 <strong>현재 금 가격: $2,735/oz</strong>
<span class="price-indicator price-up">📈 +31% (연초 대비)</span>
</div>

<h2>🏆 금이 미쳤다! 역대 최고가 경신</h2>

<p><strong>금이 날아간다!</strong> 온스당 <strong>$2,735</strong> 돌파하며 역대 최고가 갱신 중.</p>

<p>중국 인민은행이 5개월 연속 금 사재기. 러시아도 가세했다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$3,000</span>
    <span class="stat-label">2025 목표가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">+31%</span>
    <span class="stat-label">YTD 수익률</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">1,040톤</span>
    <span class="stat-label">중앙은행 매입량</span>
  </div>
</div>

<h3>📈 왜 금이 뜨나?</h3>

<ul>
  <li><strong>연준 금리인하:</strong> 2025년 3번 인하 예정</li>
  <li><strong>달러 약세:</strong> DXY 지수 102 → 98 하락</li>
  <li><strong>지정학 리스크:</strong> 중동, 우크라이나 불안</li>
  <li><strong>인플레 헤지:</strong> 실질금리 마이너스 전환</li>
</ul>

<blockquote>
"금은 화폐가 아니라 보험이다. 불확실할 때 금을 사라" - 레이 달리오
</blockquote>

<p><strong>한 줄 정리:</strong> "중앙은행들이 달러 버리고 금 사재기 중. 3000달러는 시간문제"</p>
</div>`,
                date: '2025-08-08T09:00:00.000Z',
                readTime: 5,
                image: 'https://images.unsplash.com/photo-1593380090147-a2192b72f9ae?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 12,
                title: '🍎 애플 주가 250달러? "AI폰 출시로 슈퍼사이클 온다"',
                category: 'stock',
                emoji: '🍎',
                excerpt: '아이폰 17 AI 기능 대폭 강화. 온디바이스 AI로 프라이버시 차별화! 웨드부시 "2025년 5억대 판매 예상"',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🍎 <strong>현재 애플 주가: $237</strong>
<span class="price-indicator price-up">📈 시총 3.68조 달러</span>
</div>

<h2>📱 애플 인텔리전스가 게임체인저</h2>

<p><strong>드디어 AI 아이폰!</strong> 애플이 <strong>온디바이스 AI</strong>로 승부수 던졌다.</p>

<p>ChatGPT 통합, 시리 2.0, 이미지 생성까지. 전부 폰 안에서 처리된다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$250</span>
    <span class="stat-label">목표 주가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">5억대</span>
    <span class="stat-label">2025 판매 예상</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">27%</span>
    <span class="stat-label">교체 주기 도래</span>
  </div>
</div>

<h3>🤖 애플 AI가 다른 이유</h3>

<ul>
  <li><strong>프라이버시:</strong> 데이터 클라우드 안 보냄</li>
  <li><strong>M4 칩:</strong> 뉴럴 엔진 2배 강화</li>
  <li><strong>생태계:</strong> 맥, 아이패드 연동</li>
  <li><strong>개발자:</strong> AI 앱스토어 생태계</li>
</ul>

<blockquote>
"아이폰 17이 슈퍼사이클 트리거. 10억 명이 업그레이드 대기 중" - 웨드부시
</blockquote>

<p><strong>한 줄 정리:</strong> "AI 아이폰으로 5억대 팔면 주가 250달러. 삼성 긴장해야 될 듯"</p>
</div>`,
                date: '2025-08-07T09:00:00.000Z',
                readTime: 5,
                image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 13,
                title: '🏦 리플(XRP) 10달러 간다? "SEC 소송 종결 임박"',
                category: 'coin',
                emoji: '⚡',
                excerpt: 'SEC 의장 교체로 3년 소송 끝? 리플 CEO "곧 좋은 소식". 국제송금 시장 7조 달러 노린다!',
                content: `<div class="content-wrapper">
<div class="highlight-box">
⚡ <strong>현재 XRP 가격: $2.43</strong>
<span class="price-indicator price-up">📈 +380% (6개월)</span>
</div>

<h2>🚀 리플 자유의 몸 되나?</h2>

<p><strong>3년 지옥 끝!</strong> SEC 게리 겐슬러 의장 1월 퇴임 확정.</p>

<p>트럼프가 약속한 <strong>"암호화폐 친화적 SEC"</strong> 현실화되면 XRP 날아간다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$10</span>
    <span class="stat-label">2025 목표가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$7T</span>
    <span class="stat-label">송금 시장 규모</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">3초</span>
    <span class="stat-label">송금 속도</span>
  </div>
</div>

<h3>💸 왜 XRP인가?</h3>

<ul>
  <li><strong>속도:</strong> 3초 (비트코인 10분)</li>
  <li><strong>수수료:</strong> $0.0002 (거의 무료)</li>
  <li><strong>파트너:</strong> 300개 은행 제휴</li>
  <li><strong>CBDC:</strong> 20개국 디지털화폐 협력</li>
</ul>

<blockquote>
"SEC 소송 끝나면 XRP가 SWIFT 대체한다" - 브래드 갈링하우스 (리플 CEO)
</blockquote>

<p><strong>한 줄 정리:</strong> "3년 묶였던 XRP 곧 풀린다. 국제송금 혁명 일으키면 10달러는 기본"</p>
</div>`,
                date: '2025-08-06T09:00:00.000Z',
                readTime: 5,
                image: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 14,
                title: '🔥 카카오 5만원 간다? "AI 하이퍼클로바X 대박 조짐"',
                category: 'stock',
                emoji: '💬',
                excerpt: '카카오브레인 하이퍼클로바X 본격 상용화. B2B AI 시장 진출! 네이버 협력으로 국내 AI 양강 구조',
                content: `<div class="content-wrapper">
<div class="highlight-box">
💬 <strong>현재 카카오 주가: 38,500원</strong>
<span class="price-indicator price-down">📉 52주 최저가 근접</span>
</div>

<h2>🤖 카카오 AI 역습 시작</h2>

<p><strong>바닥 찍고 반등?</strong> 카카오가 <strong>하이퍼클로바X</strong>로 B2B AI 시장 도전장.</p>

<p>카톡 4,700만 사용자 데이터로 학습한 한국형 AI. 삼성, LG 줄 섰다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">50,000원</span>
    <span class="stat-label">목표 주가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">4,700만</span>
    <span class="stat-label">카톡 사용자</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">2조원</span>
    <span class="stat-label">AI 투자 계획</span>
  </div>
</div>

<h3>💡 카카오 AI 무기</h3>

<ul>
  <li><strong>코난:</strong> 코딩 AI (깃허브 코파일럿 대항마)</li>
  <li><strong>칼로:</strong> 이미지 생성 AI</li>
  <li><strong>톡 AI:</strong> 카톡 내 AI 어시스턴트</li>
  <li><strong>B2B 솔루션:</strong> 기업용 AI 서비스</li>
</ul>

<blockquote>
"카카오는 저평가 구간. AI 수익화 성공하면 5만원은 충분" - NH투자증권
</blockquote>

<p><strong>한 줄 정리:</strong> "38,500원은 바닥. AI로 제2 전성기 열면 5만원 간다"</p>
</div>`,
                date: '2025-08-05T09:00:00.000Z',
                readTime: 5,
                image: 'https://images.unsplash.com/photo-1610397962076-02407a169a5b?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 15,
                title: '🚗 현대차 30만원? "전기차 판매 1위, 수소차 독점"',
                category: 'stock',
                emoji: '🚗',
                excerpt: '아이오닉 9 예약 폭주! 미국 전기차 판매 테슬라 이어 2위. 수소차는 아예 독점. 목표주가 30만원 상향',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🚗 <strong>현재 현대차 주가: 218,000원</strong>
<span class="price-indicator price-up">📈 +15% (3개월)</span>
</div>

<h2>⚡ 현대차 전기차 대박났다!</h2>

<p><strong>테슬라 잡는다!</strong> 미국 전기차 시장 점유율 <strong>9.3%</strong>로 2위 등극.</p>

<p>아이오닉 9 사전예약 첫날만 3만대. 제네시스 전동화도 성공적.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">300,000원</span>
    <span class="stat-label">목표 주가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">9.3%</span>
    <span class="stat-label">미국 EV 점유율</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">100만대</span>
    <span class="stat-label">2025 EV 목표</span>
  </div>
</div>

<h3>💎 현대차만의 무기</h3>

<ul>
  <li><strong>E-GMP:</strong> 18분 급속충전 (10→80%)</li>
  <li><strong>수소차:</strong> 넥쏘 글로벌 1위 (점유율 60%)</li>
  <li><strong>로보틱스:</strong> 보스턴 다이나믹스 인수</li>
  <li><strong>UAM:</strong> 도심 항공 모빌리티 2028 상용화</li>
</ul>

<h3>🔋 전기차 라인업 완성</h3>

<div class="chart-container">
  <p>🚙 <strong>아이오닉 5:</strong> 월 1만대 판매 (미국)</p>
  <p>🚙 <strong>아이오닉 6:</strong> 세단 전기차 1위</p>
  <p>🚙 <strong>아이오닉 9:</strong> 대형 SUV (3열 7인승)</p>
  <p>🚙 <strong>EV9:</strong> 기아 플래그십 SUV</p>
</div>

<blockquote>
"현대차는 테슬라와 달리 완성차+전기차+수소차 다 잡았다" - 모건스탠리
</blockquote>

<h3>💰 실적도 탄탄</h3>

<div class="highlight-box">
  <ul>
    <li>영업이익률 9.5% (업계 최고 수준)</li>
    <li>현금 보유 70조원</li>
    <li>배당 수익률 5.2%</li>
    <li>자사주 매입 3조원</li>
  </ul>
</div>

<p><strong>한 줄 정리:</strong> "전기차는 미국 2위, 수소차는 독점, 로봇까지. 30만원 간다"</p>
</div>`,
                date: '2025-08-04T09:00:00.000Z',
                readTime: 6,
                image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 16,
                title: '📺 넷플릭스 1000달러? "광고 요금제 가입자 폭증"',
                category: 'stock',
                emoji: '📺',
                excerpt: '광고 요금제 7000만 가입자 돌파! 게임, 라이브 스포츠 진출. 2025년 매출 500억 달러 전망',
                content: `<div class="content-wrapper">
<div class="highlight-box">
📺 <strong>현재 넷플릭스 주가: $718</strong>
<span class="price-indicator price-up">📈 +83% (YTD)</span>
</div>

<h2>🎬 넷플릭스 광고가 대박쳤다!</h2>

<p><strong>광고 요금제 미쳤다!</strong> 7,000만 가입자가 광고 보면서 넷플릭스 본다.</p>

<p>월 6.99달러 광고 요금제가 전체 신규가입의 <strong>50% 차지</strong>. 광고 매출만 연 30억 달러.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$1,000</span>
    <span class="stat-label">목표 주가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">2.8억명</span>
    <span class="stat-label">전체 구독자</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$50B</span>
    <span class="stat-label">2025 매출 전망</span>
  </div>
</div>

<h3>🎮 넷플릭스 새로운 도전</h3>

<ul>
  <li><strong>게임:</strong> GTA 삼부작 독점 출시</li>
  <li><strong>라이브:</strong> NFL, WWE 중계권 확보</li>
  <li><strong>광고:</strong> 프라임타임 광고 단가 TV 추월</li>
  <li><strong>AI:</strong> 개인 맞춤 콘텐츠 추천 고도화</li>
</ul>

<blockquote>
"넷플릭스는 이제 스트리밍이 아니라 엔터테인먼트 플랫폼" - 골드만삭스
</blockquote>

<h3>📊 경쟁사는 망하는데?</h3>

<div class="chart-container">
  <p>❌ <strong>디즈니+:</strong> 적자 40억 달러</p>
  <p>❌ <strong>워너:</strong> 맥스 가입자 이탈</p>
  <p>❌ <strong>파라마운트+:</strong> 매각 추진</p>
  <p>✅ <strong>넷플릭스:</strong> 영업이익률 28%</p>
</div>

<p><strong>한 줄 정리:</strong> "광고로 제2 전성기. 게임+스포츠까지 먹으면 1000달러 현실"</p>
</div>`,
                date: '2025-08-03T09:00:00.000Z',
                readTime: 5,
                image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 17,
                title: '⚡ 도지코인 1달러? "머스크 X 결제 통합 확정"',
                category: 'coin',
                emoji: '🐕',
                excerpt: 'X(트위터) 결제 시스템에 도지코인 통합! 머스크 "도지는 인민의 암호화폐". 테슬라 상품 구매도 가능',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🐕 <strong>현재 도지코인: $0.38</strong>
<span class="price-indicator price-up">📈 +420% (6개월)</span>
</div>

<h2>🚀 도지코인 드디어 실사용!</h2>

<p><strong>머스크가 진짜 했다!</strong> X(구 트위터)에서 도지코인으로 송금 가능해진다.</p>

<p>월 활성 사용자 6억명이 도지 쓰면? <strong>가격 폭발 확정.</strong></p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$1.00</span>
    <span class="stat-label">2025 목표가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">6억명</span>
    <span class="stat-label">X 사용자</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$0.002</span>
    <span class="stat-label">거래 수수료</span>
  </div>
</div>

<h3>🎯 도지코인 사용처</h3>

<ul>
  <li><strong>X 결제:</strong> 송금, 팁, 구독료</li>
  <li><strong>테슬라:</strong> 굿즈, 충전 요금</li>
  <li><strong>스페이스X:</strong> 달 미션 "DOGE-1" 결제</li>
  <li><strong>5만개 상점:</strong> 비트페이 통해 결제 가능</li>
</ul>

<h3>⚠️ 리스크도 있다</h3>

<div class="chart-container" style="background: #fee2e2;">
  <p>❌ 무한 발행 (인플레 코인)</p>
  <p>❌ 개발자 부재 (밈코인 한계)</p>
  <p>❌ 머스크 의존도 90%</p>
  <p>❌ 변동성 극심 (하루 30% 등락)</p>
</div>

<blockquote>
"도지는 농담으로 시작했지만 이제 진짜 화폐가 됐다" - 일론 머스크
</blockquote>

<p><strong>한 줄 정리:</strong> "머스크가 밀면 1달러 간다. 근데 머스크 트윗 하나에 반토막 날 수도"</p>
</div>`,
                date: '2025-08-02T09:00:00.000Z',
                readTime: 5,
                image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 18,
                title: '💳 비자 카드 주가 350달러! "결제 독점 지위 굳건"',
                category: 'stock',
                emoji: '💳',
                excerpt: '전세계 결제의 60% 처리! 핀테크 위협? 오히려 파트너십으로 성장. 암호화폐 결제도 비자가 처리',
                content: `<div class="content-wrapper">
<div class="highlight-box">
💳 <strong>현재 비자 주가: $312</strong>
<span class="price-indicator price-up">📈 영업이익률 67%</span>
</div>

<h2>💰 비자는 돈 찍는 기계</h2>

<p><strong>결제의 제왕!</strong> 전세계 카드 결제의 <strong>60%를 비자가 처리</strong>한다.</p>

<p>1초에 65,000건, 연간 15조 달러. 수수료만 0.15%씩 떼도 연 매출 350억 달러.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$350</span>
    <span class="stat-label">목표 주가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">67%</span>
    <span class="stat-label">영업이익률</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">15조$</span>
    <span class="stat-label">연간 결제액</span>
  </div>
</div>

<h3>🏆 비자가 망할 수 없는 이유</h3>

<ul>
  <li><strong>독점:</strong> 비자+마스터카드 = 시장 90%</li>
  <li><strong>필수재:</strong> 결제 안 하고 살 수 없음</li>
  <li><strong>핀테크:</strong> 적이 아니라 고객 (페이팔, 스퀘어 다 비자 씀)</li>
  <li><strong>암호화폐:</strong> 비자가 크립토 결제도 처리</li>
</ul>

<h3>💎 현금 없는 사회 수혜주</h3>

<div class="chart-container">
  <p>🌏 <strong>아시아:</strong> 디지털 결제 연 30% 성장</p>
  <p>🌍 <strong>아프리카:</strong> 모바일 결제 폭발적 증가</p>
  <p>🌎 <strong>남미:</strong> 현금 사용 급감 중</p>
</div>

<blockquote>
"비자는 21세기 금광. 돈이 움직이면 비자가 먹는다" - 워런 버핏
</blockquote>

<p><strong>한 줄 정리:</strong> "결제 독점 + 영업이익률 67% = 망할 수 없는 회사. 350달러 확정"</p>
</div>`,
                date: '2025-08-01T09:00:00.000Z',
                readTime: 5,
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 19,
                title: '🏢 미국 상업용 부동산 폭락! "재택근무로 빌딩 텅텅"',
                category: 'economy',
                emoji: '🏢',
                excerpt: '뉴욕 오피스 공실률 20% 돌파! 상업용 부동산 가격 40% 폭락. 지역은행 부실 우려. 그런데 한국은 왜 올라?',
                content: `<div class="content-wrapper">
<div class="highlight-box" style="background: linear-gradient(135deg, #fee2e2 0%, #ef4444 100%);">
🏢 <strong>미국 오피스 공실률: 20.1%</strong>
<span class="price-indicator price-down">📉 상업용 부동산 -40%</span>
</div>

<h2>😱 미국 오피스 빌딩 대참사</h2>

<p><strong>재택근무가 부동산을 죽였다!</strong> 뉴욕 맨해튼 오피스 공실률 <strong>20% 돌파</strong>.</p>

<p>샌프란시스코는 더 심각. 공실률 35%, 빌딩 가격 반토막 났다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">20.1%</span>
    <span class="stat-label">뉴욕 공실률</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">-40%</span>
    <span class="stat-label">빌딩 가격</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$1.5T</span>
    <span class="stat-label">대출 만기</span>
  </div>
</div>

<h3>💣 은행 위기 재점화?</h3>

<ul>
  <li><strong>지역은행:</strong> 상업용 부동산 대출 70% 보유</li>
  <li><strong>만기 도래:</strong> 2025년 1.5조 달러 재융자 필요</li>
  <li><strong>디폴트 급증:</strong> 연체율 11% (금융위기 수준)</li>
  <li><strong>자산 매각:</strong> 블랙스톤도 손실 감수하고 처분</li>
</ul>

<h3>🇰🇷 한국은 정반대?</h3>

<div class="chart-container">
  <p>📈 <strong>강남:</strong> 오피스 임대료 10% 상승</p>
  <p>📈 <strong>판교:</strong> 공실률 2% (역대 최저)</p>
  <p>📈 <strong>을지로:</strong> 리모델링 후 완판</p>
  <p>❓ <strong>이유:</strong> 출근 문화 + IT 기업 확장</p>
</div>

<h3>💰 투자 기회는?</h3>

<div class="highlight-box" style="background: linear-gradient(135deg, #d4f4dd 0%, #86efac 100%);">
  <p><strong>위기 = 기회</strong></p>
  <ul>
    <li>✅ 미국 리츠 바닥 매수</li>
    <li>✅ 지역은행 공매도</li>
    <li>✅ 주거용 전환 수혜주</li>
    <li>✅ 한국 오피스 리츠 투자</li>
  </ul>
</div>

<blockquote>
"상업용 부동산 위기는 2008년보다 클 수도" - 제이미 다이먼 (JP모건 CEO)
</blockquote>

<p><strong>한 줄 정리:</strong> "미국 오피스는 공동묘지, 한국은 호황. 재택 vs 출근 문화 차이가 운명 갈랐다"</p>
</div>`,
                date: '2025-07-31T09:00:00.000Z',
                readTime: 6,
                image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 21,
                title: '🎺 트럼프 코인 $9.5 "74달러에서 -89% 폭락, 지금이 기회?"',
                category: 'coin',
                emoji: '🇺🇸',
                excerpt: '대통령 밈코인 TRUMP 현재 9.5달러! 1월 최고점 74달러에서 폭락했지만 8월 들어 거래량 폭증. 16달러 재도전 가능할까?',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🇺🇸 <strong>현재 트럼프 코인: $9.50</strong>
<span class="price-indicator price-down">📉 -89% (ATH 대비)</span>
</div>

<h2>🎺 대통령 밈코인의 롤러코스터!</h2>

<p><strong>취임식 날 74달러 찍고 지금 9.5달러?</strong> 트럼프 공식 코인(TRUMP)이 완전 과매도 구간이다.</p>

<p>1월 19일 역대 최고가 <strong>$74.27</strong> 이후 89% 하락. 근데 거래량은 오히려 늘고 있다? 🤔</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$74.27</span>
    <span class="stat-label">역대 최고가 (1/19)</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$9.50</span>
    <span class="stat-label">현재 가격 (8/29)</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$310M</span>
    <span class="stat-label">24시간 거래량</span>
  </div>
</div>

<h3>🔥 왜 지금 주목해야 하나?</h3>

<ul>
  <li><strong>시총 56위:</strong> 밈코인 중 5위 (도지, 시바, 페페, WIF 다음)</li>
  <li><strong>거래량 폭증:</strong> 24시간 3.1억 달러 (전일 대비 +13%)</li>
  <li><strong>기술적 반등:</strong> 8.5달러 지지선 방어 성공</li>
  <li><strong>정치 이벤트:</strong> 2025년 하반기 대선 캠페인 본격화</li>
</ul>

<blockquote>
"74달러에서 9달러까지 떨어진 건 기회다. 바닥에서 사는 자가 천장에서 판다" - 크립토 트레이더
</blockquote>

<h3>📊 TRUMP vs 다른 밈코인</h3>

<div class="chart-container">
  <p>🐕 <strong>DOGE:</strong> 연초 대비 +34%</p>
  <p>🐸 <strong>PEPE:</strong> 연초 대비 +580%</p>  
  <p>🎺 <strong>TRUMP:</strong> ATH 대비 -89% (반등 여력↑)</p>
  <p>🐕 <strong>WIF:</strong> 연초 대비 +1200%</p>
</div>

<h3>💎 리스크 & 기회</h3>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>⚠️ 리스크</h4>
    <ul>
      <li>정치적 이슈에 민감</li>
      <li>유통량 20% (락업 해제 리스크)</li>
      <li>밈코인 특성상 변동성 극심</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>🎯 기회</h4>
    <ul>
      <li>16달러 1차 저항 돌파 시 30달러 가능</li>
      <li>대선 캠페인 시작되면 관심 폭발</li>
      <li>솔라나 체인 = 빠른 거래, 낮은 수수료</li>
    </ul>
  </div>
</div>

<p><strong>한 줄 정리:</strong> "74달러→9달러 폭락은 끝. 대선 시즌 다가오면 최소 2배는 간다"</p>
</div>`,
                date: '2025-08-29T10:00:00.000Z',
                readTime: 5,
                image: 'https://images.unsplash.com/photo-1609726494499-27d3e942456c?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 22,
                title: '💼 에릭 트럼프 WLFI "9월 1일 언락! 15억 달러 IPO 간다"',
                category: 'coin',
                emoji: '🏛️',
                excerpt: '트럼프 아들들의 DeFi 프로젝트 월드 리버티 파이낸셜! 4억 달러 벌어들인 WLFI 토큰 9월 1일 거래 시작. 상장사 만들어 15억 달러 조달?',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🏛️ <strong>World Liberty Financial (WLFI)</strong>
<span class="price-indicator price-up">📈 9/1 거래 개시</span>
</div>

<h2>💸 트럼프 패밀리 4억 달러 챙겼다!</h2>

<p><strong>에릭 트럼프 "Web3 대사"로 등극!</strong> 아버지는 대통령, 아들은 크립토 재벌?</p>

<p>8월 26일 발표: <strong>"9월 1일부터 WLFI 20% 언락"</strong> 락업 풀리면 가격 어디까지?</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$412M</span>
    <span class="stat-label">트럼프家 수익</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$1.5B</span>
    <span class="stat-label">IPO 목표 금액</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">9/1</span>
    <span class="stat-label">거래 시작일</span>
  </div>
</div>

<h3>🚀 월드 리버티 파이낸셜 뭐가 다른데?</h3>

<ul>
  <li><strong>대통령 아들이 운영:</strong> 에릭 & 돈 주니어 직접 경영</li>
  <li><strong>상장사 전환:</strong> 나스닥 상장 추진 중</li>
  <li><strong>DeFi + TradFi:</strong> 전통 금융과 디파이 융합</li>
  <li><strong>스테이블코인 USD1:</strong> 자체 달러 스테이블 출시</li>
</ul>

<blockquote>
"아빠는 미국을 크립토 수도로, 우린 월스트리트를 블록체인으로" - 에릭 트럼프
</blockquote>

<h3>📊 WLFI 토큰 언락 일정</h3>

<div class="chart-container">
  <p>🔓 <strong>9월 1일:</strong> 20% 즉시 언락</p>
  <p>🔒 <strong>80%:</strong> 추후 공지 (베스팅)</p>
  <p>💰 <strong>현재 홀더:</strong> 20,000명+</p>
  <p>📈 <strong>예상 상장가:</strong> $0.50~$1.00</p>
</div>

<h3>⚠️ 리스크 vs 🎯 기회</h3>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>위험 요소</h4>
    <ul>
      <li>정치적 리스크 극심</li>
      <li>언락 시 덤핑 우려</li>
      <li>SEC 규제 불확실</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>투자 포인트</h4>
    <ul>
      <li>트럼프 브랜드 파워</li>
      <li>나스닥 상장 가능성</li>
      <li>15억 달러 자금 조달</li>
    </ul>
  </div>
</div>

<p><strong>한 줄 정리:</strong> "트럼프 아들 코인 9/1 거래 시작. 정치+크립토 콜라보는 처음이라 도박 각"</p>
</div>`,
                date: '2025-08-29T11:00:00.000Z',
                readTime: 5,
                image: 'https://images.unsplash.com/photo-1622186477895-f2af6a0f5a97?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 23,
                title: '🎌 미카미 유아 코인 "340만 달러→10만 달러 -97% 폭망"',
                category: 'coin',
                emoji: '💔',
                excerpt: '일본 AV 레전드 미카미 유아의 MIKAMI 코인 완전 폭망! 5월 출시 후 -97% 하락. 시총 10만 달러로 쪼그라든 연예인 코인의 비극',
                content: `<div class="content-wrapper">
<div class="highlight-box">
💔 <strong>MIKAMI 코인 현재 시총: $109K</strong>
<span class="price-indicator price-down">📉 -97% (출시 대비)</span>
</div>

<h2>🗾 AV 여신의 코인이 망했다?!</h2>

<p><strong>340만 달러 모금 → 10만 달러 시총</strong> 역대급 러그풀인가, 단순 실패인가?</p>

<p>5월 8일 출시 <strong>5시간 만에 -80% 폭락</strong>. 17,000명 투자자들 지금 어디에...</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">-97%</span>
    <span class="stat-label">최고점 대비</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$0.10</span>
    <span class="stat-label">현재가 (8/29)</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$109K</span>
    <span class="stat-label">시가총액</span>
  </div>
</div>

<h3>😱 대체 뭐가 잘못됐나?</h3>

<ul>
  <li><strong>출시 5시간 만에 붕괴:</strong> $0.828 → $0.10 (-88%)</li>
  <li><strong>고래 없었다:</strong> 큰손 투자자 0명, 개미만 17,000명</li>
  <li><strong>유동성 부족:</strong> 15%만 유동성 풀에 배정</li>
  <li><strong>50% 락업:</strong> 2069년까지 락업 (44년... 진심?)</li>
</ul>

<blockquote>
"연예인 코인은 팬심으로 산다. 근데 팬들이 다 털렸다" - 솔라나 트레이더
</blockquote>

<h3>📊 연예인 코인 비교</h3>

<div class="chart-container">
  <p>🎺 <strong>TRUMP:</strong> 시총 17억 달러 (성공)</p>
  <p>🎤 <strong>이기 아잘레아:</strong> 시총 2억 달러 (성공)</p>
  <p>🗾 <strong>MIKAMI:</strong> 시총 10만 달러 (대실패)</p>
  <p>⚽ <strong>호날두 코인:</strong> 러그풀 논란</p>
</div>

<h3>🔥 지금이 기회? 아니면 쓰레기?</h3>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>⚠️ 위험 신호</h4>
    <ul>
      <li>거래량 거의 0</li>
      <li>커뮤니티 죽음</li>
      <li>개발팀 잠적</li>
      <li>상장 거래소 없음</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>🎲 도박 포인트</h4>
    <ul>
      <li>10만불이면 혼자 펌핑 가능</li>
      <li>미카미 유아 은퇴 전 인기</li>
      <li>일본 크립토 붐 가능성</li>
      <li>밈코인 부활 사이클</li>
    </ul>
  </div>
</div>

<h3>💬 커뮤니티 반응</h3>

<div class="chart-container" style="background: #fee2e2;">
  <p>"340만 달러 어디 갔냐" - 프리세일 투자자</p>
  <p>"AV는 봤는데 수익은 못 봤다" - 솔라나 홀더</p>
  <p>"2069년 언락ㅋㅋㅋ 손자 줄 코인" - 크립토 트위터</p>
  <p>"차라리 영상이나 더 찍어..." - 팬</p>
</div>

<p><strong>한 줄 정리:</strong> "AV 레전드도 코인은 못 살림. 10만불 시총이면 이미 죽은 코인"</p>
</div>`,
                date: '2025-08-29T12:00:00.000Z',
                readTime: 6,
                image: 'https://images.unsplash.com/photo-1622396090075-ab6b8396fe9b?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 24,
                title: '🏦 잭슨홀 쇼크! 파월 "금리인하 전면 재검토"',
                category: 'economy',
                emoji: '🎯',
                excerpt: '8월 22일 잭슨홀 미팅 파월 마지막 연설! 트럼프 빅컷(0.5%p) 압박 vs 연준 독립성 충돌. 한은 딜레마 "환율 vs 경기부양"',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🎯 <strong>2025년 8월 22일 잭슨홀 미팅</strong>
<span class="price-indicator">파월 의장 임기 마지막 연설</span>
</div>

<h2>🏔️ 잭슨홀의 운명의 날</h2>

<p><strong>8월 22일 오전 10시</strong> (한국시간 오후 11시), 와이오밍 잭슨홀에서 파월의 마지막 춤이 시작된다.</p>

<p>트럼프 대통령의 <strong>"해고 압박"</strong> vs 연준의 <strong>"독립성 사수"</strong> 대충돌!</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">4.25~4.50%</span>
    <span class="stat-label">현재 기준금리</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">0.50%p</span>
    <span class="stat-label">트럼프 요구 빅컷</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">0.25%p</span>
    <span class="stat-label">시장 예상 베이비스텝</span>
  </div>
</div>

<h3>🔥 트럼프의 연준 압박 작전</h3>

<blockquote>
"9월 0.5%p 빅컷으로 시작해야 한다" - 스콧 베센트 재무장관
</blockquote>

<p>블룸버그 인터뷰에서 <strong>재무장관이 직접 빅컷 요구!</strong> 연준 독립성 역사상 최악의 정치 개입.</p>

<ul>
  <li><strong>트럼프 압박:</strong> "금리 안 내리면 파월 해고"</li>
  <li><strong>베센트 주장:</strong> "경제 위축 막으려면 빅컷 필수"</li>
  <li><strong>월가 반응:</strong> "연준 독립성 훼손 우려"</li>
</ul>

<h3>📊 시장 예상 시나리오</h3>

<div class="chart-container">
  <p><strong>시나리오 1 (70%):</strong> 0.25%p 인하 - 연준 독립성 지키기</p>
  <p><strong>시나리오 2 (20%):</strong> 0.50%p 빅컷 - 트럼프에 굴복</p>
  <p><strong>시나리오 3 (10%):</strong> 동결 - 인플레이션 재점화 우려</p>
</div>

<h3>🇰🇷 한국은행의 딜레마</h3>

<p><strong>2.50%</strong> 현재 한은 기준금리. 8월 회의에서 어떤 선택?</p>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>💱 금리 인하시 위험</h4>
    <ul>
      <li>원달러 1500원 돌파 가능</li>
      <li>외국인 자금 이탈</li>
      <li>수입 물가 상승</li>
      <li>가계부채 재점화</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>📈 금리 인하 필요성</h4>
    <ul>
      <li>건설업 부진 심각</li>
      <li>내수 경기 침체</li>
      <li>0.8% 성장률 위기</li>
      <li>청년 실업률 급증</li>
    </ul>
  </div>
</div>

<h3>💬 전문가 전망</h3>

<div class="chart-container" style="background: #f0f9ff;">
  <p><strong>씨티그룹:</strong> "한은 1월 추가 인하 불가피"</p>
  <p><strong>골드만삭스:</strong> "연준 따라 인하 지연될 것"</p>
  <p><strong>모건스탠리:</strong> "환율 1450원까지 가능"</p>
  <p><strong>JPM:</strong> "한미 금리차 역전 우려"</p>
</div>

<h3>🎲 투자 전략</h3>

<ul>
  <li><strong>빅컷 베팅:</strong> 나스닥 롱, 달러 숏</li>
  <li><strong>베이비스텝:</strong> 금 매수, 채권 중립</li>
  <li><strong>동결 시:</strong> 달러 강세, 주식 하락</li>
</ul>

<p><strong>한 줄 정리:</strong> "파월의 마지막 잭슨홀, 트럼프 압박 vs 연준 독립성 대결. 한은은 환율 때문에 꼼짝 못해"</p>
</div>`,
                date: '2025-08-30T09:00:00.000Z',
                readTime: 7,
                image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 25,
                title: '🇨🇳 중국 디플레이션 공포! "부동산 -25% 추가 하락"',
                category: 'economy',
                emoji: '💥',
                excerpt: '중국 경제성장률 4.4% 목표 미달! 부동산 18조 달러 증발, 공실 8천만채. 30년 국채 1.93% 일본보다 낮아. 한국 수출 직격탄!',
                content: `<div class="content-wrapper">
<div class="highlight-box">
💥 <strong>중국 2025년 성장률 전망: 4.4%</strong>
<span class="price-indicator price-down">📉 시진핑 목표 5% 미달</span>
</div>

<h2>🏚️ 중국 부동산 대붕괴 진행중</h2>

<p><strong>18조 달러 증발!</strong> 에버그란데 파산 이후 3년, 아직도 바닥 안 보여.</p>

<p>미국 2008년 금융위기보다 더 큰 규모. <strong>8천만채 공실</strong> = 미국 전체 주택의 절반!</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">8천만채</span>
    <span class="stat-label">빈 집 (11월 기준)</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">-25%</span>
    <span class="stat-label">추가 하락 전망</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">18조 달러</span>
    <span class="stat-label">증발한 자산</span>
  </div>
</div>

<h3>🌀 일본식 디플레이션 경고</h3>

<p><strong>충격!</strong> 중국 30년 국채 수익률 <strong>1.93%</strong> vs 일본 <strong>2.3%</strong></p>

<ul>
  <li><strong>생산자물가:</strong> 26개월 연속 하락</li>
  <li><strong>소비자물가:</strong> 겨우 0.2% (디플레 직전)</li>
  <li><strong>10년 국채:</strong> 20년 만에 2% 붕괴</li>
  <li><strong>청년실업:</strong> 실제 30% 추정</li>
</ul>

<blockquote>
"중국이 1990년대 일본의 길을 걷고 있다" - 폴 크루그먼
</blockquote>

<h3>📊 정부 대응책</h3>

<div class="chart-container">
  <p>💰 <strong>1.4조 달러</strong> 경기부양책 발표</p>
  <p>💴 <strong>3조 위안</strong> 특별 국채 발행</p>
  <p>📈 <strong>재정적자 4%</strong>로 확대 (GDP 대비)</p>
  <p>🏦 <strong>지방정부 부채</strong> 13조 위안 스왑</p>
</div>

<h3>🏘️ 부동산 시장 현황</h3>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>😱 암울한 현실</h4>
    <ul>
      <li>가계자산 70%가 부동산</li>
      <li>골드만: 추가 20-25% 하락</li>
      <li>베이징 아파트 -40% 폭락</li>
      <li>건설사 90% 부도 위기</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>💊 정부 대책</h4>
    <ul>
      <li>주택 구매 규제 전면 철폐</li>
      <li>대출 금리 역대 최저</li>
      <li>1선 도시 구매 보조금</li>
      <li>국유기업 재고 매입</li>
    </ul>
  </div>
</div>

<h3>🇰🇷 한국 경제 영향</h3>

<p><strong>비상!</strong> 대중국 수출 의존도 20%, 직격탄 불가피</p>

<div class="chart-container" style="background: #fef2f2;">
  <p>🔋 <strong>배터리:</strong> 중국 수요 급감 -30%</p>
  <p>🚗 <strong>전기차:</strong> BYD와 경쟁 격화</p>
  <p>💾 <strong>반도체:</strong> 중국 자급률 상승 위협</p>
  <p>🛍️ <strong>화장품:</strong> 중국 소비 침체 직격</p>
</div>

<h3>📈 글로벌 시장 전망</h3>

<ul>
  <li><strong>원자재:</strong> 구리, 철광석 약세 지속</li>
  <li><strong>신흥국:</strong> 중국發 쇼크 전염 우려</li>
  <li><strong>달러:</strong> 안전자산 선호로 강세</li>
  <li><strong>금:</strong> 디플레이션 헷지 수요 증가</li>
</ul>

<h3>💬 전문가 의견</h3>

<div class="chart-container" style="background: #f0f9ff;">
  <p>"중국 디플레이션은 글로벌 경제 암초" - IMF</p>
  <p>"부동산 없이 중국 회복 불가능" - 블룸버그</p>
  <p>"2025년 중국 경제 하드랜딩 가능" - BofA</p>
  <p>"한국 수출 최악 시나리오 대비해야" - KDI</p>
</div>

<p><strong>한 줄 정리:</strong> "중국 부동산 18조 달러 증발, 일본식 장기침체 진입. 한국 수출 비상등!"</p>
</div>`,
                date: '2025-08-30T10:00:00.000Z',
                readTime: 8,
                image: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 26,
                title: '💬 TON 코인 $2.44 "듀로프 체포 후 회복세, 텔레그램 10억 유저 파워"',
                category: 'coin',
                emoji: '💎',
                excerpt: '텔레그램 CEO 파벨 듀로프 프랑스 체포! TON -18% 폭락 후 회복. 10억 유저 생태계 vs 정부 규제 충돌. 지금이 매수 기회?',
                content: `<div class="content-wrapper">
<div class="highlight-box">
💎 <strong>TON 현재 가격: $2.44</strong>
<span class="price-indicator">듀로프 체포 충격 후 회복 중</span>
</div>

<h2>🚨 텔레그램 CEO 체포 충격!</h2>

<p><strong>8월 24일 토요일 밤</strong>, 파벨 듀로프가 프랑스 르부르제 공항에서 체포됐다!</p>

<p>텔레그램에서 <strong>아동 성착취물, 마약 거래, 테러 조장</strong> 방조 혐의. 보석금 <strong>500만 유로</strong>에 석방.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">-18%</span>
    <span class="stat-label">체포 직후 폭락</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$2.44</span>
    <span class="stat-label">현재 가격</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">10억명</span>
    <span class="stat-label">텔레그램 유저</span>
  </div>
</div>

<h3>📉 가격 충격과 회복</h3>

<ul>
  <li><strong>체포 전:</strong> $6.80</li>
  <li><strong>바닥:</strong> $5.38 (-18%)</li>
  <li><strong>현재:</strong> $2.44 (회복 진행중)</li>
  <li><strong>시총:</strong> 60억 달러</li>
</ul>

<blockquote>
"TON의 가치는 텔레그램과의 연결에 실질적으로 의존한다" - 갤럭시 디지털
</blockquote>

<h3>🔥 왜 회복하고 있나?</h3>

<p><strong>놀랍게도</strong> 체포에도 불구하고 TON 생태계는 건재하다!</p>

<div class="chart-container">
  <p>📱 <strong>10억 유저:</strong> 세계 최대 메신저 생태계</p>
  <p>💰 <strong>스테이블코인:</strong> USDT 공급량 회복세</p>
  <p>🎮 <strong>탭투언:</strong> 햄스터 컴뱃 등 게임 인기</p>
  <p>🔗 <strong>독립성:</strong> 텔레그램과 별개 운영 가능</p>
</div>

<h3>⚖️ 규제 리스크 vs 기회</h3>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>🚫 위험 요소</h4>
    <ul>
      <li>프랑스 정부 공격 가능성</li>
      <li>텔레그램 의존도 높음</li>
      <li>듀로프 없는 TON?</li>
      <li>규제 불확실성</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>💎 기회 요소</h4>
    <ul>
      <li>10억 유저 파워</li>
      <li>Web3 최대 생태계</li>
      <li>미니앱 혁명</li>
      <li>과매도 구간</li>
    </ul>
  </div>
</div>

<h3>📊 전문가 의견</h3>

<div class="chart-container" style="background: #f0f9ff;">
  <p>"정부가 TON 블록체인을 직접 공격하기는 어렵다" - 암호화폐 전문가</p>
  <p>"텔레그램 연결고리가 약해지면 TON 가치 급락" - JP모건</p>
  <p>"듀로프 체포는 오히려 탈중앙화 필요성 증명" - 비탈릭</p>
</div>

<h3>💰 투자 전략</h3>

<ul>
  <li><strong>단기:</strong> 변동성 활용 스윙 트레이딩</li>
  <li><strong>중기:</strong> $2 지지선 확인 후 진입</li>
  <li><strong>장기:</strong> 규제 명확해질 때까지 관망</li>
</ul>

<p><strong>한 줄 정리:</strong> "듀로프 체포 충격에도 TON 회복세. 10억 유저의 힘 vs 정부 규제의 대결!"</p>
</div>`,
                date: '2025-08-30T11:00:00.000Z',
                readTime: 6,
                image: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 27,
                title: '🚀 앱토스(APT) $4.46 "블랙록 BUIDL 상륙! 기관 러시 시작"',
                category: 'coin',
                emoji: '🏛️',
                excerpt: '앱토스 TVL 5.38억 달러 돌파! 블랙록 BUIDL, 프랭클린템플턴 참여. 2025년 말 $20 목표가. 수이(SUI)와 함께 Move 언어 양강!',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🏛️ <strong>APT 현재 가격: $4.46</strong>
<span class="price-indicator price-up">📈 기관 자금 유입 중</span>
</div>

<h2>🎯 블랙록이 앱토스를 선택했다!</h2>

<p><strong>충격!</strong> 세계 최대 자산운용사 블랙록의 <strong>BUIDL 펀드</strong>가 앱토스에 상륙!</p>

<p>프랭클린템플턴 <strong>BENJI</strong>까지 가세. 토큰화 자산 <strong>5.38억 달러</strong> 돌파!</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$4.46</span>
    <span class="stat-label">현재 가격</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$538M</span>
    <span class="stat-label">TVL (3위)</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$20</span>
    <span class="stat-label">2025년 목표가</span>
  </div>
</div>

<h3>🏦 기관들이 앱토스를 선택한 이유</h3>

<ul>
  <li><strong>속도:</strong> 16만 TPS (솔라나보다 빠름)</li>
  <li><strong>안정성:</strong> 다운타임 제로</li>
  <li><strong>Move 언어:</strong> 페이스북 출신 개발</li>
  <li><strong>파트너십:</strong> 구글, MS, NBC 협력</li>
</ul>

<blockquote>
"앱토스는 기관 진입을 위한 완벽한 인프라" - 블랙록 디지털자산 팀
</blockquote>

<h3>💎 Move 언어 생태계 급성장</h3>

<div class="chart-container">
  <p>⚡ <strong>앱토스 vs 수이:</strong> Move 양강 구도</p>
  <p>📊 <strong>TVL 성장:</strong> 6개월 만에 300% 증가</p>
  <p>🎮 <strong>게임:</strong> AAA급 Web3 게임 대거 진입</p>
  <p>💰 <strong>DeFi:</strong> Thala, Aries 등 신규 프로토콜</p>
</div>

<h3>📈 가격 전망</h3>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>📉 약세 시나리오</h4>
    <ul>
      <li>최저: $3.80</li>
      <li>토큰 언락 압력</li>
      <li>경쟁 체인 부상</li>
      <li>시장 조정</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>📈 강세 시나리오</h4>
    <ul>
      <li>목표: $20.68</li>
      <li>기관 자금 지속 유입</li>
      <li>RWA 시장 주도</li>
      <li>Move 생태계 확장</li>
    </ul>
  </div>
</div>

<h3>⚠️ 8월 16일 토큰 언락</h3>

<p><strong>주의!</strong> 5천만 달러 규모 APT 언락 예정. 단기 매도압 가능성.</p>

<div class="chart-container" style="background: #fef2f2;">
  <p>🔓 <strong>언락 물량:</strong> 1,100만 APT</p>
  <p>💵 <strong>시장 가치:</strong> 약 5천만 달러</p>
  <p>📉 <strong>예상 영향:</strong> 단기 5-10% 조정</p>
</div>

<h3>💬 커뮤니티 반응</h3>

<div class="chart-container" style="background: #f0f9ff;">
  <p>"블랙록 진입 = 기관 인증 완료" - 크립토 트위터</p>
  <p>"Move가 Rust를 이길 수 있을까?" - 개발자 커뮤니티</p>
  <p>"수이 vs 앱토스, 둘 다 사라" - 고래 투자자</p>
</div>

<h3>🎯 투자 포인트</h3>

<ul>
  <li><strong>진입가:</strong> $4.00-4.20 (언락 후 조정)</li>
  <li><strong>1차 목표:</strong> $6.50</li>
  <li><strong>2차 목표:</strong> $10.00</li>
  <li><strong>장기 목표:</strong> $20.68 (2025년 말)</li>
</ul>

<p><strong>한 줄 정리:</strong> "블랙록이 선택한 앱토스! 기관 머니 유입으로 $20 간다"</p>
</div>`,
                date: '2025-08-30T12:00:00.000Z',
                readTime: 7,
                image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 28,
                title: '🐸 PEPE "밈코인 3위 등극! 시바·도지 추월 노린다"',
                category: 'coin',
                emoji: '🐸',
                excerpt: 'PEPE 시총 3위 밈코인 등극! 2025년 말 $0.000011 목표. 하지만 -30% 덤핑 경고도? 비트코인 3조 달러 시대 최대 수혜자!',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🐸 <strong>PEPE 가격: $0.0000023</strong>
<span class="price-indicator">밈코인 시총 3위</span>
</div>

<h2>🏆 개구리가 개를 이긴다?</h2>

<p><strong>PEPE</strong>가 드디어 밈코인 <strong>빅3</strong>에 진입했다!</p>

<p>도지, 시바 다음 3위. 하지만 일부는 <strong>-30% 폭락</strong> 경고. 진실은?</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">3위</span>
    <span class="stat-label">밈코인 시총 순위</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">20x</span>
    <span class="stat-label">강세장 목표</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">-30%</span>
    <span class="stat-label">약세 경고</span>
  </div>
</div>

<h3>📊 밈코인 파워 랭킹</h3>

<div class="chart-container">
  <p>🐕 <strong>DOGE:</strong> 시총 1위 (영원한 왕)</p>
  <p>🐕‍🦺 <strong>SHIB:</strong> 시총 2위 (도전자)</p>
  <p>🐸 <strong>PEPE:</strong> 시총 3위 (신흥 강자)</p>
  <p>🎩 <strong>WIF:</strong> 솔라나 밈 1위</p>
  <p>🦴 <strong>BONK:</strong> 솔라나 OG</p>
</div>

<h3>💹 가격 시나리오 분석</h3>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>🐻 약세론 (-30%)</h4>
    <ul>
      <li>PayFi 알트코인으로 자금 이동</li>
      <li>밈코인 거래량 급감</li>
      <li>고래들 익절 시작</li>
      <li>신규 밈코인 등장</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>🐂 강세론 (20x)</h4>
    <ul>
      <li>비트코인 3조 달러 돌파 시</li>
      <li>리테일 FOMO 재점화</li>
      <li>바이낸스 홍보 강화</li>
      <li>커뮤니티 파워 최강</li>
    </ul>
  </div>
</div>

<h3>🚀 LILPEPE 위협?</h3>

<p><strong>신규 도전자!</strong> Little Pepe(LILPEPE) 프리세일 <strong>2,230만 달러</strong> 돌파!</p>

<ul>
  <li><strong>레이어2 밈코인:</strong> 가스비 절감</li>
  <li><strong>1000% 성장:</strong> Q4 2025 목표</li>
  <li><strong>PEPE 킬러?:</strong> 아직은 미지수</li>
</ul>

<blockquote>
"PEPE는 이제 시작. 도지코인 시총까지 간다" - 밈코인 고래
</blockquote>

<h3>📈 2025년 말 가격 전망</h3>

<div class="chart-container" style="background: #f0f9ff;">
  <p><strong>보수적:</strong> $0.0000046 (2배)</p>
  <p><strong>중립적:</strong> $0.0000058 (2.5배)</p>
  <p><strong>낙관적:</strong> $0.000011 (5배)</p>
  <p><strong>문라이트:</strong> $0.00005 (20배)</p>
</div>

<h3>⚡ vs 경쟁 밈코인</h3>

<div class="chart-container">
  <p>🐸 <strong>PEPE:</strong> 순수 밈, 최강 커뮤니티</p>
  <p>🎩 <strong>WIF:</strong> 솔라나 속도, $1 돌파</p>
  <p>🦴 <strong>BONK:</strong> 솔라나 OG, NFT 연계</p>
  <p>🐧 <strong>PENGU:</strong> 푸지펭귄 IP 파워</p>
</div>

<h3>💬 커뮤니티 센티먼트</h3>

<div class="chart-container" style="background: #dcfce7;">
  <p>"페페는 문화다. 가격은 부차적" - PEPE 홀더</p>
  <p>"도지 시총 1/10만 가도 10배" - 분석가</p>
  <p>"밈코인 슈퍼사이클 온다" - CT 인플루언서</p>
  <p>"또 러그풀 당할 각오하고 사라" - 비관론자</p>
</div>

<h3>🎲 매매 전략</h3>

<ul>
  <li><strong>적립식:</strong> 매주 소액 분할 매수</li>
  <li><strong>스윙:</strong> 10-20% 등락 활용</li>
  <li><strong>홀드:</strong> 강세장까지 존버</li>
  <li><strong>헷지:</strong> PEPE + 경쟁 밈코인 분산</li>
</ul>

<p><strong>한 줄 정리:</strong> "PEPE 밈코인 3위 등극! 20배 vs -30%, 도박판 시작!"</p>
</div>`,
                date: '2025-08-30T13:00:00.000Z',
                readTime: 8,
                image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 26,
                title: '🏦 한은 금리 동결 막전막후! "환율 1400원 vs 부동산 폭주"',
                category: 'economy',
                emoji: '💸',
                excerpt: '한은 8월 금통위 D-3! 환율 1400원 공포 vs 부동산 또 폭등? 이창용 "미국 눈치 그만" vs 정부 "제발 내려줘"',
                content: `<div class="content-wrapper">
<div class="highlight-box">
💸 <strong>원달러 환율: 1,385원</strong> (8월 31일 기준)
<span class="price-indicator price-down">📉 1400원 턱밑 위기</span>
</div>

<h2>🎰 한은의 도박: 금리 내리면 환율 터진다</h2>

<p><strong>D-3!</strong> 9월 3일 한은 금통위. 이창용 총재 최대 고민의 순간.</p>

<p>금리 내리면 <strong>환율 1400원</strong> 폭탄, 안 내리면 <strong>경기 침체</strong> 지옥.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">3.50%</span>
    <span class="stat-label">현재 기준금리</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">1,385원</span>
    <span class="stat-label">원달러 환율</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">110조원</span>
    <span class="stat-label">가계부채</span>
  </div>
</div>

<h3>💥 팩트체크: 왜 지금 난리?</h3>

<ul>
  <li><strong>미국:</strong> 파월 9월 인하 확정 분위기</li>
  <li><strong>일본:</strong> 엔화 강세로 원화만 약세</li>
  <li><strong>중국:</strong> 위안화도 버티는데 원화만...</li>
  <li><strong>한국:</strong> 무역수지 적자 + 외국인 이탈</li>
</ul>

<blockquote>
"환율 1400원 넘으면 수입물가 10% 오른다" - KB경영연구소
</blockquote>

<h3>🏠 부동산은 또 다른 이야기</h3>

<div class="chart-container">
  <p>🔴 <strong>강남 재건축:</strong> 금리 0.25% 내려도 10% 뛴다</p>
  <p>🔴 <strong>빌라 전세:</strong> 이미 바닥, 반등 대기중</p>
  <p>🔴 <strong>신축 아파트:</strong> 분양가 상한제 풀면 폭등</p>
</div>

<h3>😱 이창용의 3가지 시나리오</h3>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>시나리오 1: 동결 (60%)</h4>
    <ul>
      <li>환율 방어 우선</li>
      <li>부동산 진정</li>
      <li>경기 침체 감수</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>시나리오 2: 인하 (30%)</h4>
    <ul>
      <li>경기 부양 승부수</li>
      <li>환율 1400원 감수</li>
      <li>부동산 재점화 위험</li>
    </ul>
  </div>
</div>

<p><strong>시나리오 3 (10%):</strong> 인상?! 절대 없다. 이미 경기 죽어가는데...</p>

<h3>💬 MZ가 알아야 할 TMI</h3>

<div class="highlight-box" style="background: linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%);">
  <p>🍕 <strong>피자값:</strong> 환율 1400원 = 라지 3만원 시대</p>
  <p>☕ <strong>스벅:</strong> 아메리카노 6천원 돌파</p>
  <p>📱 <strong>아이폰:</strong> 프로맥스 200만원 예상</p>
  <p>✈️ <strong>해외여행:</strong> 일본 10만원 = 10만엔 안됨</p>
</div>

<p><strong>한 줄 정리:</strong> "9월 3일 한은 동결 60% vs 인하 30%. 원화 죽거나 경기 죽거나 양자택일"</p>
</div>`,
                date: '2025-08-31T10:00:00.000Z',
                readTime: 5,
                image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 27,
                title: '💴 엔캐리 청산 쓰나미! "닛케이 -12% 블랙먼데이"',
                category: 'economy',
                emoji: '🌊',
                excerpt: '일본은행 금리 인상 시그널! 10년간 쌓인 엔캐리 10조 달러 대탈출. 코스피 동반 폭락 -8.7% "외국인 18조 팔았다"',
                content: `<div class="content-wrapper">
<div class="highlight-box" style="background: linear-gradient(135deg, #fee2e2 0%, #dc2626 100%);">
🌊 <strong>달러/엔: 142엔</strong> (150엔→142엔 급락)
<span class="price-indicator price-down">📉 엔화 초강세 전환!</span>
</div>

<h2>🔥 엔캐리 트레이드 대청산의 밤</h2>

<p><strong>드디어 터졌다!</strong> 일본은행 우에다 총재 <strong>"추가 금리인상"</strong> 한마디에 글로벌 시장 패닉.</p>

<p>10년간 제로금리로 빌린 엔화 10조 달러가 한꺼번에 빠져나간다!</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">-12.4%</span>
    <span class="stat-label">닛케이 하루 폭락</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">10조$</span>
    <span class="stat-label">엔캐리 규모</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">-8.7%</span>
    <span class="stat-label">코스피 동반 하락</span>
  </div>
</div>

<h3>🎭 엔캐리 트레이드가 뭔데?</h3>

<div class="chart-container" style="background: #f8fafc;">
  <p>1️⃣ <strong>일본에서 0% 금리로 엔화 대출</strong></p>
  <p>2️⃣ <strong>미국 주식, 한국 부동산에 투자</strong></p>
  <p>3️⃣ <strong>수익 챙기고 엔화로 갚기</strong></p>
  <p>💥 <strong>BUT! 엔화 오르면? 손실 폭탄!</strong></p>
</div>

<blockquote>
"142엔까지 가면 마진콜 쓰나미 온다" - 노무라증권
</blockquote>

<h3>😱 한국 직격탄: 외국인 18조 매도</h3>

<ul>
  <li><strong>삼성전자:</strong> -10.3% (하루 시총 40조 증발)</li>
  <li><strong>SK하이닉스:</strong> -9.8%</li>
  <li><strong>네이버:</strong> -11.2%</li>
  <li><strong>카카오:</strong> -8.5%</li>
</ul>

<h3>📊 왜 한국이 더 맞나?</h3>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>🇰🇷 한국 취약점</h4>
    <ul>
      <li>외국인 비중 35%</li>
      <li>엔캐리 자금 많음</li>
      <li>환율 방어력 약함</li>
      <li>반도체 의존도 높음</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>🇯🇵 일본은 버틴다</h4>
    <ul>
      <li>자국 투자자 80%</li>
      <li>일은행 시장 개입</li>
      <li>엔화 강세 = 수입 이득</li>
      <li>관광 수입 증가</li>
    </ul>
  </div>
</div>

<h3>🎲 앞으로 시나리오</h3>

<div class="highlight-box">
  <p>📈 <strong>V자 반등 (40%):</strong> 일은행 개입, 단기 조정 끝</p>
  <p>📉 <strong>추가 하락 (40%):</strong> 130엔까지, 코스피 2300</p>
  <p>💀 <strong>대폭락 (20%):</strong> 120엔 돌파, 글로벌 금융위기</p>
</div>

<h3>💡 MZ 생존 전략</h3>

<ul>
  <li>🛡️ <strong>현금 비중 50% 유지</strong></li>
  <li>💰 <strong>달러 일부 엔화 전환 고려</strong></li>
  <li>📊 <strong>레버리지 투자 절대 금지</strong></li>
  <li>🎯 <strong>2400 이하에서 분할 매수</strong></li>
</ul>

<div class="chart-container" style="background: linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%);">
  <h4>🚨 실시간 체크 포인트</h4>
  <p>✓ 달러/엔 140엔 붕괴시 추가 폭락</p>
  <p>✓ VIX 40 돌파시 패닉 셀링</p>
  <p>✓ 코스피 2300 깨지면 2000 간다</p>
</div>

<p><strong>한 줄 정리:</strong> "엔캐리 10조 달러 대탈출! 142엔 깨지면 블랙 먼데이. 현금이 왕이다"</p>
</div>`,
                date: '2025-08-31T11:00:00.000Z',
                readTime: 6,
                image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 28,
                title: '🍎 애플카드 한국 상륙! "카뱅과 연내 출시 확정"',
                category: 'economy',
                emoji: '💳',
                excerpt: '애플페이 6개월 만에 대박! 애플카드까지 들어온다. 캐시백 3% 폭탄, 연회비 0원. 삼성카드 "이거 실화냐?" 현대카드 비상!',
                content: `<div class="content-wrapper">
<div class="highlight-box">
💳 <strong>D-90 애플카드 한국 상륙!</strong>
<span class="price-indicator price-up">🎯 2025년 12월 정식 출시</span>
</div>

<h2>🚨 파.격.발.표! 애플×카뱅 역대급 콜라보</h2>

<p>야 이거 <strong>진짜 대박이다!</strong></p>

<p>애플이 드디어 <strong>한국에 애플카드</strong> 들고 온다! 카카오뱅크랑 손잡고 12월에 출시한댄다.</p>

<p>3월에 애플페이 들어온 지 겨우 6개월 만에 <strong>월 사용자 500만명</strong> 돌파했는데, 이제 애플카드까지? 이건 뭐... 게임 끝났다 ㅋㅋㅋ</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">3%</span>
    <span class="stat-label">애플 결제 캐시백</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">2%</span>
    <span class="stat-label">애플페이 캐시백</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">1%</span>
    <span class="stat-label">일반 결제 캐시백</span>
  </div>
</div>

<h3>🎁 미친 혜택들 보고 가실게요</h3>

<blockquote>
"연회비? 그런 거 없음ㅋㅋ 평생 0원이야" - 팀 쿡
</blockquote>

<div class="chart-container">
  <p><strong>🍎 애플 스토어:</strong> 3% 즉시 캐시백 (아이폰 사면 4만원 바로 적립)</p>
  <p><strong>📱 애플페이:</strong> 2% 캐시백 (스벅, 올영, GS25 다 됨)</p>
  <p><strong>💳 일반 결제:</strong> 1% 캐시백 (해외결제 수수료 0%)</p>
  <p><strong>🎯 특별 혜택:</strong> 애플 뮤직/TV+ 3개월 무료</p>
</div>

<h3>😱 한국 카드사들 "멘붕" 실시간</h3>

<p><strong>현대카드:</strong> "우리도 더 블랙 프리미엄 있는데..." (연회비 15만원 ㅋㅋ)</p>
<p><strong>삼성카드:</strong> "갤럭시 카드 만들어야 하나?" (이미 늦음)</p>
<p><strong>신한카드:</strong> "애플이랑 제휴하자!" (카뱅이 선점함 ㅠ)</p>

<h3>💸 카카오뱅크 주가 "로켓" 예약</h3>

<div class="highlight-box">
  <h4>📈 카뱅 예상 시나리오</h4>
  <ul>
    <li>MAU 2000만 돌파 (현재 1700만)</li>
    <li>신규 고객 300만명 유입</li>
    <li>카드 사업 매출 5배 성장</li>
    <li>주가 목표가 상향 (7만원→10만원)</li>
  </ul>
</div>

<h3>🤔 근데 이거 왜 지금 나온거임?</h3>

<ol>
  <li><strong>애플페이 대성공:</strong> 6개월 만에 500만 유저 (예상의 2배)</li>
  <li><strong>Z세대 장악:</strong> 20대 아이폰 점유율 65% 독점</li>
  <li><strong>금융당국 규제 완화:</strong> 빅테크 금융 진출 허용</li>
  <li><strong>골드만삭스 철수:</strong> 미국에서 손실 누적으로 한국 시장 노림</li>
</ol>

<h3>🎯 MZ가 꼭 알아야 할 "꿀팁"</h3>

<div class="chart-container">
  <p><strong>💡 Tip 1:</strong> 12월 출시 때 "선착순 10만명" 특별 혜택 있을 듯</p>
  <p><strong>💡 Tip 2:</strong> 카뱅 계좌 미리 만들어두면 우선 발급 가능성↑</p>
  <p><strong>💡 Tip 3:</strong> 애플 제품 살 계획 있으면 12월까지 기다려라</p>
  <p><strong>💡 Tip 4:</strong> 해외직구족은 무조건 만들어야 함 (수수료 0%)</p>
</div>

<h3>⚡ vs 경쟁사 비교 (팩트체크)</h3>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">애플카드</span>
    <span class="stat-label">연회비 0원<br>캐시백 3%</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">현대카드M</span>
    <span class="stat-label">연회비 3만원<br>포인트 1%</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">삼성 taptap</span>
    <span class="stat-label">연회비 1.5만원<br>할인 2%</span>
  </div>
</div>

<blockquote>
💬 <strong>"이제 지갑에 카드 1장만 있으면 됨. 그게 애플카드야"</strong> - 카뱅 이용자 예상 댓글
</blockquote>

<h3>🚀 투자 포인트 정리</h3>

<div class="highlight-box">
  <p><strong>🔥 핫한 종목들:</strong></p>
  <ul>
    <li><strong>카카오뱅크(323410):</strong> 목표가 10만원 (현재 5.8만)</li>
    <li><strong>카카오(035720):</strong> 금융 부문 재평가 기대</li>
    <li><strong>비씨카드:</strong> 상장 시 대박 예상 (제휴 가능성)</li>
  </ul>
  <p style="color: #ef4444;">⚠️ 카드사 주식은 단기 조정 예상 (현대차, 신한지주 등)</p>
</div>

<p><strong>한 줄 정리:</strong> "애플카드 = 게임체인저. 12월 출시 전에 카뱅 계좌부터 만들어라. 카드업계 판 완전히 바뀐다!"</p>
</div>`,
                date: '2025-09-02T09:00:00.000Z',
                readTime: 7,
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 29,
                title: '🛢️ 유가 60달러 붕괴! "사우디 항복 선언" OPEC+ 감산 포기',
                category: 'economy',
                emoji: '⛽',
                excerpt: 'WTI 62달러 추락! 사우디 "더는 못 버텨" 감산 철회. 중국 원유 수입 -15% 쇼크. 주유소 리터당 1400원 시대 온다?',
                content: `<div class="content-wrapper">
<div class="highlight-box">
⛽ <strong>WTI 원유: $62.45 (-18%)</strong>
<span class="price-indicator price-down">📉 6개월 만에 최저가</span>
</div>

<h2>💥 빅뉴스! OPEC+ "감산 포기" 백기투항</h2>

<p>야 이거 <strong>진짜 터졌다!</strong></p>

<p>국제유가가 <strong>60달러대로 폭락</strong>했어! 사우디가 드디어 "더 이상 못 버티겠다" 하고 감산 포기 선언했대.</p>

<p>WTI 기준 <strong>$62.45</strong>... 작년 이맘때 100달러 넘었는데 -40% 떨어진 거야 ㄷㄷ</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$62.45</span>
    <span class="stat-label">WTI 현재가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">-40%</span>
    <span class="stat-label">연초 대비</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$55</span>
    <span class="stat-label">골드만삭스 전망</span>
  </div>
</div>

<h3>🇸🇦 사우디 "재정적자 못 버텨" 항복</h3>

<blockquote>
"감산? 이제 그만! 시장 점유율 뺏기느니 차라리 치킨게임 하겠다" - 압둘아지즈 빈 살만 (사우디 에너지장관)
</blockquote>

<p>사우디가 <strong>하루 200만 배럴</strong> 증산 결정! 이거 뭐... 유가 50달러 간다는 소리잖아?</p>

<div class="chart-container">
  <p><strong>📊 OPEC+ 감산 포기 이유:</strong></p>
  <p>✓ 미국 셰일오일 역대 최대 생산 (하루 1340만 배럴)</p>
  <p>✓ 러시아 몰래 할당량 초과 생산 (제재 회피 자금 필요)</p>
  <p>✓ 이란도 제재 무시하고 중국에 덤핑 판매</p>
  <p>✓ 베네수엘라, 리비아 생산 재개</p>
</div>

<h3>🇨🇳 중국發 "수요 쇼크" 설상가상</h3>

<div class="highlight-box">
  <h4>😱 중국 경제 지표 "충격"</h4>
  <ul>
    <li>원유 수입 -15% (8월 전년비)</li>
    <li>경제성장률 4.6% (목표 5% 미달)</li>
    <li>전기차 보급으로 휘발유 수요 -20%</li>
    <li>부동산 불황으로 경유 수요 급감</li>
  </ul>
</div>

<p>중국이 세계 원유의 <strong>15%를 소비</strong>하는데, 여기서 수요가 줄면? 게임 끝이지 뭐...</p>

<h3>⛽ 한국 "주유소 전쟁" 시작됐다</h3>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">1,680원</span>
    <span class="stat-label">현재 휘발유(리터)</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">1,400원</span>
    <span class="stat-label">연말 예상가</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">-300원</span>
    <span class="stat-label">예상 하락폭</span>
  </div>
</div>

<p><strong>알뜰주유소</strong>는 벌써 1,500원대 진입! GS칼텍스, SK에너지도 할인 전쟁 돌입했어.</p>

<h3>📈 수혜주 vs 피해주 정리</h3>

<div class="chart-container">
  <p><strong>🚀 오를 주식 (수혜):</strong></p>
  <p>✓ <strong>항공사:</strong> 대한항공, 아시아나 (유류비 -30%)</p>
  <p>✓ <strong>해운:</strong> HMM, 팬오션 (벙커유 가격 하락)</p>
  <p>✓ <strong>화학:</strong> LG화학, 롯데케미칼 (나프타 원가↓)</p>
  <p>✓ <strong>타이어:</strong> 한국타이어, 넥센 (합성고무 원가↓)</p>
</div>

<div class="chart-container" style="background: #fee2e2;">
  <p><strong>📉 떨어질 주식 (피해):</strong></p>
  <p>✓ <strong>정유:</strong> S-Oil, SK이노베이션 (정제마진 붕괴)</p>
  <p>✓ <strong>조선:</strong> 삼성중공업, 대우조선 (해양플랜트 주문↓)</p>
  <p>✓ <strong>건설:</strong> 현대건설, GS건설 (중동 프로젝트 취소)</p>
</div>

<h3>🤯 "리터당 1,200원" 시대 올까?</h3>

<p>전문가들 예측이 더 충격적이야:</p>

<blockquote>
💬 <strong>"WTI 50달러 뚫리면 휘발유 1,200원도 가능. 2015년 재현될 것"</strong> - 김현수 에너지경제연구원
</blockquote>

<div class="highlight-box">
  <h4>🎯 MZ 체크포인트</h4>
  <ul>
    <li><strong>자동차 구매:</strong> 휘발유차 다시 인기 (전기차 메리트↓)</li>
    <li><strong>여행 계획:</strong> 항공료 인하 예상 (유럽 50만원대 가능)</li>
    <li><strong>물가:</strong> 택배비, 배달비 인하 기대</li>
    <li><strong>투자:</strong> 정유주 손절, 항공/화학주 매수 타이밍</li>
  </ul>
</div>

<h3>⚡ 그런데... 진짜 문제는?</h3>

<div class="chart-container">
  <p><strong>😰 저유가 = 디플레이션 신호:</strong></p>
  <p>✓ 글로벌 경기침체 우려 확산</p>
  <p>✓ 중국 부동산 버블 붕괴 가속</p>
  <p>✓ 유럽 제조업 PMI 8개월 연속 하락</p>
  <p>✓ "수요가 없어서" 유가가 떨어지는 것</p>
</div>

<h3>🎬 결론: 뭘 해야 하나?</h3>

<div class="highlight-box" style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);">
  <h4>💡 Action Plan</h4>
  <ol>
    <li><strong>정유주 보유자:</strong> 손절 or 비중 축소</li>
    <li><strong>현금 보유자:</strong> 항공/화학주 분할 매수</li>
    <li><strong>차량 구매 예정:</strong> 3개월 기다려 (할인 예상)</li>
    <li><strong>해외여행:</strong> 연말 항공권 미리 예약</li>
  </ol>
</div>

<blockquote>
🔥 <strong>"유가 60달러 = 경제 비상등. 디플레이션 온다는 신호탄이야. 현금이 왕이 되는 시대 준비해"</strong>
</blockquote>

<p><strong>한 줄 정리:</strong> "유가 폭락은 양날의 검! 주유비는 싸지지만 경기침체 신호. 정유주 빼고 소비주로 갈아타라"</p>
</div>`,
                date: '2025-09-02T10:00:00.000Z',
                readTime: 8,
                image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 30,
                title: '💰 KB금융 10만원 돌파! "배당 수익률 7% 시대 열렸다"',
                category: 'stock',
                emoji: '🏦',
                excerpt: 'KB금융 주당 5천원 배당 현실화! 10만원 돌파 후 12만원 목표. MZ세대 배당주 투자 1위 "월 100만원 배당 가능"',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🏦 <strong>KB금융 주가: 103,900원</strong>
<span class="price-indicator price-up">📈 52주 신고가 경신!</span>
</div>

<h2>💸 배당 수익률 7% 시대 도래</h2>

<p><strong>KB금융</strong>이 드디어 <strong>10만원 시대</strong>를 열었다! 주당 배당금 5천원 시대가 온다.</p>

<p>2025년 예상 배당 수익률 <strong>7.2%</strong>. 예금금리의 2배, 부동산 월세의 3배!</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">5,000원</span>
    <span class="stat-label">2025년 예상 배당</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">7.2%</span>
    <span class="stat-label">배당 수익률</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">40%</span>
    <span class="stat-label">주주환원율</span>
  </div>
</div>

<h3>📊 왜 KB금융인가?</h3>

<ul>
  <li><strong>순이익 5조원 돌파:</strong> 역대 최대 실적 경신</li>
  <li><strong>분기배당 실시:</strong> 3개월마다 현금 입금</li>
  <li><strong>자사주 매입:</strong> 5천억원 추가 소각</li>
  <li><strong>ROE 15% 달성:</strong> 국내 은행 1위</li>
</ul>

<blockquote>
"KB금융은 한국의 JP모건이 될 것" - 이재용 KB금융 회장
</blockquote>

<h3>💎 MZ 배당투자 시뮬레이션</h3>

<div class="chart-container" style="background: #f8fafc;">
  <p>💰 <strong>1억원 투자시:</strong> 연 720만원 (월 60만원)</p>
  <p>💰 <strong>2억원 투자시:</strong> 연 1,440만원 (월 120만원)</p>
  <p>💰 <strong>5억원 투자시:</strong> 연 3,600만원 (월 300만원)</p>
  <p>🎯 <strong>월 100만원 배당:</strong> 1.7억원 투자 필요</p>
</div>

<h3>🏆 경쟁사 비교</h3>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>KB금융 우위</h4>
    <ul>
      <li>배당수익률: 7.2%</li>
      <li>분기배당 실시</li>
      <li>해외사업 25%</li>
      <li>디지털 1위</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>타 금융주</h4>
    <ul>
      <li>신한: 5.8%</li>
      <li>하나: 5.2%</li>
      <li>우리: 4.5%</li>
      <li>기업은행: 6.1%</li>
    </ul>
  </div>
</div>

<h3>📈 목표주가 상향</h3>

<ul>
  <li><strong>NH투자:</strong> 12만원 (상향)</li>
  <li><strong>삼성증권:</strong> 11.5만원</li>
  <li><strong>미래에셋:</strong> 13만원</li>
  <li><strong>JP모건:</strong> 125,000원</li>
</ul>

<h3>🚀 2025년 촉매제</h3>

<div class="highlight-box" style="background: linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%);">
  <p>✅ <strong>금리인하:</strong> 순이익 10% 추가 상승</p>
  <p>✅ <strong>배당 확대:</strong> 주당 6천원 가능</p>
  <p>✅ <strong>해외진출:</strong> 베트남 1위 은행 목표</p>
  <p>✅ <strong>핀테크:</strong> 케이뱅크 IPO 대박</p>
</div>

<h3>⚠️ 리스크 체크</h3>

<ul>
  <li>🔴 <strong>부동산 PF 부실:</strong> 3조원 잠재 리스크</li>
  <li>🔴 <strong>가계부채 증가:</strong> 연체율 상승 우려</li>
  <li>🔴 <strong>규제 강화:</strong> DSR 규제 영향</li>
</ul>

<h3>💡 투자 전략</h3>

<div class="chart-container">
  <p>🎯 <strong>목표가:</strong> 12만원 (15% 상승여력)</p>
  <p>📍 <strong>매수 타이밍:</strong> 10만원 이하 분할매수</p>
  <p>⏰ <strong>보유기간:</strong> 최소 3년 (배당 재투자)</p>
  <p>💰 <strong>포트폴리오:</strong> 전체의 15-20% 비중</p>
</div>

<p><strong>한 줄 정리:</strong> "KB금융 배당 7% 시대! 10만원 돌파 후 12만원 go. 월 100만원 배당 꿈이 아니다"</p>
</div>`,
                date: '2025-09-01T09:00:00.000Z',
                readTime: 7,
                image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop'
            },
            {
                id: Date.now() + 30,
                title: '🎌 애니메코인(ANIME) "일본 오타쿠 3조원 시장 정조준"',
                category: 'coin',
                emoji: '🗾',
                excerpt: 'ANIME $0.016 아즈키 NFT 연계! 일본 애니 시장 3조원 + Web3 융합. 바이낸스 상장 후 100배 목표 "넷플릭스 of 애니메"',
                content: `<div class="content-wrapper">
<div class="highlight-box">
🎌 <strong>ANIME 가격: $0.0158</strong>
<span class="price-indicator">시총 400위 다크호스</span>
</div>

<h2>🚀 오타쿠 경제 + 크립토 = 대박 공식</h2>

<p><strong>애니메코인(ANIME)</strong>이 일본 애니메이션 시장 <strong>3조원</strong>을 블록체인으로 혁신한다!</p>

<p>아즈키 NFT 팀이 만든 정통 Web3 프로젝트. <strong>100억 토큰</strong> 중 50.5% 커뮤니티 배분!</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$0.0158</span>
    <span class="stat-label">현재 가격</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">8,700만$</span>
    <span class="stat-label">시가총액</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">1,670만$</span>
    <span class="stat-label">24시간 거래량</span>
  </div>
</div>

<h3>🎭 왜 애니메코인인가?</h3>

<ul>
  <li><strong>아즈키 백그라운드:</strong> NFT 시총 10위권 블루칩</li>
  <li><strong>이더리움 + 아비트럼:</strong> 듀얼 체인 전략</li>
  <li><strong>GameSquare 파트너십:</strong> 250만 달러 투자 확정</li>
  <li><strong>2025년 1월 런칭:</strong> 초기 진입 기회</li>
</ul>

<blockquote>
"애니메이션은 일본의 원유다. ANIME는 그 원유를 Web3로 정제한다" - 아즈키 창업자
</blockquote>

<h3>💎 토크노믹스 분석</h3>

<div class="chart-container" style="background: #f8fafc;">
  <p>👥 <strong>커뮤니티:</strong> 50.5% (5.05억 토큰)</p>
  <p>🏛️ <strong>재단:</strong> 15% (락업 2년)</p>
  <p>💰 <strong>투자자:</strong> 10% (베스팅 18개월)</p>
  <p>🎮 <strong>에코시스템:</strong> 24.5%</p>
</div>

<h3>🏆 경쟁 프로젝트 비교</h3>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>ANIME 장점</h4>
    <ul>
      <li>아즈키 NFT 연계</li>
      <li>일본 시장 특화</li>
      <li>바이낸스 상장</li>
      <li>커뮤니티 50.5%</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>경쟁 코인</h4>
    <ul>
      <li>APE: 시총 10억$ (과대평가)</li>
      <li>SAND: 게임 특화</li>
      <li>MANA: 메타버스</li>
      <li>AXS: P2E 한정</li>
    </ul>
  </div>
</div>

<h3>📊 가격 시나리오</h3>

<div class="highlight-box" style="background: linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%);">
  <p>🎯 <strong>3개월:</strong> $0.05 (3배)</p>
  <p>🚀 <strong>6개월:</strong> $0.15 (10배)</p>
  <p>🌙 <strong>1년:</strong> $0.50 (30배)</p>
  <p>💎 <strong>강세장:</strong> $1.50 (100배)</p>
</div>

<h3>🔥 2025년 로드맵</h3>

<ul>
  <li><strong>Q1:</strong> 메인넷 런칭 + DEX 상장</li>
  <li><strong>Q2:</strong> 애니메 스트리밍 dApp</li>
  <li><strong>Q3:</strong> 일본 거래소 상장</li>
  <li><strong>Q4:</strong> 넷플릭스 파트너십(?)</li>
</ul>

<h3>💬 핵심 파트너십</h3>

<div class="chart-container">
  <p>🎮 <strong>GameSquare:</strong> 250만 달러 전략 투자</p>
  <p>🖼️ <strong>아즈키 NFT:</strong> 홀더 10만명</p>
  <p>⛓️ <strong>Arbitrum:</strong> L2 독점 지원</p>
  <p>🏢 <strong>바이낸스:</strong> 런치풀 상장 확정</p>
</div>

<h3>⚠️ 리스크 요인</h3>

<ul>
  <li>🔴 <strong>초기 프로젝트:</strong> 실제 프로덕트 미완성</li>
  <li>🔴 <strong>규제 리스크:</strong> 일본 암호화폐 규제</li>
  <li>🔴 <strong>경쟁 심화:</strong> 대형 IP 진입 가능</li>
  <li>🔴 <strong>베어마켓:</strong> 알트코인 90% 하락 가능</li>
</ul>

<h3>🎯 투자 전략</h3>

<div class="highlight-box">
  <p>💰 <strong>진입가:</strong> $0.01-0.02 (현재 적정)</p>
  <p>📈 <strong>1차 목표:</strong> $0.05 (부분 익절)</p>
  <p>🎯 <strong>최종 목표:</strong> $0.50+ (80% 익절)</p>
  <p>⚖️ <strong>포지션:</strong> 전체 포트폴리오 3-5%</p>
</div>

<h3>💡 MZ 투자 팁</h3>

<ul>
  <li>✅ <strong>소액 분산:</strong> 100만원 이하 투자</li>
  <li>✅ <strong>장기 홀딩:</strong> 최소 6개월 보유</li>
  <li>✅ <strong>커뮤니티 참여:</strong> 에어드랍 기회</li>
  <li>✅ <strong>손절 원칙:</strong> -30%에서 반드시 손절</li>
</ul>

<p><strong>한 줄 정리:</strong> "ANIME 일본 오타쿠 3조원 시장 혁신! 아즈키 NFT × Web3 = 100배 문샷 가능"</p>
</div>`,
                date: '2025-09-01T10:00:00.000Z',
                readTime: 8,
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc31?w=800&h=400&fit=crop'
            }
        ];
    
    // localStorage에서 추가된 글 확인
    const savedPosts = localStorage.getItem('finflixPosts');
    if (savedPosts) {
        const additionalPosts = JSON.parse(savedPosts);
        // 기본 포스트와 추가 포스트 병합 (중복 제거)
        const existingIds = new Set(defaultPosts.map(p => p.id));
        const newPosts = additionalPosts.filter(p => !existingIds.has(p.id));
        posts = [...defaultPosts, ...newPosts];
    } else {
        posts = defaultPosts;
    }
    
    // 날짜순 정렬 (최신순)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 포스트 저장
function savePosts() {
    localStorage.setItem('finflixPosts', JSON.stringify(posts));
}

// 포스트 렌더링
function renderPosts() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;
    
    // 카테고리 필터링
    const filteredPosts = currentCategory === 'all' 
        ? posts 
        : posts.filter(post => post.category === currentCategory);
    
    // 날짜순 정렬 (최신순)
    filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredPosts.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <h3>아직 글이 없어요 📝</h3>
                <p>관리자 모드에서 첫 글을 작성해보세요!</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredPosts.map(post => {
        const date = new Date(post.date);
        const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
        const categoryNames = {
            'stock': '주식',
            'coin': '코인',
            'economy': '경제',
            'hot': '핫이슈'
        };

        // 그라디언트 색상 순환
        const gradients = [
            'var(--gradient-1)',
            'var(--gradient-2)',
            'var(--gradient-3)',
            'var(--gradient-4)',
            'var(--gradient-bitcoin)'
        ];
        const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

        return `
            <div class="blog-card" onclick="viewPost(${post.id})">
                <div class="card-visual" style="background: ${randomGradient}">
                    ${post.image ? `<img loading="lazy" src="${post.image}" alt="${post.title}" />` : ''}
                    <div class="emoji-overlay">
                        ${post.emoji || '💰'}
                    </div>
                    <span class="card-badge">NEW</span>
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span class="card-category">${categoryNames[post.category]}</span>
                        <span>${formattedDate}</span>
                    </div>
                    <h2 class="card-title">${post.title}</h2>
                    <p class="card-excerpt">${post.excerpt}</p>
                    <div class="card-footer">
                        <span class="read-time">${getReadTimeEmoji(post.readTime || 5)}</span>
                        ${isAdmin ? `
                            <div class="card-actions">
                                <button class="edit-btn" onclick="event.stopPropagation(); editPost(${post.id})">수정</button>
                                <button class="delete-btn" onclick="event.stopPropagation(); deletePost(${post.id})">삭제</button>
                            </div>
                        ` : `
                            <div class="card-arrow">→</div>
                        `}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 모달 열기
function openModal() {
    document.getElementById('modal').classList.add('active');
    document.getElementById('modalTitle').textContent = '새 글 작성';
    document.getElementById('postForm').reset();
    editingPostId = null;
}

// 모달 닫기
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    editingPostId = null;
}

// 포스트 저장
function savePost() {
    const title = document.getElementById('postTitle').value;
    const category = document.getElementById('postCategory').value;
    const emoji = document.getElementById('postEmoji').value || '💰';
    const excerpt = document.getElementById('postExcerpt').value;
    const content = document.getElementById('postContent').value;

    const postData = {
        title,
        category,
        emoji,
        excerpt,
        content,
        date: new Date().toISOString(),
        readTime: Math.ceil(content.length / 500) // 대략적인 읽기 시간 계산
    };

    if (editingPostId) {
        // 수정
        const index = posts.findIndex(p => p.id === editingPostId);
        posts[index] = { ...posts[index], ...postData };
        showToast('글이 수정되었습니다 ✏️');
    } else {
        // 새 글
        posts.unshift({ ...postData, id: Date.now() });
        showToast('글이 작성되었습니다 ✨');
    }

    savePosts();
    renderPosts();
    closeModal();
}

// 포스트 수정
function editPost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    editingPostId = id;
    document.getElementById('modalTitle').textContent = '글 수정';
    document.getElementById('postTitle').value = post.title;
    document.getElementById('postCategory').value = post.category;
    document.getElementById('postEmoji').value = post.emoji;
    document.getElementById('postExcerpt').value = post.excerpt;
    document.getElementById('postContent').value = post.content;
    document.getElementById('modal').classList.add('active');
}

// 포스트 삭제
function deletePost(id) {
    if (confirm('정말 이 글을 삭제하시겠습니까?')) {
        posts = posts.filter(p => p.id !== id);
        savePosts();
        renderPosts();
        showToast('글이 삭제되었습니다 🗑️');
    }
}

// 포스트 보기
function viewPost(id) {
    if (!isAdmin) {
        const post = posts.find(p => p.id === id);
        if (post) {
            // 모달 생성
            const modal = document.createElement('div');
            modal.className = 'modal active';
            modal.style.zIndex = '500';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 900px;">
                    <div class="modal-header">
                        <h2>${post.title}</h2>
                        <button class="close-modal" onclick="this.closest('.modal').remove()">×</button>
                    </div>
                    ${post.image ? `<img loading="lazy" src="${post.image}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; margin-bottom: 1.5rem;" alt="${post.title}" />` : ''}
                    <div class="content-wrapper">
                        ${post.content || `<p>${post.excerpt}</p>`}
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // ESC 키로 닫기
            const closeOnEsc = (e) => {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', closeOnEsc);
                }
            };
            document.addEventListener('keydown', closeOnEsc);
            
            // 배경 클릭으로 닫기
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }
    }
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

// 읽기 시간을 MZ스럽게 표현하는 함수
function getReadTimeEmoji(minutes) {
    if (minutes <= 3) {
        return '🍿 가볍게 읽기';
    } else if (minutes <= 5) {
        return '☕️ 커피 한 잔';
    } else if (minutes <= 7) {
        return '🚇 지하철 한 정거장';
    } else if (minutes <= 10) {
        return '🍜 라면 끓이면서';
    } else {
        return '🛋 여유롭게 정독';
    }
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});