const fs = require('fs');
const path = require('path');

// 추출된 posts 데이터 읽기
const postsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'extracted-posts.json'), 'utf8'));

// 더 정확한 제목별 slug 매핑
const titleToSlug = {
    '🛢️ 국제유가 60달러 붕괴 시나리오! 석유주 대폭락 경고': 'oil-price-60-collapse',
    '🍎 애플카드 한국 상륙 임박! 삼성카드 독주 체제 종료': 'apple-card-korea',
    '🚨 비트코인 12만 달러 돌파! 이제 시작이다': 'bitcoin-120k-crash-30k',
    '엔비디아 시총 3.7조 달러 돌파! "블랙웰 칩 품귀현상"': 'nvidia-blackwell-chip',
    '이더리움 1만 달러 간다? "트럼프 암호화폐 전략자산 지정"': 'ethereum-10k-trump',
    '위너즈 코인 바닥 찍었다? "800% 반등 예측"': 'winners-coin-800-percent',
    '솔라나 298달러 간다! "2025년 새로운 ATH 전망"': 'solana-298-dollars',
    '테슬라 714달러 목표가? "머스크 퇴진 시 -25% 경고"': 'tesla-714-target',
    '🚨 삼성전자 테슬라 22.8조 수주! "AI 반도체 대반격 시작"': 'samsung-tesla-ai-chip',
    '🏠 서울 아파트 10채 중 3채가 15억 넘었다 "마용성 MZ 몰린다"': 'seoul-apartment-15-billion',
    '💊 한미약품 44만원 간다? "GLP-1 삼중작용제 체중 -40% 성공"': 'hanmi-pharm-glp1',
    '🚨 비트코인 12만 달러에서 3만 달러로? "역대급 대폭락 온다"': 'bitcoin-crash-30k-warning',
    '🎮 로블록스 주가 30% 폭락! "메타버스 거품 꺼지나"': 'roblox-metaverse-crash',
    '💰 금 온스당 3000달러 간다! "연준 금리인하 + 중앙은행 매집"': 'gold-3000-dollars',
    '🍎 애플 주가 250달러? "AI폰 출시로 슈퍼사이클 온다"': 'apple-250-ai-phone',
    '🏦 리플(XRP) 10달러 간다? "SEC 소송 종결 임박"': 'ripple-xrp-10-dollars',
    '🔥 카카오 5만원 간다? "AI 하이퍼클로바X 대박 조짐"': 'kakao-50k-hyperclova',
    '🚗 현대차 30만원? "전기차 판매 1위, 수소차 독점"': 'hyundai-300k-ev',
    '📺 넷플릭스 1000달러? "광고 요금제 가입자 폭증"': 'netflix-1000-dollars',
    '⚡ 도지코인 1달러? "머스크 X 결제 통합 확정"': 'dogecoin-1-dollar-musk',
    '💳 비자 카드 주가 350달러! "결제 독점 지위 굳건"': 'visa-350-dollars',
    '🏢 미국 상업용 부동산 폭락! "재택근무로 빌딩 텅텅"': 'us-commercial-real-estate',
    '🎺 트럼프 코인 $9.5 "74달러에서 -89% 폭락, 지금이 기회?"': 'trump-coin-opportunity',
    '💼 에릭 트럼프 WLFI "9월 1일 언락! 15억 달러 IPO 간다"': 'eric-trump-wlfi-unlock',
    '🎌 미카미 유아 코인 "340만 달러→10만 달러 -97% 폭망"': 'mikami-yua-coin-collapse',
    '🏦 잭슨홀 쇼크! 파월 "금리인하 전면 재검토"': 'jackson-hole-powell-rate-cut',
    '🇨🇳 중국 디플레이션 공포! "부동산 -25% 추가 하락"': 'china-deflation-real-estate',
    '💬 TON 코인 $2.44 "듀로프 체포 후 회복세, 텔레그램 10억 유저 파워"': 'ton-durov-arrest-recovery',
    '🚀 앱토스(APT) $4.46 "블랙록 BUIDL 상륙! 기관 러시 시작"': 'aptos-blackrock-buidl',
    '🐸 PEPE "밈코인 3위 등극! 시바·도지 추월 노린다"': 'pepe-memecoin-top3',
    '🏦 한은 금리 동결 막전막후! "환율 1400원 vs 부동산 폭주"': 'bok-rate-freeze-dilemma',
    '💴 엔캐리 청산 쓰나미! "닛케이 -12% 블랙먼데이"': 'yen-carry-trade-unwinding',
    '🍎 애플카드 한국 상륙! "카뱅과 연내 출시 확정"': 'apple-card-korea-kabank',
    '🛢️ 유가 60달러 붕괴! "사우디 항복 선언" OPEC+ 감산 포기': 'oil-price-60-saudi-surrender',
    '💰 KB금융 10만원 돌파! "배당 수익률 7% 시대 열렸다"': 'kb-financial-100k-dividend',
    '🎌 애니메코인(ANIME) "일본 오타쿠 3조원 시장 정조준"': 'anime-coin-otaku-market'
};

// 카테고리별 키워드 추가
const addKeywordsByCategory = (post) => {
    const baseKeywords = post.keywords || '';
    let additionalKeywords = [];
    
    switch(post.category) {
        case 'coin':
            additionalKeywords = ['암호화폐', '투자', '블록체인', '코인'];
            break;
        case 'stock':
            additionalKeywords = ['주식', '투자', '증권', '주가'];
            break;
        case 'economy':
            additionalKeywords = ['경제', '금융', '투자', '시장'];
            break;
        case 'hot':
            additionalKeywords = ['핫이슈', '투자', '금융', '뉴스'];
            break;
    }
    
    const combinedKeywords = [baseKeywords, ...additionalKeywords]
        .filter(Boolean)
        .join(', ');
    
    return combinedKeywords;
};

// 각 포스트의 slug 수정 및 키워드 보완
const fixedPosts = postsData.map(post => {
    const correctSlug = titleToSlug[post.title];
    
    if (correctSlug) {
        return {
            ...post,
            id: correctSlug,
            keywords: addKeywordsByCategory(post)
        };
    }
    
    // 매핑에 없는 경우 기본 slug 생성
    console.log('매핑되지 않은 제목:', post.title);
    return {
        ...post,
        keywords: addKeywordsByCategory(post)
    };
});

console.log('수정된 기사 수:', fixedPosts.length);
console.log('\n기사 목록 (중복 제거):');
const uniqueSlugs = new Set();
fixedPosts.forEach((post, index) => {
    if (uniqueSlugs.has(post.id)) {
        console.log(`❌ 중복 slug 발견: ${post.id} - ${post.title}`);
    } else {
        uniqueSlugs.add(post.id);
        console.log(`${index + 1}. ${post.id} - ${post.title}`);
    }
});

// 수정된 posts 데이터 저장
fs.writeFileSync(
    path.join(__dirname, 'fixed-posts.json'), 
    JSON.stringify(fixedPosts, null, 2), 
    'utf8'
);

console.log('\n✅ fixed-posts.json 파일로 저장 완료!');
console.log(`총 ${uniqueSlugs.size}개의 고유한 slug 생성됨`);