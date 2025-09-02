const fs = require('fs');
const path = require('path');

// 기사 데이터 - script.js의 defaultPosts 배열에서 추출 (36개 모든 기사)
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixed-posts.json'), 'utf8'));

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
    console.log('🚀 FinFlix 모든 기사 생성을 시작합니다...\n');
    console.log(`📊 총 ${posts.length}개의 기사 처리 예정\n`);
    
    try {
        // 템플릿 로드
        const template = loadTemplate();
        console.log('📄 템플릿 파일 로드 완료');
        
        let successCount = 0;
        let errorCount = 0;
        
        // 각 기사별 HTML 파일 생성
        posts.forEach((post, index) => {
            try {
                const html = generatePostHTML(post, template);
                const filename = `${post.id}.html`;
                const filepath = path.join(__dirname, filename);
                
                fs.writeFileSync(filepath, html, 'utf8');
                console.log(`✅ ${index + 1}/${posts.length} ${filename} 생성 완료 - ${post.title.substring(0, 50)}${post.title.length > 50 ? '...' : ''}`);
                successCount++;
            } catch (error) {
                console.error(`❌ ${post.id} 생성 실패:`, error.message);
                errorCount++;
            }
        });
        
        // sitemap.xml 업데이트
        console.log('\n🗺️ sitemap.xml 업데이트 중...');
        updateSitemap();
        
        console.log(`\n🎉 모든 기사 생성 완료!`);
        console.log(`✅ 성공: ${successCount}개 파일`);
        if (errorCount > 0) {
            console.log(`❌ 실패: ${errorCount}개 파일`);
        }
        console.log(`\n📂 생성된 파일 목록:`);
        posts.forEach((post, index) => {
            console.log(`   ${index + 1}. ${post.id}.html`);
        });
        console.log(`   ${posts.length + 1}. sitemap.xml (업데이트됨)`);
        
        console.log(`\n🌐 웹사이트에서 확인 가능한 URL:`);
        const samplePosts = posts.slice(0, 5);
        samplePosts.forEach(post => {
            console.log(`   - https://www.finflix.org/${post.id}.html`);
        });
        console.log(`   ... 및 ${posts.length - 5}개의 추가 페이지`);
        
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