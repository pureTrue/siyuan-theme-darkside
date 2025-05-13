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
		PureColorycdl: ' 隐藏顶栏',
        PureColorczyq: ' 垂直页签',
        PureColorlbfzx: ' 列表子弹线',
        PureColorxyps: ' 配色：暮·灰',
        PureColorslps: ' 配色：藻·紫',
        PureColorhyps: ' 配色：类logseq·青',
		PureColorps4: ' 配色：类Steam·蓝',
		PureColorps5: ' 配色：玛瑙·红',
		PureColorps6: ' 配色：墨·绿',
		PureColorps7: ' 配色：橄榄·绿',
		PureColorps8: ' 配色：马尔斯·绿',
		PureColorps9: ' 配色：克莱因·蓝',
		PureColorps10: ' 配色：就酱·紫',
		PureColorps11: ' 配色：不溜秋·黑',
    },
    en_US: {
        PureColorztsz: ' PureColor Settings',
		PureColorycdl: ' Hide Topbar',
        PureColorczyq: ' Vertical Tabs',
        PureColorlbfzx: ' List Bullet Line',
        PureColorxyps: ' Theme：Evening·Limestone',
        PureColorslps: ' Theme：Algae·Purple',
        PureColorhyps: ' Theme：logseqlike·Green',
		PureColorps4: ' Theme：Steam·blue',
		PureColorps5: ' Theme：Agate·Red',
		PureColorps6: ' Theme：DarkSide·Green',
		PureColorps7: ' Theme：Olive·Green',
		PureColorps8: ' Theme：Mars·Green',
		PureColorps9: ' Theme：Klein·Blue',
		PureColorps10: ' Theme：Let it be·Purple',
		PureColorps11: ' Theme："Pitch·black',
    },
};
const i18n = I18N[window.siyuan.config.lang] || I18N.en_US;

// ==== ①添加顶栏按钮 ====
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
        PureColorToolBar.innerHTML = `<svg t="1740797651161" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4700" width="24" height="24"><path d="m838.10705,601.58105c-72.69236,93.21198 -148.69816,167.82284 -236.68331,236.36867c72.89616,42.09605 243.9216,118.38839 299.3332,62.99109c37.82438,-37.81519 20.44147,-156.10143 -62.64989,-299.35976m-327.21727,177.50572c101.23891,-74.05002 193.91406,-166.70167 267.9319,-267.91504c-73.71188,-100.85685 -166.33595,-193.61065 -267.9319,-267.91555c-101.95247,74.5087 -194.42331,167.36415 -267.98246,267.91555c74.01784,101.26445 166.74355,193.86502 267.98246,267.91504m-90.58452,58.86296c-88.18947,-68.74964 -164.19476,-143.36049 -236.68331,-236.36867c-83.09136,143.25834 -100.47427,261.54458 -62.64989,299.35976c54.90133,54.83647 224.44857,-19.67223 299.3332,-62.99109m-236.68331,-417.18732c72.64128,-93.21249 148.64708,-167.77227 236.68331,-236.36918c-72.79452,-42.09554 -243.87103,-118.43896 -299.3332,-62.99058c-37.82438,37.81468 -20.44147,156.10143 62.64989,299.35976m417.80179,-236.36918c88.18896,68.69907 164.14368,143.30942 236.68331,236.36918c184.43191,-318.06356 44.96102,-399.14652 -236.68331,-236.36918m300.86248,326.77851c277.56574,433.69935 38.99662,667.01048 -391.39644,391.65438c-429.37354,274.69362 -669.93062,43.47209 -391.39593,-391.65438c-275.67994,-430.69289 -43.22794,-669.71201 391.39593,-391.65489c430.24034,-275.25395 669.21706,-42.40149 391.39644,391.65489m-337.05543,-54.17449c29.82095,29.86488 29.82095,78.28031 0,108.0936c-29.87203,29.86488 -78.29972,29.86488 -108.17175,0c-29.87203,-29.81329 -29.87203,-78.22872 0,-108.0936c29.87203,-29.86436 78.29972,-29.86436 108.17175,0" fill="var(--b3-toolbar-color)" p-id="4701"></path></svg>`;
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



// ==== ②设置窗口 ====

