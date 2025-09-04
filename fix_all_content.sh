#!/bin/bash

echo "=== FinFlix 콘텐츠 전면 재작성 시작 ==="

# 모든 HTML 파일에서 투자 권유 표현 제거
files=($(ls *.html))

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "수정 중: $file"
    
    # 1. 제목에서 투자 권유 표현 제거
    sed -i '' 's/달러 간다/달러 수준 분석/g' "$file"
    sed -i '' 's/달러 돌파/달러 도달 시 시장 영향/g' "$file"
    sed -i '' 's/폭등 임박/시장 변동성 분석/g' "$file"
    sed -i '' 's/급등 예상/가격 변동 요인 분석/g' "$file"
    sed -i '' 's/대박 예고/시장 동향 분석/g' "$file"
    sed -i '' 's/지금이 기회/현재 시장 상황/g' "$file"
    sed -i '' 's/놓치면 후회/시장 분석 시점/g' "$file"
    sed -i '' 's/매수 타이밍/시장 진입 전략 이해/g' "$file"
    sed -i '' 's/투자 기회/시장 상황 분석/g' "$file"
    
    # 2. 가격 예측 표현 수정
    sed -i '' 's/목표가 \$\([0-9,]*\)/\$\1 수준의 시장 영향 분석/g' "$file"
    sed -i '' 's/\([0-9]*\)% 수익/\1% 변동성 분석/g' "$file"
    sed -i '' 's/\([0-9]*\)배 상승/\1배 성장 가능성의 리스크/g' "$file"
    
    # 3. 긴급/선동적 표현 제거
    sed -i '' 's/🚨//g' "$file"
    sed -i '' 's/🔥//g' "$file"
    sed -i '' 's/💰//g' "$file"
    sed -i '' 's/🚀//g' "$file"
    sed -i '' 's/💸//g' "$file"
    sed -i '' 's/!!!/./g' "$file"
    sed -i '' 's/!!/./g' "$file"
    
    # 4. 투자 조언 표현 수정
    sed -i '' 's/꼭 사야/시장 관심 필요/g' "$file"
    sed -i '' 's/반드시 투자/투자 고려사항/g' "$file"
    sed -i '' 's/지금 사라/현재 시장 동향/g' "$file"
    sed -i '' 's/매수 추천/시장 분석/g' "$file"
    sed -i '' 's/강력 추천/주목할 만한/g' "$file"
    
    # 5. 확실성 표현 제거
    sed -i '' 's/확실한/예상되는/g' "$file"
    sed -i '' 's/보장된/가능한/g' "$file"
    sed -i '' 's/무조건/일반적으로/g' "$file"
    sed -i '' 's/반드시/통상적으로/g' "$file"
    
    # 6. 교육적 표현 추가
    sed -i '' 's/<h2>/<h2>📚 교육 포인트: /g' "$file" 2>/dev/null || true
    sed -i '' 's/Pro Tip:/학습 포인트:/g' "$file"
    sed -i '' 's/투자 전략/시장 이해를 위한 분석/g' "$file"
    sed -i '' 's/수익 극대화/리스크 관리 방법/g' "$file"
    
  fi
done

echo "=== 모든 파일 수정 완료 ==="
echo "총 ${#files[@]}개 파일 처리"