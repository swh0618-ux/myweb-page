# ⚡ Kazan | Vibe Coding Lab & Portfolio

GitHub Pages에 배포되는 파이썬 기반 바이브코딩 포트폴리오 및 기술 블로그입니다.

---

## 🚀 빠른 시작 (Local Development)

### 1. 가상환경 활성화 및 패키지 설치
```bash
# 가상환경 활성화 (Windows PowerShell)
.\.venv\Scripts\Activate.ps1

# 의존성 설치
pip install -r requirements.txt
```

### 2. 로컬 실시간 개발 서버 구동
```bash
mkdocs serve
```
* 브라우저에서 `http://127.0.0.1:8000` 접속 시 핫 리로딩(Live Reload)으로 즉시 확인 가능합니다.

---

## 📦 사이트 빌드 및 GitHub Pages 배포

### 자동 배포 (권장)
* `main` 브랜치에 코드를 `git push`하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로 빌드 후 `gh-pages` 브랜치에 배포합니다.

### 수동 배포 (CLI)
```bash
mkdocs gh-deploy
```

---

## 📁 디렉토리 구조

```
kazan/
├── .github/workflows/deploy.yml   # GitHub Pages 자동 배포 CI/CD
├── docs/
│   ├── index.md                   # 대문 (Landing & Vibe Manifesto)
│   ├── about.md                   # 프로필 및 워크플로우 철학
│   ├── projects/                  # 프로젝트 포트폴리오 및 프롬프트 쇼케이스
│   │   ├── index.md
│   │   ├── kazan-agent-hub.md
│   │   └── item-asset-forge.md
│   ├── blog/                      # 기술 블로그 및 프롬프트 아카이브
│   │   ├── .authors.yml
│   │   ├── index.md
│   │   └── posts/
│   │       └── 2026-10-22-welcome-vibe-coding.md
│   └── stylesheets/extra.css      # 사이버/네온 바이브 커스텀 스타일
├── mkdocs.yml                     # 사이트 설정 및 내비게이션
├── requirements.txt               # 파이썬 의존성
└── .gitignore
```