let isChecked1;
let isChecked2;
let isChecked3;
let isChecked4;
let isChecked5;
let isChecked6;
let isChecked7;
let isChecked8;
let isChecked9;
let isChecked10;
let isChecked11;
let isChecked12;
let isChecked13;
let isChecked14;

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

	// ==== ②.①创建复选框及标签 ====
    const checkbox1 = document.createElement('input');//垂直页签
    checkbox1.type = 'checkbox';
    checkbox1.id = 'PureColorlverticaltab-checkbox';
    checkbox1.checked = isChecked1;

    const label1 = document.createElement('label');
    label1.htmlFor = 'PureColorlverticaltab-checkbox';
    label1.textContent = i18n.PureColorczyq;
    label1.style.fontSize = '14px';
    label1.style.userSelect= 'none';


    const checkbox2 = document.createElement('input');//子弹线
    checkbox2.type = 'checkbox';
    checkbox2.id = 'PureColorlihelp-checkbox';
    checkbox2.checked = isChecked2;

    const label2 = document.createElement('label');
    label2.htmlFor = 'PureColorlihelp-checkbox';
    label2.textContent = i18n.PureColorlbfzx;
    label2.style.fontSize = '14px';
    label2.style.userSelect= 'none';
	
	
    const checkbox3 = document.createElement('input');//主题配色1
    checkbox3.type = 'checkbox';
    checkbox3.id = 'PureColorsunset-checkbox';
    checkbox3.checked = isChecked3;

    const label3 = document.createElement('label');
    label3.htmlFor = 'PureColorsunset-checkbox';
    label3.textContent = i18n.PureColorxyps;
    label3.style.fontSize = '14px';
    label3.style.userSelect= 'none';


    const checkbox4 = document.createElement('input');//主题配色2
    checkbox4.type = 'checkbox';
    checkbox4.id = 'PureColorforest-checkbox';
    checkbox4.checked = isChecked4;

    const label4 = document.createElement('label');
    label4.htmlFor = 'PureColorforest-checkbox';
    label4.textContent = i18n.PureColorslps;
    label4.style.fontSize = '14px';
    label4.style.userSelect= 'none';

    const checkbox5 = document.createElement('input');//主题配色3
    checkbox5.type = 'checkbox';
    checkbox5.id = 'PureColorocean-checkbox';
    checkbox5.checked = isChecked5;

    const label5 = document.createElement('label');
    label5.htmlFor = 'PureColorocean-checkbox';
    label5.textContent = i18n.PureColorhyps;
    label5.style.fontSize = '14px';
    label5.style.userSelect= 'none';
	
	
	const checkbox6 = document.createElement('input');//主题配色4
    checkbox6.type = 'checkbox';
    checkbox6.id = 'PureColorps4-checkbox';
    checkbox6.checked = isChecked6;

    const label6 = document.createElement('label');
    label6.htmlFor = 'PureColorps4-checkbox';
    label6.textContent = i18n.PureColorps4;
    label6.style.fontSize = '14px';
    label6.style.userSelect= 'none';
	
	const checkbox7 = document.createElement('input');//主题配色5
    checkbox7.type = 'checkbox';
    checkbox7.id = 'PureColorps5-checkbox';
    checkbox7.checked = isChecked7;

    const label7 = document.createElement('label');
    label7.htmlFor = 'PureColorps5-checkbox';
    label7.textContent = i18n.PureColorps5;
    label7.style.fontSize = '14px';
    label7.style.userSelect= 'none';
	
	const checkbox8 = document.createElement('input');//主题配色6
    checkbox8.type = 'checkbox';
    checkbox8.id = 'PureColorps6-checkbox';
    checkbox8.checked = isChecked8;

    const label8 = document.createElement('label');
    label8.htmlFor = 'PureColorps6-checkbox';
    label8.textContent = i18n.PureColorps6;
    label8.style.fontSize = '14px';
    label8.style.userSelect= 'none';
	
	const checkbox9 = document.createElement('input');//主题配色7
    checkbox9.type = 'checkbox';
    checkbox9.id = 'PureColorps7-checkbox';
    checkbox9.checked = isChecked9;

    const label9 = document.createElement('label');
    label9.htmlFor = 'PureColorps7-checkbox';
    label9.textContent = i18n.PureColorps7;
    label9.style.fontSize = '14px';
    label9.style.userSelect= 'none';
	
	const checkbox10 = document.createElement('input');//主题配色8
    checkbox10.type = 'checkbox';
    checkbox10.id = 'PureColorps8-checkbox';
    checkbox10.checked = isChecked10;

    const label10 = document.createElement('label');
    label10.htmlFor = 'PureColorps8-checkbox';
    label10.textContent = i18n.PureColorps8;
    label10.style.fontSize = '14px';
    label10.style.userSelect= 'none';
	
	const checkbox11 = document.createElement('input');//主题配色9
    checkbox11.type = 'checkbox';
    checkbox11.id = 'PureColorps9-checkbox';
    checkbox11.checked = isChecked11;

    const label11 = document.createElement('label');
    label11.htmlFor = 'PureColorps9-checkbox';
    label11.textContent = i18n.PureColorps9;
    label11.style.fontSize = '14px';
    label11.style.userSelect= 'none';
	
	const checkbox12 = document.createElement('input');//主题配色10
    checkbox12.type = 'checkbox';
    checkbox12.id = 'PureColorps10-checkbox';
    checkbox12.checked = isChecked12;

    const label12 = document.createElement('label');
    label12.htmlFor = 'PureColorps10-checkbox';
    label12.textContent = i18n.PureColorps10;
    label12.style.fontSize = '14px';
    label12.style.userSelect= 'none';
	
	const checkbox13 = document.createElement('input');//主题配色11
    checkbox13.type = 'checkbox';
    checkbox13.id = 'PureColorps11-checkbox';
    checkbox13.checked = isChecked13;

    const label13 = document.createElement('label');
    label13.htmlFor = 'PureColorps11-checkbox';
    label13.textContent = i18n.PureColorps11;
    label13.style.fontSize = '14px';
    label13.style.userSelect= 'none';
	
	const checkbox14 = document.createElement('input');//隐藏顶栏
    checkbox14.type = 'checkbox';
    checkbox14.id = 'PureColorycdl-checkbox';
    checkbox14.checked = isChecked14;

    const label14 = document.createElement('label');
    label14.htmlFor = 'PureColorycdl-checkbox';
    label14.textContent = i18n.PureColorycdl;
    label14.style.fontSize = '14px';
    label14.style.userSelect= 'none';
	
	
	
	
	// ==== ②.②将复选框及标签组合 ====
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
	
	const PureColorfunctionpair6 = document.createElement('div');
    PureColorfunctionpair6.className = 'checkbox-label-pair';
    PureColorfunctionpair6.appendChild(checkbox6);
    PureColorfunctionpair6.appendChild(label6);
    PureColorfunctionpair6.style.animation = 'PureColorbounceRight2 0.1s';
	
	const PureColorfunctionpair7 = document.createElement('div');
    PureColorfunctionpair7.className = 'checkbox-label-pair';
    PureColorfunctionpair7.appendChild(checkbox7);
    PureColorfunctionpair7.appendChild(label7);
    PureColorfunctionpair7.style.animation = 'PureColorbounceRight2 0.1s';
	
	const PureColorfunctionpair8 = document.createElement('div');
    PureColorfunctionpair8.className = 'checkbox-label-pair';
    PureColorfunctionpair8.appendChild(checkbox8);
    PureColorfunctionpair8.appendChild(label8);
    PureColorfunctionpair8.style.animation = 'PureColorbounceRight2 0.1s';
	
	const PureColorfunctionpair9 = document.createElement('div');
    PureColorfunctionpair9.className = 'checkbox-label-pair';
    PureColorfunctionpair9.appendChild(checkbox9);
    PureColorfunctionpair9.appendChild(label9);
    PureColorfunctionpair9.style.animation = 'PureColorbounceRight2 0.1s';
	
	const PureColorfunctionpair10 = document.createElement('div');
    PureColorfunctionpair10.className = 'checkbox-label-pair';
    PureColorfunctionpair10.appendChild(checkbox10);
    PureColorfunctionpair10.appendChild(label10);
    PureColorfunctionpair10.style.animation = 'PureColorbounceRight2 0.1s';
	
	const PureColorfunctionpair11 = document.createElement('div');
    PureColorfunctionpair11.className = 'checkbox-label-pair';
    PureColorfunctionpair11.appendChild(checkbox11);
    PureColorfunctionpair11.appendChild(label11);
    PureColorfunctionpair11.style.animation = 'PureColorbounceRight2 0.1s';
	
	const PureColorfunctionpair12 = document.createElement('div');
    PureColorfunctionpair12.className = 'checkbox-label-pair';
    PureColorfunctionpair12.appendChild(checkbox12);
    PureColorfunctionpair12.appendChild(label12);
    PureColorfunctionpair12.style.animation = 'PureColorbounceRight2 0.1s';
	
	const PureColorfunctionpair13 = document.createElement('div');
    PureColorfunctionpair13.className = 'checkbox-label-pair';
    PureColorfunctionpair13.appendChild(checkbox13);
    PureColorfunctionpair13.appendChild(label13);
    PureColorfunctionpair13.style.animation = 'PureColorbounceRight2 0.1s';
	
	const PureColorfunctionpair14 = document.createElement('div');
    PureColorfunctionpair14.className = 'checkbox-label-pair';
    PureColorfunctionpair14.appendChild(checkbox14);
    PureColorfunctionpair14.appendChild(label14);
    PureColorfunctionpair14.style.animation = 'PureColorbounceRight2 0.1s';
	
	

    // ==== ②.③不同类型按钮间设置「分割线」 ====
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



	// ==== ②.④将复选框及标签添加到设置窗口 ====
	settingsWindow.appendChild(PureColorfunctionpair14); //隐藏顶栏
	settingsWindow.appendChild(PureColorfunctionpair1);  //垂直页签
	settingsWindow.appendChild(PureColorfunctionpair2); //列表子弹线
	settingsWindow.appendChild(PureColorfunctionpairdivider1); //以下是主题配色
	settingsWindow.appendChild(PureColorfunctionpair3);
    settingsWindow.appendChild(PureColorfunctionpair4);
    settingsWindow.appendChild(PureColorfunctionpair5);
	settingsWindow.appendChild(PureColorfunctionpair6);
	settingsWindow.appendChild(PureColorfunctionpair7);
	settingsWindow.appendChild(PureColorfunctionpair8);
	settingsWindow.appendChild(PureColorfunctionpair9);
	settingsWindow.appendChild(PureColorfunctionpair10);
	settingsWindow.appendChild(PureColorfunctionpair11);
	settingsWindow.appendChild(PureColorfunctionpair12);
	settingsWindow.appendChild(PureColorfunctionpair13);


