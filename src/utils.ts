export function hasTouchScreen() {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_device_detection
  interface NavgiatorExtended extends Navigator {
    msMaxTouchPoints: number;
  }
  let hasTouchScreen = false;
  console.log('start detecting touch screen');
  if ('maxTouchPoints' in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
    console.log('maxTouchPoints in navigator');
  } else if ('msMaxTouchPoints' in navigator) {
    hasTouchScreen = (navigator as NavgiatorExtended).msMaxTouchPoints > 0;
    console.log('msMaxTouchPoints in navigator');
  } else {
    const mQ = matchMedia?.('(pointer:coarse)');
    console.log('mQ', mQ);
    if (mQ?.media === '(pointer:coarse)') {
      hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      const UA = (navigator as Navigator).userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }
  return hasTouchScreen;
}
