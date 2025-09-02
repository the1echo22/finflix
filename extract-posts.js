const fs = require('fs');
const path = require('path');

// script.js 파일 읽기
const scriptPath = path.join(__dirname, 'js/script.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// defaultPosts 배열 추출
const regex = /const defaultPosts = \[([\s\S]*?)\];/;
const match = scriptContent.match(regex);

if (match) {
    const postsContent = match[1];
    
    // 각 기사 객체를 파싱하여 배열로 변환
    // 복잡한 정규식 대신 실제 코드 실행으로 처리
    const codeToEval = `
        const posts = [${postsContent}];
        posts;
    `;
    
    try {
        // 안전한 방식으로 posts 데이터 추출
        const posts = eval(codeToEval);
        
        // SEO 친화적인 slug 생성 함수
        function createSeoSlug(title) {
            // 제목에서 키워드 추출하여 영문 slug 생성
            const titleMap = {
                '엔비디아': 'nvidia-blackwell-chip',
                '이더리움': 'ethereum-10k-trump',
                '삼성전자': 'samsung-tesla-ai-chip',
                '서울 아파트': 'seoul-apartment-15-billion',
                '한미약품': 'hanmi-pharm-glp1',
                '로블록스': 'roblox-metaverse-crash',
                '금': 'gold-3000-dollars',
                '애플': 'apple-250-ai-phone',
                '리플': 'ripple-xrp-10-dollars',
                '카카오': 'kakao-50k-hyperclova',
                '현대차': 'hyundai-300k-ev',
                '넷플릭스': 'netflix-1000-dollars',
                '도지코인': 'dogecoin-1-dollar-musk',
                '비자': 'visa-350-dollars',
                '미국 상업용 부동산': 'us-commercial-real-estate',
                '트럼프 코인': 'trump-coin-opportunity',
                '에릭 트럼프 WLFI': 'eric-trump-wlfi-unlock',
                '미카미 유아 코인': 'mikami-yua-coin-collapse',
                '솔라나': 'solana-298-dollars',
                '테슬라': 'tesla-714-target',
                '위너스 코인': 'winners-coin-800-percent',
                '잭슨홀': 'jackson-hole-powell-rate-cut',
                '중국 디플레이션': 'china-deflation-real-estate',
                '한은 금리': 'bok-rate-freeze-dilemma',
                '엔캐리 청산': 'yen-carry-trade-unwinding',
                '애플카드': 'apple-card-korea',
                '유가 60달러': 'oil-price-60-collapse',
                'KB금융': 'kb-financial-100k-dividend',
                'TON 코인': 'ton-durov-arrest-recovery',
                '앱토스': 'aptos-blackrock-buidl',
                'PEPE': 'pepe-memecoin-top3',
                '위너즈': 'winners-coin-800-percent',
                '애니메코인': 'anime-coin-otaku-market'
            };
            
            // 제목에서 주요 키워드 찾기
            for (const [keyword, slug] of Object.entries(titleMap)) {
                if (title.includes(keyword)) {
                    return slug;
                }
            }
            
            // 기본 slug 생성 (한글 제목을 영문으로)
            return title
                .replace(/🚨|🍎|🛢️|💳|📉|🚀|⚡|💰|📈|🏦|🌍|🎮|💊|🏠|🎺|💼|🎌|🇨🇳|🐸|💴|🎯|🏢|📺|🔥|💬/g, '') // 이모지 제거
                .replace(/[^\w가-힣\s]/g, '') // 특수문자 제거
                .trim()
                .replace(/\s+/g, '-')
                .toLowerCase();
        }
        
        // 각 포스트에 적절한 slug 할당
        const updatedPosts = posts.map(post => {
            if (post.id === 'oil-price-60-collapse' || post.id === 'apple-card-korea' || post.id === 'bitcoin-120k-crash-30k') {
                // 이미 slug가 있는 경우 그대로 사용
                return post;
            }
            
            // Date.now() 기반 ID를 SEO 친화적인 slug로 변경
            const newSlug = createSeoSlug(post.title);
            return {
                ...post,
                id: newSlug
            };
        });
        
        console.log('추출된 기사 수:', updatedPosts.length);
        console.log('기사 목록:');
        updatedPosts.forEach((post, index) => {
            console.log(`${index + 1}. ${post.id} - ${post.title}`);
        });
        
        // posts 데이터를 JSON 파일로 저장
        fs.writeFileSync(
            path.join(__dirname, 'extracted-posts.json'), 
            JSON.stringify(updatedPosts, null, 2), 
            'utf8'
        );
        
        console.log('\n✅ extracted-posts.json 파일로 저장 완료!');
        
    } catch (error) {
        console.error('Posts 데이터 추출 실패:', error);
    }
} else {
    console.log('defaultPosts 배열을 찾을 수 없습니다.');
}