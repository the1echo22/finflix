const fs = require('fs');
const path = require('path');

// 기사 데이터 - script.js의 defaultPosts 배열에서 추출
const posts = [
    {
        id: "bitcoin-120k-crash-30k",
        title: "🚨 비트코인 12만 달러 돌파! 이제 시작이다",
        category: "coin",
        emoji: "🚀",
        excerpt: "트럼프 취임 전 역대 최고가 121,641달러 달성! 기요사키의 100만 달러 예측이 현실이 될까? 12월 5일 처음 10만 달러 돌파 후 단 한 달 만에 20% 상승!",
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
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=400&fit=crop',
        keywords: '비트코인, 암호화폐, 트럼프, 투자, 12만달러, 기요사키, 버핏, BTC, 코인'
    },
    {
        id: "apple-card-korea",
        title: "🍎 애플카드 한국 상륙 임박! 삼성카드 독주 체제 종료",
        category: "economy",
        emoji: "💳",
        excerpt: "2025년 하반기 애플카드 한국 출시 예정! 현대카드와 파트너십, 혁신적 캐시백 시스템으로 국내 카드업계 판도 변화 예상. 월 100만원 사용 시 연 15만원 혜택!",
        content: `<div class="content-wrapper">
<div class="highlight-box">
🏦 <strong>애플카드 한국 출시:</strong> 2025년 9월 예정
<span class="price-indicator price-up">📈 현대카드 파트너십 확정</span>
</div>

<h2>🚀 애플카드가 한국에 온다!</h2>

<p>드디어 <strong>애플카드(Apple Card)</strong>가 한국 시장에 상륙한다!</p>

<p>2019년 미국 출시 이후 6년 만에 첫 해외 진출지로 한국을 선택했다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">2025년 9월</span>
    <span class="stat-label">한국 출시일</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">현대카드</span>
    <span class="stat-label">국내 파트너</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">3%</span>
    <span class="stat-label">애플 제품 캐시백</span>
  </div>
</div>

<h3>💎 애플카드만의 특별한 혜택</h3>

<p>기존 국내 카드와는 <strong>완전히 다른 차원</strong>의 서비스다.</p>

<ul>
  <li><strong>애플 제품 구매:</strong> 3% 캐시백 (아이폰, 맥북, 에어팟 등)</li>
  <li><strong>애플페이 결제:</strong> 2% 캐시백 (모든 가맹점)</li>
  <li><strong>실물카드 결제:</strong> 1% 캐시백 (최소 보장)</li>
  <li><strong>Daily Cash:</strong> 매일 실시간 캐시백 적립</li>
</ul>

<h3>🎯 기존 카드 vs 애플카드 비교</h3>

<div class="chart-container">
  <div class="comparison-row">
    <strong>삼성카드 taptap O:</strong> 최대 1.5% 적립
  </div>
  <div class="comparison-row">
    <strong>현대카드 M:</strong> 최대 1.0% 적립  
  </div>
  <div class="comparison-row" style="background: #f0f9ff; border-left: 4px solid #3b82f6;">
    <strong>애플카드:</strong> 최대 3.0% 캐시백 (즉시 지급)
  </div>
</div>

<h3>🏦 현대카드와의 파트너십</h3>

<blockquote>
"애플과 현대카드의 만남으로 국내 결제 시장에 새로운 패러다임을 제시할 것" - 현대카드 관계자
</blockquote>

<p>현대카드의 기존 인프라 + 애플의 기술력이 결합된다.</p>

<ul>
  <li>현대카드 기존 가맹점 네트워크 활용</li>
  <li>애플페이와 완벽 연동</li>
  <li>월렛(Wallet) 앱으로 통합 관리</li>
  <li>Face ID/Touch ID 생체인증</li>
</ul>

<h3>💰 실제 혜택 계산해보기</h3>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">월 50만원</span>
    <span class="stat-label">연간 9만원 적립</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">월 100만원</span>
    <span class="stat-label">연간 18만원 적립</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">월 200만원</span>
    <span class="stat-label">연간 36만원 적립</span>
  </div>
</div>

<h3>🚨 카드업계 지각변동</h3>

<p>국내 카드 3사(신한·삼성·현대) 독주 체제에 <strong>큰 변화</strong>가 온다.</p>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>기존 카드사 위기</h4>
    <ul>
      <li>MZ세대 이탈 가속화</li>
      <li>애플 생태계 고객 잠식</li>
      <li>혁신 압박 증가</li>
      <li>수익성 악화</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>소비자 메리트</h4>
    <ul>
      <li>더 높은 적립률</li>
      <li>간편한 결제 경험</li>
      <li>투명한 수수료</li>
      <li>혁신적인 UX</li>
    </ul>
  </div>
</div>

<h3>📱 애플페이도 동시 확산</h3>

<p>애플카드 출시와 함께 <strong>애플페이</strong> 가맹점도 급속 확산 예정이다.</p>

<ul>
  <li><strong>편의점:</strong> CU, GS25, 세븐일레븐</li>
  <li><strong>대형마트:</strong> 롯데마트, 이마트, 홈플러스</li>
  <li><strong>온라인:</strong> 쿠팡, 11번가, 옥션</li>
  <li><strong>교통:</strong> 지하철, 버스, 택시</li>
</ul>

<h3>💡 출시 전 준비사항</h3>

<div class="highlight-box">
  <h3>🎯 신청 예정자 체크리스트</h3>
  <ul>
    <li>✅ iPhone 12 이상 기종 보유</li>
    <li>✅ iOS 최신 버전 업데이트</li>
    <li>✅ 애플 ID 한국 계정 설정</li>
    <li>✅ 신용평가 700점 이상 권장</li>
  </ul>
</div>

<h3>🔮 향후 전망</h3>

<p><strong>2025년 말까지의 예상 시나리오:</strong></p>

<ol>
  <li><strong>9월:</strong> 애플카드 정식 출시</li>
  <li><strong>10월:</strong> 애플페이 가맹점 2만곳 돌파</li>
  <li><strong>11월:</strong> 카드사 경쟁 혜택 확대</li>
  <li><strong>12월:</strong> 애플카드 회원 50만명 달성</li>
</ol>

<blockquote>
💡 <strong>Pro Tip:</strong> "애플 생태계 유저라면 필수! 기존 주력카드는 유지하되, 애플 제품 구매와 애플페이 결제는 애플카드로 갈아탈 것"
</blockquote>

<h3>⚠️ 주의사항</h3>

<ul>
  <li>🔴 <strong>연회비:</strong> 아직 미공개 (미국은 무료)</li>
  <li>🔴 <strong>신용한도:</strong> 개인별 차등 적용</li>
  <li>🔴 <strong>외화결제:</strong> 수수료 정책 미확정</li>
  <li>🔴 <strong>포인트 호환:</strong> 기존 적립 포인트와 연동 불가</li>
</ul>
</div>`,
        date: '2025-09-01T14:00:00.000Z',
        readTime: 7,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
        keywords: '애플카드, Apple Card, 현대카드, 애플페이, 신용카드, 캐시백, 한국출시, 결제'
    },
    {
        id: "oil-price-60-collapse",
        title: "🛢️ 국제유가 60달러 붕괴 시나리오! 석유주 대폭락 경고",
        category: "economy",  
        emoji: "📉",
        excerpt: "중국 경제둔화와 전기차 급성장으로 석유 수요 정점 통과! 브렌트유 60달러 하락 시 SK이노베이션 -40%, S-Oil -35% 예상. 2025년 에너지 대전환 가속화",
        content: `<div class="content-wrapper">
<div class="highlight-box">
📊 <strong>현재 브렌트유 가격: $74.23</strong> (2025년 9월 기준)
<span class="price-indicator price-down">📉 -12% (3개월간)</span>
</div>

<h2>🚨 석유 수요 피크아웃! 60달러 붕괴 현실화</h2>

<p>국제 유가가 <strong>구조적 하락세</strong>에 진입했다!</p>

<p>골드만삭스는 2025년 말 브렌트유 60달러 전망을 발표하며 석유산업 대변화를 예고했다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$74.23</span>
    <span class="stat-label">현재 브렌트유</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$60</span>
    <span class="stat-label">목표가 전망</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">-19%</span>
    <span class="stat-label">하락 폭</span>
  </div>
</div>

<h3>⚡ 석유 수요 감소의 3대 요인</h3>

<h4>1️⃣ 중국 경제성장률 급락</h4>

<p>중국의 석유 소비가 <strong>사상 처음으로 감소세</strong>로 돌아섰다.</p>

<ul>
  <li>2024년 경제성장률: 4.2% (목표 5.0% 미달)</li>
  <li>제조업 PMI: 49.8 (3개월 연속 위축)</li>
  <li>석유 수입량: 전년 대비 -8.5%</li>
</ul>

<h4>2️⃣ 전기차 혁명 가속화</h4>

<blockquote>
"2024년 전 세계 전기차 판매량이 1,400만대를 돌파했습니다. 이는 하루 평균 38,000대가 팔린 것입니다" - IEA 보고서
</blockquote>

<div class="chart-container">
  <p><strong>🚗 전기차 보급률 (2024년):</strong></p>
  <p>• 노르웨이: 82.4%</p>
  <p>• 중국: 35.7%</p>
  <p>• 독일: 18.4%</p>
  <p>• 미국: 9.0%</p>
  <p>• 한국: 8.8%</p>
</div>

<h4>3️⃣ 재생에너지 급성장</h4>

<p>태양광과 풍력 발전이 <strong>화석연료를 대체</strong>하고 있다.</p>

<ul>
  <li>2024년 재생에너지 증설: 346GW (역대 최고)</li>
  <li>태양광 발전 비용: 10년 전 대비 -85%</li>
  <li>배터리 저장 비용: -90% 하락</li>
</ul>

<h3>📉 국내 석유주 대폭락 시나리오</h3>

<p>브렌트유가 60달러로 하락할 경우 예상 주가 변동:</p>

<div class="risk-reward-box">
  <div class="risk-section">
    <h4>정유업계 타격</h4>
    <ul>
      <li>SK이노베이션: -40% 예상</li>
      <li>S-Oil: -35% 예상</li>
      <li>GS홀딩스: -30% 예상</li>
      <li>현대오일뱅크: -32% 예상</li>
    </ul>
  </div>
  <div class="reward-section">
    <h4>수혜 업종</h4>
    <ul>
      <li>항공주: +15-20%</li>
      <li>물류주: +10-15%</li>
      <li>화학주: +8-12%</li>
      <li>전기차: +25-30%</li>
    </ul>
  </div>
</div>

<h3>🏭 사우디 아람코의 절망</h3>

<p>세계 최대 석유기업 아람코도 <strong>위기감</strong>을 드러냈다.</p>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">$1.9조</span>
    <span class="stat-label">2021년 시가총액</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">$1.2조</span>
    <span class="stat-label">현재 시가총액</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">-37%</span>
    <span class="stat-label">3년간 하락률</span>
  </div>
</div>

<blockquote>
"우리는 석유 수요 정점이 2030년보다 빨리 올 것으로 본다" - 아민 나세르 아람코 CEO
</blockquote>

<h3>🌍 OPEC+ 감산 효과 제한적</h3>

<p>OPEC+의 감산 정책도 <strong>한계</strong>를 드러내고 있다.</p>

<ul>
  <li><strong>감산 규모:</strong> 일 220만 배럴 (2024년 4월부터)</li>
  <li><strong>실제 효과:</strong> 유가 상승 불과 $5-7</li>
  <li><strong>비OPEC 증산:</strong> 미국 셰일오일 급증</li>
  <li><strong>수요 둔화:</strong> 감산 효과 상쇄</li>
</ul>

<h3>⚡ 미국 셰일오일 역습</h3>

<p>미국 셰일오일 생산량이 <strong>사상 최고치</strong>를 경신 중이다.</p>

<div class="chart-container">
  <p><strong>🛢️ 미국 원유 생산량:</strong></p>
  <p>• 2024년: 일 1,340만 배럴</p>
  <p>• 2023년: 일 1,280만 배럴</p>  
  <p>• 증가율: +4.7% (연간)</p>
  <p>• 전망: 2025년 1,400만 배럴 돌파</p>
</div>

<h3>🎯 투자 전략 대전환</h3>

<h4>✅ 매수 추천 섹터</h4>

<div class="highlight-box">
  <ul>
    <li><strong>🔋 배터리:</strong> LG에너지솔루션, 삼성SDI</li>
    <li><strong>🚗 전기차:</strong> 현대차, 기아, 테슬라</li>
    <li><strong>☀️ 태양광:</strong> 한화솔루션, 신성이엔지</li>
    <li><strong>✈️ 항공:</strong> 대한항공, 아시아나항공</li>
  </ul>
</div>

<h4>❌ 매도 추천 섹터</h4>

<div class="risk-section">
  <ul>
    <li><strong>🛢️ 정유:</strong> SK이노베이션, S-Oil</li>
    <li><strong>⛽ 주유소:</strong> GS리테일, SK네트웍스</li>
    <li><strong>🚢 해운:</strong> HMM, 팬오션 (원유 운송)</li>
    <li><strong>⚒️ 시추:</strong> 대우조선해양 (시추선)</li>
  </ul>
</div>

<h3>📊 글로벌 에너지 포트폴리오 변화</h3>

<div class="stat-grid">
  <div class="stat-card">
    <span class="stat-value">2024년</span>
    <span class="stat-label">석유 30%, 재생 18%</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">2030년</span>
    <span class="stat-label">석유 22%, 재생 35%</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">2040년</span>
    <span class="stat-label">석유 15%, 재생 55%</span>
  </div>
</div>

<h3>💡 MZ 투자자를 위한 가이드</h3>

<ol>
  <li><strong>📉 석유주 단계적 매도:</strong> 고점 대비 -20% 손절선 설정</li>
  <li><strong>🔄 포트폴리오 리밸런싱:</strong> 전통 에너지 20% → 10%로 축소</li>
  <li><strong>🌱 ESG 투자 확대:</strong> 재생에너지, 전기차 비중 확대</li>
  <li><strong>🎯 장기 시각 유지:</strong> 에너지 전환은 10년 스판의 메가트렌드</li>
</ol>

<h3>🔮 2025년 유가 전망</h3>

<div class="chart-container" style="background: linear-gradient(135deg, #fee2e2 0%, #dc2626 100%); color: white; padding: 1.5rem;">
  <p><strong>🎯 골드만삭스:</strong> $55-65 (베어케이스 $45)</p>
  <p><strong>🎯 JP모건:</strong> $60-70 (중국 회복 시 $75)</p>
  <p><strong>🎯 씨티:</strong> $58-68 (OPEC+ 추가 감산 고려)</p>
  <p><strong>🎯 FinFlix 전망:</strong> $62±5 (중앙값)</p>
</div>

<blockquote>
💡 <strong>Pro Tip:</strong> "석유 시대의 종말은 이미 시작됐다. 다음 10년은 에너지 대전환의 골든타임. 전통 에너지는 점진적 매도, 신에너지는 적극적 매수!"
</blockquote>
</div>`,
        date: '2025-09-01T16:00:00.000Z',
        readTime: 9,
        image: 'https://images.unsplash.com/photo-1615999948620-9e077b80b9b1?w=800&h=400&fit=crop',
        keywords: '국제유가, 브렌트유, 석유주, SK이노베이션, S-Oil, 전기차, 재생에너지, 투자, 유가전망'
    }
];

