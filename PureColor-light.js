//思源API
async function putFile(path, content = '', isDir = false) {
    const formData = new FormData();
    formData.append("path", path);
    formData.append("isDir", isDir)
    formData.append("file", new Blob([content]));
    const result = await fetch("/api/file/putFile", {
        method: "POST",
        body: formData,
    });
    const json = await result.json();
    return json;
}
async function getFile(path) {
    return fetch("/api/file/getFile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            path,
        }),
    }).then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error("Failed to get file content");
        }
    }).catch((error) => {
        console.error(error);
    });
}

// ==== 零、i18n ====
const I18N = {
    zh_CN: {
        PureColorztsz: ' PureColor主题设置',
        PureColorczyq: ' 垂直页签',
        PureColorlbfzx: ' 列表子弹线',
        PureColorxyps: ' 配色：前卫·灰',
        PureColorslps: ' 配色：原木·黄',
        PureColorhyps: ' 配色：护眼·绿',
    },
    en_US: {
        PureColorztsz: ' PureColor Settings',
        PureColorczyq: ' Vertical Tabs',
        PureColorlbfzx: ' List Bullet Line',
        PureColorxyps: ' Theme：Avant-garde·Grey',
        PureColorslps: ' Theme：Solid wood·Yellow',
        PureColorhyps: ' Theme：Eye care·Green',
    },
};
const i18n = I18N[window.siyuan.config.lang] || I18N.en_US;

// 添加Q按钮
(function() {
    addThemeToolBar();
})();
function addThemeToolBar() {
    var PureColorToolBar = document.getElementById("QToolbar");
    if (!PureColorToolBar) {
        var toolbarVIP = document.getElementById("toolbarVIP");
        var windowControls = document.getElementById("windowControls");
        PureColorToolBar = document.createElement("div");
        PureColorToolBar.id = "QToolbar";
        PureColorToolBar.className = "toolbar__item ariaLabel";
        PureColorToolBar.style.width = "23.5px";
        PureColorToolBar.style.height = "23.5px";
        PureColorToolBar.innerHTML = `<svg t="1740797651161" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4700" width="24" height="24"><path d="M896 0a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128H128a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128h768zM505.856 179.712c-97.664 0-174.72 31.36-230.272 95.872-53.76 60.928-79.744 139.776-79.744 237.44 0 96.768 25.984 175.616 79.744 236.544 55.552 62.72 132.608 94.976 230.272 94.976 66.304 0 122.752-14.336 170.24-43.008 23.296 31.36 46.592 64.512 70.784 99.456l62.72-55.552c-23.296-34.048-47.488-66.304-70.784-97.664 51.968-60.928 77.952-138.88 77.952-234.752 0-98.56-26.88-178.304-80.64-238.336-56.448-63.616-133.504-94.976-230.272-94.976z m0 86.016c68.096 0 120.96 21.504 157.696 66.304 35.84 43.904 54.656 103.936 54.656 180.992 0 65.408-13.44 118.272-40.32 159.488A2949.44 2949.44 0 0 0 581.12 564.096l-56.448 55.552c31.36 33.152 63.616 69.888 95.872 110.208-31.36 18.816-69.888 28.672-114.688 28.672-68.096 0-120.96-23.296-158.592-68.096-35.84-43.904-53.76-103.04-53.76-177.408 0-75.264 17.92-134.4 53.76-178.304 37.632-46.592 90.496-68.992 158.592-68.992z" fill="var(--b3-toolbar-color)" opacity=".9" p-id="4701"></path></svg>`;
        PureColorToolBar.ariaLabel = i18n.PureColorztsz;
        PureColorToolBar.style.userSelect = 'none';
        const handleToolbarClick = () => {
            const settingsWindow = document.getElementById('PureColorsettings-window');
            settingsWindow ? closeSettingsWindow() : createSettingsWindow();
        };

        var parentElement = toolbarVIP ? toolbarVIP.parentElement : (windowControls ? windowControls.parentElement : null);
        if (!parentElement) {
            document.body.classList.add("PureColormobile");
            PureColorToolBar.className = "block__icon fn__flex-center ariaLabel";
            PureColorToolBar.style.height = "14px";
            PureColorToolBar.style.width = "14px";
            var breadcrumbButtons = document.getElementsByClassName("block__icon fn__flex-center ariaLabel");
            try {
                var firstButton = breadcrumbButtons[0];
                const container = firstButton.parentElement;
                container.insertBefore(PureColorToolBar, firstButton);
                PureColorToolBar.addEventListener("click", handleToolbarClick);
            } catch (error) {
                setTimeout(function() {
                    var firstButton = document.getElementsByClassName("block__icon fn__flex-center ariaLabel")[0];
                    if (firstButton) {
                        const container = firstButton.parentElement;
                        container.insertBefore(PureColorToolBar, firstButton);
                        PureColorToolBar.addEventListener("click", handleToolbarClick);
                    }
                }, 1000);
            }
            return;
        }
        parentElement.insertBefore(PureColorToolBar, toolbarVIP || windowControls);
        PureColorToolBar.addEventListener("click", handleToolbarClick);
    }
}



// 设置窗口

let isChecked1;
let isChecked2;
let isChecked3;
let isChecked4;
let isChecked5;


function createSettingsWindow() {
    // 检查是否已经存在设置窗口
    if (document.getElementById('PureColorsettings-window')) return;

    // 创建设置窗口
    const settingsWindow = document.createElement('div');
    settingsWindow.id = 'PureColorsettings-window';
    settingsWindow.style.position = 'fixed';
    settingsWindow.style.top = '32px'; 
    settingsWindow.style.backdropFilter = 'var(--PureColor-Aero-filter)';
	settingsWindow.style.backgroundColor = 'var(--b3-menu-background)';
    settingsWindow.style.padding = '8px';
	settingsWindow.style.border = '1px solid var(--b3-theme-surface-lighter)';
    settingsWindow.style.boxShadow = 'var(--b3-dialog-shadow)';
    settingsWindow.style.zIndex = '1000';
    settingsWindow.style.borderRadius = 'var(--b3-border-radius-b)';

    const toolbar = document.getElementById('QToolbar');
    if (toolbar && settingsWindow) {
    const rect = toolbar.getBoundingClientRect();
    const distanceFromRight = window.innerWidth - rect.right;
    settingsWindow.style.right = `${Math.max(distanceFromRight, 10)}px`;

    } else {
    console.error('错误');
    }

    // 创建复选框和标签
    const checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    checkbox1.id = 'PureColorlverticaltab-checkbox';
    checkbox1.checked = isChecked1;

    const label1 = document.createElement('label');
    label1.htmlFor = 'PureColorlverticaltab-checkbox';
    label1.textContent = i18n.PureColorczyq;
    label1.style.fontSize = '14px';
    label1.style.userSelect= 'none';


    const checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'PureColorlihelp-checkbox';
    checkbox2.checked = isChecked2;

    const label2 = document.createElement('label');
    label2.htmlFor = 'PureColorlihelp-checkbox';
    label2.textContent = i18n.PureColorlbfzx;
    label2.style.fontSize = '14px';
    label2.style.userSelect= 'none';
	
	
    const checkbox3 = document.createElement('input');
    checkbox3.type = 'checkbox';
    checkbox3.id = 'PureColorsunset-checkbox';
    checkbox3.checked = isChecked3;

    const label3 = document.createElement('label');
    label3.htmlFor = 'PureColorsunset-checkbox';
    label3.textContent = i18n.PureColorxyps;
    label3.style.fontSize = '14px';
    label3.style.userSelect= 'none';


    const checkbox4 = document.createElement('input');
    checkbox4.type = 'checkbox';
    checkbox4.id = 'PureColorforest-checkbox';
    checkbox4.checked = isChecked4;

    const label4 = document.createElement('label');
    label4.htmlFor = 'PureColorforest-checkbox';
    label4.textContent = i18n.PureColorslps;
    label4.style.fontSize = '14px';
    label4.style.userSelect= 'none';


    const checkbox5 = document.createElement('input');
    checkbox5.type = 'checkbox';
    checkbox5.id = 'PureColorocean-checkbox';
    checkbox5.checked = isChecked5;

    const label5 = document.createElement('label');
    label5.htmlFor = 'PureColorocean-checkbox';
    label5.textContent = i18n.PureColorhyps;
    label5.style.fontSize = '14px';
    label5.style.userSelect= 'none';
	
	
    // 将复选框和标签组合
    const PureColorfunctionpair1 = document.createElement('div');
    PureColorfunctionpair1.className = 'checkbox-label-pair';
    PureColorfunctionpair1.appendChild(checkbox1);
    PureColorfunctionpair1.appendChild(label1);
    PureColorfunctionpair1.style.animation = 'PureColorbounceRight2 0.1s';

    const PureColorfunctionpair2 = document.createElement('div');
    PureColorfunctionpair2.className = 'checkbox-label-pair';
    PureColorfunctionpair2.appendChild(checkbox2);
    PureColorfunctionpair2.appendChild(label2);
    PureColorfunctionpair2.style.animation = 'PureColorbounceRight2 0.1s';

    const PureColorfunctionpair3 = document.createElement('div');
    PureColorfunctionpair3.className = 'checkbox-label-pair';
    PureColorfunctionpair3.appendChild(checkbox3);
    PureColorfunctionpair3.appendChild(label3);
    PureColorfunctionpair3.style.animation = 'PureColorbounceRight2 0.1s';

    const PureColorfunctionpair4 = document.createElement('div');
    PureColorfunctionpair4.className = 'checkbox-label-pair';
    PureColorfunctionpair4.appendChild(checkbox4);
    PureColorfunctionpair4.appendChild(label4);
    PureColorfunctionpair4.style.animation = 'PureColorbounceRight2 0.1s';

    const PureColorfunctionpair5 = document.createElement('div');
    PureColorfunctionpair5.className = 'checkbox-label-pair';
    PureColorfunctionpair5.appendChild(checkbox5);
    PureColorfunctionpair5.appendChild(label5);
    PureColorfunctionpair5.style.animation = 'PureColorbounceRight2 0.1s';
	
	

    //分割线
    const PureColorfunctionpairdivider1 = document.createElement('hr');
    PureColorfunctionpairdivider1.style.cssText = `
        margin: 8px 0;
        border-bottom: 1px solid rgba(255,255,255,0.03);
        width: 100%;
    `;
    const PureColorfunctionpairdivider2 = document.createElement('hr');
    PureColorfunctionpairdivider2.style.cssText = `
        height: 1px;
        margin: 5px 0;
        background-image: linear-gradient( to right, transparent 0%, var(--b3-theme-primary) 30%, var(--b3-theme-primary) 70%, transparent 100% );
        border: none;
        width: 100%;
    `;



    // 将复选框和标签添加到设置窗口
	settingsWindow.appendChild(PureColorfunctionpair1);  //垂直页签
	settingsWindow.appendChild(PureColorfunctionpair2); //列表子弹线
	settingsWindow.appendChild(PureColorfunctionpairdivider1); //以下是主题配色
	settingsWindow.appendChild(PureColorfunctionpair3);
    settingsWindow.appendChild(PureColorfunctionpair4);
    settingsWindow.appendChild(PureColorfunctionpair5);
	


// 将设置窗口添加到body
document.body.appendChild(settingsWindow);

// 保存配置到PureColor-light-config.json
async function saveConfig() {
    const formData = new FormData();
    formData.append('path', '/data/snippets/PureColor-light-config.json');
    formData.append('isDir', 'false');
    formData.append('modTime', Math.floor(Date.now() / 1000));
    formData.append('file', new Blob([JSON.stringify({
        isChecked1: checkbox1.checked,
        isChecked2: checkbox2.checked,
        isChecked3: checkbox3.checked,
        isChecked4: checkbox4.checked,
        isChecked5: checkbox5.checked,


    })], { type: 'application/json' }), 'PureColor-light-config.json');

    return fetch('/api/file/putFile', { method: 'POST', body: formData });
}

// 列表子弹线开关
checkbox2.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorlihelp() : disablePureColorlihelp();
    state ? isChecked2 = true : isChecked2 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});






