// 전역 변수
let posts = [];
let isAdmin = false;
let editingPostId = null;
let currentCategory = 'all';

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
                image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1610878180933-123728745d22?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=800&h=400&fit=crop'
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
                image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop'
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