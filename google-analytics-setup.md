# Google Analytics 설정 가이드

## 1. Google Analytics 계정 만들기

1. [Google Analytics](https://analytics.google.com/) 접속
2. "측정 시작" 클릭
3. 계정 이름: FinFlix
4. 속성 이름: FinFlix Blog
5. 시간대: 대한민국
6. 통화: KRW

## 2. 추적 ID 받기

1. 관리 → 데이터 스트림 → 웹
2. 웹사이트 URL 입력: https://yourfinflix.com
3. 스트림 이름: FinFlix Main
4. "스트림 만들기" 클릭
5. 측정 ID 복사 (G-XXXXXXXXXX 형식)

## 3. index.html 수정

현재 index.html에 있는 `G-XXXXXXXXXX`를 실제 측정 ID로 교체:

```javascript
gtag('config', 'G-실제측정ID');
```

## 4. Google Search Console 설정

1. [Google Search Console](https://search.google.com/search-console) 접속
2. "속성 추가" 클릭
3. URL 접두어 선택: https://yourfinflix.com
4. 소유권 확인 방법:
   - HTML 태그 방법 선택
   - 메타 태그를 index.html에 추가
   - 확인 클릭

## 5. Sitemap 제출

1. Search Console → 색인 → Sitemaps
2. 새 사이트맵 추가: sitemap.xml
3. 제출 클릭

## 6. 도메인 연결 후 수정 필요 사항

### sitemap.xml
- `https://yourfinflix.com` → 실제 도메인으로 변경

### robots.txt
- Sitemap URL을 실제 도메인으로 변경

### index.html 메타 태그
- og:url, canonical URL 등을 실제 도메인으로 변경

## 7. 성능 모니터링

### Core Web Vitals 체크
- LCP (Largest Contentful Paint): 2.5초 이내
- FID (First Input Delay): 100ms 이내
- CLS (Cumulative Layout Shift): 0.1 이내

### PageSpeed Insights
- [PageSpeed Insights](https://pagespeed.web.dev/)에서 테스트
- 모바일/데스크톱 점수 90점 이상 목표

## 8. 애드센스 신청 전 체크리스트

✅ Google Analytics 설치 완료
✅ Search Console 등록 완료
✅ Sitemap 제출 완료
✅ 콘텐츠 20개 이상
✅ 일 방문자 100명 이상
✅ 운영 기간 2-3개월
✅ 모바일 최적화 완료
✅ 페이지 로딩 속도 3초 이내

---

**참고**: 실제 도메인 연결 후 모든 URL을 업데이트해야 합니다!