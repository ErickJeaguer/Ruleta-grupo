// Lógica de la Ruleta Institucional y Despliegue Pedagógico
// Unidad Educativa Particular New Düsseldorf

(function() {
  'use strict';

  // Nodos oficiales cargados desde presets.js
  const nodes = window.INSTITUTIONAL_NODES || [];

  // Estado del sistema
  const state = {
    isSpinning: false,
    currentAngle: 0,
    selectedNode: null,
    history: [],
    soundEnabled: true
  };

  // Referencias DOM
  const canvas = document.getElementById('wheelCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const physicalCanvas = document.getElementById('physicalCanvas');
  const physicalCtx = physicalCanvas ? physicalCanvas.getContext('2d') : null;
  const pointerEl = document.querySelector('.wheel-pointer');
  const centerSpinBtn = document.getElementById('centerSpinBtn');
  const primarySpinBtn = document.getElementById('primarySpinBtn');
  const toggleSoundBtn = document.getElementById('toggleSoundBtn');
  const historyContainer = document.getElementById('sessionHistory');

  // Modal
  const modalOverlay = document.getElementById('revealModal');
  const modalKicker = document.getElementById('modalNodeKicker');
  const modalTitle = document.getElementById('modalNodeTitle');
  const modalSubtitle = document.getElementById('modalNodeSubtitle');
  const modalBody = document.getElementById('modalNodeBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const modalPrintBtn = document.getElementById('modalPrintBtn');

  // Variables de física de giro
  let spinVelocity = 0;
  let spinFriction = 0.986;
  let minVelocity = 0.0012;
  let lastSectorIndex = -1;
  let animationFrameId = null;

  // Inicialización
  function init() {
    setupCanvasResolution(canvas);
    if (physicalCanvas) setupCanvasResolution(physicalCanvas);

    renderWheel();
    renderPhysicalWheel();
    renderPhysicalCards();
    renderQuickNodeList();
    attachEventListeners();

    window.addEventListener('resize', () => {
      setupCanvasResolution(canvas);
      if (physicalCanvas) setupCanvasResolution(physicalCanvas);
      renderWheel();
      renderPhysicalWheel();
    });
  }

  // Ajuste de resolución para pantallas de alta densidad
  function setupCanvasResolution(targetCanvas) {
    if (!targetCanvas) return;
    const rect = targetCanvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(rect.width || 480, rect.height || 480);
    targetCanvas.width = size * dpr;
    targetCanvas.height = size * dpr;
    const c = targetCanvas.getContext('2d');
    c.scale(dpr, dpr);
  }

  // ==========================================================
  // RENDERIZADO DE LA RULETA INTERACTIVA (3 SECTORES ACADÉMICOS)
  // ==========================================================
  function renderWheel() {
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 14;

    // The center button occupies ~48px radius on screen.
    // Scale that to canvas units (canvas CSS width ≈ displayed width).
    // We keep text between innerSafe (55% of radius) and outer (radius - 20).
    const innerSafe = radius * 0.52;  // inner edge of text zone
    const textRadius = (innerSafe + (radius - 20)) / 2; // midpoint of text zone

    ctx.clearRect(0, 0, width, height);

    const total = nodes.length;
    if (total === 0) return;
    const arc = (Math.PI * 2) / total;

    // 1. Marco exterior
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0A1E3F";
    ctx.fill();
    ctx.strokeStyle = "#B45309";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // 2. Sectores rotados
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(state.currentAngle);

    for (let i = 0; i < total; i++) {
      const node = nodes[i];
      const startAngle = i * arc;
      const endAngle = startAngle + arc;

      // Sector geométrico
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = node.color;
      ctx.fill();

      // Borde divisional
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Textos: rotamos al ángulo medio y dibujamos texto horizontal
      // para que quede en el sector, apuntando hacia afuera.
      ctx.save();
      const midAngle = startAngle + arc / 2;
      ctx.rotate(midAngle);
      // Texto se dibuja a la derecha del origen (hacia el borde exterior)
      // textAlign = "center" sobre el punto textRadius
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Número del nodo (dorado, pequeño, arriba)
      ctx.fillStyle = "#FBBF24";
      ctx.font = `bold ${Math.round(radius * 0.048)}px Cinzel, serif`;
      ctx.fillText(node.nodeNumber, textRadius, -radius * 0.1);

      // Título del nodo (blanco, abajo del número)
      ctx.fillStyle = node.textColor || "#FFFFFF";
      ctx.font = `600 ${Math.round(radius * 0.052)}px 'Plus Jakarta Sans', sans-serif`;

      // Wrap: if title > 16 chars, split into 2 lines
      const words = node.shortTitle.split(" ");
      if (node.shortTitle.length <= 14) {
        ctx.fillText(node.shortTitle, textRadius, radius * 0.06);
      } else {
        // Split into two lines balanced by word count
        const half = Math.ceil(words.length / 2);
        const line1 = words.slice(0, half).join(" ");
        const line2 = words.slice(half).join(" ");
        const lineH = radius * 0.072;
        ctx.fillText(line1, textRadius, radius * 0.01);
        ctx.fillText(line2, textRadius, radius * 0.01 + lineH);
      }

      ctx.restore();
    }

    // Remaches de división en el aro exterior
    for (let i = 0; i < total; i++) {
      const pinAngle = i * arc;
      const pinX = Math.cos(pinAngle) * (radius + 4);
      const pinY = Math.sin(pinAngle) * (radius + 4);

      ctx.beginPath();
      ctx.arc(pinX, pinY, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#D4AF37";
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.restore();
  }



  // ==========================================================
  // RENDERIZADO DEL DISCO FÍSICO PARA IMPRIMIR
  // ==========================================================
  function renderPhysicalWheel() {
    if (!physicalCtx || !physicalCanvas) return;
    const dpr = window.devicePixelRatio || 1;
    const width = physicalCanvas.width / dpr;
    const height = physicalCanvas.height / dpr;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 20;

    physicalCtx.clearRect(0, 0, width, height);

    const total = nodes.length;
    if (total === 0) return;
    const arc = (Math.PI * 2) / total;

    // Línea de corte exterior punteada
    physicalCtx.save();
    physicalCtx.strokeStyle = "#1E293B";
    physicalCtx.lineWidth = 2;
    physicalCtx.setLineDash([6, 6]);
    physicalCtx.beginPath();
    physicalCtx.arc(centerX, centerY, radius + 12, 0, Math.PI * 2);
    physicalCtx.stroke();
    physicalCtx.restore();

    // Sectores
    for (let i = 0; i < total; i++) {
      const node = nodes[i];
      const startAngle = i * arc;
      const endAngle = startAngle + arc;

      physicalCtx.beginPath();
      physicalCtx.moveTo(centerX, centerY);
      physicalCtx.arc(centerX, centerY, radius, startAngle, endAngle);
      physicalCtx.closePath();
      physicalCtx.fillStyle = node.color;
      physicalCtx.fill();

      // Línea divisoria sólida negra
      physicalCtx.strokeStyle = "#000000";
      physicalCtx.lineWidth = 2.5;
      physicalCtx.stroke();

      // Tipografía nítida para impresión
      physicalCtx.save();
      physicalCtx.translate(centerX, centerY);
      physicalCtx.rotate(startAngle + arc / 2);
      physicalCtx.textAlign = "right";
      physicalCtx.textBaseline = "middle";

      physicalCtx.fillStyle = "#FDE68A";
      physicalCtx.font = "bold 15px Cinzel, Georgia, serif";
      physicalCtx.fillText(node.nodeNumber, radius - 28, -14);

      physicalCtx.fillStyle = "#FFFFFF";
      physicalCtx.font = "bold 13px 'Plus Jakarta Sans', Arial, sans-serif";
      physicalCtx.fillText(node.shortTitle, radius - 28, 12);

      physicalCtx.restore();
    }

    // Eje de perforación con cruz de referencia (+)
    physicalCtx.beginPath();
    physicalCtx.arc(centerX, centerY, 16, 0, Math.PI * 2);
    physicalCtx.fillStyle = "#FFFFFF";
    physicalCtx.fill();
    physicalCtx.strokeStyle = "#000000";
    physicalCtx.lineWidth = 2;
    physicalCtx.stroke();

    physicalCtx.beginPath();
    physicalCtx.moveTo(centerX - 10, centerY);
    physicalCtx.lineTo(centerX + 10, centerY);
    physicalCtx.moveTo(centerX, centerY - 10);
    physicalCtx.lineTo(centerX, centerY + 10);
    physicalCtx.strokeStyle = "#DC2626";
    physicalCtx.lineWidth = 2;
    physicalCtx.stroke();
  }

  // Fichas de estudio recortables en la pestaña física
  function renderPhysicalCards() {
    const container = document.getElementById('printableCardsContainer');
    if (!container) return;
    container.innerHTML = '';

    nodes.forEach(node => {
      const card = document.createElement('div');
      card.className = 'physical-card-item';
      card.innerHTML = `
        <span class="card-header-tag" style="background-color: ${node.color};">${node.nodeNumber}</span>
        <h4>${node.title}</h4>
        <p style="font-weight: 600; color: #475569; margin-bottom: 8px;">${node.subtitle}</p>
        <p>${node.summary}</p>
      `;
      container.appendChild(card);
    });
  }

  // Dossier Académico Completo
  function renderDossierTab() {
    const container = document.getElementById('dossierFullContainer');
    if (!container) return;
    container.innerHTML = '';

    nodes.forEach(node => {
      const card = document.createElement('article');
      card.className = 'dossier-card';

      let sectionsHtml = '';
      node.sections.forEach(sec => {
        sectionsHtml += `
          <div class="modal-section-block">
            <h3>${sec.heading}</h3>
            <div>${sec.content}</div>
          </div>
        `;
      });

      card.innerHTML = `
        <span class="dossier-header-badge" style="background-color: ${node.color};">${node.nodeNumber}</span>
        <h2>${node.title}</h2>
        <p class="lead">${node.subtitle}</p>
        <div class="modal-summary-box">${node.summary}</div>
        ${sectionsHtml}
      `;
      container.appendChild(card);
    });
  }

  // Lista rápida del panel lateral
  function renderQuickNodeList() {
    const list = document.getElementById('quickNodesList');
    if (!list) return;
    list.innerHTML = '';

    nodes.forEach(node => {
      const item = document.createElement('div');
      item.className = 'node-quick-item';
      item.style.borderLeftColor = node.color;
      item.innerHTML = `
        <span class="tag" style="color: ${node.color};">${node.nodeNumber}</span>
        <h4>${node.title}</h4>
        <p>${node.subtitle}</p>
      `;
      item.addEventListener('click', () => {
        openNodeModal(node);
      });
      list.appendChild(item);
    });
  }

  // ==========================================================
  // MECÁNICA DE GIRO Y REVELACIÓN SORPRESA
  // ==========================================================
  function spin() {
    if (state.isSpinning) return;

    state.isSpinning = true;
    updateSpinButtons(true);

    if (window.institutionalAudio) {
      window.institutionalAudio.playSpinStart();
    }

    // Impulso angular inicial para una duración balanceada de 4 a 5 segundos
    spinVelocity = 0.38 + Math.random() * 0.22;
    spinFriction = 0.985 + Math.random() * 0.004;

    animate();
  }

  function animate() {
    state.currentAngle += spinVelocity;
    state.currentAngle %= (Math.PI * 2);

    spinVelocity *= spinFriction;

    checkPointerTick();
    renderWheel();

    if (spinVelocity > minVelocity) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(animationFrameId);
      spinVelocity = 0;
      state.isSpinning = false;
      updateSpinButtons(false);
      onSpinComplete();
    }
  }

  // Sonido y oscilación del puntero al cruzar sectores
  function checkPointerTick() {
    const total = nodes.length;
    if (total === 0) return;
    const arc = (Math.PI * 2) / total;

    // Puntero arriba a 270 grados (3*PI/2)
    let pointerAngle = (Math.PI * 1.5 - state.currentAngle) % (Math.PI * 2);
    if (pointerAngle < 0) pointerAngle += Math.PI * 2;

    const sectorIndex = Math.floor(pointerAngle / arc) % total;

    if (sectorIndex !== lastSectorIndex) {
      lastSectorIndex = sectorIndex;
      if (pointerEl) {
        pointerEl.classList.remove('tick-bump');
        void pointerEl.offsetWidth;
        pointerEl.classList.add('tick-bump');
      }
      if (window.institutionalAudio) {
        window.institutionalAudio.playTick(0.18);
      }
    }
  }

  // Final del giro: Determinación y apertura de contenido
  function onSpinComplete() {
    const total = nodes.length;
    if (total === 0) return;
    const arc = (Math.PI * 2) / total;

    let pointerAngle = (Math.PI * 1.5 - state.currentAngle) % (Math.PI * 2);
    if (pointerAngle < 0) pointerAngle += Math.PI * 2;

    const winningIndex = Math.floor(pointerAngle / arc) % total;
    const winnerNode = nodes[winningIndex];
    state.selectedNode = winnerNode;

    // Acorde acústico institucional
    if (window.institutionalAudio) {
      window.institutionalAudio.playReveal();
    }

    // Registro formal de sesión
    recordSessionEntry(winnerNode);

    // Revelar contenido automáticamente en modal
    setTimeout(() => {
      openNodeModal(winnerNode);
    }, 350);
  }

  function updateSpinButtons(disabled) {
    if (centerSpinBtn) centerSpinBtn.disabled = disabled;
    if (primarySpinBtn) primarySpinBtn.disabled = disabled;
  }

  // MODAL DE CONTENIDO ACADÉMICO DETALLADO
  function openNodeModal(node) {
    modalKicker.textContent = node.nodeNumber;
    modalTitle.textContent = node.title;
    modalSubtitle.textContent = node.subtitle;

    // Apply node color to the header strip
    const headerStrip = document.getElementById('modalHeaderStrip');
    if (headerStrip) {
      headerStrip.style.background = node.color;
      headerStrip.style.borderBottomColor = node.badgeColor || node.color;
    }

    // Remove legacy banner element if present
    const oldBanner = modalOverlay.querySelector('.node-visual-banner');
    if (oldBanner) {
      oldBanner.remove();
    }

    // Featured image if available for this node
    let imageHtml = '';
    if (node.image) {
      imageHtml = `
        <div class="node-featured-image-box">
          <img src="${node.image}" alt="${node.title}" class="node-featured-image">
        </div>
      `;
    }

    // Build body content
    let bodyHtml = `
      ${imageHtml}
      <div class="modal-summary-box">
        <strong>Síntesis del Nodo:</strong> ${node.summary}
      </div>
    `;

    node.sections.forEach(sec => {
      bodyHtml += `
        <div class="modal-section-block">
          <h3>${sec.heading}</h3>
          <div>${sec.content}</div>
        </div>
      `;
    });

    modalBody.innerHTML = bodyHtml;
    document.body.classList.add('modal-open');
    modalOverlay.classList.add('active');
  }


  function closeModal() {
    document.body.classList.remove('modal-open');
    modalOverlay.classList.remove('active');
  }

  // REGISTRO DE SESIÓN
  function recordSessionEntry(node) {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    state.history.unshift({
      nodeNumber: node.nodeNumber,
      title: node.title,
      color: node.color,
      time: now
    });

    renderHistory();
  }

  function renderHistory() {
    if (!historyContainer) return;
    historyContainer.innerHTML = '';

    if (state.history.length === 0) {
      historyContainer.innerHTML = '<li class="history-empty">No se han registrado giros en esta sesión.</li>';
      return;
    }

    state.history.forEach(item => {
      const li = document.createElement('li');
      li.className = 'history-entry';
      li.style.borderLeftColor = item.color;
      li.innerHTML = `
        <span><strong>${item.nodeNumber}:</strong> ${item.title}</span>
        <span style="font-size: 0.78rem; color: #64748B;">${item.time}</span>
      `;
      historyContainer.appendChild(li);
    });
  }

  // NAVEGACIÓN ENTRE PESTAÑAS
  function setupTabs() {
    const tabs = document.querySelectorAll('.nav-tab-btn');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetId = tab.dataset.target;
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');

        if (targetId === 'printTab') {
          setTimeout(() => {
            setupCanvasResolution(physicalCanvas);
            renderPhysicalWheel();
            renderPhysicalCards();
          }, 50);
        } else if (targetId === 'playTab') {
          setTimeout(() => {
            setupCanvasResolution(canvas);
            renderWheel();
          }, 50);
        }
      });
    });
  }

  // ASIGNACIÓN DE EVENTOS
  function attachEventListeners() {
    setupTabs();

    if (centerSpinBtn) centerSpinBtn.addEventListener('click', spin);
    if (primarySpinBtn) primarySpinBtn.addEventListener('click', spin);

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
      });
    }

    if (modalPrintBtn) {
      modalPrintBtn.addEventListener('click', () => {
        window.print();
      });
    }

    const printKitBtn = document.getElementById('btnPrintKitAction');
    if (printKitBtn) {
      printKitBtn.addEventListener('click', () => {
        window.print();
      });
    }

    if (toggleSoundBtn) {
      toggleSoundBtn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        if (window.institutionalAudio) window.institutionalAudio.enabled = state.soundEnabled;
        toggleSoundBtn.textContent = state.soundEnabled ? 'Sonido: Activado' : 'Sonido: Silenciado';
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
