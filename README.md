# @careernote/assets

## 브랜드 로고

CareerNote 로고 정본. **도형·텍스트로 다시 그리지 말고 이 파일을 쓴다.** 비율 고정, 색 변경 금지.

| 파일 | 크기 | 용도 |
|---|---|---|
| `logo/careernote-symbol.svg` | 32×32 (벡터) | **기본 로고.** 아이콘 단독(심볼). 앱 아이콘·파비콘·좁은 자리 |
| `logo/careernote-symbol.png` | 512×512 | 심볼 래스터 (벡터를 못 쓰는 곳) |
| `logo/careernote-symbol-black.svg` | 32×32 (벡터) | 블랙 컨셉 심볼(검정 배경 · 층 흰색 100/75/45%). 기업용(ATS) 파비콘 |
| `logo/careernote-symbol-black.png` | 512×512 | 블랙 심볼 래스터 |
| `logo/careernote-logo.png` | 283×34 | 가로형(심볼+워드마크). 밝은 배경 헤더·문서 |
| `logo/careernote-logo-black.png` | 283×34 | 가로형 블랙 컨셉, 밝은 배경용(검정 심볼 · gray900 글자). 기업용(ATS) 로그인 |
| `logo/careernote-logo-on-dark.png` | 377×45 | 가로형, 어두운 배경용(흰 글자) |
| `logo/careernote-logo-black-on-dark.png` | 377×45 | 가로형 블랙 컨셉, 어두운 배경용(검정 심볼 · 흰 글자). 기업용(ATS) 사이드바 |
| `logo/*.base64.json` | — | 파일 접근이 없는 환경(캔버스 엔진·헤드리스)에서 쓰는 base64 사본 |

기본은 **심볼**입니다. 이름을 함께 보여야 하는 자리에서만 가로형을 씁니다.

```ts
import symbol from '@careernote/assets/logo/careernote-symbol.svg'   // 기본
import logo from '@careernote/assets/logo/careernote-logo.png'       // 가로형
import symbolData from '@careernote/assets/logo/careernote-symbol.base64.json' // { width, height, mime, base64 }
```

## 로티 애니메이션

로티(JSON) 애니메이션 정본. 소비: `import anim from '@careernote/assets/lottie/LoadingDots.json'`
플레이어는 각 앱의 lottie-web(pencil) / lottie-react(web) 사용 — React·Vue 는 `LottieLoadingLogo`·`LottieLoadingDots` 컴포넌트 참조.

| 파일 | 용도 |
|---|---|
| LoadingLogo.json | 커리어노트 로고 로딩 — 불러오는 중 기본 표시 (`LottieLoadingLogo`) |
| LoadingDots.json | 진행중 점 3개 (프롬프트 로딩 스텝) |
| ai.json | AI 생성 연출 |
| check.json | 완료 체크 |
| search.json | 분석/검색 연출 |
| evaluation.json | 평가 연출 |

## 빈 이미지 대체 아이콘 (3D)

이미지가 없는 카드(인재 피드 활동 카드 등)에 `bg-gray800` 위 90×90 으로 띄우는 3D 아이콘. 180×180 PNG(2x).
DS 컴포넌트는 자산을 직접 import 하지 않는다 — 소비자가 import 해 prop(`placeholderImage` 등)으로 넣는다.

| 파일 | 모양 |
|---|---|
| `placeholder/pencil.png` | 연필 |
| `placeholder/bulb.png` | 전구 |
| `placeholder/folder.png` | 폴더 |
| `placeholder/fire.png` | 불꽃 |

```ts
import pencil from '@careernote/assets/placeholder/pencil.png'
```
