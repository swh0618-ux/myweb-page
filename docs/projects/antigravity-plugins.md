---
title: Antigravity Plugins & MCP Suite
description: AI 에이전트의 브라우저 직접 제어 및 커스텀 도구 확장을 위한 플러그인 & MCP 아키텍처
---

# 🧩 Antigravity Plugins & MCP Suite

<div class="vibe-tags-row" style="justify-content: flex-start;">
  <span class="vibe-badge">MCP Protocol</span>
  <span class="vibe-badge purple">Puppeteer</span>
  <span class="vibe-badge">Browser Automation</span>
  <span class="vibe-badge">Agent Extensions</span>
  <span class="vibe-badge purple">Python & Node.js</span>
</div>

---

## 📌 프로젝트 개요

**Antigravity Plugins & MCP Suite**는 AI 에이전트가 단순한 텍스트 답변 생성에 머무르지 않고, **실제 웹 브라우저(Chrome, Edge)를 직접 구동하여 클릭, 타이핑, 화면 캡처, 스크래핑을 수행하고 로컬 시스템을 제어**할 수 있도록 설계된 확장 모듈러 생태계입니다.

Anthropic이 제창하고 업계 표준으로 자리잡은 **Model Context Protocol (MCP)**과 Antigravity의 네이티브 플러그인 시스템을 유기적으로 결합하여, 플러그인 하나로 에이전트의 도구 능력을 무한히 확장할 수 있습니다.

```mermaid
flowchart TD
    User([사용자 요청: "구글 애드센스 페이지 열고 상태 확인해줘"]) --> Agent[Antigravity Lead Agent]
    Agent --> PluginEngine[플러그인 & 훅 매니저]
    PluginEngine --> MCPBridge[MCP JSON-RPC 브리지]
    
    subgraph Browser & System Automation
        MCPBridge --> Puppeteer[Puppeteer MCP<br/>크롬/엣지 헤드리스 제어]
        MCPBridge --> CDP[Chrome DevTools Protocol<br/>사용자 브라우저 세션 부착]
        MCPBridge --> OS[로컬 파일 & CLI 자동화 도구]
    end

    Puppeteer --> TargetWeb[실제 웹페이지 방문 및 DOM 조작]
    TargetWeb --> Result[스크린샷 & 데이터 반환]
    Result --> Agent
    Agent --> UserFinal([최종 분석 결과 보고])
```

---

## 💡 핵심 플러그인 모듈 구성

### 1. 🌐 Browser Controller Plugin (Puppeteer MCP)
* **목적**: 브라우저 없는 CLI/IDE 환경의 에이전트에게 시각적 브라우징과 웹 상호작용 능력 부여.
* **주요 기능**:
  * 마우스 클릭 (`click`), 텍스트 입력 (`fill`), 페이지 탐색 (`navigate`)
  * 실시간 화면 캡처 (`screenshot`) 및 시각적 요소 레이아웃 파싱
  * 클라이언트 사이드 자바스크립트 실행 (`evaluate`)

### 2. 🤖 Subagent Role Orchestrator Plugin
* **목적**: 메인 에이전트 혼자 모든 작업을 수행하지 않고, 역할별 전문 서브에이전트(QA Reviewer, Task Runner)에게 작업을 자동 분담.
* **주요 기능**:
  * 기획(Lead) ➡️ 검증(QA) ➡️ 실행(Automation) 3단계 라이프사이클 관리
  * 서브에이전트 간 비동기 메시징 및 상태 모니터링

### 3. 🎨 Game Asset Forge Plugin
* **목적**: 이미지 생성부터 게임 엔진 규격(투명 PNG, 팔레트 양자화, 스프라이트 아틀라스) 변환까지 자동화.

---

## 💻 실전 MCP 설정 레시피 (`mcp_config.json`)

에이전트에게 크롬 브라우저 직접 제어 능력을 부여하는 표준 MCP 설정입니다:

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "cmd.exe",
      "args": [
        "/c",
        "npx",
        "-y",
        "@modelcontextprotocol/server-puppeteer"
      ],
      "env": {
        "PUPPETEER_HEADLESS": "true"
      }
    },
    "playwright": {
      "command": "cmd.exe",
      "args": [
        "/c",
        "npx",
        "-y",
        "@executeautomation/playwright-mcp-server"
      ]
    }
  }
}
```

---

## ⚡ 바이브코딩 프롬프트 예시 (Browser Automation)

<div class="vibe-prompt-box">
  <div class="vibe-prompt-label">Browser Automation Prompt</div>
  Puppeteer 도구를 활성화하여 https://kazan.pe.kr 에 접속하십시오.<br>
  1. 페이지 타이틀과 최신 블로그 목록이 정상적으로 렌더링되는지 확인하십시오.<br>
  2. 첫 번째 포스트 링크를 클릭하여 상세 페이지로 이동한 뒤, 뷰포트를 전체 화면으로 캡처하여 검증하십시오.
</div>

---

## 🔗 관련 문서 & 프로젝트
* [📝 AI 에이전트에게 손과 발을 달아주다: 브라우저 제어 & MCP 플러그인 제작기 읽기](../blog/posts/2026-10-23-building-antigravity-plugins-mcp.md)
* [💻 Projects Overview로 돌아가기](index.md)