// light1配色开关
checkbox3.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorsunset() : disablePureColorsunset();
    state ? isChecked3 = true : isChecked3 = false;
    if (isChecked4 === true) { checkbox4.click(); }
    if (isChecked5 === true) { checkbox5.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// light2配色开关
checkbox4.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorforest() : disablePureColorforest();
    state ? isChecked4 = true : isChecked4 = false;
    if (isChecked3 === true) { checkbox3.click(); }
    if (isChecked5 === true) { checkbox5.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// light3配色开关
checkbox5.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorocean() : disablePureColorocean();
    state ? isChecked5 = true : isChecked5 = false;
    if (isChecked3 === true) { checkbox3.click(); }
    if (isChecked4 === true) { checkbox4.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});




// 垂直页签开关
checkbox1.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorverticaltab() : disablePureColorverticaltab();
    state ? isChecked1 = true : isChecked1 = false;

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


    // ESC键关闭
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeSettingsWindow();
        }
    });
    // 阻止点击事件冒泡
    settingsWindow.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

 // 点击空白处关闭设置窗口
document.addEventListener('click', function(event) {
    var targetElement = event.target; // clicked element
    var settingsWindow = document.getElementById('settingsWindow');
    var qToolbar = document.getElementById('QToolbar');
    do {
        if (targetElement == settingsWindow || targetElement == qToolbar) {
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);
    closeSettingsWindow();
});

// 关闭设置窗口
function closeSettingsWindow() {
    const settingsWindow = document.getElementById('PureColorsettings-window');
    if (settingsWindow) {
        document.body.removeChild(settingsWindow);
    }
}

// 开启标记挖空
function enableMarkStyles() {
    let linkElement = document.getElementById("mark-styles");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "mark-styles";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/标记挖空.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭标记挖空
function disableMarkStyles() {
    const linkElement = document.getElementById("mark-styles");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启文档树缩进线功能
function enableIndentStyle() {
    let linkElement = document.getElementById("indent-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "indent-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/文档树缩进线.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭文档树缩进功能
function disableIndentStyle() {
    const linkElement = document.getElementById("indent-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启隐藏顶栏功能
function enabletoolbarhidden() {
    let styleSheet = document.getElementById("toolbarhidden-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "toolbarhidden-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .toolbar {
            margin-bottom: -32px;
            opacity: 0;
            transition: all 200ms;
            transform: translateY(-30px);
            z-index: 8;
            border-bottom-right-radius: var(--b3-border-radius);
            border-bottom-left-radius: var(--b3-border-radius);
            box-shadow: var(--b3-point-shadow);
        }
        .toolbar:hover {
            opacity: 1;
            transform: translateY(0px);
            transition: all 200ms;
        }
    `;
}

// 防止窗口化时隐藏顶栏后无法呼出
function PureColorcheckMaximize() {
    if (!isChecked3) {
        disabletoolbarhidden();
        return;
    }
    const threshold = 3;
    const isMaximized = 
        Math.abs(window.outerWidth - screen.availWidth) <= threshold &&
        Math.abs(window.outerHeight - screen.availHeight) <= threshold;
    const isF11Fullscreen = 
        (window.screenX === 0 && window.screenY === 0 && 
         window.outerWidth === screen.width && 
         window.outerHeight === screen.height) ||
        (window.innerHeight >= screen.availHeight - threshold);

    if (isMaximized || isF11Fullscreen) {
        enabletoolbarhidden();
    } else {
        disabletoolbarhidden();
    }
  
   

}
window.addEventListener('resize', PureColorcheckMaximize);

// 关闭隐藏顶栏功能
function disabletoolbarhidden() {
    const styleSheet = document.getElementById("toolbarhidden-style");
    if (styleSheet) {
        styleSheet.innerText = `
        .toolbar {
            opacity: 1;
            transition: all 200ms;
            transform: translateY(0px);
        }
        .toolbar:hover {
            opacity: 1;
            transition: all 200ms;
            transform: translateY(0px);
        }
    `;
    }
}

// 开启鼠标所在块高亮功能
function enablehoverblockremind() {
    let styleSheet = document.getElementById("hoverblock-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "hoverblock-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .protyle-wysiwyg [data-node-id]:hover {
            box-shadow: var(--PureColor-shadow-highlight) !important;
            transition: 0.3s !important;
        }
    `;
}

// 关闭鼠标所在块高亮功能
function disablehoverblockremind() {
    const styleSheet = document.getElementById("hoverblock-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启超级块范围提示功能
function enablesbremind() {
    let styleSheet = document.getElementById("sbremind-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "sbremind-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .sb:hover {
            box-shadow: var(--PureColor-shadow-highlight) !important;
            transition: 0.3s !important;
        }
    `;
}

// 关闭超级块范围提示功能
function disablesbremind() {
    const styleSheet = document.getElementById("sbremind-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 关闭鼠标所在块高亮功能
function disablehoverblockremind() {
    const styleSheet = document.getElementById("hoverblock-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 聚焦块高亮
function enablefocusblockremind() {
    // 块提示
    let cachedEditor = null;
    let lastHighlightedElement = null;
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments, context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    function handleSelection() {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;
        const range = selection.getRangeAt(0);
        const node = range.startContainer;
        const editor = getEditorContainer(node);
        if (!editor) return;
        if (lastHighlightedElement) {
            lastHighlightedElement.classList.remove('highlight');
            lastHighlightedElement = null;
        }
        const targetElement = (node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement)
            .closest('[data-node-id]');

        if (targetElement && editor.contains(targetElement)) {
            targetElement.classList.add('highlight');
            lastHighlightedElement = targetElement;
        }
    }
    function getEditorContainer(node) {
        if (cachedEditor && cachedEditor.contains(node)) return cachedEditor;
        let element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
        while (element && !element.classList.contains('protyle-wysiwyg')) {
            element = element.parentElement;
        }
        cachedEditor = element || cachedEditor;
        return cachedEditor;
    }
    document.addEventListener('selectionchange', throttle(handleSelection, 100));

    let styleSheet = document.getElementById("focusblockremind-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "focusblockremind-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
    `;
}

// 取消聚焦块高亮
function disablefocusblockremind() {
    const styleSheet = document.getElementById("focusblockremind-style");
    if (styleSheet) {
        styleSheet.innerText = `
            [data-node-id].highlight, [data-node-id].highlight:hover { box-shadow: none !important; transition: none !important; }
        `;
    }
}

// 开启全宽显示功能
function enablefullwidth() {
    let styleSheet = document.getElementById("fullwidth-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "fullwidth-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .protyle-wysiwyg {
            padding-left: 20px !important;
            padding-right: 20px !important;
        }
        .protyle-title.protyle-wysiwyg--attr {
            margin-left: 20px !important;
            margin-right:20px !important;
        }
        .protyle-background__ia {
            margin-left: 20px !important;
        }
    `;
}

// 关闭全宽显示功能
function disablefullwidth() {
    const styleSheet = document.getElementById("fullwidth-style");
    if (styleSheet) {
        styleSheet.innerText = `
            @keyframes PureColorbounceRightspecial {
                    0% {
                        transform: translateX(-100%);
                    }
                    30% {
                        transform: translateX(10%);
                    }
                    70% {
                        transform: translateX(-5%);
                    }
                    100% {
                        transform: translateX(0);
                    }
            }
            .protyle-background__icon, .protyle-background__icon img, .protyle-background__icon svg, .b3-chips__doctag .b3-chip {
                animation: PureColorbounceRightspecial 0.3s forwards;
            }
    `;
    }
}


// 开启多彩文档树功能
function enablecolorfulfiletree() {
    let linkElement = document.getElementById("colorfulfiletree-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "colorfulfiletree-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/多彩文档树-light.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭多彩文档树
function disablecolorfulfiletree() {
    const linkElement = document.getElementById("colorfulfiletree-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启边框化文档树
function enableborderfiletree() {
    let linkElement = document.getElementById("borderfiletree-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "borderfiletree-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/边框化文档树.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭边框化文档树
function disableborderfiletree() {
    const linkElement = document.getElementById("borderfiletree-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启列表子弹线
function enablePureColorlihelp() {
    PureColorlihelp.start();

    let linkElement = document.getElementById("PureColorlihelp-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorlihelp-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/列表子弹线.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭列表子弹线
function disablePureColorlihelp() {
    PureColorlihelp.stop();

    const linkElement = document.getElementById("PureColorlihelp-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启主题动画
function enablePureColoranimation() {
    let linkElement = document.getElementById("PureColoranimation-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColoranimation-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/动画.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭主题动画
function disablePureColoranimation() {
    const linkElement = document.getElementById("PureColoranimation-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启毛玻璃效果
function enablePureColorAero() {
    let linkElement = document.getElementById("PureColorAero-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorAero-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/毛玻璃.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭毛玻璃效果
function disablePureColorAreo() {
    const linkElement = document.getElementById("PureColorAero-style");
    if (linkElement) {
        linkElement.remove();
    }
}


// 多彩标签和多彩行级代码
function enablePureColorcolorfultag() {
    let linkElement = document.getElementById("PureColorcolorfultag-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorcolorfultag-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/多彩标签和多彩代码.css";
        document.head.appendChild(linkElement);
    }
}

// 多彩标签和多彩行级代码
function disablePureColorcolorfultag() {
    const linkElement = document.getElementById("PureColorcolorfultag-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启light1配色
function enablePureColorsunset() {
    let linkElement = document.getElementById("PureColorsunset-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorsunset-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/light-1.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭light1配色
function disablePureColorsunset() {
    const linkElement = document.getElementById("PureColorsunset-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启light-2配色
function enablePureColorforest() {
    let linkElement = document.getElementById("PureColorforest-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorforest-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/light-2.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭light-2配色
function disablePureColorforest() {
    const linkElement = document.getElementById("PureColorforest-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}
// 开启light-3配色
function enablePureColorocean() {
    let linkElement = document.getElementById("PureColorocean-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorocean-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/light-3.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭light-3配色
function disablePureColorocean() {
    const linkElement = document.getElementById("PureColorocean-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开启糖果配色
function enablePureColorsugar() {
    let linkElement = document.getElementById("PureColorsugar-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorsugar-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/糖果配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭糖果配色
function disablePureColorsugar() {
    const linkElement = document.getElementById("PureColorsugar-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
} 

// 开启薰衣草配色
function enablePureColorlavender() {
    let linkElement = document.getElementById("PureColorlavender-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorlavender-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/薰衣草配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭薰衣草配色
function disablePureColorlavender() {
    const linkElement = document.getElementById("PureColorlavender-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
} 

// 开启云雾配色
function enablePureColorfog() {
    let linkElement = document.getElementById("PureColorfog-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorfog-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/云雾配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭云雾配色
function disablePureColorfog() {
    const linkElement = document.getElementById("PureColorfog-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
} 

// 开启墨水屏模式
function enablePureColorinkmode() {
    let linkElement = document.getElementById("PureColorinkmode-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorinkmode-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/墨水屏.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭墨水屏模式
function disablePureColorinkmode() {
    const linkElement = document.getElementById("PureColorinkmode-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启霜禾配色
function enablePureColorshuanghe() {
    let linkElement = document.getElementById("PureColorshuanghe-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorshuanghe-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/霜禾配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭霜禾配色
function disablePureColorshuanghe() {
    const linkElement = document.getElementById("PureColorshuanghe-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启回忆配色
function enablePureColormemory() {
    let linkElement = document.getElementById("PureColormemory-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColormemory-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/回忆配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭回忆配色
function disablePureColormemory() {
    const linkElement = document.getElementById("PureColormemory-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启湖畔配色
function enablePureColorlakeside() {
    let linkElement = document.getElementById("PureColorlakeside-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorlakeside-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/湖畔配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭湖畔配色
function disablePureColorlakeside() {
    const linkElement = document.getElementById("PureColorlakeside-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启香雪兰配色
function enablePureColorfreesia() {
    let linkElement = document.getElementById("PureColorfreesia-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorfreesia-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/香雪兰配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭香雪兰配色
function disablePureColorfreesia() {
    const linkElement = document.getElementById("PureColorfreesia-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启象牙配色
function enablePureColorivory() {
    let linkElement = document.getElementById("PureColorivory-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorivory-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/象牙配色.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭象牙配色
function disablePureColorivory() {
    const linkElement = document.getElementById("PureColorivory-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启扁平化风格
function enablePureColorflatstyle() {
    let linkElement = document.getElementById("PureColorflatstyle-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorflatstyle-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/扁平化风格-light.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭扁平化风格
function disablePureColorflatstyle() {
    const linkElement = document.getElementById("PureColorflatstyle-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启沉浸式顶栏
function enablePureColorimmersivetopbar() {
    let linkElement = document.getElementById("PureColorimmersivetopbar-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorimmersivetopbar-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/沉浸式顶栏.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭沉浸式顶栏
function disablePureColorimmersivetopbar() {
    const linkElement = document.getElementById("PureColorimmersivetopbar-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启多彩标题和多彩大纲
function enablePureColorcolorfulh() {
    let linkElement = document.getElementById("PureColorcolorfulh-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorcolorfulh-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/多彩标题-light.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭多彩标题和多彩大纲
function disablePureColorcolorfulh() {
    const linkElement = document.getElementById("PureColorcolorfulh-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启顶栏融合
function enablePureColorfusion() {
    setTimeout(PureColorwnd.start, 300);
    fusion.start();
    windowObserver.start();

    let linkElement = document.getElementById("PureColorfusion-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorfusion-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/顶栏融合.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭顶栏融合
function disablePureColorfusion() {
    PureColorwnd.stop();
    fusion.stop();
    windowObserver.stop();

    const linkElement = document.getElementById("PureColorfusion-style");
    if (linkElement) {
        linkElement.remove();
    }
}

// 开启垂直页签
function enablePureColorverticaltab() {
    setTimeout(PureColorwnd.start, 300);

      let linkElement = document.getElementById("PureColorverticaltab-style");
      if (!linkElement) {
          linkElement = document.createElement("link");
          linkElement.id = "PureColorverticaltab-style";
          linkElement.rel = "stylesheet";
          linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/垂直页签.css";
          document.head.appendChild(linkElement);
      }
}

// 关闭垂直页签
function disablePureColorverticaltab() {
    PureColorwnd.stop();

    const linkElement = document.getElementById("PureColorverticaltab-style");
    if (linkElement) {
        linkElement.remove();
    }
}


// 读取PureColor-light-config.json
async function loadAndCheckConfig() {
    try {
        const content = await getFile("/data/snippets/PureColor-light-config.json");
        if (!content) return;
        const config = JSON.parse(content);

        if (config?.isChecked1 === true) {
            enablePureColorverticaltab();
            isChecked1 = true;
        } else if (config?.isChecked1 === false) {
            disablePureColorverticaltab();
            isChecked1 = false;
        }

        if (config?.isChecked2 === true) {
            enablePureColorlihelp();
            isChecked2 = true;
        } else if (config?.isChecked2 === false) {
            disablePureColorlihelp();
            isChecked2 = false;
        }

        if (config?.isChecked3 === true) {
            enablePureColorsunset();
            isChecked3 = true;
        } else if (config?.isChecked3 === false) {
            disablePureColorsunset();
            isChecked3 = false;
        }

        if (config?.isChecked4 === true) {
            enablePureColorforest();
            isChecked4 = true;
        } else if (config?.isChecked4 === false) {
            disablePureColorforest();
            isChecked4 = false;
        }

        if (config?.isChecked5 === true) {
            enablePureColorocean();
            isChecked5 = true;
        } else if (config?.isChecked5 === false) {
            disablePureColorocean();
            isChecked5 = false;
        }


    } catch (e) {
        console.error("加载配置失败:", e);
    }
}
loadAndCheckConfig();

// 移动端启动强制关闭隐藏顶栏
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
async function init() {
    if (isMobileDevice()) {
        await loadAndCheckConfig();       
        disabletoolbarhidden();
        isChecked3 = false;
    }
}
init().catch(error => {
    console.error('初始化过程中发生错误:', error);
});

// PWA模式更改meta主色
(function() {
    let lastSurfaceColor = null;
    let isActive = true;  
    function getThemeColorVariable() {
        return typeof isChecked35 !== 'undefined' && isChecked35 
            ? '--PureColor-immerse-toolbar' 
            : '--b3-theme-surface';
    }
    function updateThemeColorMeta() {
        const root = document.documentElement;
        const cssVar = getThemeColorVariable();
        const currentColor = getComputedStyle(root).getPropertyValue(cssVar).trim();

        if (currentColor === lastSurfaceColor) return;
        lastSurfaceColor = currentColor;
        
        let meta = document.querySelector('meta[name="theme-color"]');
        if (currentColor) {
            if (meta) {
                meta.content = currentColor;
            } else {
                meta = document.createElement('meta');
                meta.name = 'theme-color';
                meta.content = currentColor;
                document.head.prepend(meta);
            }
        } else if (meta) {
            meta.remove();
        }
    }
    function startSurfaceWatcher() {
        if (!isActive) return;
        updateThemeColorMeta();
        setTimeout(startSurfaceWatcher, 100);
    }
    document.addEventListener('visibilitychange', () => {
        isActive = !document.hidden;
        if (isActive) startSurfaceWatcher();
    });
    updateThemeColorMeta();
    startSurfaceWatcher();
})();


// 连点三次Q开启或关闭隐藏顶栏
let qKeyPressTimes = [];
document.addEventListener('keydown', function(event) {
    if (event.key.toLowerCase() === 'q') {
        const now = Date.now();
        qKeyPressTimes.push(now);
        if (qKeyPressTimes.length > 3) {
            qKeyPressTimes.shift();
        }
        if (qKeyPressTimes.length === 3) {
            const timeDiff = qKeyPressTimes[2] - qKeyPressTimes[0];
            
            if (timeDiff <= 500) {
                if (isChecked3) {
                    isChecked3 = false;
                    disabletoolbarhidden();
                } else {
                    isChecked3 = true;
                    enabletoolbarhidden();
                }
                qKeyPressTimes = [];
            } else {
                qKeyPressTimes.shift();
            }
        }
    }
});

// 寻找第一个wnd
const PureColorwnd = (function() {
    let observer = null;
    let currentTarget = null;
    function check() {
        let current = document.querySelector('.layout__center');
        let target = null;
        while (current) {
            const firstChild = current.firstElementChild;
            if (!firstChild) break;

            if (firstChild.getAttribute('data-type') === 'wnd') {
                target = firstChild;
                break;
            } else {
                current = firstChild;
            }
        }
        if (currentTarget) {
            currentTarget.classList.remove('PureColorwndthe1');
            currentTarget = null;
        }
        if (target) {
            target.classList.add('PureColorwndthe1');
            currentTarget = target;
        }
    }
    function start() {
        if (observer) return;
        check();
        const container = document.querySelector('.layout__center');
        if (!container) {
            console.error('未找到.layout__center元素');
            return;
        }
        observer = new MutationObserver(mutations => {
            let needsCheck = false;
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-type') {
                    needsCheck = true;
                } else if (mutation.type === 'childList') {
                    needsCheck = true;
                }
            }
            if (needsCheck) check();
        });
        observer.observe(container, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['data-type']
        });
    }
    function stop() {
        if (!observer) return;
        observer.disconnect();
        observer = null;
        if (currentTarget) {
            currentTarget.classList.remove('PureColorwndthe1');
            currentTarget = null;
        }
    }
    return { start, stop };
})();


// 底部状态栏位置更新
const PureColorStatusPositionManager = (() => {
    const PureColor_MAX_RETRIES = 5;
    const PureColor_BASE_DELAY = 300;
    let PureColor_retryCount = 0;    
    class PureColorCoreManager {
        constructor() {
            this.PureColor_layout = null;
            this.PureColor_status = null;
            this.PureColor_windowWidth = window.innerWidth;
            this.PureColor_observer = null;
            this.PureColor_styleObserver = null;
            this.PureColor_isActive = false;
            this.PureColor_init();
        }
        PureColor_elementDetector() {
            return new Promise((resolve, reject) => {
                const PureColor_check = () => {
                    const layout = document.querySelector('#layouts .layout__center');
                    const status = document.getElementById('status');
                    return layout && status ? resolve({ layout, status }) : null;
                };

                const PureColor_recursiveCheck = () => {
                    if (PureColor_retryCount >= PureColor_MAX_RETRIES) {
                        reject(new Error('PureColor Elements not found'));
                        return;
                    }
                    PureColor_retryCount++;
                    PureColor_check() || setTimeout(PureColor_recursiveCheck, PureColor_BASE_DELAY * Math.pow(2, PureColor_retryCount));
                };

                PureColor_check() || PureColor_recursiveCheck();
            });
        }
        PureColor_calculatePosition() {
            if (!this.PureColor_validateElements()) return;
            
            try {
                const rect = this.PureColor_layout.getBoundingClientRect();
                const offset = window.innerWidth - rect.right + 15;
                this.PureColor_status.style.transform = `translateX(-${offset}px)`;
            } catch (error) {
                console.error('PureColor Calculation Error:', error);
                this.PureColor_scheduleRecovery();
            }
        }
        PureColor_animationFrameThrottle(func) {
            let PureColor_pending = false;
            return (...args) => {
                if (!PureColor_pending) {
                    PureColor_pending = true;
                    requestAnimationFrame(() => {
                        func.apply(this, args);
                        PureColor_pending = false;
                    });
                }
            };
        }
        PureColor_handleResize = () => {
            this.PureColor_windowWidth = window.innerWidth;
            this.PureColor_rafUpdate();
        }
        PureColor_handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                this.PureColor_scheduleRecovery();
            }
        }
        async PureColor_init() {
            try {
                const { layout, status } = await this.PureColor_elementDetector();
                this.PureColor_layout = layout;
                this.PureColor_status = status;
                this.PureColor_rafUpdate = this.PureColor_animationFrameThrottle(
                    this.PureColor_calculatePosition.bind(this)
                );
                window.addEventListener('resize', this.PureColor_handleResize, { passive: true });
                window.addEventListener('scroll', this.PureColor_rafUpdate, { passive: true });
                document.addEventListener('visibilitychange', this.PureColor_handleVisibility);
                this.PureColor_observer = new ResizeObserver(() => this.PureColor_rafUpdate());
                this.PureColor_observer.observe(this.PureColor_layout);
                this.PureColor_styleObserver = new MutationObserver(mutations => {
                    if (mutations.some(m => m.attributeName === 'style')) {
                        this.PureColor_rafUpdate();
                    }
                });
                this.PureColor_styleObserver.observe(this.PureColor_status, {
                    attributes: true,
                    attributeFilter: ['style']
                });
                requestAnimationFrame(() => this.PureColor_calculatePosition());
                this.PureColor_isActive = true;
            } catch (error) {
                console.error('PureColor Init Failed:', error);
                this.PureColor_scheduleRecovery();
            }
        }
        PureColor_validateElements() {
            const isValid = [this.PureColor_layout, this.PureColor_status].every(
                el => el?.isConnected
            );
            !isValid && console.warn('PureColor Elements Missing');
            return isValid;
        }

        PureColor_scheduleRecovery() {
            if (!this.PureColor_isActive) return;
            
            console.log('PureColor Attempting Recovery...');
            PureColor_retryCount = 0;
            setTimeout(() => {
                this.PureColor_cleanup();
                this.PureColor_init();
            }, 2000);
        }
        PureColor_cleanup() {
            window.removeEventListener('resize', this.PureColor_handleResize);
            window.removeEventListener('scroll', this.PureColor_rafUpdate);
            document.removeEventListener('visibilitychange', this.PureColor_handleVisibility);
            
            this.PureColor_observer?.disconnect();
            this.PureColor_styleObserver?.disconnect();
            this.PureColor_isActive = false;
        }
    }
    return {
        PureColor_getInstance: () => {
            if (!this.PureColor_instance) {
                this.PureColor_instance = new PureColorCoreManager();
            }
            return this.PureColor_instance;
        },
        PureColor_destroy: () => {
            this.PureColor_instance?.PureColor_cleanup();
            this.PureColor_instance = null;
        }
    };
})();
const PureColorStatusInitialize = () => {
    const init = () => {
        if (document.querySelector('#layouts') && document.getElementById('status')) {
            PureColorStatusPositionManager.PureColor_getInstance();
        } else {
            console.warn('PureColor Required Elements Missing');
        }
    };
    
    if (document.readyState !== 'loading') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
};
PureColorStatusInitialize();

// 顶栏融合
function PureColorfusion() {
    let isRunning = false;
    let retryTimeout;
    let updateTimeout;
    function getElements() {
        return {
            centerElem: document.querySelector('#layouts .layout__center'),
            dragElem: document.querySelector('#drag')
        };
    }
    function updateCSSVariables(centerElem, dragElem) {
        const centerLeft = centerElem.getBoundingClientRect().left;
        const dragLeft = dragElem.getBoundingClientRect().left;
        const dragRight = window.innerWidth - dragElem.getBoundingClientRect().right;
        
        centerElem.style.setProperty('--PureColor-fusion-center-left', `${centerLeft}px`);
        centerElem.style.setProperty('--PureColor-fusion-drag-left', `${dragLeft}px`);
        centerElem.style.setProperty('--PureColor-fusion-drag-right', `${dragRight}px`);
    }
    function scheduleUpdate() {
        if (!isRunning) return;
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            const { centerElem, dragElem } = getElements();
            
            if (centerElem && dragElem) {
                updateCSSVariables(centerElem, dragElem);
                scheduleUpdate();
            } else {
                startRetrying();
            }
        }, 1000);
    }
    function startRetrying() {
        if (!isRunning) return;
        clearTimeout(retryTimeout);
        
        retryTimeout = setTimeout(() => {
            const { centerElem, dragElem } = getElements();
            if (centerElem && dragElem) {
                scheduleUpdate();
            } else {
                startRetrying();
            }
        }, 1000);
    }
    function stopAll() {
        clearTimeout(updateTimeout);
        clearTimeout(retryTimeout);
    }
    return {
        start() {
            if (isRunning) return;
            isRunning = true;
            scheduleUpdate();
        },       
        stop() {
            isRunning = false;
            stopAll();
        }
    };
}
const fusion = PureColorfusion();
class PureColorFusionWindowWidth {
    constructor(options = {}) {
      this.config = { debounceTime: 50, ...options };
      this.cssVarName = '--PureColor-fusion-window-width';
      this.lastWidth = 0;
      this.isActive = false;
      this.rafId = null;
      this.debouncedHandler = null;
      this.handleResize = this.handleResize.bind(this);
    }
  
    #updateCSSVariable(width) {
      document.documentElement.style.setProperty(this.cssVarName, `${width}px`);
    }
  
    #debounce(func, wait) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    }
  
    handleResize() {
      if (!this.isActive) return;
      this.rafId && cancelAnimationFrame(this.rafId);
      this.rafId = requestAnimationFrame(() => {
        const currentWidth = window.innerWidth;
        if (currentWidth !== this.lastWidth) {
          this.#updateCSSVariable(currentWidth);
          this.lastWidth = currentWidth;
        }
      });
    }
  
    start() {
      if (this.isActive) return;
      this.debouncedHandler = this.#debounce(this.handleResize, this.config.debounceTime);
      window.addEventListener('resize', this.debouncedHandler);
      this.isActive = true;
      this.handleResize();
    }
  
    stop() {
      if (!this.isActive) return;
      window.removeEventListener('resize', this.debouncedHandler);
      this.rafId && cancelAnimationFrame(this.rafId);
      this.isActive = false;
      this.debouncedHandler = null;
    }
  }
  const windowObserver = new PureColorFusionWindowWidth();

//css自定义属性
function PureColorcssApplyCustomCSS() {
    PureColorcssObserver.disconnect();
    const elements = document.querySelectorAll('div[custom-css]');
    const cssRules = [];
    const containerSelector = ':is(#layouts, #preview, [data-key="dialog-exportimage"])';
    elements.forEach(element => {
        const cssValue = element.getAttribute('custom-css');
        const nodeId = element.getAttribute('data-node-id');       
        if (cssValue) {
            if (nodeId) {
                cssRules.push(
                    `${containerSelector} div[data-node-id="${nodeId}"] { ${cssValue} }`
                );
            } else {
                let uid = element.getAttribute('data-css-uid');
                if (!uid) {
                    uid = `cssuid-${crypto.randomUUID().replace(/-/g, '')}`;
                    element.setAttribute('data-css-uid', uid);
                }
                const prevSibling = element.previousElementSibling;
                if (prevSibling && prevSibling.classList.contains('protyle-top')) {
                    prevSibling.setAttribute('data-css-uid', uid);
                }
                cssRules.push(
                    `${containerSelector} div[data-css-uid="${uid}"] { ${cssValue} }`
                );
            }
        }
    });
    const existingStyle = document.getElementById('snippet-PureColorcss-dynamic-css');
    if (existingStyle) existingStyle.remove();    
    const style = document.createElement('style');
    style.id = 'snippet-PureColorcss-dynamic-css';
    style.textContent = cssRules.join('\n');
    document.head.appendChild(style);
    PureColorcssObserver.observe(document.body, PureColorcssObserverConfig);
}
function PureColorcssDebounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}
const PureColorcssObserverConfig = {
    attributes: true,
    attributeFilter: ['custom-css', 'data-node-id', 'data-css-uid'],
    subtree: true
};
const PureColorcssObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'custom-css' || 
             mutation.attributeName === 'data-node-id' ||
             mutation.attributeName === 'data-css-uid')) {
            PureColorcssDebouncedApplyCSS();
        }
    });
});
const PureColorcssDebouncedApplyCSS = PureColorcssDebounce(PureColorcssApplyCustomCSS, 100);
PureColorcssObserver.observe(document.body, PureColorcssObserverConfig);
PureColorcssApplyCustomCSS();

//列表子弹线
const PureColorlihelp = (function() {
    let allListItemNode = [];
    let isActive = false;
    let selectionChangeHandler = null;

    function handleSelectionChange() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection?.getRangeAt(0);
        const startNode = range?.startContainer;
        let currentNode = startNode;

        allListItemNode.forEach(node => {
            node.classList.remove('en_item_bullet_actived', 'en_item_bullet_line');
        });
        allListItemNode = [];

        while (currentNode) {
            if (currentNode?.dataset?.type === 'NodeListItem') {
                allListItemNode.push(currentNode);
            }
            currentNode = currentNode.parentElement;
        }

        for (let i = 0; i < allListItemNode.length - 1; i++) {
            const currentNode = allListItemNode[i];
            const nextNode = allListItemNode[i + 1];
            const currentRect = currentNode.getBoundingClientRect();
            const nextRect = nextNode.getBoundingClientRect();
            
            currentNode.style.setProperty('--en-bullet-line-height', `${currentRect.top - nextRect.top}px`);
            currentNode.classList.add('en_item_bullet_line');
        }

        allListItemNode.forEach(node => node.classList.add('en_item_bullet_actived'));
    }

    return {
        start() {
            if (!isActive) {
                selectionChangeHandler = handleSelectionChange.bind(this);
                document.addEventListener('selectionchange', selectionChangeHandler);
                isActive = true;
            }
        },
        
        stop() {
            if (isActive) {
                document.removeEventListener('selectionchange', selectionChangeHandler);
                allListItemNode.forEach(node => {
                    node.classList.remove('en_item_bullet_actived', 'en_item_bullet_line');
                });
                allListItemNode = [];
                isActive = false;
            }
        }
    };
})();


// 右键菜单PureColor自定义属性
{
    function debounce(func, delay) {
        let timeout;
        return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
    const commonMenuCache = { elem: null, timestamp: 0 };
    function getCommonMenu() {
        const now = Date.now();
        if (!commonMenuCache.elem || now - commonMenuCache.timestamp > 1000) {
        commonMenuCache.elem = document.querySelector("#commonMenu .b3-menu__items");
        commonMenuCache.timestamp = now;
        }
        return commonMenuCache.elem;
    }
    let isClickMonitorActive = false;
    function ClickMonitor() {
        if (isClickMonitorActive) return;
        isClickMonitorActive = true;
        const handleEvent = debounce((e) => {
        initPureColorattr(e);
        initPureColorattrforfile(e);
        }, 100);
    
        window.addEventListener('mouseup', handleEvent);
        window.addEventListener('keyup', handleEvent);
    }
    let initTimeout, insertTimeout, fileInitTimeout, fileInsertTimeout;
    
    function initPureColorattr() {//准备创建PureColor自定义属性菜单项(块)
        clearTimeout(initTimeout);
        clearTimeout(insertTimeout);
    
        initTimeout = setTimeout(() => {
        const selectinfo = getBlockSelected();
        if (selectinfo) {
            insertTimeout = setTimeout(() => {
            InsertPureColorattr(selectinfo.id, selectinfo.type);
            查询css自定义块属性的内容(selectinfo.id);
            }, 300);
        }
        }, 0);
    }
    
    function initPureColorattrforfile() {//准备创建PureColor自定义属性菜单项(文档)
        clearTimeout(fileInitTimeout);
        clearTimeout(fileInsertTimeout);
    
        fileInitTimeout = setTimeout(() => {
        const selectinfo = getFileBlockSelected();
        if (selectinfo) {
            fileInsertTimeout = setTimeout(() => {
            InsertPureColorattrforfile(selectinfo.id, selectinfo.type);
            查询css自定义块属性的内容(selectinfo.id);
            }, 300);
        }
        }, 0);
    }
    function MenuSeparator(className = 'b3-menu__separator') {
        let node = document.createElement('button');
        node.className = className;
        return node;
    }
    
    function getBlockSelected() {//获取块属性
        const node_list = document.querySelectorAll('.protyle-wysiwyg--select');
        if (node_list.length === 1 && node_list[0].dataset.nodeId != null) {
        return {
            id: node_list[0].dataset.nodeId,
            type: node_list[0].dataset.type,
            subtype: node_list[0].dataset.subtype,
        };
        }
        return null;
    }
    
    function getFileBlockSelected() {
        const node_list = document.querySelectorAll('.b3-list-item--focus[data-type="navigation-file"]');
        if (node_list.length === 1 && node_list[0].dataset.nodeId != null) {
        return {
            id: node_list[0].dataset.nodeId,
            type: node_list[0].dataset.type,
            subtype: node_list[0].dataset.subtype,
        };
        }
        return null;
    }
    
    function InsertPureColorattr(selectid, selecttype) {//创建PureColor自定义属性菜单项（块）
        const commonMenu = getCommonMenu();
        if (!commonMenu) return;
    
        const readonly = commonMenu.querySelector('[data-id="updateAndCreatedAt"]');
        const attritem = commonMenu.querySelector('#PureColorattr');
    
        if (readonly && !attritem) {
        commonMenu.insertBefore(PureColorattritem(selectid, selecttype), readonly);
        commonMenu.insertBefore(MenuSeparator(), readonly);
        }
    }
    
    function InsertPureColorattrforfile(selectid, selecttype) {//创建PureColor自定义属性菜单项（文档）
        const commonMenu = getCommonMenu();
        if (!commonMenu) return;
    
        const readonly = commonMenu.querySelector('[data-id="separator_3"]:has(~ [data-id="fileHistory"])');
        const attritem = commonMenu.querySelector('#PureColorattr');
    
        if (readonly && !attritem) {
        commonMenu.insertBefore(MenuSeparator(), readonly);
        commonMenu.insertBefore(PureColorattritem(selectid, selecttype), readonly);
        }
    }
    setTimeout(ClickMonitor, 1000);

    function PureColorattritem(selectid, selecttype) {//定义PureColor自定义属性菜单项
      let button = document.createElement("button")
      button.id = "PureColorattr"
      button.className = "b3-menu__item"
      button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label" style="">PureColor自定义属性</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
      
      if (selecttype === "NodeHeading") {//准备创建标题块的二级菜单
        button.appendChild(PureColorNodeHeadingsub(selectid))
      }

      else if (selecttype === "NodeTable") {//准备创建表格块的二级菜单
        button.appendChild(PureColorNodeTablesub(selectid))
      }

      else if (selecttype === "navigation-file") {//准备创建文档块的二级菜单
        button.appendChild(PureColorfilesub(selectid))
      }

      else if (selecttype === "NodeList") {//准备创建列表块的二级菜单
        button.appendChild(PureColorNodeListsub(selectid))
      }

      else if (selecttype === "NodeSuperBlock") {//准备创建超级块的二级菜单
        button.appendChild(PureColorNodeSuperBlocksub(selectid))
      }

      else {//准备创建任意块的二级菜单（非标题、表格、列表、文档）
        button.appendChild(PureColoranyblocksub(selectid))
      }

      return button
    }

/* -----------------------------------------超级块------------------------------------- */
function PureColorNodeSuperBlocksub(selectid) {//创建超级块二级菜单
    let div = document.createElement("div")
    div.id = "PureColorNodeSuperBlocksub"
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorNodeSuperBlocksubitems(selectid))//准备创建超级块二级菜单的b3-menu__items
    return div

    function PureColorNodeSuperBlocksubitems(selectid) {//创建超级块二级菜单的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorattrcssitem(selectid))//准备创建css属性选项
        div.appendChild(PureColorattrcolsbgapitem(selectid))//准备创建水平排列超级块间距选项
        div.appendChild(PureColorattrstyleitem(selectid))//准备创建块样式选项
        div.appendChild(PureColorattrimgitem(selectid))//准备创建图片样式选项
        div.appendChild(PureColorattrfontfamilyitem(selectid))//准备创建字体选项
        div.appendChild(PureColorattrheightitem(selectid))//准备创建最大高度选项
        return div
    }
}
function PureColorattrcolsbgapitem(selectid) {//创建水平排列超级块间距选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label" style="">水平排列超级块间距</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(PureColorattrcolsbgapsub(selectid))//准备创建水平排列超级块间距选项的二级菜单
    return button
}
function PureColorattrcolsbgapsub(selectid) {//创建水平排列超级块间距选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorattrcolsbgapsubitems(selectid))//准备创建水平排列超级块间距选项的b3-menu__items
    return div

    function PureColorattrcolsbgapsubitems(selectid) {//创建水平排列超级块间距选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorattrcolsbgaplianxu(selectid))//水平连续排列
        div.appendChild(PureColorattrcolsbgapjincou(selectid))//水平紧凑排列
        div.appendChild(PureColorattrcolsbgapjiaojincou(selectid))//水平较紧凑排列
        div.appendChild(PureColorattrcolsbgapjiaokuansong(selectid))//水平较宽松排列
        div.appendChild(PureColorattrcolsbgapkuansong(selectid))//水平宽松排列
        div.appendChild(PureColorattrcolsbgapdelete(selectid))//恢复默认
        return div

        function PureColorattrcolsbgaplianxu(selectid) {//水平连续排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平连续排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">水平连续排列</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrcolsbgapjincou(selectid) {//水平紧凑排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平紧凑排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">水平紧凑排列</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrcolsbgapjiaojincou(selectid) {//水平较紧凑排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平较紧凑排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">水平较紧凑排列</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrcolsbgapjiaokuansong(selectid) {//水平较宽松排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平较宽松排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">水平较宽松排列</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrcolsbgapkuansong(selectid) {//水平宽松排列
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "水平宽松排列")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSuper"></use></svg><span class="b3-menu__label">水平宽松排列</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrcolsbgapdelete(selectid) {//默认
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "sb-colgap")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">恢复默认</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
    }
}

/* -----------------------------------------列表块------------------------------------- */
function PureColorNodeListsub(selectid) {//创建列表块二级菜单
    let div = document.createElement("div")
    div.id = "PureColorNodeListsub"
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorNodeListsubitems(selectid))//准备创建列表块二级菜单的b3-menu__items
    return div

    function PureColorNodeListsubitems(selectid) {//创建列表块二级菜单的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorattrcssitem(selectid))//准备创建css属性选项
        div.appendChild(PureColorattrlistviewitem(selectid))//准备创建列表视图选项
        div.appendChild(PureColorattrstyleitem(selectid))//准备创建块样式选项
        div.appendChild(PureColorattrimgitem(selectid))//准备创建图片样式选项
        div.appendChild(PureColorattrfontfamilyitem(selectid))//准备创建字体选项
        div.appendChild(PureColorattrheightitem(selectid))//准备创建最大高度选项
        return div
    }
}
function PureColorattrlistviewitem(selectid) {//创建列表视图选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconList"></use></svg><span class="b3-menu__label" style="">列表视图</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(PureColorattrlistviewsub(selectid))//准备创建列表视图选项的二级菜单
    return button
}
function PureColorattrlistviewsub(selectid) {//创建列表视图选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorattrlistviewsubitems(selectid))//准备创建列表视图选项的b3-menu__items
    return div

    function PureColorattrlistviewsubitems(selectid) {//创建列表视图选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorattrlistviewnaotu(selectid))//脑图
        div.appendChild(PureColorattrlistviewkanban(selectid))//看板
        div.appendChild(PureColorattrlistviewbiaoge(selectid))//表格
        div.appendChild(PureColorattrlistviewlist(selectid))//默认
        return div

        function PureColorattrlistviewnaotu(selectid) {//脑图
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-view")
            button.setAttribute("custom-attr-value", "脑图")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label">脑图</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrlistviewkanban(selectid) {//看板
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-view")
            button.setAttribute("custom-attr-value", "看板")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconMenu"></use></svg><span class="b3-menu__label">看板</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrlistviewbiaoge(selectid) {//表格
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-view")
            button.setAttribute("custom-attr-value", "表格")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">表格</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrlistviewlist(selectid) {//默认
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "list-view")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconList"></use></svg><span class="b3-menu__label">默认</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
    }
}

/* -----------------------------------------文档块------------------------------------- */
function PureColorfilesub(selectid) {//创建文档块二级菜单
    let div = document.createElement("div")
    div.id = "PureColorfilesub"
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorfilesubitems(selectid))//准备创建文档块二级菜单的b3-menu__items
    return div

    function PureColorfilesubitems(selectid) {//创建文档块二级菜单的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorattrcssitem(selectid))//准备创建css属性选项
        div.appendChild(PureColorattrfilestyleitem(selectid))//准备创建文档样式选项
        div.appendChild(PureColorattrlineheightitem(selectid))//准备创建文字行间距选项
        div.appendChild(PureColorattrhstyleitem(selectid))//准备创建标题样式选项
        div.appendChild(PureColorattrtablestyleitem(selectid))//准备创建表格样式选项
        div.appendChild(PureColorattrimgitem(selectid))//准备创建图片样式选项
        div.appendChild(PureColorattrfontfamilyitem(selectid))//准备创建字体选项
        div.appendChild(PureColorattrfullwidthitem(selectid))//准备创建全宽显示选项
        div.appendChild(PureColorattrblankblockreminditem(selectid))//准备创建空块提醒选项
        return div
    }
}
function PureColorattrlineheightitem(selectid) {//创建文字行间距选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label" style="">文字行间距</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(PureColorattrlineheightsub(selectid))//准备创建文字行间距选项的二级菜单
    return button
}
function PureColorattrlineheightsub(selectid) {//创建文字行间距选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorattrlineheightsubitems(selectid))//准备创建文字行间距选项的b3-menu__items
    return div

    function PureColorattrlineheightsubitems(selectid) {//创建文字行间距选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorattrlineheight1(selectid))//单倍行距
        div.appendChild(PureColorattrlineheight15(selectid))//1.5倍行距
        div.appendChild(PureColorattrlineheight18(selectid))//1.8倍行距
        div.appendChild(PureColorattrlineheight2(selectid))//双倍行距
        div.appendChild(PureColorattrlineheightdelete(selectid))//恢复默认
        return div

        function PureColorattrlineheight1(selectid) {//单倍行距
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "line-height")
            button.setAttribute("custom-attr-value", "单倍行距")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">单倍行距</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrlineheight15(selectid) {//1.5倍行距
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "line-height")
            button.setAttribute("custom-attr-value", "1.5倍行距")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">1.5倍行距</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrlineheight18(selectid) {//1.8倍行距
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "line-height")
            button.setAttribute("custom-attr-value", "1.8倍行距")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">1.8倍行距</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrlineheight2(selectid) {//双倍行距
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "line-height")
            button.setAttribute("custom-attr-value", "双倍行距")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">双倍行距</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrlineheightdelete(selectid) {//恢复默认
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "line-height")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">恢复默认</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
    }
}

function PureColorattrfullwidthitem(selectid) {//创建全宽显示选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconMax"></use></svg><span class="b3-menu__label" style="">全宽显示</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(PureColorattrfullwidthsub(selectid))//准备创建全宽显示选项的二级菜单
    return button
}
function PureColorattrfullwidthsub(selectid) {//创建全宽显示选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorattrfullwidthsubitems(selectid))//准备创建全宽显示选项的b3-menu__items
    return div

    function PureColorattrfullwidthsubitems(selectid) {//创建全宽显示选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorattrfullwidthon(selectid))//启用
        div.appendChild(PureColorattrfullwidthoff(selectid))//禁用
        return div

        function PureColorattrfullwidthon(selectid) {//启用全宽显示
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "fullwidth")
            button.setAttribute("custom-attr-value", "启用")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSelect"></use></svg><span class="b3-menu__label">启用</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrfullwidthoff(selectid) {//禁用全宽显示
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "fullwidth")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">禁用</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
    }
}

function PureColorattrblankblockreminditem(selectid) {//创建空块提醒选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconInfo"></use></svg><span class="b3-menu__label" style="">空块提醒</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(PureColorattrblankblockremindsub(selectid))//准备创建空块提醒选项的二级菜单
    return button
}
function PureColorattrblankblockremindsub(selectid) {//创建空块提醒选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorattrblankblockremindsubitems(selectid))//准备创建空块提醒选项的b3-menu__items
    return div

    function PureColorattrblankblockremindsubitems(selectid) {//创建空块提醒选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorattrblankblockremindon(selectid))//启用
        div.appendChild(PureColorattrblankblockremindoff(selectid))//禁用
        return div

        function PureColorattrblankblockremindon(selectid) {//启用空块提醒
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "blankblock-remind")
            button.setAttribute("custom-attr-value", "开启")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconSelect"></use></svg><span class="b3-menu__label">启用</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorattrblankblockremindoff(selectid) {//禁用空块提醒
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "blankblock-remind")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">禁用</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
    }
}

/* -----------------------------------------任意块------------------------------------- */
function PureColoranyblocksub(selectid) {//创建任意块二级菜单
    let div = document.createElement("div")
    div.id = "PureColoranyblocksub"
    div.className = "b3-menu__submenu"
    div.appendChild(PureColoranyblocksubitems(selectid))//准备创建任意块二级菜单的b3-menu__items
    return div

    function PureColoranyblocksubitems(selectid) {//创建任意块二级菜单的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorattrcssitem(selectid))//准备创建css属性选项
        div.appendChild(PureColorattrstyleitem(selectid))//准备创建块样式选项
        div.appendChild(PureColorattrimgitem(selectid))//准备创建图片样式选项
        div.appendChild(PureColorattrfontfamilyitem(selectid))//准备创建字体选项
        div.appendChild(PureColorattrheightitem(selectid))//准备创建最大高度选项
        return div
    }
}

/* -----------------------------------------表格块------------------------------------- */
function PureColorNodeTablesub(selectid) {//创建表格块二级菜单
    let div = document.createElement("div")
    div.id = "PureColorNodeTablesub"
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorNodeTablesubitems(selectid))//准备创建表格块二级菜单的b3-menu__items
    return div

    function PureColorNodeTablesubitems(selectid) {//创建表格块二级菜单的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorattrcssitem(selectid))//准备创建css属性选项
        div.appendChild(PureColorattrtablestyleitem(selectid))//准备创建表格样式选项
        div.appendChild(PureColorattrstyleitem(selectid))//准备创建块样式选项
        div.appendChild(PureColorattrimgitem(selectid))//准备创建图片样式选项
        div.appendChild(PureColorattrfontfamilyitem(selectid))//准备创建字体选项
        div.appendChild(PureColorattrheightitem(selectid))//准备创建最大高度选项
        return div
    }
}
function PureColorattrtablestyleitem(selectid) {//创建表格样式选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label" style="">表格样式</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(PureColorattrtablestylesub(selectid))//准备创建表格样式选项的二级菜单
    return button
}
function PureColorattrtablestylesub(selectid) {//创建表格样式选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorattrtablestylesubitems(selectid))//准备创建表格样式选项的b3-menu__items
    return div

    function PureColorattrtablestylesubitems(selectid) {//创建表格样式选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColortablestylethreeline(selectid))//三线表
        div.appendChild(PureColortablestyledelete(selectid))//清除属性
        return div

        function PureColortablestylethreeline(selectid) {//三线表
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-style")
            button.setAttribute("custom-attr-value", "三线表")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">三线表</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColortablestyledelete(selectid) {//清除属性
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "table-style")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">清除属性</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
    }
}

/* -----------------------------------------标题块------------------------------------- */
    function PureColorNodeHeadingsub(selectid) {//创建标题块二级菜单
        let div = document.createElement("div")
        div.id = "PureColorNodeHeadingsub"
        div.className = "b3-menu__submenu"
        div.appendChild(PureColorNodeHeadingsubitems(selectid))//准备创建标题块二级菜单的b3-menu__items
        return div

        function PureColorNodeHeadingsubitems(selectid) {//创建标题块二级菜单的b3-menu__items
            let div = document.createElement("div")
            div.className = "b3-menu__items"
            div.appendChild(PureColorattrcssitem(selectid))//准备创建css属性选项
            div.appendChild(PureColorattrhstyleitem(selectid))//准备创建标题样式选项
            div.appendChild(PureColorattrstyleitem(selectid))//准备创建块样式选项
            div.appendChild(PureColorattrimgitem(selectid))//准备创建图片样式选项
            div.appendChild(PureColorattrfontfamilyitem(selectid))//准备创建字体选项
            div.appendChild(PureColorattrheightitem(selectid))//准备创建最大高度选项
            return div
        }
    }
    function PureColorattrhstyleitem(selectid) {//创建标题样式选项
        let button = document.createElement('button');
        button.className = "b3-menu__item"
        button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label" style="">标题样式</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
        button.appendChild(PureColorattrhstylesub(selectid))//准备创建标题样式选项的二级菜单
        return button
    }
    function PureColorattrhstylesub(selectid) {//创建标题样式选项的二级菜单
        let div = document.createElement('div');
        div.className = "b3-menu__submenu"
        div.appendChild(PureColorattrhstylesubitems(selectid))//准备创建标题样式选项的b3-menu__items
        return div

        function PureColorattrhstylesubitems(selectid) {//创建标题样式选项的b3-menu__items
            let div = document.createElement("div")
            div.className = "b3-menu__items"
            div.appendChild(PureColorhstyleduocai(selectid))//多彩
            div.appendChild(PureColorhstylejinbo(selectid))//金箔
            div.appendChild(PureColorhstylexiahuaxian(selectid))//下划线
            div.appendChild(PureColorhstylezuobiankuang(selectid))//左边框
            div.appendChild(PureColorhstylecengji(selectid))//层级
            div.appendChild(PureColorhstyledelete(selectid))//全部清除
            return div
        }

        function PureColorhstyleduocai(selectid) {//多彩
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style")
            button.setAttribute("custom-attr-value", "多彩")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">多彩</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorhstylejinbo(selectid) {//金箔
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style")
            button.setAttribute("custom-attr-value", "金箔")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">金箔</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorhstylexiahuaxian(selectid) {//下划线
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style-u")
            button.setAttribute("custom-attr-value", "下划线")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">下划线</span><span class="b3-menu__accelerator">组别2</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorhstylezuobiankuang(selectid) {//左边框
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style-u")
            button.setAttribute("custom-attr-value", "左边框")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">左边框</span><span class="b3-menu__accelerator">组别2</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorhstylecengji(selectid) {//层级
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "h-style-l")
            button.setAttribute("custom-attr-value", "层级")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconHeadings"></use></svg><span class="b3-menu__label">层级</span><span class="b3-menu__accelerator">组别3</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorhstyledelete(selectid) {//全部清除
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">全部清除</span>`
            button.onclick = function(e) {
                button.setAttribute("custom-attr-name", "h-style");
                button.setAttribute("custom-attr-value", "");
                PureColorcustomattrset.call(button, e);
        
                button.setAttribute("custom-attr-name", "h-style-u");
                button.setAttribute("custom-attr-value", "");
                PureColorcustomattrset.call(button, e);

                button.setAttribute("custom-attr-name", "h-style-l");
                button.setAttribute("custom-attr-value", "");
                PureColorcustomattrset.call(button, e);
            };
            return button
        }
    }




/* -----------------------------------------css属性（通用）------------------------------------- */
function PureColorattrcssitem(selectid) {//创建css属性选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconSettings"></use></svg><span class="b3-menu__label" style="">CSS</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(PureColorattrcsssub(selectid))//准备创建css属性选项的二级菜单
    return button
}
function PureColorattrcsssub(selectid) {//创建css属性选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorattrcsssubitems(selectid))//准备创建css属性选项的b3-menu__items
    return div

    function PureColorattrcsssubitems(selectid) {//创建css属性选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.style.padding = "4px 8px"
        div.appendChild(PureColorattrcsstextarea(selectid))//输入区域
        return div

        function PureColorattrcsstextarea(selectid) {
            let textarea = document.createElement("textarea");
            textarea.className = "b3-text-field PureColorcssinput";
            textarea.style.height = "150px";
            textarea.style.width = "550px";
            textarea.style.color = "var(--b3-theme-on-surface)";
            textarea.setAttribute("spellcheck", "false");
            textarea.setAttribute("data-node-id", selectid);
            textarea.setAttribute("custom-attr-name", "css");
            textarea.value = "";
            textarea.placeholder = "在此输入CSS代码，注意首尾无需{ }包裹，支持&嵌套选择器\n例1：输入color:red;border:1px solid red使得块内文字变为红色且块具有红色边框\n例2：输入& span[data-type~=block-ref]:not(.av__celltext) { border-bottom: none }来取消块内所有块引用链接的下方虚线\n例3：输入&.protyle-top .protyle-background__icon {margin-bottom: 8px;& :is(img, svg) {max-width:100px;min-width:100px;width:100px;height:100px;}}来调整文档自定义表情的大小";
        
            查询css自定义块属性的内容(selectid)
                .then(customcssvalue => {
                    if (customcssvalue) {
                        textarea.value = customcssvalue;
                        textarea.setAttribute("custom-attr-value", customcssvalue);
                    } else {
                        textarea.setAttribute("custom-attr-value", "");
                    }
                })
                .catch(err => {
                    console.error("获取CSS值失败:", err);
                });
        
            textarea.addEventListener('blur', function(e) {
                const value = e.target.value;
                e.target.setAttribute("custom-attr-value", value);
                PureColorcustomattrset(e);
            });
        
            return textarea;
        }
    }
}

/* -----------------------------------------img属性（通用）------------------------------------- */
function PureColorattrimgitem(selectid) {//创建图片样式选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label" style="">图片样式</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(PureColorattrimgsub(selectid))//准备创建图片样式选项的二级菜单
    return button
}
function PureColorattrimgsub(selectid) {//创建图片样式选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorattrimgsubitems(selectid))//准备创建图片样式选项的b3-menu__items
    return div

    function PureColorattrimgsubitems(selectid) {//创建图片样式选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorimgborder(selectid))//圆角
        div.appendChild(PureColorimgcircle(selectid))//圆形
        div.appendChild(PureColorimgshadow(selectid))//立体
        div.appendChild(PureColorimginvert(selectid))//反色
        div.appendChild(PureColorimgdelete(selectid))//全部清除
        return div

            function PureColorimgborder(selectid) {//圆角
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "img-border")
                button.setAttribute("custom-attr-value", "圆角")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">圆角</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorimgcircle(selectid) {//圆形
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "img-border")
                button.setAttribute("custom-attr-value", "圆形")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">圆形</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorimgshadow(selectid) {//立体
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "img-shadow")
                button.setAttribute("custom-attr-value", "立体")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">立体</span><span class="b3-menu__accelerator">组别2</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorimginvert(selectid) {//反色
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "img-invert")
                button.setAttribute("custom-attr-value", "反色")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconImage"></use></svg><span class="b3-menu__label">反色</span><span class="b3-menu__accelerator">组别3</span>`
                button.onclick = PureColorcustomattrset
                return button
            }

            function PureColorimgdelete(selectid) {//全部清除
                let button = document.createElement("button")
                button.className = "b3-menu__item b3-menu__item--warning"
                button.style.color = "var(--b3-theme-error)"
                button.setAttribute("data-node-id", selectid)
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">全部清除</span>`
                button.onclick = function(e) {
                    button.setAttribute("custom-attr-name", "img-border");
                    button.setAttribute("custom-attr-value", "");
                    PureColorcustomattrset.call(button, e);
            
                    button.setAttribute("custom-attr-name", "img-shadow");
                    button.setAttribute("custom-attr-value", "");
                    PureColorcustomattrset.call(button, e);

                    button.setAttribute("custom-attr-name", "img-invert");
                    button.setAttribute("custom-attr-value", "");
                    PureColorcustomattrset.call(button, e);
                };
                return button
            }
        }
}

/* -----------------------------------------height属性（通用）------------------------------------- */
function PureColorattrheightitem(selectid) {//创建最大高度选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label" style="">最大高度</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(PureColorattrheightsub(selectid))//准备创建最大高度选项的二级菜单
    return button
}
function PureColorattrheightsub(selectid) {//创建最大高度选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorattrheightsubitems(selectid))//准备创建最大高度选项的b3-menu__items
    return div

    function PureColorattrheightsubitems(selectid) {//创建最大高度选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorheight50(selectid))//50
        div.appendChild(PureColorheight100(selectid))//100
        div.appendChild(PureColorheight150(selectid))//150
        div.appendChild(PureColorheight200(selectid))//200
        div.appendChild(PureColorheightdelete(selectid))//清除属性
        return div

            function PureColorheight50(selectid) {//50
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "50")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">50px</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorheight100(selectid) {//100
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "100")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">100px</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorheight150(selectid) {//150
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "150")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">150px</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorheight200(selectid) {//200
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "200")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconContract"></use></svg><span class="b3-menu__label">200px</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorheightdelete(selectid) {//清除属性
                let button = document.createElement("button")
                button.className = "b3-menu__item b3-menu__item--warning"
                button.style.color = "var(--b3-theme-error)"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "height")
                button.setAttribute("custom-attr-value", "")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">清除属性</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
        }
}

/* -----------------------------------------文档style属性（通用）------------------------------------- */
function PureColorattrfilestyleitem(selectid) {//创建文档样式选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label" style="">文档样式</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(PureColorattrfilestylesub(selectid))//准备创建文档样式选项的二级菜单
    return button
}
function PureColorattrfilestylesub(selectid) {//创建文档样式选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorattrfilestylesubitems(selectid))//准备创建文档样式选项的b3-menu__items
    return div

    function PureColorattrfilestylesubitems(selectid) {//创建文档样式选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorstylewangge(selectid))//网格
        div.appendChild(PureColorstylesajinzhi(selectid))//洒金纸
        div.appendChild(PureColorstyledelete(selectid))//清除属性
        return div
        function PureColorstylesajinzhi(selectid) {//洒金纸
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "style")
            button.setAttribute("custom-attr-value", "洒金纸")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">洒金纸</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorstylewangge(selectid) {//网格
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "style")
            button.setAttribute("custom-attr-value", "网格")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">网格</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorstyledelete(selectid) {//清除属性
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "style")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">清除属性</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
    }
}

/* -----------------------------------------style属性（通用）------------------------------------- */
    function PureColorattrstyleitem(selectid) {//创建块样式选项
        let button = document.createElement('button');
        button.className = "b3-menu__item"
        button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label" style="">块样式</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
        button.appendChild(PureColorattrstylesub(selectid))//准备创建块样式选项的二级菜单
        return button
    }
    function PureColorattrstylesub(selectid) {//创建块样式选项的二级菜单
        let div = document.createElement('div');
        div.className = "b3-menu__submenu"
        div.appendChild(PureColorattrstylesubitems(selectid))//准备创建块样式选项的b3-menu__items
        return div

        function PureColorattrstylesubitems(selectid) {//创建块样式选项的b3-menu__items
            let div = document.createElement("div")
            div.className = "b3-menu__items"
            div.appendChild(PureColorstylewarning(selectid))//警告
            div.appendChild(PureColorstyletip(selectid))//灵感
            div.appendChild(PureColorstyleinfo(selectid))//信息
            div.appendChild(PureColorstyleimportant(selectid))//重要
            div.appendChild(PureColorstylecomment(selectid))//批注
            div.appendChild(PureColorstylequote(selectid))//引用
            div.appendChild(PureColorstyletodo(selectid))//待办
            div.appendChild(PureColorstyledone(selectid))//完成
            div.appendChild(PureColorstylesajinzhi(selectid))//洒金纸
            div.appendChild(PureColorstylewangge(selectid))//网格
            div.appendChild(PureColorstylenoteitem(selectid))//便签
            div.appendChild(PureColorstyleleftborderitem(selectid))//左边框
            div.appendChild(PureColorstyledelete(selectid))//清除属性
            return div

            function PureColorstylewarning(selectid) {//警告
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "警告")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">警告</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorstyletip(selectid) {//灵感
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "灵感")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">灵感</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorstyletip(selectid) {//灵感
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "灵感")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">灵感</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorstyleinfo(selectid) {//信息
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "信息")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">信息</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorstyleimportant(selectid) {//重要
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "重要")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">重要</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorstylecomment(selectid) {//批注
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "批注")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">批注</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorstylequote(selectid) {//引用
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "引用")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">引用</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorstyletodo(selectid) {//待办
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "待办")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">待办</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorstyledone(selectid) {//完成
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "完成")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">完成</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorstylesajinzhi(selectid) {//洒金纸
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "洒金纸")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">洒金纸</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorstylewangge(selectid) {//网格
                let button = document.createElement("button")
                button.className = "b3-menu__item"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "网格")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">网格</span><span class="b3-menu__accelerator">组别1</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorstyledelete(selectid) {//清除属性
                let button = document.createElement("button")
                button.className = "b3-menu__item b3-menu__item--warning"
                button.style.color = "var(--b3-theme-error)"
                button.setAttribute("data-node-id", selectid)
                button.setAttribute("custom-attr-name", "style")
                button.setAttribute("custom-attr-value", "")
                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">清除属性</span>`
                button.onclick = PureColorcustomattrset
                return button
            }
            function PureColorstylenoteitem(selectid) {//创建便签选项
                let button = document.createElement('button');
                button.className = "b3-menu__item"
                button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label" style="">便签</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button><span class="b3-menu__accelerator">组别1</span>'
                button.appendChild(PureColorstylenotesub(selectid))//准备便签选项的二级菜单
                return button
                }
                function PureColorstylenotesub(selectid) {//创建便签选项的二级菜单
                    let div = document.createElement('div');
                    div.className = "b3-menu__submenu"
                    div.appendChild(PureColorstylenotesubitems(selectid))//准备便签选项的b3-menu__items
                    return div

                    function PureColorstylenotesubitems(selectid) {//创建便签选项的b3-menu__items
                        let div = document.createElement("div")
                        div.className = "b3-menu__items"
                        div.appendChild(PureColorstylerednote(selectid))//红色便签
                        div.appendChild(PureColorstyleorangenote(selectid))//橙色便签
                        div.appendChild(PureColorstyleyellownote(selectid))//黄色便签
                        div.appendChild(PureColorstylegreennote(selectid))//绿色便签
                        div.appendChild(PureColorstylecyannote(selectid))//青色便签
                        div.appendChild(PureColorstylebluenote(selectid))//蓝色便签
                        div.appendChild(PureColorstylepurplenote(selectid))//紫色便签
                        div.appendChild(PureColorstylepinknote(selectid))//粉色便签
                        div.appendChild(PureColorstyleblacknote(selectid))//黑色便签
                        div.appendChild(PureColorstylegraynote(selectid))//灰色便签

                        return div

                        function PureColorstylerednote(selectid) {//红色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "红色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">红色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = PureColorcustomattrset
                            return button
                        }
                        function PureColorstyleorangenote(selectid) {//橙色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "橙色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">橙色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = PureColorcustomattrset
                            return button
                        }
                        function PureColorstyleyellownote(selectid) {//黄色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "黄色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">黄色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = PureColorcustomattrset
                            return button
                        }
                        function PureColorstylegreennote(selectid) {//绿色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "绿色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">绿色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = PureColorcustomattrset
                            return button
                        }
                        function PureColorstylecyannote(selectid) {//青色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "青色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">青色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = PureColorcustomattrset
                            return button
                        }
                        function PureColorstylebluenote(selectid) {//蓝色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "蓝色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">蓝色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = PureColorcustomattrset
                            return button
                        }
                        function PureColorstylepurplenote(selectid) {//紫色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "紫色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">紫色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = PureColorcustomattrset
                            return button
                        }
                        function PureColorstylepinknote(selectid) {//粉色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "粉色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">粉色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = PureColorcustomattrset
                            return button
                        }
                        function PureColorstyleblacknote(selectid) {//黑色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "黑色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">黑色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = PureColorcustomattrset
                            return button
                        }
                        function PureColorstylegraynote(selectid) {//灰色便签
                            let button = document.createElement("button")
                            button.className = "b3-menu__item"
                            button.setAttribute("data-node-id", selectid)
                            button.setAttribute("custom-attr-name", "style")
                            button.setAttribute("custom-attr-value", "灰色便签")
                            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">灰色便签</span><span class="b3-menu__accelerator">组别1</span>`
                            button.onclick = PureColorcustomattrset
                            return button
                        }
                    }
                }
                function PureColorstyleleftborderitem(selectid) {//创建左边框选项
                    let button = document.createElement('button');
                    button.className = "b3-menu__item"
                    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label" style="">左边框</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button><span class="b3-menu__accelerator">组别1</span>'
                    button.appendChild(PureColorstyleleftbordersub(selectid))//准备左边框选项的二级菜单
                    return button
                    }
                    function PureColorstyleleftbordersub(selectid) {//创建左边框选项的二级菜单
                        let div = document.createElement('div');
                        div.className = "b3-menu__submenu"
                        div.appendChild(PureColorstyleleftbordersubitems(selectid))//准备左边框选项的b3-menu__items
                        return div
    
                        function PureColorstyleleftbordersubitems(selectid) {//创建左边框选项的b3-menu__items
                            let div = document.createElement("div")
                            div.className = "b3-menu__items"
                            div.appendChild(PureColorstylerednote(selectid))//红左边框
                            div.appendChild(PureColorstyleorangenote(selectid))//橙左边框
                            div.appendChild(PureColorstyleyellownote(selectid))//黄左边框
                            div.appendChild(PureColorstylegreennote(selectid))//绿左边框
                            div.appendChild(PureColorstylecyannote(selectid))//青左边框
                            div.appendChild(PureColorstylebluenote(selectid))//蓝左边框
                            div.appendChild(PureColorstylepurplenote(selectid))//紫左边框
                            div.appendChild(PureColorstylepinknote(selectid))//粉左边框
                            div.appendChild(PureColorstyleblacknote(selectid))//黑左边框
                            div.appendChild(PureColorstylegraynote(selectid))//灰左边框
    
                            return div
    
                            function PureColorstylerednote(selectid) {//红左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "红左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">红左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = PureColorcustomattrset
                                return button
                            }
                            function PureColorstyleorangenote(selectid) {//橙左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "橙左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">橙左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = PureColorcustomattrset
                                return button
                            }
                            function PureColorstyleyellownote(selectid) {//黄左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "黄左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">黄左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = PureColorcustomattrset
                                return button
                            }
                            function PureColorstylegreennote(selectid) {//绿左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "绿左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">绿左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = PureColorcustomattrset
                                return button
                            }
                            function PureColorstylecyannote(selectid) {//青左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "青左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">青左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = PureColorcustomattrset
                                return button
                            }
                            function PureColorstylebluenote(selectid) {//蓝左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "蓝左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">蓝左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = PureColorcustomattrset
                                return button
                            }
                            function PureColorstylepurplenote(selectid) {//紫左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "紫左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">紫左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = PureColorcustomattrset
                                return button
                            }
                            function PureColorstylepinknote(selectid) {//粉左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "粉左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">粉左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = PureColorcustomattrset
                                return button
                            }
                            function PureColorstyleblacknote(selectid) {//黑左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "黑左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">黑左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = PureColorcustomattrset
                                return button
                            }
                            function PureColorstylegraynote(selectid) {//灰左边框
                                let button = document.createElement("button")
                                button.className = "b3-menu__item"
                                button.setAttribute("data-node-id", selectid)
                                button.setAttribute("custom-attr-name", "style")
                                button.setAttribute("custom-attr-value", "灰左边框")
                                button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconTheme"></use></svg><span class="b3-menu__label">灰左边框</span><span class="b3-menu__accelerator">组别1</span>`
                                button.onclick = PureColorcustomattrset
                                return button
                            }
                        }
                    }
        }
    }


