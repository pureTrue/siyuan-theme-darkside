window.theme = {};
window.theme.themeMode = (() => {
    switch (window.siyuan.config.appearance.mode) {
        case 0: return 'light';
        case 1: return 'dark';
        default: return 'light';
    }
})();

(function loadThemeResources() {
    const themePath = '/appearance/themes/siyuan-theme-darkside/';
    const themeStyleID = 'themeStyle';

    const existingScripts = document.querySelectorAll(`script[src^="${themePath}PureColor-"]`);
    existingScripts.forEach(script => script.remove());

    if (window.theme.themeMode === 'dark') {
        const oldStyle = document.getElementById(themeStyleID);
        if (oldStyle) oldStyle.remove();

        const darkJS = document.createElement('script');
        darkJS.src = `${themePath}PureColor-dark.js`;
        document.head.appendChild(darkJS);

        const darkCSS = document.createElement('link');
        darkCSS.id = themeStyleID;
        darkCSS.rel = 'stylesheet';
        darkCSS.href = `${themePath}PureColor-dark.css`;
        document.head.appendChild(darkCSS);
    } else {

        const lightJS = document.createElement('script');
        lightJS.src = `${themePath}PureColor-light.js`;
        document.head.appendChild(lightJS);
    }
})();
