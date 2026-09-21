/**
 * Educational Code Viewer Script
 * Handles Tab Switching, Show/Hide Code, and 1-Click Copy
 */

document.addEventListener('DOMContentLoaded', () => {
  initCodeViewer();
});

function initCodeViewer() {
  const container = document.querySelector('.source-section-wrapper');
  if (!container) return;

  const codeContainer = container.querySelector('.code-content-container');
  const toggleBtn = container.querySelector('.toggle-code-btn');
  const copyBtn = container.querySelector('.copy-code-btn');
  const tabBtns = container.querySelectorAll('.code-tab-btn');
  const panes = container.querySelectorAll('.code-pane');

  // Toggle Collapse / Expand
  if (toggleBtn && codeContainer) {
    toggleBtn.addEventListener('click', () => {
      const isCollapsed = codeContainer.classList.toggle('collapsed');
      toggleBtn.innerHTML = isCollapsed
        ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> Show Code'
        : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg> Hide Code';
    });
  }

  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.dataset.tab;
      const targetPane = container.querySelector(`.code-pane[data-tab="${targetTab}"]`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Copy code to clipboard
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const activePane = container.querySelector('.code-pane.active pre') || container.querySelector('.code-pane pre');
      if (!activePane) return;

      const codeText = activePane.innerText || activePane.textContent;
      navigator.clipboard.writeText(codeText).then(() => {
        showToast('Code copied to clipboard!');
      }).catch(() => {
        // Fallback copy
        const textarea = document.createElement('textarea');
        textarea.value = codeText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Code copied to clipboard!');
      });
    });
  }
}

/**
 * Toast Notification Popup
 */
function showToast(message) {
  let toast = document.getElementById('copy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'copy-toast';
    toast.className = 'copy-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
