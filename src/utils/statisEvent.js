const statisEvent = function(a,b,c,d) {
  if (window._czc) {
    c = c || '';
    if(d) {
      _czc.push(['_trackEvent', a, b, c, d]);
    } else {
      _czc.push(['_trackEvent', a, b, c]);
    }
  }
}

export {
  statisEvent
}
