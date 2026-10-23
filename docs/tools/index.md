---
title: "TOOLS — Downloads"
description: 오픈소스 도구 다운로드 허브 | Kazan Vibe Lab
hide:
  - toc
---

<div class="page-header">
  <span class="page-eyebrow">무료로 다운로드하여 바로 사용하세요</span>
  <h1>TOOLS</h1>
</div>

<div class="tools-grid">

  <div class="tool-card">
    <div class="tool-card-header">
      <div class="tool-icon">🛡️</div>
      <div>
        <h2>Python Vibe VPN</h2>
        <span class="tool-version">v1.0.0 Stable</span>
      </div>
    </div>
    <p class="tool-desc">Python 3.11 비동기 I/O와 ChaCha20-Poly1305 AEAD 기반의 초경량 맞춤형 암호화 VPN 터널 전체 소스코드 배포 패키지. 클라이언트, 서버, 키 생성기가 모두 포함되어 있습니다.</p>

    <div class="tool-features">
      <div class="tool-feature">✅ 비동기 UDP 소켓 (TCP Meltdown 방지)</div>
      <div class="tool-feature">✅ ChaCha20-Poly1305 AEAD 암호화</div>
      <div class="tool-feature">✅ 256비트 PSK 대칭키 자동 생성기</div>
      <div class="tool-feature">✅ MTU 1420 최적화 (WireGuard 표준)</div>
      <div class="tool-feature">✅ 재전송 공격 방지 (Nonce 유니크 보장)</div>
    </div>

    <div class="tool-files">
      <div class="tool-file"><code>client.py</code> — 비동기 UDP 클라이언트</div>
      <div class="tool-file"><code>server.py</code> — UDP 게이트웨이 서버</div>
      <div class="tool-file"><code>keygen.py</code> — 256-bit PSK 생성기</div>
      <div class="tool-file"><code>config.json</code> — 설정 템플릿</div>
      <div class="tool-file"><code>requirements.txt</code> — 의존성 패키지</div>
    </div>

    <div class="tool-actions">
      <a href="../assets/downloads/vibe-vpn-v1.0.0.zip" class="btn-primary btn-download-main" download>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        vibe-vpn-v1.0.0.zip 다운로드
        <span class="btn-meta">~4 KB</span>
      </a>
      <a href="../lab/python-vibe-vpn/" class="btn-ghost-sm">아키텍처 상세 보기 →</a>
    </div>

    <div class="tool-hash">
      <span>SHA-256</span>
      <code>E66599C5F8CC9A0ABADCEE55BDDA4D875E46FD9C6281A2AFD3FDB84D4C1D54CF</code>
    </div>
  </div>

</div>

---

## 🚀 빠른 시작 가이드

```bash
# 1. 압축 해제 후 의존성 설치
pip install -r requirements.txt

# 2. 보안 대칭키(PSK) 생성
python keygen.py
# → 출력된 64자리 Hex 키를 config.json에 설정

# 3. 서버 실행 (VPS 또는 게이트웨이 머신)
python server.py

# 4. 클라이언트 실행 (로컬 PC)
python client.py
```

!!! tip "서버 없이 로컬 테스트"
    `config.json`의 `server_host`를 `127.0.0.1`로 유지하면 동일 PC에서 서버와 클라이언트를 동시에 구동하여 즉시 연결 검증이 가능합니다.
