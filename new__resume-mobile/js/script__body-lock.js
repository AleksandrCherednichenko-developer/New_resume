let body = document.querySelector('body');

export function bg__lock() {
   body.classList.add('lock');
}
export function bg__unlock() {
   body.classList.remove('lock');
}