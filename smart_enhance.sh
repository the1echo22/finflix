#!/bin/bash

# Smart enhancement script - adds educational content without duplicates

echo "🎯 Smart Enhancement for AdSense Approval..."

for file in *.html; do
    # Skip non-article files
    if [[ "$file" == "index.html" || "$file" == "404.html" || "$file" == "about.html" || 
          "$file" == "contact.html" || "$file" == "privacy.html" || "$file" == "terms.html" || 
          "$file" == "disclaimer.html" || "$file" == "author.html" || "$file" == "editorial-policy.html" ||
          "$file" == "category-"* || "$file" == "search.html" || "$file" == "post-template.html" ||
          "$file" == "what-is-"* || "$file" == "understanding-"* || "$file" == "google-indexing-api.html" ]]; then
        continue
    fi
    
    echo "🔧 Processing: $file"
    
    # Check if already enhanced
    if grep -q "학습 체크포인트" "$file"; then
        echo "  ⏭️  Already enhanced, skipping duplicates"
        continue
    fi
    
    # Add single educational framework at the end of article
    sed -i '' '/<\/article>/{
        i\
\
<div class="educational-framework" style="margin-top: 3rem; padding: 2rem; background: #f9fafb; border-radius: 16px;">\
\
  <div class="risk-disclaimer" style="background: #fee2e2; border: 2px solid #ef4444; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">\
    <h3 style="color: #dc2626; margin-top: 0;">⚠️ 중요 공지사항</h3>\
    <p style="margin: 0.5rem 0;"><strong>이 콘텐츠는 교육 목적으로만 제공됩니다.</strong></p>\
    <ul style="margin: 1rem 0; padding-left: 1.5rem;">\
      <li>투자 권유나 매매 추천이 아닙니다</li>\
      <li>모든 투자는 원금 손실 위험이 있습니다</li>\
      <li>과거 성과가 미래 수익을 보장하지 않습니다</li>\
      <li>투자 결정 전 반드시 전문가와 상담하세요</li>\
    </ul>\
  </div>\
\
  <div class="learning-section" style="background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">\
    <h3 style="color: #1f2937;">📚 학습 체크포인트</h3>\
    <p style="color: #6b7280; margin-bottom: 1.5rem;">이 기사를 통해 다음 사항들을 학습할 수 있습니다:</p>\
    <ol style="line-height: 2; color: #4b5563;">\
      <li><strong>시장 분석 방법:</strong> 어떤 지표와 데이터를 통해 시장을 분석했나요?</li>\
      <li><strong>리스크 요인:</strong> 이 시장/자산의 주요 위험 요소는 무엇인가요?</li>\
      <li><strong>역사적 맥락:</strong> 과거 유사한 사례와 비교했을 때 어떤 차이가 있나요?</li>\
      <li><strong>글로벌 영향:</strong> 이 변화가 전체 시장에 미치는 영향은 무엇일까요?</li>\
      <li><strong>투자 원칙:</strong> 이 사례에서 배울 수 있는 투자 원칙은 무엇인가요?</li>\
    </ol>\
  </div>\
\
  <div class="terminology" style="background: linear-gradient(to right, #fef3c7, #fde68a); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">\
    <h3 style="color: #92400e;">📖 핵심 금융 용어 정리</h3>\
    <dl style="display: grid; gap: 1.5rem; margin-top: 1.5rem;">\
      <div>\
        <dt style="font-weight: bold; color: #78350f;">변동성 (Volatility)</dt>\
        <dd style="color: #92400e; margin-top: 0.5rem;">자산 가격이 변동하는 정도를 나타내는 지표. 높을수록 리스크가 큽니다.</dd>\
      </div>\
      <div>\
        <dt style="font-weight: bold; color: #78350f;">시가총액 (Market Cap)</dt>\
        <dd style="color: #92400e; margin-top: 0.5rem;">발행 주식/토큰 수 × 현재 가격으로 계산되는 전체 시장 가치</dd>\
      </div>\
      <div>\
        <dt style="font-weight: bold; color: #78350f;">유동성 (Liquidity)</dt>\
        <dd style="color: #92400e; margin-top: 0.5rem;">자산을 현금으로 전환할 수 있는 용이성의 정도</dd>\
      </div>\
      <div>\
        <dt style="font-weight: bold; color: #78350f;">지지선/저항선</dt>\
        <dd style="color: #92400e; margin-top: 0.5rem;">가격이 하락/상승을 멈추는 경향이 있는 심리적 가격대</dd>\
      </div>\
    </dl>\
  </div>\
\
  <div class="analysis-method" style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">\
    <h3 style="color: #1e40af;">🔍 시장 분석 프레임워크</h3>\
    <div style="margin-top: 1.5rem;">\
      <h4 style="color: #1e3a8a;">기본적 분석 (Fundamental Analysis)</h4>\
      <ul style="color: #3730a3; line-height: 1.8;">\
        <li>재무제표 및 실적 분석</li>\
        <li>산업 동향 및 경쟁 환경</li>\
        <li>거시경제 지표 영향</li>\
        <li>규제 환경 변화</li>\
      </ul>\
    </div>\
    <div style="margin-top: 1.5rem;">\
      <h4 style="color: #1e3a8a;">기술적 분석 (Technical Analysis)</h4>\
      <ul style="color: #3730a3; line-height: 1.8;">\
        <li>차트 패턴 및 추세선</li>\
        <li>이동평균선 (MA, EMA)</li>\
        <li>상대강도지수 (RSI)</li>\
        <li>거래량 분석</li>\
      </ul>\
    </div>\
  </div>\
\
  <div class="additional-resources" style="background: #f3f4f6; padding: 2rem; border-radius: 12px;">\
    <h3 style="color: #1f2937;">📌 추가 학습 자료</h3>\
    <p style="color: #6b7280; margin: 1rem 0;">더 깊이 있는 학습을 원하시면 다음 주제들을 탐구해보세요:</p>\
    <ul style="color: #4b5563; line-height: 2;">\
      <li>📊 <strong>시장 사이클 이론:</strong> 축적 → 상승 → 분배 → 하락의 반복</li>\
      <li>💡 <strong>행동재무학:</strong> 투자자 심리가 시장에 미치는 영향</li>\
      <li>🎯 <strong>포트폴리오 이론:</strong> 분산 투자를 통한 리스크 관리</li>\
      <li>📈 <strong>복리 효과:</strong> 장기 투자의 힘</li>\
      <li>🛡️ <strong>리스크 관리:</strong> 손실 제한과 수익 보호 전략</li>\
    </ul>\
  </div>\
\
</div>
    }' "$file"
    
    echo "  ✅ Enhanced with educational framework"
done

echo "✨ Smart enhancement complete!"