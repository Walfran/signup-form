// #region agent log
function agentSendLog(hypothesisId, message, data) {
  try {
    fetch('http://127.0.0.1:7242/ingest/2c5622bc-9e32-4b46-b981-86aa26f6e460', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'initial',
        hypothesisId,
        location: 'js/script.js',
        message,
        data,
        timestamp: Date.now()
      })
    }).catch(() => {});
  } catch {
    // Swallow all errors from debug logging
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const sideBar = document.querySelector('.side-bar');
  const contentBar = document.querySelector('.content-bar');

  agentSendLog('H0', 'layout elements presence', {
    hasSideBar: !!sideBar,
    hasContentBar: !!contentBar
  });

  if (!sideBar || !contentBar) return;

  const bodyStyles = window.getComputedStyle(document.body);
  const sideStyles = window.getComputedStyle(sideBar);
  const contentStyles = window.getComputedStyle(contentBar);

  agentSendLog('H1', 'body flex properties', {
    display: bodyStyles.display,
    flexDirection: bodyStyles.flexDirection
  });

  agentSendLog('H2', 'sidebar styles', {
    width: sideStyles.width,
    height: sideStyles.height,
    position: sideStyles.position
  });

  agentSendLog('H3', 'content-bar styles', {
    display: contentStyles.display,
    marginLeft: contentStyles.marginLeft,
    width: contentStyles.width,
    position: contentStyles.position
  });

  const sideRect = sideBar.getBoundingClientRect();
  const contentRect = contentBar.getBoundingClientRect();

  agentSendLog('H4', 'element positions', {
    sideRight: sideRect.right,
    contentLeft: contentRect.left,
    overlap: contentRect.left < sideRect.right
  });
});
// #endregion agent log
