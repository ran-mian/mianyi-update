(function () {
  function el(id) { return document.getElementById(id) }
  function fmtDate(s) {
    if (!s) return '—'
    var d = new Date(s)
    if (isNaN(d.getTime())) return s
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
  }
  function fmtSize(n) {
    if (!n) return '—'
    if (n < 1048576) return Math.max(1, Math.round(n / 1024)) + ' KB'
    return (n / 1048576).toFixed(1) + ' MB'
  }
  function setText(id, v) { var e = el(id); if (e && v) e.textContent = v }

  fetch('latest.json', { cache: 'no-store' }).then(function (r) { return r.json() }).then(function (w) {
    setText('winVer', 'v' + (w.version || '—'))
    setText('winVer2', 'v' + (w.version || '—'))
    setText('winSize', fmtSize(w.size))
    setText('winDate', fmtDate(w.pub_date))
    setText('winNotes', w.notes || '')
    if (w.url) el('winDl').href = w.url
  }).catch(function () { setText('winNotes', '读取 latest.json 失败') })

  fetch('android.json', { cache: 'no-store' }).then(function (r) { return r.json() }).then(function (a) {
    setText('androidVer', 'v' + (a.versionName || '—'))
    setText('androidVer2', 'v' + (a.versionName || '—'))
    setText('androidSize', fmtSize(a.size))
    setText('androidDate', fmtDate(a.pub_date))
    setText('androidNotes', a.notes || '')
    if (a.apk) el('androidDl').href = a.apk
  }).catch(function () { setText('androidNotes', '读取 android.json 失败') })

  fetch('data/history.json', { cache: 'no-store' }).then(function (r) { return r.json() }).then(function (list) {
    var box = el('history')
    if (!box) return
    if (!Array.isArray(list) || !list.length) { box.innerHTML = '<p class="muted">暂无记录</p>'; return }
    box.innerHTML = list.map(function (item) {
      return '<div class="log-item"><div class="log-head"><span class="log-ver">v' + item.version + '</span><span class="log-date">' + fmtDate(item.date) + '</span></div><p>' + (item.notes || '') + '</p></div>'
    }).join('')
  }).catch(function () {
    var box = el('history')
    if (box) box.innerHTML = '<p class="muted">暂无记录</p>'
  })
})();