// 将设置窗口添加到body
document.body.appendChild(settingsWindow);

// 保存配置到PureColor-dark-config.json
async function saveConfig() {
    const formData = new FormData();
    formData.append('path', '/data/snippets/PureColor-dark-config.json');
    formData.append('isDir', 'false');
    formData.append('modTime', Math.floor(Date.now() / 1000));
    formData.append('file', new Blob([JSON.stringify({
		// ==== ②.⑤按钮确认 ====						  
        isChecked1: checkbox1.checked,
        isChecked2: checkbox2.checked,
        isChecked3: checkbox3.checked,
        isChecked4: checkbox4.checked,
        isChecked5: checkbox5.checked,
		isChecked6: checkbox6.checked,
		isChecked7: checkbox7.checked,
		isChecked8: checkbox8.checked,
		isChecked9: checkbox9.checked,
		isChecked10: checkbox10.checked,
		isChecked11: checkbox11.checked,
		isChecked12: checkbox12.checked,
		isChecked13: checkbox13.checked,
		isChecked14: checkbox14.checked,


    })], { type: 'application/json' }), 'PureColor-dark-config.json');

    return fetch('/api/file/putFile', { method: 'POST', body: formData });
}


// ==== ③.①开关 ====

// 隐藏顶栏开关
checkbox14.addEventListener('change', async function() {
    const state = this.checked;
    state ? enabletoolbarhidden() : disabletoolbarhidden();
    state ? isChecked14 = true : isChecked14 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});



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






