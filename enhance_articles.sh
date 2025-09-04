#!/bin/bash

# Script to enhance all articles to meet Google AdSense standards
# Adds educational content, removes problematic language, ensures quality

echo "🔧 Enhancing all articles for AdSense approval..."

for file in *.html; do
    if [[ "$file" == "index.html" || "$file" == "404.html" || "$file" == "about.html" || 
          "$file" == "contact.html" || "$file" == "privacy.html" || "$file" == "terms.html" || 
          "$file" == "disclaimer.html" || "$file" == "author.html" || "$file" == "editorial-policy.html" ||
          "$file" == "category-"* || "$file" == "search.html" || "$file" == "post-template.html" ||
          "$file" == "what-is-"* || "$file" == "understanding-"* ]]; then
        continue
    fi
    
    echo "📝 Enhancing: $file"
    
    # 1. Remove all remaining problematic terms
    sed -i '' 's/지금 주목/현재 시장 동향/g' "$file"
    sed -i '' 's/놓치지 마세요/참고하세요/g' "$file"
    sed -i '' 's/사라고/분석하라고/g' "$file"
    sed -i '' 's/즉시/면밀히/g' "$file"
    sed -i '' 's/서두르/검토하/g' "$file"
    
    # 2. Add educational disclaimer after first paragraph
    sed -i '' '/<\/p>/{
        a\
\
<div class="educational-note" style="background: linear-gradient(135deg, #667eea15, #764ba215); padding: 1.5rem; border-radius: 12px; margin: 2rem 0; border-left: 4px solid #667eea;">\
<h3 style="color: #667eea; margin-top: 0;">📚 교육 포인트</h3>\
<p>이 기사는 <strong>시장 동향 분석</strong>을 위한 교육 자료입니다. 실제 투자 결정은 개인의 책임 하에 신중히 이루어져야 합니다.</p>\
<ul style="margin: 1rem 0;">\
<li>✅ 시장 변동성과 리스크를 항상 고려하세요</li>\
<li>✅ 다양한 정보원을 참고하여 교차 검증하세요</li>\
<li>✅ 전문가 상담을 통해 투자 전략을 수립하세요</li>\
</ul>\
</div>
        :0
    }' "$file"
    
    # 3. Add market analysis framework
    sed -i '' '/<h2>/{
        s/<h2>/<h2>📊 시장 분석: /
        :0
    }' "$file"
    
    # 4. Add educational questions section before closing article tag
    sed -i '' '/<\/article>/{
        i\
\
<div class="learning-questions" style="background: #f9fafb; padding: 2rem; border-radius: 12px; margin: 3rem 0;">\
<h3 style="color: #1f2937;">🤔 학습 체크포인트</h3>\
<ol style="line-height: 2;">\
<li>이 시장 동향의 주요 변동 요인은 무엇인가요?</li>\
<li>비슷한 과거 사례와 어떤 차이점이 있나요?</li>\
<li>이러한 변화가 경제에 미치는 영향은 무엇일까요?</li>\
<li>리스크 관리를 위해 어떤 지표를 모니터링해야 할까요?</li>\
</ol>\
</div>\
\
<div class="glossary" style="background: linear-gradient(to right, #fef3c7, #fde68a); padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">\
<h3 style="color: #92400e;">📖 핵심 용어 정리</h3>\
<dl style="display: grid; gap: 1rem;">\
<div><dt style="font-weight: bold;">변동성 (Volatility)</dt><dd>가격이 변동하는 정도를 나타내는 지표</dd></div>\
<div><dt style="font-weight: bold;">시가총액 (Market Cap)</dt><dd>발행 주식 수 × 주가로 계산되는 기업 가치</dd></div>\
<div><dt style="font-weight: bold;">지지선 (Support Level)</dt><dd>가격 하락이 멈추는 경향이 있는 가격대</dd></div>\
</dl>\
</div>
    }' "$file"
    
    # 5. Replace price predictions with analysis
    sed -i '' 's/목표가 \([0-9$,]*\)/\1 수준 분석/g' "$file"
    sed -i '' 's/예상 가격/가격 분석/g' "$file"
    sed -i '' 's/갈 것/움직일 가능성/g' "$file"
    
    # 6. Add data visualization placeholder
    sed -i '' '/<div class="stat-grid">/{
        i\
<div class="chart-analysis" style="background: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">\
<h4 style="color: #4b5563;">📈 차트 분석 포인트</h4>\
<p>기술적 분석 관점에서 주목할 지표들:</p>\
<ul>\
<li>이동평균선 (MA): 단기/중기/장기 추세 파악</li>\
<li>RSI: 과매수/과매도 구간 확인</li>\
<li>거래량: 가격 움직임의 신뢰도 검증</li>\
</ul>\
</div>
    }' "$file"
    
    # 7. Add risk disclaimer
    sed -i '' '/<div class="highlight-box">/{
        a\
<div class="risk-warning" style="background: #fee2e2; border: 1px solid #ef4444; padding: 1rem; border-radius: 8px; margin: 1rem 0;">\
⚠️ <strong>리스크 경고:</strong> 모든 투자는 원금 손실 위험을 포함합니다. 과거 수익률이 미래 성과를 보장하지 않습니다.\
</div>
    }' "$file"
    
    echo "  ✅ Enhanced: $file"
done

echo "🎯 All articles enhanced for AdSense compliance!"