/* -----------------------------------------font-family属性（通用）------------------------------------- */
function PureColorattrfontfamilyitem(selectid) {//创建字体选项
    let button = document.createElement('button');
    button.className = "b3-menu__item"
    button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label" style="">字体</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="height: 10px;width: 10px;line-height: 10px;"><use xlink:href="#iconRight"></use></svg></button>'
    button.appendChild(PureColorattrfontfamilysub(selectid))//准备创建字体选项的二级菜单
    return button
}
function PureColorattrfontfamilysub(selectid) {//创建字体选项的二级菜单
    let div = document.createElement('div');
    div.className = "b3-menu__submenu"
    div.appendChild(PureColorattrfontfamilysubitems(selectid))//准备创建字体选项的b3-menu__items
    return div
    
    function PureColorattrfontfamilysubitems(selectid) {//创建字体选项的b3-menu__items
        let div = document.createElement("div")
        div.className = "b3-menu__items"
        div.appendChild(PureColorfontsongti(selectid))//宋体
        div.appendChild(PureColorfontyouyuan(selectid))//幼圆
        div.appendChild(PureColorfontheiti(selectid))//黑体
        div.appendChild(PureColorfontwryahei(selectid))//微软雅黑
        div.appendChild(PureColorfontxinsongti(selectid))//新宋体
        div.appendChild(PureColorfontkaiti(selectid))//楷体
        div.appendChild(PureColorfontlishu(selectid))//隶书
        div.appendChild(PureColorfontfangsong(selectid))//仿宋
        div.appendChild(PureColorfonthwsongti(selectid))//华文宋体
        div.appendChild(PureColorfonthwzhongsong(selectid))//华文中宋
        div.appendChild(PureColorfonthwfangsong(selectid))//华文仿宋
        div.appendChild(PureColorfonthwcaiyun(selectid))//华文彩云
        div.appendChild(PureColorfonthwxinwei(selectid))//华文新魏
        div.appendChild(PureColorfonthwkaiti(selectid))//华文楷体
        div.appendChild(PureColorfonthwhupo(selectid))//华文琥珀
        div.appendChild(PureColorfonthwxihei(selectid))//华文细黑
        div.appendChild(PureColorfonthwxingkai(selectid))//华文行楷
        div.appendChild(PureColorfonthwlishu(selectid))//华文隶书
        div.appendChild(PureColorfontfzyaoti(selectid))//方正姚体
        div.appendChild(PureColorfontfzshuti(selectid))//方正舒体
        div.appendChild(PureColorfonttnm(selectid))//Times New Roman
        div.appendChild(PureColorfontdelete(selectid))//清除属性
        return div

        function PureColorfontsongti(selectid) {//宋体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "SimSun"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "宋体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">宋体</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfontyouyuan(selectid) {//幼圆
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "YouYuan"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "幼圆")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">幼圆</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfontheiti(selectid) {//黑体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "SimHei"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "黑体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">黑体</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfontwryahei(selectid) {//微软雅黑
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "Microsoft YaHei"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "微软雅黑")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">微软雅黑</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfontxinsongti(selectid) {//新宋体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "NSimSun"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "新宋体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">新宋体</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfontkaiti(selectid) {//楷体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "KaiTi"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "楷体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">楷体</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfontlishu(selectid) {//隶书
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "LiSu"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "隶书")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">隶书</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfontfangsong(selectid) {//仿宋
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "FangSong"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "仿宋")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">仿宋</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfonthwsongti(selectid) {//华文宋体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STSong"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文宋体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文宋体</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfonthwzhongsong(selectid) {//华文中宋
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STZhongsong"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文中宋")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文中宋</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfonthwfangsong(selectid) {//华文仿宋
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STFangsong"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文仿宋")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文仿宋</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfonthwcaiyun(selectid) {//华文彩云
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STCaiyun"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文彩云")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文彩云</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfonthwxinwei(selectid) {//华文新魏
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STXinwei"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文新魏")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文新魏</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfonthwkaiti(selectid) {//华文楷体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STKaiti"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文楷体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文楷体</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfonthwhupo(selectid) {//华文琥珀
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STHupo"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文琥珀")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文琥珀</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfonthwxihei(selectid) {//华文细黑
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STXihei"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文细黑")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文细黑</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfonthwxingkai(selectid) {//华文行楷
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STXingkai"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文行楷")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文行楷</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfonthwlishu(selectid) {//华文隶书
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "STLiti"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "华文隶书")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">华文隶书</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfontfzyaoti(selectid) {//方正姚体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "FZYaoti"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "方正姚体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">方正姚体</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfontfzshuti(selectid) {//方正舒体
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "FZShuTi"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "方正舒体")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">方正舒体</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfonttnm(selectid) {//Times New Roman
            let button = document.createElement("button")
            button.className = "b3-menu__item"
            button.style.fontFamily = "Times New Roman"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "Times New Roman")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconFont"></use></svg><span class="b3-menu__label">Times New Roman</span><span class="b3-menu__accelerator">组别1</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
        function PureColorfontdelete(selectid) {//清除属性
            let button = document.createElement("button")
            button.className = "b3-menu__item b3-menu__item--warning"
            button.style.color = "var(--b3-theme-error)"
            button.setAttribute("data-node-id", selectid)
            button.setAttribute("custom-attr-name", "font-family")
            button.setAttribute("custom-attr-value", "")
            button.innerHTML = `<svg class="b3-menu__icon" style=""><use xlink:href="#iconClose"></use></svg><span class="b3-menu__label">清除属性</span>`
            button.onclick = PureColorcustomattrset
            return button
        }
    }
}

