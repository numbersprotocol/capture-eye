export function isMobile() {
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_device_detection
  const UA = (navigator as Navigator).userAgent;
  const isMobileUserAgent =
    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
  // Ensure touchscreen desktops are not considered mobile by checking screen width and not mobile user agent
  if (!isMobileUserAgent && window.screen.width >= 768) {
    return false;
  }
  interface NavgiatorExtended extends Navigator {
    msMaxTouchPoints: number;
  }
  let hasTouchScreen = false;
  if ('maxTouchPoints' in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ('msMaxTouchPoints' in navigator) {
    hasTouchScreen = (navigator as NavgiatorExtended).msMaxTouchPoints > 0;
  } else {
    const mQ = matchMedia?.('(pointer:coarse)');
    if (mQ?.media === '(pointer:coarse)') {
      hasTouchScreen = !!mQ.matches;
    } else if ('orientation' in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    }
  }
  return hasTouchScreen || isMobileUserAgent;
}
