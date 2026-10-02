/**
 * Chinmay Sharma Portfolio — Raycast Cockpit Client Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // Toast Notification System
  // ==========================================================================
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // ==========================================================================
  // Clipboard Copy Helper
  // ==========================================================================
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const text = el.getAttribute('data-copy');
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied "${text}" to clipboard`);
      }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied "${text}" to clipboard`);
      });
    });
  });

  // ==========================================================================
  // Project Category Filtering
  // ==========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.getAttribute('data-filter');
      
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 150);
        }
      });
    });
  });

  // ==========================================================================
  // Mobile Navigation Drawer
  // ==========================================================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileDrawer.setAttribute('aria-hidden', !isOpen);
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // ==========================================================================
  // Active Scroll Spy for Nav Links
  // ==========================================================================
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 160;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ==========================================================================
  // Audio Waveform Dynamic Bar Animation
  // ==========================================================================
  const waveBars = document.querySelectorAll('.wave-bar');
  if (waveBars.length > 0) {
    setInterval(() => {
      waveBars.forEach(bar => {
        const randomHeight = Math.floor(Math.random() * 40) + 10;
        bar.style.height = `${randomHeight}px`;
      });
    }, 180);
  }

  // ==========================================================================
  // Raycast Command Palette (⌘K / Ctrl+K)
  // ==========================================================================
  const cmdModalBackdrop = document.getElementById('cmd-modal-backdrop');
  const cmdSearchInput = document.getElementById('cmd-search-input');
  const cmdResultsList = document.getElementById('cmd-results-list');
  const navCmdTrigger = document.getElementById('nav-cmd-trigger');
  const heroCockpitBar = document.getElementById('hero-cockpit-bar');

  // Command Palette Catalog
  const COMMANDS = [
    // Navigation
    { id: 'nav-projects', group: 'Navigation', title: 'Featured Projects', sub: 'Jump to production projects', icon: '◈', action: () => scrollToSection('#projects') },
    { id: 'nav-voice', group: 'Navigation', title: 'Voice AI Telephony', sub: 'Jump to LiveKit/SIP demo', icon: '📞', action: () => scrollToSection('#voice-ai') },
    { id: 'nav-exp', group: 'Navigation', title: 'Production Experience', sub: 'ZEMA Global Data & Secure Defence', icon: '⚡', action: () => scrollToSection('#experience') },
    { id: 'nav-skills', group: 'Navigation', title: 'Architecture & Skills', sub: 'LLMs, Voice, Cloud, DevOps', icon: '🛠', action: () => scrollToSection('#skills') },
    { id: 'nav-edu', group: 'Navigation', title: 'Education & Credentials', sub: 'BITS Pilani MTech & UFV', icon: '🎓', action: () => scrollToSection('#education') },
    { id: 'nav-connect', group: 'Navigation', title: 'Connect & Contact', sub: 'Terminal hub & contact info', icon: '💬', action: () => scrollToSection('#connect') },

    // Featured Projects Direct Jump
    { id: 'prj-flarerag', group: 'Projects', title: 'flareRAG — Serverless RAG Search', sub: 'Cloudflare Workers, Pinecone, Voyage AI', icon: '⚡', action: () => scrollToSection('#projects') },
    { id: 'prj-kash', group: 'Projects', title: 'Kash — Self-Contained AI Agent CLI', sub: 'Go single-binary with GraphRAG & MCP', icon: '⚡', action: () => scrollToSection('#projects') },
    { id: 'prj-voice', group: 'Projects', title: 'Voice AI Agents Live Telephony', sub: 'LiveKit, Vapi, SIP Zadarma testline', icon: '⚡', action: () => scrollToSection('#voice-ai') },
    { id: 'prj-mcp', group: 'Projects', title: 'MCP Servers & Edge Gateways', sub: 'FastMCP, MongoDB, Cloudflare Gateways', icon: '⚡', action: () => scrollToSection('#projects') },
    { id: 'prj-ocr', group: 'Projects', title: 'Book OCR & Extraction Pipeline', sub: 'LangGraph, Mistral OCR, Sarvam OCR', icon: '⚡', action: () => scrollToSection('#projects') },
    { id: 'prj-gitops', group: 'Projects', title: 'Kubernetes GitOps & Test Grid', sub: 'K8s, HELM, Jenkins, ArgoCD at ZEMA', icon: '⚡', action: () => scrollToSection('#projects') },
    { id: 'prj-sattrack', group: 'Projects', title: 'satTrack Real-Time Orbital Tracking', sub: 'Skyfield, Flask, ReactJS, NASA TLEs', icon: '⚡', action: () => scrollToSection('#projects') },

    // Quick Actions
    { id: 'act-call', group: 'Actions', title: 'Call Live Voice Agent', sub: '+1 240-322-1696', icon: '📞', action: () => { window.location.href = 'tel:+12403221696'; } },
    { id: 'act-copy-email', group: 'Actions', title: 'Copy Email Address', sub: 'chinmaysharma1831@gmail.com', icon: '✉️', action: () => copyText('chinmaysharma1831@gmail.com', 'Email copied!') },
    { id: 'act-req-resume-ai', group: 'Actions', title: 'Request AI Systems Resume', sub: 'chinmaysharma1831@gmail.com', icon: '📄', action: () => { window.location.href = 'mailto:chinmaysharma1831@gmail.com?subject=AI%20Systems%20Resume%20Request%20-%20Chinmay%20Sharma'; closeCommandPalette(); showToast('Opening mail client to request AI resume...'); } },
    { id: 'act-req-resume-devops', group: 'Actions', title: 'Request DevOps Resume', sub: 'chinmaysharma1831@gmail.com', icon: '📄', action: () => { window.location.href = 'mailto:chinmaysharma1831@gmail.com?subject=DevOps%20Resume%20Request%20-%20Chinmay%20Sharma'; closeCommandPalette(); showToast('Opening mail client to request DevOps resume...'); } },
    { id: 'act-github', group: 'Actions', title: 'Open GitHub Profile', sub: 'github.com/chinmay-sh', icon: '↗', action: () => window.open('https://github.com/chinmay-sh', '_blank') },
    { id: 'act-linkedin', group: 'Actions', title: 'Open LinkedIn Profile', sub: 'linkedin.com/in/chinmay001', icon: '↗', action: () => window.open('https://linkedin.com/in/chinmay001', '_blank') }
  ];

  let selectedIndex = 0;
  let currentFilteredList = [...COMMANDS];

  function openCommandPalette() {
    if (!cmdModalBackdrop) return;
    cmdModalBackdrop.classList.add('open');
    cmdModalBackdrop.setAttribute('aria-hidden', 'false');
    if (cmdSearchInput) {
      cmdSearchInput.value = '';
      cmdSearchInput.focus();
    }
    filterCommands('');
  }

  function closeCommandPalette() {
    if (!cmdModalBackdrop) return;
    cmdModalBackdrop.classList.remove('open');
    cmdModalBackdrop.setAttribute('aria-hidden', 'true');
  }

  function scrollToSection(selector) {
    closeCommandPalette();
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function copyText(str, msg) {
    closeCommandPalette();
    navigator.clipboard.writeText(str).then(() => {
      showToast(msg || `Copied ${str}`);
    });
  }

  function filterCommands(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      currentFilteredList = [...COMMANDS];
    } else {
      currentFilteredList = COMMANDS.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.sub.toLowerCase().includes(q) || 
        c.group.toLowerCase().includes(q)
      );
    }
    selectedIndex = 0;
    renderCommandResults();
  }

  function renderCommandResults() {
    if (!cmdResultsList) return;
    cmdResultsList.innerHTML = '';

    if (currentFilteredList.length === 0) {
      cmdResultsList.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--color-smoke); font-size: 13px; font-family: var(--font-geistmono);">
          No matching commands found.
        </div>
      `;
      return;
    }

    // Group items
    let currentGroup = '';
    currentFilteredList.forEach((cmd, idx) => {
      if (cmd.group !== currentGroup) {
        currentGroup = cmd.group;
        const groupHeader = document.createElement('div');
        groupHeader.className = 'cmd-group-label';
        groupHeader.textContent = currentGroup;
        cmdResultsList.appendChild(groupHeader);
      }

      const itemEl = document.createElement('div');
      itemEl.className = `cmd-item ${idx === selectedIndex ? 'selected' : ''}`;
      itemEl.setAttribute('role', 'option');
      itemEl.setAttribute('aria-selected', idx === selectedIndex);

      itemEl.innerHTML = `
        <div class="cmd-item-left">
          <span class="cmd-item-icon">${cmd.icon}</span>
          <div>
            <div style="font-weight: 500;">${cmd.title}</div>
            <div style="font-size: 11px; color: var(--color-smoke); font-family: var(--font-geistmono);">${cmd.sub}</div>
          </div>
        </div>
        <span class="cmd-item-badge">${cmd.group}</span>
      `;

      itemEl.addEventListener('click', () => {
        cmd.action();
      });

      itemEl.addEventListener('mouseenter', () => {
        selectedIndex = idx;
        updateSelectedHighlight();
      });

      cmdResultsList.appendChild(itemEl);
    });

    scrollSelectedIntoView();
  }

  function updateSelectedHighlight() {
    const items = cmdResultsList.querySelectorAll('.cmd-item');
    items.forEach((item, idx) => {
      if (idx === selectedIndex) {
        item.classList.add('selected');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('selected');
        item.setAttribute('aria-selected', 'false');
      }
    });
  }

  function scrollSelectedIntoView() {
    const selectedEl = cmdResultsList.querySelector('.cmd-item.selected');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }

  // Keyboard Navigation inside Modal
  if (cmdSearchInput) {
    cmdSearchInput.addEventListener('input', (e) => {
      filterCommands(e.target.value);
    });

    cmdSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentFilteredList.length > 0) {
          selectedIndex = (selectedIndex + 1) % currentFilteredList.length;
          updateSelectedHighlight();
          scrollSelectedIntoView();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentFilteredList.length > 0) {
          selectedIndex = (selectedIndex - 1 + currentFilteredList.length) % currentFilteredList.length;
          updateSelectedHighlight();
          scrollSelectedIntoView();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentFilteredList[selectedIndex]) {
          currentFilteredList[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeCommandPalette();
      }
    });
  }

  // Global Shortcut: ⌘K or Ctrl+K
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (cmdModalBackdrop.classList.contains('open')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    } else if (e.key === 'Escape') {
      if (cmdModalBackdrop.classList.contains('open')) {
        closeCommandPalette();
      }
    }
  });

  // Open Triggers
  if (navCmdTrigger) navCmdTrigger.addEventListener('click', openCommandPalette);
  if (heroCockpitBar) {
    heroCockpitBar.addEventListener('click', openCommandPalette);
    heroCockpitBar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCommandPalette();
      }
    });
  }

  // Close when clicking modal backdrop
  if (cmdModalBackdrop) {
    cmdModalBackdrop.addEventListener('click', (e) => {
      if (e.target === cmdModalBackdrop) {
        closeCommandPalette();
      }
    });
  }

  // Auto-open on ?cmd=1 or #cmd
  if (window.location.search.includes('cmd=1') || window.location.hash === '#cmd') {
    setTimeout(openCommandPalette, 150);
  }
});