/* -----------------------------------------块属性API------------------------------------- */
    function PureColorcustomattrset(event) {//设置自定义块属性
      let id = event.currentTarget.getAttribute("data-node-id")
      let attrName = 'custom-' + event.currentTarget.getAttribute("custom-attr-name")
      let attrValue = event.currentTarget.getAttribute("custom-attr-value")
      let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`)
      if (blocks) {
        blocks.forEach(block => block.setAttribute(attrName, attrValue))
      }
      let attrs = {}
      attrs[attrName] = attrValue
      设置思源块属性(id, attrs)
    }
    async function 查询css自定义块属性的内容(selectid) {
        if (!selectid) return null;
        try {
            const 属性对象 = await 获取思源块属性(selectid, ["custom-css"]);
            const customcssvalue = 属性对象?.['custom-css']?.trim(); 
            return customcssvalue || null;
        } catch (err) {
            console.error("获取css自定义属性失败", err);
            return null;
        }
    }

    async function 向思源请求数据(url, data) {
        try {
            const response = await fetch(url, {
                body: JSON.stringify(data),
                method: 'POST',
                headers: { Authorization: 'Token ' } 
            });
            return response.ok ? await response.json() : null;
        } catch (error) {
            console.error('[PureColor] API 请求失败:', error); 
            return null;
        }
    }
    async function 解析响应体(response) {
        try {
            const result = await response;
            if (!result) return null;
            return result.code === 0 ? result.data : null;
        } catch (error) {
            console.error('[PureColor] 响应解析失败:', error);
            return null;
        }
    }
    async function 设置思源块属性(内容块id, 属性对象) {
        return 解析响应体(向思源请求数据('/api/attr/setBlockAttrs', {
            id: 内容块id,
            attrs: 属性对象,
        }));
    }
    async function 获取思源块属性(内容块id, 属性对象) {
        return 解析响应体(向思源请求数据('/api/attr/getBlockAttrs', {
            id: 内容块id,
            attrs: 属性对象,
        }));
    }
}