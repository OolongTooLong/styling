// let genericTemplateApp = (() => {
//     let init = () => {
//         $(document).ready(function() { });
//         document.fonts.ready.then(function () { });
//     },
//     hideUnusedBreakerImages = () => {
//       $(".breaker .grid img").each((i, elem) => {
//         const src = elem.getAttribute('src')
//         if (!src) {
//           elem.parentNode.parentNode.style.display = 'none';
//         }
//       });
//     },
//     lightOrDark = () => {
//         const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
//         if (prefersDarkScheme.matches) {
//             document.body.classList.add("dark-theme");
//         } else {
//             document.body.classList.remove("dark-theme");
//         }
//     }
//     ;
//     init();
//     return {};
// })();