// 카테고리 매핑
const categoryMap = {
    'coin': '코인',
    'stock': '주식',
    'economy': '경제',
    'hot': '핫이슈'
};

// 문자열을 URL-safe slug로 변환
function createSlug(title) {
    return title
        .replace(/🚨|🍎|🛢️|💳|📉|🚀|⚡|💰|📈|🏦|🌍/g, '') // 이모지 제거
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-가-힣]/g, '')
        .toLowerCase();
}

// 날짜 포맷팅
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

// 단어 수 계산 (대략적)
function getWordCount(content) {
    const text = content.replace(/<[^>]*>/g, ''); // HTML 태그 제거
    return Math.floor(text.length / 2); // 한글 기준 대략적 단어 수
}

// 템플릿 파일 읽기
function loadTemplate() {
    const templatePath = path.join(__dirname, 'post-template.html');
    return fs.readFileSync(templatePath, 'utf8');
}

// 개별 기사 HTML 생성
function generatePostHTML(post, template) {
    let html = template;
    
    // 날짜 처리
    const dateObj = new Date(post.date);
    const dateISO = dateObj.toISOString();
    const dateFormat = formatDate(post.date);
    
    // 템플릿 변수 치환
    const replacements = {
        '{{TITLE}}': post.title,
        '{{SLUG}}': post.id,
        '{{DESCRIPTION}}': post.excerpt,
        '{{KEYWORDS}}': post.keywords,
        '{{CATEGORY}}': post.category,
        '{{CATEGORY_KO}}': categoryMap[post.category],
        '{{DATE_ISO}}': dateISO,
        '{{DATE_FORMAT}}': dateFormat,
        '{{CONTENT}}': post.content,
        '{{IMAGE}}': post.image,
        '{{WORD_COUNT}}': getWordCount(post.content),
        '{{read_time}}': post.readTime || 5
    };
    
    // 모든 치환 실행
    for (const [placeholder, value] of Object.entries(replacements)) {
        html = html.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
    }
    
    return html;
}