// dark1配色开关
checkbox3.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorsunset() : disablePureColorsunset();
    state ? isChecked3 = true : isChecked3 = false;
    if (isChecked4 === true) { checkbox4.click(); }
    if (isChecked5 === true) { checkbox5.click(); }
	if (isChecked6 === true) { checkbox6.click(); }
	if (isChecked7 === true) { checkbox7.click(); }
	if (isChecked8 === true) { checkbox8.click(); }
	if (isChecked9 === true) { checkbox9.click(); }
	if (isChecked10 === true) { checkbox10.click(); }
	if (isChecked11 === true) { checkbox11.click(); }
	if (isChecked12 === true) { checkbox12.click(); }
	if (isChecked13 === true) { checkbox13.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// dark2配色开关
checkbox4.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorforest() : disablePureColorforest();
    state ? isChecked4 = true : isChecked4 = false;
    if (isChecked3 === true) { checkbox3.click(); }
    if (isChecked5 === true) { checkbox5.click(); }
	if (isChecked6 === true) { checkbox6.click(); }
	if (isChecked7 === true) { checkbox7.click(); }
	if (isChecked8 === true) { checkbox8.click(); }
	if (isChecked9 === true) { checkbox9.click(); }
	if (isChecked10 === true) { checkbox10.click(); }
	if (isChecked11 === true) { checkbox11.click(); }
	if (isChecked12 === true) { checkbox12.click(); }
	if (isChecked13 === true) { checkbox13.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// dark3配色开关
checkbox5.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorocean() : disablePureColorocean();
    state ? isChecked5 = true : isChecked5 = false;
    if (isChecked3 === true) { checkbox3.click(); }
    if (isChecked4 === true) { checkbox4.click(); }
	if (isChecked6 === true) { checkbox6.click(); }
	if (isChecked7 === true) { checkbox7.click(); }
	if (isChecked8 === true) { checkbox8.click(); }
	if (isChecked9 === true) { checkbox9.click(); }
	if (isChecked10 === true) { checkbox10.click(); }
	if (isChecked11 === true) { checkbox11.click(); }
	if (isChecked12 === true) { checkbox12.click(); }
	if (isChecked13 === true) { checkbox13.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// dark4配色开关
checkbox6.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorps4() : disablePureColorps4();
    state ? isChecked6 = true : isChecked6 = false;
    if (isChecked3 === true) { checkbox3.click(); }
    if (isChecked4 === true) { checkbox4.click(); }
	if (isChecked5 === true) { checkbox5.click(); }
	if (isChecked7 === true) { checkbox7.click(); }
	if (isChecked8 === true) { checkbox8.click(); }
	if (isChecked9 === true) { checkbox9.click(); }
	if (isChecked10 === true) { checkbox10.click(); }
	if (isChecked11 === true) { checkbox11.click(); }
	if (isChecked12 === true) { checkbox12.click(); }
	if (isChecked13 === true) { checkbox13.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// dark5配色开关
checkbox7.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorps5() : disablePureColorps5();
    state ? isChecked7 = true : isChecked7 = false;
    if (isChecked3 === true) { checkbox3.click(); }
    if (isChecked4 === true) { checkbox4.click(); }
	if (isChecked5 === true) { checkbox5.click(); }
	if (isChecked6 === true) { checkbox6.click(); }
	if (isChecked8 === true) { checkbox8.click(); }
	if (isChecked9 === true) { checkbox9.click(); }
	if (isChecked10 === true) { checkbox10.click(); }
	if (isChecked11 === true) { checkbox11.click(); }
	if (isChecked12 === true) { checkbox12.click(); }
	if (isChecked13 === true) { checkbox13.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// dark6配色开关
checkbox8.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorps6() : disablePureColorps6();
    state ? isChecked8 = true : isChecked8 = false;
    if (isChecked3 === true) { checkbox3.click(); }
    if (isChecked4 === true) { checkbox4.click(); }
	if (isChecked5 === true) { checkbox5.click(); }
	if (isChecked6 === true) { checkbox6.click(); }
	if (isChecked7 === true) { checkbox7.click(); }
	if (isChecked9 === true) { checkbox9.click(); }
	if (isChecked10 === true) { checkbox10.click(); }
	if (isChecked11 === true) { checkbox11.click(); }
	if (isChecked12 === true) { checkbox12.click(); }
	if (isChecked13 === true) { checkbox13.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// dark7配色开关
checkbox9.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorps7() : disablePureColorps7();
    state ? isChecked9 = true : isChecked9 = false;
    if (isChecked3 === true) { checkbox3.click(); }
    if (isChecked4 === true) { checkbox4.click(); }
	if (isChecked5 === true) { checkbox5.click(); }
	if (isChecked6 === true) { checkbox6.click(); }
	if (isChecked7 === true) { checkbox7.click(); }
	if (isChecked8 === true) { checkbox8.click(); }
	if (isChecked10 === true) { checkbox10.click(); }
	if (isChecked11 === true) { checkbox11.click(); }
	if (isChecked12 === true) { checkbox12.click(); }
	if (isChecked13 === true) { checkbox13.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// dark8配色开关
checkbox10.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorps8() : disablePureColorps8();
    state ? isChecked10 = true : isChecked10 = false;
    if (isChecked3 === true) { checkbox3.click(); }
    if (isChecked4 === true) { checkbox4.click(); }
	if (isChecked5 === true) { checkbox5.click(); }
	if (isChecked6 === true) { checkbox6.click(); }
	if (isChecked7 === true) { checkbox7.click(); }
	if (isChecked8 === true) { checkbox8.click(); }
	if (isChecked9 === true) { checkbox9.click(); }
	if (isChecked11 === true) { checkbox11.click(); }
	if (isChecked12 === true) { checkbox12.click(); }
	if (isChecked13 === true) { checkbox13.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// dark9配色开关
checkbox11.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorps9() : disablePureColorps9();
    state ? isChecked11 = true : isChecked11 = false;
    if (isChecked3 === true) { checkbox3.click(); }
    if (isChecked4 === true) { checkbox4.click(); }
	if (isChecked5 === true) { checkbox5.click(); }
	if (isChecked6 === true) { checkbox6.click(); }
	if (isChecked7 === true) { checkbox7.click(); }
	if (isChecked8 === true) { checkbox8.click(); }
	if (isChecked9 === true) { checkbox9.click(); }
	if (isChecked10 === true) { checkbox10.click(); }
	if (isChecked12 === true) { checkbox12.click(); }
	if (isChecked13 === true) { checkbox13.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// dark10配色开关
checkbox12.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorps10() : disablePureColorps10();
    state ? isChecked12 = true : isChecked12 = false;
    if (isChecked3 === true) { checkbox3.click(); }
    if (isChecked4 === true) { checkbox4.click(); }
	if (isChecked5 === true) { checkbox5.click(); }
	if (isChecked6 === true) { checkbox6.click(); }
	if (isChecked7 === true) { checkbox7.click(); }
	if (isChecked8 === true) { checkbox8.click(); }
	if (isChecked9 === true) { checkbox9.click(); }
	if (isChecked10 === true) { checkbox10.click(); }
	if (isChecked11 === true) { checkbox11.click(); }
	if (isChecked13 === true) { checkbox13.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// dark11配色开关
checkbox13.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorps11() : disablePureColorps11();
    state ? isChecked13 = true : isChecked13 = false;
    if (isChecked3 === true) { checkbox3.click(); }
    if (isChecked4 === true) { checkbox4.click(); }
	if (isChecked5 === true) { checkbox5.click(); }
	if (isChecked6 === true) { checkbox6.click(); }
	if (isChecked7 === true) { checkbox7.click(); }
	if (isChecked8 === true) { checkbox8.click(); }
	if (isChecked9 === true) { checkbox9.click(); }
	if (isChecked10 === true) { checkbox10.click(); }
	if (isChecked11 === true) { checkbox11.click(); }
	if (isChecked12 === true) { checkbox12.click(); }
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
    if (!isChecked14) {
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


// 开启dark-1配色
function enablePureColorsunset() {
    let linkElement = document.getElementById("PureColorsunset-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorsunset-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/dark-1.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭dark-1配色
function disablePureColorsunset() {
    const linkElement = document.getElementById("PureColorsunset-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启dark-2配色
function enablePureColorforest() {
    let linkElement = document.getElementById("PureColorforest-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorforest-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/dark-2.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭dark-2配色
function disablePureColorforest() {
    const linkElement = document.getElementById("PureColorforest-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}
// 开启dark-3配色
function enablePureColorocean() {
    let linkElement = document.getElementById("PureColorocean-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorocean-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/dark-3.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭dark-3配色
function disablePureColorocean() {
    const linkElement = document.getElementById("PureColorocean-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开启dark-4配色
function enablePureColorps4() {
    let linkElement = document.getElementById("PureColorps4-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps4-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/dark-4.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭dark-4配色
function disablePureColorps4() {
    const linkElement = document.getElementById("PureColorps4-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开启dark-5配色
function enablePureColorps5() {
    let linkElement = document.getElementById("PureColorps5-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps5-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/dark-5.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭dark-5配色
function disablePureColorps5() {
    const linkElement = document.getElementById("PureColorps5-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开启dark-6配色
function enablePureColorps6() {
    let linkElement = document.getElementById("PureColorps6-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps6-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/dark-6.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭dark-6配色
function disablePureColorps6() {
    const linkElement = document.getElementById("PureColorps6-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开启dark-7配色
function enablePureColorps7() {
    let linkElement = document.getElementById("PureColorps7-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps7-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/dark-7.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭dark-7配色
function disablePureColorps7() {
    const linkElement = document.getElementById("PureColorps7-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开启dark-8配色
function enablePureColorps8() {
    let linkElement = document.getElementById("PureColorps8-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps8-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/dark-8.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭dark-8配色
function disablePureColorps8() {
    const linkElement = document.getElementById("PureColorps8-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开启dark-9配色
function enablePureColorps9() {
    let linkElement = document.getElementById("PureColorps9-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps9-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/dark-9.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭dark-9配色
function disablePureColorps9() {
    const linkElement = document.getElementById("PureColorps9-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   
// 开启dark-10配色
function enablePureColorps10() {
    let linkElement = document.getElementById("PureColorps10-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps10-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/dark-10.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭dark-10配色
function disablePureColorps10() {
    const linkElement = document.getElementById("PureColorps10-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开启dark-11配色
function enablePureColorps11() {
    let linkElement = document.getElementById("PureColorps11-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps11-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/dark-11.css";
        document.head.appendChild(linkElement);
    }
}

// 关闭dark-11配色
function disablePureColorps11() {
    const linkElement = document.getElementById("PureColorps11-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
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


// 读取PureColor-dark-config.json
async function loadAndCheckConfig() {
    try {
        const content = await getFile("/data/snippets/PureColor-dark-config.json");
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
		
		if (config?.isChecked6 === true) {
            enablePureColorps4();
            isChecked6 = true;
        } else if (config?.isChecked6 === false) {
            disablePureColorps4();
            isChecked6 = false;
        }
		
		if (config?.isChecked7 === true) {
            enablePureColorps5();
            isChecked7 = true;
        } else if (config?.isChecked7 === false) {
            disablePureColorps5();
            isChecked7 = false;
        }
		
		if (config?.isChecked8 === true) {
            enablePureColorps6();
            isChecked8 = true;
        } else if (config?.isChecked8 === false) {
            disablePureColorps6();
            isChecked8 = false;
        }
		
		if (config?.isChecked9 === true) {
            enablePureColorps7();
            isChecked9 = true;
        } else if (config?.isChecked9 === false) {
            disablePureColorps7();
            isChecked9 = false;
        }
		
		if (config?.isChecked10 === true) {
            enablePureColorps8();
            isChecked10 = true;
        } else if (config?.isChecked10 === false) {
            disablePureColorps8();
            isChecked10 = false;
        }
		
		if (config?.isChecked11 === true) {
            enablePureColorps9();
            isChecked11 = true;
        } else if (config?.isChecked11 === false) {
            disablePureColorps9();
            isChecked11 = false;
        }
		
		if (config?.isChecked12 === true) {
            enablePureColorps10();
            isChecked12 = true;
        } else if (config?.isChecked12 === false) {
            disablePureColorps10();
            isChecked12 = false;
        }
		
		if (config?.isChecked13 === true) {
            enablePureColorps11();
            isChecked13 = true;
        } else if (config?.isChecked13 === false) {
            disablePureColorps11();
            isChecked13 = false;
        }
		
		if (config?.isChecked14 === true) {
            enabletoolbarhidden();
            isChecked14 = true;
        } else if (config?.isChecked14 === false) {
            disabletoolbarhidden();
            isChecked14 = false;
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