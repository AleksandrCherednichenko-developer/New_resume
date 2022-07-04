let html = document.querySelector('html'),
   body = document.querySelector('body');

// заблокировать скролл
export function disableScroll() {
   html.style.height = 'calc(100vh - 1px)';
   body.style.height = 'calc(100vh - 1px)';
   body.style.overflow = 'hidden';
   body.style.position = 'fixed';
}
// разблокировать скролл
export function enableScroll() {
   html.style.height = 'auto';
   body.style.height = 'auto';
   body.style.overflow = 'visible';
   body.style.position = 'static';
}