// sitemap.xml 업데이트
function updateSitemap() {
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Main Pages -->
  <url>
    <loc>https://www.finflix.org/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.finflix.org/about.html</loc>
    <lastmod>2025-08-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.finflix.org/contact.html</loc>
    <lastmod>2025-08-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.finflix.org/privacy.html</loc>
    <lastmod>2025-08-29</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://www.finflix.org/terms.html</loc>
    <lastmod>2025-08-29</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <!-- Blog Posts -->`;

    // 최신 기사들을 날짜 순으로 정렬
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedPosts.forEach((post, index) => {
        const dateObj = new Date(post.date);
        const priority = index < 5 ? 0.9 : 0.8; // 최신 5개는 높은 우선순위
        const isRecent = (Date.now() - dateObj.getTime()) < (7 * 24 * 60 * 60 * 1000); // 7일 이내
        
        sitemap += `
  <url>
    <loc>https://www.finflix.org/${post.id}.html</loc>
    <lastmod>${dateObj.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>${isRecent ? `
    <news:news>
      <news:publication>
        <news:name>FinFlix</news:name>
        <news:language>ko</news:language>
      </news:publication>
      <news:publication_date>${dateObj.toISOString()}</news:publication_date>
      <news:title>${post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
      <news:keywords>${post.keywords}</news:keywords>
    </news:news>` : ''}
  </url>`;
    });

    sitemap += '\n</urlset>';
    
    const sitemapPath = path.join(__dirname, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log('✅ sitemap.xml이 업데이트되었습니다.');
}

// 메인 실행 함수
function generateAllPosts() {
    console.log('🚀 FinFlix 기사 생성을 시작합니다...\n');
    
    try {
        // 템플릿 로드
        const template = loadTemplate();
        console.log('📄 템플릿 파일 로드 완료');
        
        let successCount = 0;
        let errorCount = 0;
        
        // 각 기사별 HTML 파일 생성
        posts.forEach(post => {
            try {
                const html = generatePostHTML(post, template);
                const filename = `${post.id}.html`;
                const filepath = path.join(__dirname, filename);
                
                fs.writeFileSync(filepath, html, 'utf8');
                console.log(`✅ ${filename} 생성 완료 - ${post.title}`);
                successCount++;
            } catch (error) {
                console.error(`❌ ${post.id} 생성 실패:`, error.message);
                errorCount++;
            }
        });
        
        // sitemap.xml 업데이트
        updateSitemap();
        
        console.log(`\n🎉 생성 완료!`);
        console.log(`✅ 성공: ${successCount}개 파일`);
        if (errorCount > 0) {
            console.log(`❌ 실패: ${errorCount}개 파일`);
        }
        console.log(`📍 생성된 파일들:`);
        posts.forEach(post => {
            console.log(`   - ${post.id}.html`);
        });
        console.log(`   - sitemap.xml (업데이트됨)`);
        
    } catch (error) {
        console.error('🚨 전체 프로세스 실패:', error);
    }
}

// Node.js 환경에서 실행 시
if (require.main === module) {
    generateAllPosts();
}

module.exports = {
    generateAllPosts,
    posts,
    categoryMap
};