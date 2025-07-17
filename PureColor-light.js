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
		PureColorkpsjm: ' ⏺ 框架：卡片式界面',
		PureColorzjsjm: ' ⏹ 框架：直角式界面',
		PureColorycdl: ' 😇 隐藏顶栏&无框线',
        PureColorczyq: ' 🧱 垂直页签',
        PureColorlbfzx: ' 🔫 列表子弹线',
		PureColordzjms: ' ⌨ 打字机模式',
        PureColorxyps: ' 前卫·灰',
        PureColorslps: ' 原木·黄',
        PureColorhyps: ' 松翠·绿',
		PureColorps4: ' 办公·蓝',
		PureColorps5: ' 湖漪·青',
		PureColorps6: ' 桃夭·粉',
		PureColorps7: ' 暮霞·紫',
		PureColorps8: ' 奔放·红',
		PureColorps9: ' 青柠·绿',
		PureColorps10: ' 生机·绿',
		PureColorps11:' 探索·蓝',
		PureColorjmxgjmcj1:' 三段式界面',
		PureColorjmxgjmcj2:' 纯线框界面',
		PureColorjmxgjmcj3:' 沉淀式界面',
		PureColorjmxgyjh1:' 侧边栏·卡片化',
		PureColorjmxgyjh2:' 编辑器·卡片化',
		PureColorjmxgyjh3:' 🚫施工中',//圆角·页签
		PureColorjmxgyjh4:' 圆角·标题前缀图标',
		PureColorjmxgyjh5:' 🚫施工中',//圆角·行级元素
		PureColorjmxgzjh1:' 🚫施工中',//侧边栏·便签化
		PureColorjmxgzjh2:' 🚫施工中',//编辑器·便签化
		PureColorjmxgzjh3:' 直角·标题前缀图标',
		PureColorjmxgzjh4:' 直角·行级元素',
		PureColorjmxgqcls1:' 多彩·标题/文档树/大纲树',
		PureColorjmxgqcls2:' 🚫施工中',//LED柔光板·标题
		PureColorjmxgqcls3:' 💝旋转灯·引述块',//旋转灯·引述块
		PureColorjmxgqcls4:' 🚫施工中',//光影·编辑器元素
		PureColorjmxgqcls5:' 🚫施工中',//光影台阶
		PureColorjmxgnwh1:' 🚫施工中',//拟物化界面敬请期待
		PureColorgnzqsjyd1:' 文档树/大纲树列表线',
		PureColorztpspscj1:' 寡淡I',
		PureColorztpspscj2:' 鲜艳III',
		PureColorpzhdtjtc1:' 🚫施工中',//黑白调
		PureColorpzhdtjtc2:' 🚫施工中',//三栏界面
		PureColorpzhdtjtc3:' 🚫施工中',//直角大满足
		PureColorpzhdtjtc4:' 🚫施工中',//圆角大满足
		
    },
    en_US: {
        PureColorztsz: ' PureColor Settings',
		PureColorkpsjm: ' ⏺ Framework:Card-based interface',
		PureColorzjsjm: ' ⏹ Framework:Right-angle interface',
		PureColorycdl: ' 😇 Hide Topbar&Frameless',
        PureColorczyq: ' 🧱 Vertical Tabs',
        PureColorlbfzx: ' 🔫 List Bullet Line',
		PureColordzjms: ' ⌨ Type Writer',
        PureColorxyps: ' Avant-garde·Grey',
        PureColorslps: ' Solid wood·Yellow',
        PureColorhyps: ' Turquoise·Green',
		PureColorps4: ' Office·Blue',
		PureColorps5: ' Lake Ripples·Azure',
		PureColorps6: ' Peach Blossom·Pink',
		PureColorps7: ' Twilight Haze·Purple',
		PureColorps8: ' Exuberant·Red',
		PureColorps9: ' Lemon·Green',
		PureColorps10: ' Vitality·Green',
		PureColorps11:' Seek·Blue',
		PureColorjmxgjmcj1: ' Three-panel interface',
		PureColorjmxgjmcj2: ' Pure wireframe interface',
		PureColorjmxgjmcj3: ' Sedimentation-style interface',
		PureColorjmxgyjh1: ' Sidebar · Card-style',
		PureColorjmxgyjh2: ' Editor · Card-style',
		PureColorjmxgyjh3: ' Rounded corners · Tabs',
		PureColorjmxgyjh4: ' Rounded corners · Title prefix icon',
		PureColorjmxgyjh5: ' Rounded corners · Editor elements',
		PureColorjmxgzjh1: ' Sidebar · Note-style',
		PureColorjmxgzjh2: ' Editor · Note-style',
		PureColorjmxgzjh3: ' Square corners · Title prefix icon',
		PureColorjmxgzjh4: ' Square corners · Editor elements',
		PureColorjmxgqcls1: ' Multicolor · Titles/Document tree/Outline tree',
		PureColorjmxgqcls2: ' LED light panel · Titles',
		PureColorjmxgqcls3: ' Rotating light · Blockquotes',
		PureColorjmxgqcls4: ' Light and shadow · Editor elements',
		PureColorjmxgqcls5: ' Light and shadow steps',
		PureColorjmxgnwh1: ' Skeuomorphic interface',
		PureColorgnzqsjyd1: ' Document tree/Outline tree list lines',
		PureColorztpspscj1: ' Subtle I',
		PureColorztpspscj2: ' Vibrant III',
		PureColorpzhdtjtc1: ' Monochrome theme',
		PureColorpzhdtjtc2: ' Three-column interface',
		PureColorpzhdtjtc3: ' Square corner delight',
		PureColorpzhdtjtc4: ' Rounded corner delight',
    },
};
const i18n = I18N[window.siyuan.config.lang] || I18N.en_US;

// ==== ①添加顶栏「主题设置」按钮 ====
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



	// 添加创建二级菜单的函数
function createSubMenu(items, title) {
    const subMenuContainer = document.createElement('div');
    subMenuContainer.className = 'submenu-container';
    subMenuContainer.style.position = 'relative';
    
    // 创建主菜单项
    const subMenuTrigger = document.createElement('div');
    subMenuTrigger.className = 'submenu-trigger';
    subMenuTrigger.textContent = title;

    
    // 添加箭头图标
    const arrowIcon = document.createElement('span');
			arrowIcon.innerHTML = `
		  <svg class="icon" aria-hidden="true">
			<use xlink:href="#iconRight"></use>
		  </svg>
		`;
		// 设置SVG图标的大小
		arrowIcon.querySelector('svg').style.width = '12px';
		arrowIcon.querySelector('svg').style.height = '12px';
    arrowIcon.style.fontSize = '10px';
    arrowIcon.style.marginLeft = '8px';
    arrowIcon.style.transition = 'transform 0.2s';
    subMenuTrigger.appendChild(arrowIcon);
    
    // 创建子菜单容器（二级菜单，样式在css里调整）
    const subMenu = document.createElement('div');
    subMenu.className = 'submenu';

    
    // 添加所有子菜单项
    items.forEach(item => {
        subMenu.appendChild(item);
    });
    
    // 鼠标悬停事件
    subMenuTrigger.addEventListener('mouseenter', () => {
        subMenu.style.display = 'block';
        arrowIcon.style.transform = 'rotate(90deg)';
    });
    
    subMenuContainer.addEventListener('mouseleave', () => {
        subMenu.style.display = 'none';
        arrowIcon.style.transform = 'rotate(0deg)';
    });
    
    subMenuContainer.appendChild(subMenuTrigger);
    subMenuContainer.appendChild(subMenu);
    
    return subMenuContainer;
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
let isChecked15;
let isChecked16;
let isChecked17;
let isChecked18;
let isChecked19;
let isChecked20;
let isChecked21;
let isChecked22;
let isChecked23;
let isChecked24;
let isChecked25;
let isChecked26;
let isChecked27;
let isChecked28;
let isChecked29;
let isChecked30;
let isChecked31;
let isChecked32;
let isChecked33;
let isChecked34;
let isChecked35;
let isChecked36;
let isChecked37;
let isChecked38;
let isChecked40;
let isChecked41;
let isChecked42;
let isChecked43;


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
    checkbox2.id = 'PureColorlbzdx-checkbox';
    checkbox2.checked = isChecked2;

    const label2 = document.createElement('label');
    label2.htmlFor = 'PureColorlbzdx-checkbox';
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
	label3.style.backgroundColor  = 'rgba(239, 241, 245)';


    const checkbox4 = document.createElement('input');//主题配色2
    checkbox4.type = 'checkbox';
    checkbox4.id = 'PureColorforest-checkbox';
    checkbox4.checked = isChecked4;

    const label4 = document.createElement('label');
    label4.htmlFor = 'PureColorforest-checkbox';
    label4.textContent = i18n.PureColorslps;
    label4.style.fontSize = '14px';
    label4.style.userSelect= 'none';
	label4.style.backgroundColor  = 'rgba(254, 238, 203)';

    const checkbox5 = document.createElement('input');//主题配色3
    checkbox5.type = 'checkbox';
    checkbox5.id = 'PureColorocean-checkbox';
    checkbox5.checked = isChecked5;

    const label5 = document.createElement('label');
    label5.htmlFor = 'PureColorocean-checkbox';
    label5.textContent = i18n.PureColorhyps;
    label5.style.fontSize = '14px';
    label5.style.userSelect= 'none';
	label5.style.backgroundColor  = 'rgba(191, 238, 226)';
	
    const checkbox6 = document.createElement('input');//主题配色4
    checkbox6.type = 'checkbox';
    checkbox6.id = 'PureColorps4-checkbox';
    checkbox6.checked = isChecked6;

    const label6 = document.createElement('label');
    label6.htmlFor = 'PureColorps4-checkbox';
    label6.textContent = i18n.PureColorps4;
    label6.style.fontSize = '14px';
    label6.style.userSelect= 'none';
	label6.style.backgroundColor  = 'rgba(184, 216, 255)';
	
    const checkbox7 = document.createElement('input');//主题配色5
    checkbox7.type = 'checkbox';
    checkbox7.id = 'PureColorps5-checkbox';
    checkbox7.checked = isChecked7;

    const label7 = document.createElement('label');
    label7.htmlFor = 'PureColorps5-checkbox';
    label7.textContent = i18n.PureColorps5;
    label7.style.fontSize = '14px';
    label7.style.userSelect= 'none';
	label7.style.backgroundColor  = 'rgba(195, 233, 235)';
	
	const checkbox8 = document.createElement('input');//主题配色6
    checkbox8.type = 'checkbox';
    checkbox8.id = 'PureColorps6-checkbox';
    checkbox8.checked = isChecked8;

    const label8 = document.createElement('label');
    label8.htmlFor = 'PureColorps6-checkbox';
    label8.textContent = i18n.PureColorps6;
    label8.style.fontSize = '14px';
    label8.style.userSelect= 'none';
	label8.style.backgroundColor  = 'rgba(253, 202, 216)';
	
	const checkbox9 = document.createElement('input');//主题配色7
    checkbox9.type = 'checkbox';
    checkbox9.id = 'PureColorps7-checkbox';
    checkbox9.checked = isChecked9;

    const label9 = document.createElement('label');
    label9.htmlFor = 'PureColorps7-checkbox';
    label9.textContent = i18n.PureColorps7;
    label9.style.fontSize = '14px';
    label9.style.userSelect= 'none';
	label9.style.backgroundColor  = 'rgba(219, 197, 245)';
	
	const checkbox10 = document.createElement('input');//主题配色8
    checkbox10.type = 'checkbox';
    checkbox10.id = 'PureColorps8-checkbox';
    checkbox10.checked = isChecked10;

    const label10 = document.createElement('label');
    label10.htmlFor = 'PureColorps8-checkbox';
    label10.textContent = i18n.PureColorps8;
    label10.style.fontSize = '14px';
    label10.style.userSelect= 'none';
	label10.style.backgroundColor  = 'rgba(253, 195, 197)';
	
	const checkbox11 = document.createElement('input');//主题配色9
    checkbox11.type = 'checkbox';
    checkbox11.id = 'PureColorps9-checkbox';
    checkbox11.checked = isChecked11;

    const label11 = document.createElement('label');
    label11.htmlFor = 'PureColorps9-checkbox';
    label11.textContent = i18n.PureColorps9;
    label11.style.fontSize = '14px';
    label11.style.userSelect= 'none';
	label11.style.backgroundColor  = 'rgba(232, 247, 183)';
	
	const checkbox12 = document.createElement('input');//主题配色10
    checkbox12.type = 'checkbox';
    checkbox12.id = 'PureColorps10-checkbox';
    checkbox12.checked = isChecked12;

    const label12 = document.createElement('label');
    label12.htmlFor = 'PureColorps10-checkbox';
    label12.textContent = i18n.PureColorps10;
    label12.style.fontSize = '14px';
    label12.style.userSelect= 'none';
	label12.style.backgroundColor  = 'rgba(210, 242, 190)';
	
	const checkbox13 = document.createElement('input');//打字机模式
    checkbox13.type = 'checkbox';
    checkbox13.id = 'PureColordzjms-checkbox';
    checkbox13.checked = isChecked13;

    const label13 = document.createElement('label');
    label13.htmlFor = 'PureColordzjms-checkbox';
    label13.textContent = i18n.PureColordzjms;
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
	
	const checkbox15 = document.createElement('input');//卡片式界面
    checkbox15.type = 'checkbox';
    checkbox15.id = 'PureColorkpsjm-checkbox';
    checkbox15.checked = isChecked15;

    const label15 = document.createElement('label');
    label15.htmlFor = 'PureColorkpsjm-checkbox';
    label15.textContent = i18n.PureColorkpsjm;
    label15.style.fontSize = '14px';
    label15.style.userSelect= 'none';
	
	const checkbox16 = document.createElement('input');//直角式界面
    checkbox16.type = 'checkbox';
    checkbox16.id = 'PureColorzjsjm-checkbox';
    checkbox16.checked = isChecked16;

    const label16 = document.createElement('label');
    label16.htmlFor = 'PureColorzjsjm-checkbox';
    label16.textContent = i18n.PureColorzjsjm;
    label16.style.fontSize = '14px';
    label16.style.userSelect= 'none';
	
	const checkbox17 = document.createElement('input');//主题配色11
    checkbox17.type = 'checkbox';
    checkbox17.id = 'PureColorps11-checkbox';
    checkbox17.checked = isChecked17;

    const label17 = document.createElement('label');
    label17.htmlFor = 'PureColorps11-checkbox';
    label17.textContent = i18n.PureColorps11;
    label17.style.fontSize = '14px';
    label17.style.userSelect= 'none';
	label17.style.backgroundColor  = 'rgba(133, 165, 255)';
	
	const checkbox18 = document.createElement('input');//三段式界面
    checkbox18.type = 'checkbox';
    checkbox18.id = 'PureColorjmxgjmcj1-checkbox';
    checkbox18.checked = isChecked18;

    const label18 = document.createElement('label');
    label18.htmlFor = 'PureColorjmxgjmcj1-checkbox';
    label18.textContent = i18n.PureColorjmxgjmcj1;
    label18.style.fontSize = '14px';
    label18.style.userSelect= 'none';
	
	const checkbox19 = document.createElement('input');//纯线框界面
    checkbox19.type = 'checkbox';
    checkbox19.id = 'PureColorjmxgjmcj2-checkbox';
    checkbox19.checked = isChecked19;

    const label19 = document.createElement('label');
    label19.htmlFor = 'PureColorjmxgjmcj2-checkbox';
    label19.textContent = i18n.PureColorjmxgjmcj2;
    label19.style.fontSize = '14px';
    label19.style.userSelect= 'none';
	
	const checkbox20 = document.createElement('input');//沉淀式界面
    checkbox20.type = 'checkbox';
    checkbox20.id = 'PureColorjmxgjmcj3-checkbox';
    checkbox20.checked = isChecked20;

    const label20 = document.createElement('label');
    label20.htmlFor = 'PureColorjmxgjmcj3-checkbox';
    label20.textContent = i18n.PureColorjmxgjmcj3;
    label20.style.fontSize = '14px';
    label20.style.userSelect= 'none';
	
	const checkbox21 = document.createElement('input');//侧边栏·卡片化
    checkbox21.type = 'checkbox';
    checkbox21.id = 'PureColorjmxgyjh1-checkbox';
    checkbox21.checked = isChecked21;

    const label21 = document.createElement('label');
    label21.htmlFor = 'PureColorjmxgyjh1-checkbox';
    label21.textContent = i18n.PureColorjmxgyjh1;
    label21.style.fontSize = '14px';
    label21.style.userSelect= 'none';
	
	const checkbox22 = document.createElement('input');//编辑器·卡片化
    checkbox22.type = 'checkbox';
    checkbox22.id = 'PureColorjmxgyjh2-checkbox';
    checkbox22.checked = isChecked22;

    const label22 = document.createElement('label');
    label22.htmlFor = 'PureColorjmxgyjh2-checkbox';
    label22.textContent = i18n.PureColorjmxgyjh2;
    label22.style.fontSize = '14px';
    label22.style.userSelect= 'none';
	
	const checkbox23 = document.createElement('input');//圆角·页签
    checkbox23.type = 'checkbox';
    checkbox23.id = 'PureColorjmxgyjh3-checkbox';
    checkbox23.checked = isChecked23;

    const label23 = document.createElement('label');
    label23.htmlFor = 'PureColorjmxgyjh3-checkbox';
    label23.textContent = i18n.PureColorjmxgyjh3;
    label23.style.fontSize = '14px';
    label23.style.userSelect= 'none';
	
	const checkbox24 = document.createElement('input');//圆角·标题前缀图标
    checkbox24.type = 'checkbox';
    checkbox24.id = 'PureColorjmxgyjh4-checkbox';
    checkbox24.checked = isChecked24;

    const label24 = document.createElement('label');
    label24.htmlFor = 'PureColorjmxgyjh4-checkbox';
    label24.textContent = i18n.PureColorjmxgyjh4;
    label24.style.fontSize = '14px';
    label24.style.userSelect= 'none';
	
	const checkbox25 = document.createElement('input');//圆角·编辑器元素
    checkbox25.type = 'checkbox';
    checkbox25.id = 'PureColorjmxgyjh5-checkbox';
    checkbox25.checked = isChecked25;

    const label25 = document.createElement('label');
    label25.htmlFor = 'PureColorjmxgyjh5-checkbox';
    label25.textContent = i18n.PureColorjmxgyjh5;
    label25.style.fontSize = '14px';
    label25.style.userSelect= 'none';
	
	const checkbox26 = document.createElement('input');//侧边栏·便签化
    checkbox26.type = 'checkbox';
    checkbox26.id = 'PureColorjmxgzjh1-checkbox';
    checkbox26.checked = isChecked26;

    const label26 = document.createElement('label');
    label26.htmlFor = 'PureColorjmxgzjh1-checkbox';
    label26.textContent = i18n.PureColorjmxgzjh1;
    label26.style.fontSize = '14px';
    label26.style.userSelect= 'none';
	
	const checkbox27 = document.createElement('input');//'编辑器·便签化
    checkbox27.type = 'checkbox';
    checkbox27.id = 'PureColorjmxgzjh2-checkbox';
    checkbox27.checked = isChecked27;

    const label27 = document.createElement('label');
    label27.htmlFor = 'PureColorjmxgzjh2-checkbox';
    label27.textContent = i18n.PureColorjmxgzjh2;
    label27.style.fontSize = '14px';
    label27.style.userSelect= 'none';
	
	const checkbox28 = document.createElement('input');//'直角·标题前缀图标
    checkbox28.type = 'checkbox';
    checkbox28.id = 'PureColorjmxgzjh3-checkbox';
    checkbox28.checked = isChecked28;

    const label28 = document.createElement('label');
    label28.htmlFor = 'PureColorjmxgzjh3-checkbox';
    label28.textContent = i18n.PureColorjmxgzjh3;
    label28.style.fontSize = '14px';
    label28.style.userSelect= 'none';
	
	const checkbox29 = document.createElement('input');//'直角·编辑器元素
    checkbox29.type = 'checkbox';
    checkbox29.id = 'PureColorjmxgzjh4-checkbox';
    checkbox29.checked = isChecked29;

    const label29 = document.createElement('label');
    label29.htmlFor = 'PureColorjmxgzjh4-checkbox';
    label29.textContent = i18n.PureColorjmxgzjh4;
    label29.style.fontSize = '14px';
    label29.style.userSelect= 'none';
	
	const checkbox30 = document.createElement('input');//'多彩·标题/文档树/大纲树
    checkbox30.type = 'checkbox';
    checkbox30.id = 'PureColorjmxgqcls1-checkbox';
    checkbox30.checked = isChecked30;

    const label30 = document.createElement('label');
    label30.htmlFor = 'PureColorjmxgqcls1-checkbox';
    label30.textContent = i18n.PureColorjmxgqcls1;
    label30.style.fontSize = '14px';
    label30.style.userSelect= 'none';
	
	const checkbox31 = document.createElement('input');//'LED柔光板·标题
    checkbox31.type = 'checkbox';
    checkbox31.id = 'PureColorjmxgqcls2-checkbox';
    checkbox31.checked = isChecked31;

    const label31 = document.createElement('label');
    label31.htmlFor = 'PureColorjmxgqcls2-checkbox';
    label31.textContent = i18n.PureColorjmxgqcls2;
    label31.style.fontSize = '14px';
    label31.style.userSelect= 'none';
	
	const checkbox32 = document.createElement('input');//'旋转灯·引述块
    checkbox32.type = 'checkbox';
    checkbox32.id = 'PureColorjmxgqcls3-checkbox';
    checkbox32.checked = isChecked32;

    const label32 = document.createElement('label');
    label32.htmlFor = 'PureColorjmxgqcls3-checkbox';
    label32.textContent = i18n.PureColorjmxgqcls3;
    label32.style.fontSize = '14px';
    label32.style.userSelect= 'none';
	
	const checkbox33 = document.createElement('input');//'光影·编辑器元素
    checkbox33.type = 'checkbox';
    checkbox33.id = 'PureColorjmxgqcls4-checkbox';
    checkbox33.checked = isChecked33;

    const label33 = document.createElement('label');
    label33.htmlFor = 'PureColorjmxgqcls4-checkbox';
    label33.textContent = i18n.PureColorjmxgqcls4;
    label33.style.fontSize = '14px';
    label33.style.userSelect= 'none';
	
	const checkbox34 = document.createElement('input');//'光影台阶
    checkbox34.type = 'checkbox';
    checkbox34.id = 'PureColorjmxgqcls5-checkbox';
    checkbox34.checked = isChecked34;

    const label34 = document.createElement('label');
    label34.htmlFor = 'PureColorjmxgqcls5-checkbox';
    label34.textContent = i18n.PureColorjmxgqcls5;
    label34.style.fontSize = '14px';
    label34.style.userSelect= 'none';
	
	const checkbox35 = document.createElement('input');//'拟物化界面
    checkbox35.type = 'checkbox';
    checkbox35.id = 'PureColorjmxgnwh1-checkbox';
    checkbox35.checked = isChecked35;

    const label35 = document.createElement('label');
    label35.htmlFor = 'PureColorjmxgnwh1-checkbox';
    label35.textContent = i18n.PureColorjmxgnwh1;
    label35.style.fontSize = '14px';
    label35.style.userSelect= 'none';
	
	const checkbox36 = document.createElement('input');//'文档树/大纲树列表线
    checkbox36.type = 'checkbox';
    checkbox36.id = 'PureColorgnzqsjyd1-checkbox';
    checkbox36.checked = isChecked36;

    const label36 = document.createElement('label');
    label36.htmlFor = 'PureColorgnzqsjyd1-checkbox';
    label36.textContent = i18n.PureColorgnzqsjyd1;
    label36.style.fontSize = '14px';
    label36.style.userSelect= 'none';
	
	const checkbox37 = document.createElement('input');//'寡淡I
    checkbox37.type = 'checkbox';
    checkbox37.id = 'PureColorztpspscj1-checkbox';
    checkbox37.checked = isChecked37;

    const label37 = document.createElement('label');
    label37.htmlFor = 'PureColorztpspscj1-checkbox';
    label37.textContent = i18n.PureColorztpspscj1;
    label37.style.fontSize = '14px';
    label37.style.userSelect= 'none';
	
	const checkbox38 = document.createElement('input');//'鲜艳II
    checkbox38.type = 'checkbox';
    checkbox38.id = 'PureColorztpspscj2-checkbox';
    checkbox38.checked = isChecked38;

    const label38 = document.createElement('label');
    label38.htmlFor = 'PureColorztpspscj2-checkbox';
    label38.textContent = i18n.PureColorztpspscj2;
    label38.style.fontSize = '14px';
    label38.style.userSelect= 'none';
	
	
	const checkbox40 = document.createElement('input');//'黑白调
    checkbox40.type = 'checkbox';
    checkbox40.id = 'PureColorpzhdtjtc1-checkbox';
    checkbox40.checked = isChecked40;

    const label40 = document.createElement('label');
    label40.htmlFor = 'PureColorpzhdtjtc1-checkbox';
    label40.textContent = i18n.PureColorpzhdtjtc1;
    label40.style.fontSize = '14px';
    label40.style.userSelect= 'none';
	
	const checkbox41 = document.createElement('input');//'三栏界面
    checkbox41.type = 'checkbox';
    checkbox41.id = 'PureColorpzhdtjtc2-checkbox';
    checkbox41.checked = isChecked41;

    const label41 = document.createElement('label');
    label41.htmlFor = 'PureColorpzhdtjtc2-checkbox';
    label41.textContent = i18n.PureColorpzhdtjtc2;
    label41.style.fontSize = '14px';
    label41.style.userSelect= 'none';
	
	const checkbox42 = document.createElement('input');//'直角大满足
    checkbox42.type = 'checkbox';
    checkbox42.id = 'PureColorpzhdtjtc3-checkbox';
    checkbox42.checked = isChecked42;

    const label42 = document.createElement('label');
    label42.htmlFor = 'PureColorpzhdtjtc3-checkbox';
    label42.textContent = i18n.PureColorpzhdtjtc3;
    label42.style.fontSize = '14px';
    label42.style.userSelect= 'none';
	
	const checkbox43 = document.createElement('input');//'圆角大满足
    checkbox43.type = 'checkbox';
    checkbox43.id = 'PureColorpzhdtjtc4-checkbox';
    checkbox43.checked = isChecked43;

    const label43 = document.createElement('label');
    label43.htmlFor = 'PureColorpzhdtjtc4-checkbox';
    label43.textContent = i18n.PureColorpzhdtjtc4;
    label43.style.fontSize = '14px';
    label43.style.userSelect= 'none';




	
		// 美化：为所有 checkbox-label-pair 添加统一的间距样式
    const checkboxLabelStyle = `
        padding: 4px 8px;  // 上下间距从默认增加到6px
        border-radius:var(--b3-border-radius);
		transition: background-color 0.2s;  // 添加悬停效果
    `;
    const hoverStyle = `
        &:hover {
            background-color: var(--b3-menu-item-background-light);
        }
    `;
	
		// 修改：更新所有 PureColorfunctionpair 的样式
    const updatePairStyle = (pairElement) => {
        pairElement.style.cssText = checkboxLabelStyle;
        pairElement.addEventListener('mouseenter', () => {
            pairElement.style.backgroundColor = 'var(--b3-menu-item-background-light)';
        });
        pairElement.addEventListener('mouseleave', () => {
            pairElement.style.backgroundColor = '';
        });
    };
	

	
	
	
    // ==== ②.②将复选框及标签组合 ====
    const PureColorfunctionpair1 = document.createElement('div');
    PureColorfunctionpair1.className = 'checkbox-label-pair';
    PureColorfunctionpair1.appendChild(checkbox1);
    PureColorfunctionpair1.appendChild(label1);
	updatePairStyle(PureColorfunctionpair1);

    const PureColorfunctionpair2 = document.createElement('div');
    PureColorfunctionpair2.className = 'checkbox-label-pair';
    PureColorfunctionpair2.appendChild(checkbox2);
    PureColorfunctionpair2.appendChild(label2);
    updatePairStyle(PureColorfunctionpair2);

    const PureColorfunctionpair3 = document.createElement('div');
    PureColorfunctionpair3.className = 'checkbox-label-pair';
    PureColorfunctionpair3.appendChild(checkbox3);
    PureColorfunctionpair3.appendChild(label3);
    updatePairStyle(PureColorfunctionpair3);

    const PureColorfunctionpair4 = document.createElement('div');
    PureColorfunctionpair4.className = 'checkbox-label-pair';
    PureColorfunctionpair4.appendChild(checkbox4);
    PureColorfunctionpair4.appendChild(label4);
    updatePairStyle(PureColorfunctionpair4);

    const PureColorfunctionpair5 = document.createElement('div');
    PureColorfunctionpair5.className = 'checkbox-label-pair';
    PureColorfunctionpair5.appendChild(checkbox5);
    PureColorfunctionpair5.appendChild(label5);
    updatePairStyle(PureColorfunctionpair5);
	
	const PureColorfunctionpair6 = document.createElement('div');
    PureColorfunctionpair6.className = 'checkbox-label-pair';
    PureColorfunctionpair6.appendChild(checkbox6);
    PureColorfunctionpair6.appendChild(label6);
    updatePairStyle(PureColorfunctionpair6);

	const PureColorfunctionpair7 = document.createElement('div');
    PureColorfunctionpair7.className = 'checkbox-label-pair';
    PureColorfunctionpair7.appendChild(checkbox7);
    PureColorfunctionpair7.appendChild(label7);
    updatePairStyle(PureColorfunctionpair7);
	
	const PureColorfunctionpair8 = document.createElement('div');
    PureColorfunctionpair8.className = 'checkbox-label-pair';
    PureColorfunctionpair8.appendChild(checkbox8);
    PureColorfunctionpair8.appendChild(label8);
	updatePairStyle(PureColorfunctionpair8);

	const PureColorfunctionpair9 = document.createElement('div');
    PureColorfunctionpair9.className = 'checkbox-label-pair';
    PureColorfunctionpair9.appendChild(checkbox9);
    PureColorfunctionpair9.appendChild(label9);
	updatePairStyle(PureColorfunctionpair9);
	
	const PureColorfunctionpair10 = document.createElement('div');
    PureColorfunctionpair10.className = 'checkbox-label-pair';
    PureColorfunctionpair10.appendChild(checkbox10);
    PureColorfunctionpair10.appendChild(label10);
	updatePairStyle(PureColorfunctionpair10);
	
	const PureColorfunctionpair11 = document.createElement('div');
    PureColorfunctionpair11.className = 'checkbox-label-pair';
    PureColorfunctionpair11.appendChild(checkbox11);
    PureColorfunctionpair11.appendChild(label11);
	updatePairStyle(PureColorfunctionpair11);
	
	const PureColorfunctionpair12 = document.createElement('div');
    PureColorfunctionpair12.className = 'checkbox-label-pair';
    PureColorfunctionpair12.appendChild(checkbox12);
    PureColorfunctionpair12.appendChild(label12);
	updatePairStyle(PureColorfunctionpair12);
	
	const PureColorfunctionpair13 = document.createElement('div');
    PureColorfunctionpair13.className = 'checkbox-label-pair';
    PureColorfunctionpair13.appendChild(checkbox13);
    PureColorfunctionpair13.appendChild(label13);
	updatePairStyle(PureColorfunctionpair13);
	
	const PureColorfunctionpair14 = document.createElement('div');
    PureColorfunctionpair14.className = 'checkbox-label-pair';
    PureColorfunctionpair14.appendChild(checkbox14);
    PureColorfunctionpair14.appendChild(label14);
	updatePairStyle(PureColorfunctionpair14);
	
	const PureColorfunctionpair15 = document.createElement('div');
    PureColorfunctionpair15.className = 'checkbox-label-pair';
    PureColorfunctionpair15.appendChild(checkbox15);
    PureColorfunctionpair15.appendChild(label15);
	updatePairStyle(PureColorfunctionpair15);
	
	const PureColorfunctionpair16 = document.createElement('div');
    PureColorfunctionpair16.className = 'checkbox-label-pair';
    PureColorfunctionpair16.appendChild(checkbox16);
    PureColorfunctionpair16.appendChild(label16);
	updatePairStyle(PureColorfunctionpair16);
	
	const PureColorfunctionpair17 = document.createElement('div');
    PureColorfunctionpair17.className = 'checkbox-label-pair';
    PureColorfunctionpair17.appendChild(checkbox17);
    PureColorfunctionpair17.appendChild(label17);
	updatePairStyle(PureColorfunctionpair17);
	
	const PureColorfunctionpair18 = document.createElement('div');
    PureColorfunctionpair18.className = 'checkbox-label-pair';
    PureColorfunctionpair18.appendChild(checkbox18);
    PureColorfunctionpair18.appendChild(label18);
	updatePairStyle(PureColorfunctionpair18);
	
	const PureColorfunctionpair19 = document.createElement('div');
    PureColorfunctionpair19.className = 'checkbox-label-pair';
    PureColorfunctionpair19.appendChild(checkbox19);
    PureColorfunctionpair19.appendChild(label19);
    updatePairStyle(PureColorfunctionpair19);


	const PureColorfunctionpair20 = document.createElement('div');
    PureColorfunctionpair20.className = 'checkbox-label-pair';
    PureColorfunctionpair20.appendChild(checkbox20);
    PureColorfunctionpair20.appendChild(label20);
    updatePairStyle(PureColorfunctionpair20);


	const PureColorfunctionpair21 = document.createElement('div');
    PureColorfunctionpair21.className = 'checkbox-label-pair';
    PureColorfunctionpair21.appendChild(checkbox21);
    PureColorfunctionpair21.appendChild(label21);
    updatePairStyle(PureColorfunctionpair21);


const PureColorfunctionpair22 = document.createElement('div');
    PureColorfunctionpair22.className = 'checkbox-label-pair';
    PureColorfunctionpair22.appendChild(checkbox22);
    PureColorfunctionpair22.appendChild(label22);
    updatePairStyle(PureColorfunctionpair22);


const PureColorfunctionpair23 = document.createElement('div');
    PureColorfunctionpair23.className = 'checkbox-label-pair';
    PureColorfunctionpair23.appendChild(checkbox23);
    PureColorfunctionpair23.appendChild(label23);
    updatePairStyle(PureColorfunctionpair23);


const PureColorfunctionpair24 = document.createElement('div');
    PureColorfunctionpair24.className = 'checkbox-label-pair';
    PureColorfunctionpair24.appendChild(checkbox24);
    PureColorfunctionpair24.appendChild(label24);
    updatePairStyle(PureColorfunctionpair24);


const PureColorfunctionpair25 = document.createElement('div');
    PureColorfunctionpair25.className = 'checkbox-label-pair';
    PureColorfunctionpair25.appendChild(checkbox25);
    PureColorfunctionpair25.appendChild(label25);
    updatePairStyle(PureColorfunctionpair25);


const PureColorfunctionpair26 = document.createElement('div');
    PureColorfunctionpair26.className = 'checkbox-label-pair';
    PureColorfunctionpair26.appendChild(checkbox26);
    PureColorfunctionpair26.appendChild(label26);
    updatePairStyle(PureColorfunctionpair26);


const PureColorfunctionpair27 = document.createElement('div');
    PureColorfunctionpair27.className = 'checkbox-label-pair';
    PureColorfunctionpair27.appendChild(checkbox27);
    PureColorfunctionpair27.appendChild(label27);
    updatePairStyle(PureColorfunctionpair27);


const PureColorfunctionpair28 = document.createElement('div');
    PureColorfunctionpair28.className = 'checkbox-label-pair';
    PureColorfunctionpair28.appendChild(checkbox28);
    PureColorfunctionpair28.appendChild(label28);
    updatePairStyle(PureColorfunctionpair28);


const PureColorfunctionpair29 = document.createElement('div');
    PureColorfunctionpair29.className = 'checkbox-label-pair';
    PureColorfunctionpair29.appendChild(checkbox29);
    PureColorfunctionpair29.appendChild(label29);
    updatePairStyle(PureColorfunctionpair29);


const PureColorfunctionpair30 = document.createElement('div');
    PureColorfunctionpair30.className = 'checkbox-label-pair';
    PureColorfunctionpair30.appendChild(checkbox30);
    PureColorfunctionpair30.appendChild(label30);
    updatePairStyle(PureColorfunctionpair30);


const PureColorfunctionpair31 = document.createElement('div');
    PureColorfunctionpair31.className = 'checkbox-label-pair';
    PureColorfunctionpair31.appendChild(checkbox31);
    PureColorfunctionpair31.appendChild(label31);
    updatePairStyle(PureColorfunctionpair31);


const PureColorfunctionpair32 = document.createElement('div');
    PureColorfunctionpair32.className = 'checkbox-label-pair';
    PureColorfunctionpair32.appendChild(checkbox32);
    PureColorfunctionpair32.appendChild(label32);
    updatePairStyle(PureColorfunctionpair32);


const PureColorfunctionpair33 = document.createElement('div');
    PureColorfunctionpair33.className = 'checkbox-label-pair';
    PureColorfunctionpair33.appendChild(checkbox33);
    PureColorfunctionpair33.appendChild(label33);
    updatePairStyle(PureColorfunctionpair33);


const PureColorfunctionpair34 = document.createElement('div');
    PureColorfunctionpair34.className = 'checkbox-label-pair';
    PureColorfunctionpair34.appendChild(checkbox34);
    PureColorfunctionpair34.appendChild(label34);
    updatePairStyle(PureColorfunctionpair34);


const PureColorfunctionpair35 = document.createElement('div');
    PureColorfunctionpair35.className = 'checkbox-label-pair';
    PureColorfunctionpair35.appendChild(checkbox35);
    PureColorfunctionpair35.appendChild(label35);
    updatePairStyle(PureColorfunctionpair35);


const PureColorfunctionpair36 = document.createElement('div');
    PureColorfunctionpair36.className = 'checkbox-label-pair';
    PureColorfunctionpair36.appendChild(checkbox36);
    PureColorfunctionpair36.appendChild(label36);
    updatePairStyle(PureColorfunctionpair36);


const PureColorfunctionpair37 = document.createElement('div');
    PureColorfunctionpair37.className = 'checkbox-label-pair';
    PureColorfunctionpair37.appendChild(checkbox37);
    PureColorfunctionpair37.appendChild(label37);
    updatePairStyle(PureColorfunctionpair37);


const PureColorfunctionpair38 = document.createElement('div');
    PureColorfunctionpair38.className = 'checkbox-label-pair';
    PureColorfunctionpair38.appendChild(checkbox38);
    PureColorfunctionpair38.appendChild(label38);
    updatePairStyle(PureColorfunctionpair38);


const PureColorfunctionpair40 = document.createElement('div');
    PureColorfunctionpair40.className = 'checkbox-label-pair';
    PureColorfunctionpair40.appendChild(checkbox40);
    PureColorfunctionpair40.appendChild(label40);
    updatePairStyle(PureColorfunctionpair40);


const PureColorfunctionpair41 = document.createElement('div');
    PureColorfunctionpair41.className = 'checkbox-label-pair';
    PureColorfunctionpair41.appendChild(checkbox41);
    PureColorfunctionpair41.appendChild(label41);
    updatePairStyle(PureColorfunctionpair41);


const PureColorfunctionpair42 = document.createElement('div');
    PureColorfunctionpair42.className = 'checkbox-label-pair';
    PureColorfunctionpair42.appendChild(checkbox42);
    PureColorfunctionpair42.appendChild(label42);
    updatePairStyle(PureColorfunctionpair42);


const PureColorfunctionpair43 = document.createElement('div');
    PureColorfunctionpair43.className = 'checkbox-label-pair';
    PureColorfunctionpair43.appendChild(checkbox43);
    PureColorfunctionpair43.appendChild(label43);
    updatePairStyle(PureColorfunctionpair43);


	// ==== ②.③创建「分割线」 ====
    const PureColorfunctionpairdivider1 = document.createElement('hr');
    PureColorfunctionpairdivider1.style.cssText = `
        height: 1px;
        margin: 8px 0;
        background-image: linear-gradient( to right, transparent 0%, var(--b3-theme-surface-lighter) 40%, var(--b3-theme-surface-lighter) 80%, transparent 100% );
        border: none;
        width: 100%;
    `;
	
    const PureColorfunctionpairdivider2 = document.createElement('hr');
    PureColorfunctionpairdivider2.style.cssText = `
        height: 1px;
        margin: 8px 0;
        background-image: linear-gradient( to right, transparent 0%, var(--b3-theme-surface-lighter) 40%, var(--b3-theme-surface-lighter) 80%, transparent 100% );
        border: none;
        width: 100%;
    `;
	
	function createDivider() {
    const divider = document.createElement('hr');
    divider.style.cssText = `
        height: 1px;
        margin: 8px 0;
        background-image: linear-gradient( to right, transparent 0%, var(--b3-theme-surface-lighter) 40%, var(--b3-theme-surface-lighter) 80%, transparent 100% );
        border: none;
        width: 100%;
    `;
    return divider;
}


	// 创建二级菜单（可以若干个）
    const subMenu1 = createSubMenu([
        PureColorfunctionpair15,//卡片式界面
		PureColorfunctionpair21,//'侧边栏·卡片化
		PureColorfunctionpair22,//'编辑器·卡片化
		PureColorfunctionpair23,//'圆角·页签
		PureColorfunctionpair24,//'圆角·标题前缀图标
		PureColorfunctionpair25,//'圆角·编辑器元素
    ], i18n.PureColorMenu1 || "风格：圆角化");
    
	const subMenu2 = createSubMenu([
		PureColorfunctionpair16,//直角式界面
		PureColorfunctionpair26,//'侧边栏·便签化
		PureColorfunctionpair27,//'编辑器·便签化
		PureColorfunctionpair28,//'直角·标题前缀图标
		PureColorfunctionpair29,//'直角·编辑器元素
    ], i18n.PureColorMenu2 || "风格：直角化");
	
	const subMenu3 = createSubMenu([
		PureColorfunctionpair18,//'三段式界面
		PureColorfunctionpair19,//'纯线框界面
		PureColorfunctionpair20,//'沉淀式界面（左边栏浮起）
    ], i18n.PureColorMenu3 || "界面层级");
	
	const subMenu4 = createSubMenu([
		PureColorfunctionpair30,//'多彩·标题/文档树/大纲树
		PureColorfunctionpair31,//'LED柔光板·标题
		PureColorfunctionpair32,//'旋转灯·引述块
		PureColorfunctionpair33,//'光影·编辑器元素
		PureColorfunctionpair34,//'光影台阶
    ], i18n.PureColorMenu4 || "风格：七彩流苏");
	
	const subMenu5 = createSubMenu([
		PureColorfunctionpair35,//'拟物化界面
    ], i18n.PureColorMenu5 || "🚫施工中");//风格：拟物化
	
	const subMenu6 = createSubMenu([
		PureColorfunctionpair14,//隐藏顶栏
		//+顶栏融合
    ], i18n.PureColorMenu6 || "顶栏");
	
    const subMenu7 = createSubMenu([
        PureColorfunctionpair2,   //列表子弹线
        PureColorfunctionpair13,   //打字机模式
    ], i18n.PureColorMenu7 || "编辑体验");
    
	const subMenu8 = createSubMenu([
		PureColorfunctionpair1,  //垂直页签
		PureColorfunctionpair36,//文档树、大纲树列表线
    ], i18n.PureColorMenu8 || "视觉引导");
	
	const subMenu9 = createSubMenu([
		PureColorfunctionpair37,//'寡淡I
		document.createTextNode("     默认/Default II"),
		PureColorfunctionpair38,//鲜艳II
    ], i18n.PureColorMenu9 || "配色层级");
	
    const subMenu10 = createSubMenu([   //以下是主题配色
        PureColorfunctionpair3,
        PureColorfunctionpair4,
        PureColorfunctionpair5,
        PureColorfunctionpair6,
        PureColorfunctionpair7,
        PureColorfunctionpair8,
        PureColorfunctionpair9,
        PureColorfunctionpair10,
        PureColorfunctionpair11,
        PureColorfunctionpair12,
		PureColorfunctionpair17,
    ], i18n.PureColorMenu10 || "配色系列：纯净·单色");
	
	const subMenu11 = createSubMenu([
		//多款撞色
    ], i18n.PureColorMenu11 || "🚫施工中");//配色系列：混搭·拼色
	
	const subMenu12 = createSubMenu([
		PureColorfunctionpair40,//'黑白调
		PureColorfunctionpair41,//'三栏界面
		PureColorfunctionpair42,//'直角大满足
		PureColorfunctionpair43,//'圆角大满足
    ], i18n.PureColorMenu12 || "🚫施工中");//推荐套餐
	
	const subMenu13 = createSubMenu([
		
    ], i18n.PureColorMenu13 || "🚫施工中");//保存配置
	
	// ==== ②.④设置窗口创建标题文本 ====
	function createMenuTitle(text) {
    const title = document.createElement('div');
    title.textContent = text;
    title.className = 'menu-title';
    return title;
}
	
	
	// ==== ②.⑤将二级菜单、分割线、复选框和标签添加到设置窗口 ====
	settingsWindow.appendChild(createMenuTitle('🌏 界面相关'));
	settingsWindow.appendChild(subMenu3);//界面层级
	settingsWindow.appendChild(subMenu1);//框架：圆角化
	settingsWindow.appendChild(subMenu2);//框架：直角化
	settingsWindow.appendChild(subMenu4);//风格：七彩流苏（light）
	settingsWindow.appendChild(subMenu5);//风格：拟物化
	settingsWindow.appendChild(subMenu6);//顶栏
	settingsWindow.appendChild(createDivider());
	settingsWindow.appendChild(createMenuTitle('🛠 功能增强'));
    settingsWindow.appendChild(subMenu7);//编辑体验
	settingsWindow.appendChild(subMenu8);//视觉引导
	settingsWindow.appendChild(createDivider());
	settingsWindow.appendChild(createMenuTitle('🎨 主题配色'));
    settingsWindow.appendChild(subMenu9);//配色层级
	settingsWindow.appendChild(subMenu10);//配色系列：纯净·单色
	settingsWindow.appendChild(subMenu11);//配色系列：混搭·拼色
	settingsWindow.appendChild(createDivider());
	settingsWindow.appendChild(createMenuTitle('🚫施工中'));//🛍 配置混搭
	settingsWindow.appendChild(subMenu12);//推荐套餐
	settingsWindow.appendChild(subMenu13);//保存配置
	
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
		isChecked6: checkbox6.checked,
		isChecked7: checkbox7.checked,
		isChecked8: checkbox8.checked,
		isChecked9: checkbox9.checked,
		isChecked10: checkbox10.checked,
		isChecked11: checkbox11.checked,
		isChecked12: checkbox12.checked,
		isChecked13: checkbox13.checked,
		isChecked14: checkbox14.checked,
		isChecked15: checkbox15.checked,
		isChecked16: checkbox16.checked,
		isChecked17: checkbox17.checked,
		isChecked18: checkbox18.checked,
		isChecked19: checkbox19.checked,
		isChecked20: checkbox20.checked,
		isChecked21: checkbox21.checked,
		isChecked22: checkbox22.checked,
		isChecked23: checkbox23.checked,
		isChecked24: checkbox24.checked,
		isChecked25: checkbox25.checked,
		isChecked26: checkbox26.checked,
		isChecked27: checkbox27.checked,
		isChecked28: checkbox28.checked,
		isChecked29: checkbox29.checked,
		isChecked30: checkbox30.checked,
		isChecked31: checkbox31.checked,
		isChecked32: checkbox32.checked,
		isChecked33: checkbox33.checked,
		isChecked34: checkbox34.checked,
		isChecked35: checkbox35.checked,
		isChecked36: checkbox36.checked,
		isChecked37: checkbox37.checked,
		isChecked38: checkbox38.checked,
		isChecked40: checkbox40.checked,
		isChecked41: checkbox41.checked,
		isChecked42: checkbox42.checked,
		isChecked43: checkbox43.checked,

    })], { type: 'application/json' }), 'PureColor-light-config.json');

    return fetch('/api/file/putFile', { method: 'POST', body: formData });
}


// ==== ③.①开关 ====
// 卡片式界面开关
checkbox15.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablecardbasedinterface() : disablecardbasedinterface();
    state ? isChecked15 = true : isChecked15 = false;
	if (isChecked16 === true) { checkbox16.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// 直角式界面开关
checkbox16.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablerightangleinterface() : disablerightangleinterface();
    state ? isChecked16 = true : isChecked16 = false;
	if (isChecked15 === true) { checkbox15.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


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
    state ? enablePureColorlbzdx() : disablePureColorlbzdx();
    state ? isChecked2 = true : isChecked2 = false;
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// 打字机模式开关
checkbox13.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColortypewriter() : disablePureColortypewriter();
    state ? isChecked13 = true : isChecked13 = false;
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
	if (isChecked6 === true) { checkbox6.click(); }
	if (isChecked7 === true) { checkbox7.click(); }
	if (isChecked8 === true) { checkbox8.click(); }
	if (isChecked9 === true) { checkbox9.click(); }
	if (isChecked10 === true) { checkbox10.click(); }
	if (isChecked11 === true) { checkbox11.click(); }
	if (isChecked12 === true) { checkbox12.click(); }
	if (isChecked17 === true) { checkbox17.click(); }
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
	if (isChecked6 === true) { checkbox6.click(); }
	if (isChecked7 === true) { checkbox7.click(); }
	if (isChecked8 === true) { checkbox8.click(); }
	if (isChecked9 === true) { checkbox9.click(); }
	if (isChecked10 === true) { checkbox10.click(); }
	if (isChecked11 === true) { checkbox11.click(); }
	if (isChecked12 === true) { checkbox12.click(); }
	if (isChecked17 === true) { checkbox17.click(); }
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
	if (isChecked6 === true) { checkbox6.click(); }
	if (isChecked7 === true) { checkbox7.click(); }
	if (isChecked8 === true) { checkbox8.click(); }
	if (isChecked9 === true) { checkbox9.click(); }
	if (isChecked10 === true) { checkbox10.click(); }
	if (isChecked11 === true) { checkbox11.click(); }
	if (isChecked12 === true) { checkbox12.click(); }
	if (isChecked17 === true) { checkbox17.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// light4配色开关
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
	if (isChecked17 === true) { checkbox17.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// light5配色开关
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
	if (isChecked17 === true) { checkbox17.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// light6配色开关
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
	if (isChecked17 === true) { checkbox17.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// light7配色开关
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
	if (isChecked17 === true) { checkbox17.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// light8配色开关
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
	if (isChecked17 === true) { checkbox17.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// light9配色开关
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
	if (isChecked17 === true) { checkbox17.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// light10配色开关
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
	if (isChecked17 === true) { checkbox17.click(); }
    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// light11配色开关
checkbox17.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorps11() : disablePureColorps11();
    state ? isChecked17 = true : isChecked17 = false;
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




// 开关:'三段式界面
checkbox18.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgjmcj1() : disablePureColorjmxgjmcj1();
    state ? isChecked18 = true : isChecked18 = false;
    if (isChecked19 === true) { checkbox19.click(); }
    if (isChecked20 === true) { checkbox20.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'纯线框界面
checkbox19.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgjmcj2() : disablePureColorjmxgjmcj2();
    state ? isChecked19 = true : isChecked19 = false;
    if (isChecked18 === true) { checkbox18.click(); }
    if (isChecked20 === true) { checkbox20.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'沉淀式界面（左边栏浮起）
checkbox20.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgjmcj3() : disablePureColorjmxgjmcj3();
    state ? isChecked20 = true : isChecked20 = false;
    if (isChecked18 === true) { checkbox18.click(); }
    if (isChecked19 === true) { checkbox19.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// 开关:'侧边栏·卡片化
checkbox21.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgyjh1() : disablePureColorjmxgyjh1();
    state ? isChecked21 = true : isChecked21 = false;
    if (isChecked26 === true) { checkbox26.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// 开关:'侧边栏·便签化
checkbox26.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgzjh1() : disablePureColorjmxgzjh1();
    state ? isChecked26 = true : isChecked26 = false;
    if (isChecked21 === true) { checkbox21.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'编辑器·卡片化
checkbox22.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgyjh2() : disablePureColorjmxgyjh2();
    state ? isChecked22 = true : isChecked22 = false;
    if (isChecked27 === true) { checkbox27.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'编辑器·便签化
checkbox27.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgzjh2() : disablePureColorjmxgzjh2();
    state ? isChecked27 = true : isChecked27 = false;
    if (isChecked22 === true) { checkbox22.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'圆角·标题前缀图标
checkbox24.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgyjh4() : disablePureColorjmxgyjh4();
    state ? isChecked24 = true : isChecked24 = false;
    if (isChecked28 === true) { checkbox28.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'直角·标题前缀图标
checkbox28.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgzjh3() : disablePureColorjmxgzjh3();
    state ? isChecked28 = true : isChecked28 = false;
    if (isChecked24 === true) { checkbox24.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'圆角·编辑器元素
checkbox25.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgyjh5() : disablePureColorjmxgyjh5();
    state ? isChecked25 = true : isChecked25 = false;
    if (isChecked29 === true) { checkbox29.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'直角·编辑器元素
checkbox29.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgzjh4() : disablePureColorjmxgzjh4();
    state ? isChecked29 = true : isChecked29 = false;
    if (isChecked25 === true) { checkbox25.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'圆角·页签
checkbox23.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgyjh3() : disablePureColorjmxgyjh3();
    state ? isChecked23 = true : isChecked23 = false;

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'多彩·标题/文档树/大纲树
checkbox30.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgqcls1() : disablePureColorjmxgqcls1();
    state ? isChecked30 = true : isChecked30 = false;

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'LED柔光板·标题
checkbox31.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgqcls2() : disablePureColorjmxgqcls2();
    state ? isChecked31 = true : isChecked31 = false;

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'旋转灯·引述块
checkbox32.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgqcls3() : disablePureColorjmxgqcls3();
    state ? isChecked32 = true : isChecked32 = false;

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'光影·编辑器元素
checkbox33.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgqcls4() : disablePureColorjmxgqcls4();
    state ? isChecked33 = true : isChecked33 = false;

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'光影台阶
checkbox34.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgqcls5() : disablePureColorjmxgqcls5();
    state ? isChecked34 = true : isChecked34 = false;

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'拟物化界面
checkbox35.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorjmxgnwh1() : disablePureColorjmxgnwh1();
    state ? isChecked35 = true : isChecked35 = false;

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'文档树/大纲树列表线
checkbox36.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorgnzqsjyd1() : disablePureColorgnzqsjyd1();
    state ? isChecked36 = true : isChecked36 = false;

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});



// 开关:'黑白调
checkbox40.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorpzhdtjtc1() : disablePureColorpzhdtjtc1();
    state ? isChecked40 = true : isChecked40 = false;
    if (isChecked41 === true) { checkbox41.click(); }
    if (isChecked42 === true) { checkbox42.click(); }
	if (isChecked43 === true) { checkbox43.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});


// 开关:'三栏界面
checkbox41.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorpzhdtjtc2() : disablePureColorpzhdtjtc2();
    state ? isChecked41 = true : isChecked41 = false;
    if (isChecked40 === true) { checkbox40.click(); }
    if (isChecked42 === true) { checkbox42.click(); }
	if (isChecked43 === true) { checkbox43.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'直角大满足
checkbox42.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorpzhdtjtc3() : disablePureColorpzhdtjtc3();
    state ? isChecked42 = true : isChecked42 = false;
    if (isChecked40 === true) { checkbox40.click(); }
    if (isChecked41 === true) { checkbox41.click(); }
	if (isChecked43 === true) { checkbox43.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'圆角大满足
checkbox43.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorpzhdtjtc4() : disablePureColorpzhdtjtc4();
    state ? isChecked43 = true : isChecked43 = false;
    if (isChecked40 === true) { checkbox40.click(); }
    if (isChecked41 === true) { checkbox41.click(); }
	if (isChecked42 === true) { checkbox42.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});



// 开关:'寡淡I
checkbox37.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorztpspscj1() : disablePureColorztpspscj1();
    state ? isChecked37 = true : isChecked37 = false;
    if (isChecked38 === true) { checkbox38.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});

// 开关:'鲜艳II
checkbox38.addEventListener('change', async function() {
    const state = this.checked;
    state ? enablePureColorztpspscj2() : disablePureColorztpspscj2();
    state ? isChecked38 = true : isChecked38 = false;
    if (isChecked37 === true) { checkbox37.click(); }

    try {
        if ((await (await saveConfig()).json()).code !== 0) throw 0;
    } catch {
        this.checked = !state;
    }
});




// ☆☆☆ESC键关闭
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


 // ☆☆☆点击空白处关闭设置窗口
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
            margin-bottom: -32px !important;
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
		:root[data-theme-mode=light],:root[data-theme-mode=dark]{
			--b3-border-color: var(--b3-theme-surface);
			--pc-border-1: 0px;
			--pc-border-2: 0px;
			--pc-border-3: 0px;
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




// 开/关：列表子弹线
function enablePureColorlbzdx() {
    PureColorlbzdx.start();

    let linkElement = document.getElementById("PureColorlbzdx-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorlbzdx-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/列表子弹线.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorlbzdx() {
    PureColorlbzdx.stop();

    const linkElement = document.getElementById("PureColorlbzdx-style");
    if (linkElement) {
        linkElement.remove();
    }
}


// 开/关：light1配色
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
function disablePureColorsunset() {
    const linkElement = document.getElementById("PureColorsunset-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开/关：light-2配色
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
function disablePureColorforest() {
    const linkElement = document.getElementById("PureColorforest-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开/关：light-3配色
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
function disablePureColorocean() {
    const linkElement = document.getElementById("PureColorocean-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开/关：light-4配色
function enablePureColorps4() {
    let linkElement = document.getElementById("PureColorps4-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps4-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/light-4.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorps4() {
    const linkElement = document.getElementById("PureColorps4-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开/关：light-5配色
function enablePureColorps5() {
    let linkElement = document.getElementById("PureColorps5-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps5-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/light-5.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorps5() {
    const linkElement = document.getElementById("PureColorps5-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开/关：light-6配色
function enablePureColorps6() {
    let linkElement = document.getElementById("PureColorps6-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps6-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/light-6.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorps6() {
    const linkElement = document.getElementById("PureColorps6-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开/关：light-7配色
function enablePureColorps7() {
    let linkElement = document.getElementById("PureColorps7-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps7-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/light-7.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorps7() {
    const linkElement = document.getElementById("PureColorps7-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开/关：light-8配色
function enablePureColorps8() {
    let linkElement = document.getElementById("PureColorps8-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps8-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/light-8.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorps8() {
    const linkElement = document.getElementById("PureColorps8-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   

// 开/关：light-9配色
function enablePureColorps9() {
    let linkElement = document.getElementById("PureColorps9-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps9-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/light-9.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorps9() {
    const linkElement = document.getElementById("PureColorps9-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}   


// 开/关：light-10配色
function enablePureColorps10() {
    let linkElement = document.getElementById("PureColorps10-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps10-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/light-10.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorps10() {
    const linkElement = document.getElementById("PureColorps10-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开/关：light-11配色
function enablePureColorps11() {
    let linkElement = document.getElementById("PureColorps11-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorps11-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/theme/light-11.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorps11() {
    const linkElement = document.getElementById("PureColorps11-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}


// 开/关：卡片式界面
function enablecardbasedinterface() {
    let linkElement = document.getElementById("cardbasedinterface-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "cardbasedinterface-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/卡片式界面.css";
        document.head.appendChild(linkElement);
    }
}
function disablecardbasedinterface() {
    const linkElement = document.getElementById("cardbasedinterface-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}


// 开/关：直角式界面
function enablerightangleinterface() {
    let linkElement = document.getElementById("rightangleinterface-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "rightangleinterface-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/直角式界面.css";
        document.head.appendChild(linkElement);
    }
}
function disablerightangleinterface() {
    const linkElement = document.getElementById("rightangleinterface-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开/关：垂直页签
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
function disablePureColorverticaltab() {
    PureColorwnd.stop();

    const linkElement = document.getElementById("PureColorverticaltab-style");
    if (linkElement) {
        linkElement.remove();
    }
}


// 开/关：打字机模式
function enablePureColortypewriter() {
    // Initialize typewriter mode
    const typewriter = typewriteractivate();
    
    // Add style for typewriter mode
    let styleElement = document.getElementById("typewriter-mode-style");
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "typewriter-mode-style";
        document.head.appendChild(styleElement);
    }
    
    // Store the active editor reference
    window.typewriterModeActive = true;
}

function disablePureColortypewriter() {
    // Remove all typewriter event listeners
    const editors = document.querySelectorAll('div.protyle:not(.fn__none) div.protyle-wysiwyg');
    editors.forEach(editor => {
        editor.onkeyup = null;
    });
    
    // Remove typewriter styles
    const styleElement = document.getElementById("typewriter-mode-style");
    if (styleElement) {
        styleElement.remove();
    }
    
    // Clear the active flag
    window.typewriterModeActive = false;
}



// 开启\关闭：'三段式界面
function enablePureColorjmxgjmcj1() {
    let linkElement = document.getElementById("PureColorjmxgjmcj1-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgjmcj1-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/三段式界面.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgjmcj1() {
    const linkElement = document.getElementById("PureColorjmxgjmcj1-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：'纯线框界面
function enablePureColorjmxgjmcj2() {
    let linkElement = document.getElementById("PureColorjmxgjmcj2-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgjmcj2-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/纯线框界面.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgjmcj2() {
    const linkElement = document.getElementById("PureColorjmxgjmcj2-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：沉淀式界面（左边栏浮起）
function enablePureColorjmxgjmcj3() {
    let linkElement = document.getElementById("PureColorjmxgjmcj3-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgjmcj3-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/沉淀式界面.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgjmcj3() {
    const linkElement = document.getElementById("PureColorjmxgjmcj3-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：侧边栏·卡片化
function enablePureColorjmxgyjh1() {
    let linkElement = document.getElementById("PureColorjmxgyjh1-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgyjh1-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/侧边栏卡片化.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgyjh1() {
    const linkElement = document.getElementById("PureColorjmxgyjh1-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：编辑器·卡片化
function enablePureColorjmxgyjh2() {
    let linkElement = document.getElementById("PureColorjmxgyjh2-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgyjh2-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/编辑器卡片化.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgyjh2() {
    const linkElement = document.getElementById("PureColorjmxgyjh2-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：圆角·页签
function enablePureColorjmxgyjh3() {
    let linkElement = document.getElementById("PureColorjmxgyjh3-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgyjh3-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/圆角页签.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgyjh3() {
    const linkElement = document.getElementById("PureColorjmxgyjh3-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：圆角·标题前缀图标
function enablePureColorjmxgyjh4() {
    let linkElement = document.getElementById("PureColorjmxgyjh4-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgyjh4-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/圆角标题前缀图标.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgyjh4() {
    const linkElement = document.getElementById("PureColorjmxgyjh4-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：圆角·编辑器元素
function enablePureColorjmxgyjh5() {
    let linkElement = document.getElementById("PureColorjmxgyjh5-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgyjh5-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/圆角行级元素.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgyjh5() {
    const linkElement = document.getElementById("PureColorjmxgyjh5-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：侧边栏·便签化
function enablePureColorjmxgzjh1() {
    let linkElement = document.getElementById("PureColorjmxgzjh1-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgzjh1-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/侧边栏便签化.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgzjh1() {
    const linkElement = document.getElementById("PureColorjmxgzjh1-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：编辑器·便签化
function enablePureColorjmxgzjh2() {
    let linkElement = document.getElementById("PureColorjmxgzjh2-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgzjh2-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/编辑器便签化.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgzjh2() {
    const linkElement = document.getElementById("PureColorjmxgzjh2-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：直角·编辑器元素
function enablePureColorjmxgzjh3() {
    let linkElement = document.getElementById("PureColorjmxgzjh3-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgzjh3-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/直角标题前缀图标.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgzjh3() {
    const linkElement = document.getElementById("PureColorjmxgzjh3-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：直角·编辑器元素
function enablePureColorjmxgzjh4() {
    let linkElement = document.getElementById("PureColorjmxgzjh4-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgzjh4-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/直角行级元素.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgzjh4() {
    const linkElement = document.getElementById("PureColorjmxgzjh4-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：多彩标题文档树大纲树
function enablePureColorjmxgqcls1() {
    let linkElement = document.getElementById("PureColorjmxgqcls1-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgqcls1-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/多彩标题文档树大纲树.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgqcls1() {
    const linkElement = document.getElementById("PureColorjmxgqcls1-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：LED柔光板标题
function enablePureColorjmxgqcls2() {
    let linkElement = document.getElementById("PureColorjmxgqcls2-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgqcls2-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/LED柔光板标题.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgqcls2() {
    const linkElement = document.getElementById("PureColorjmxgqcls2-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：旋转灯·引述块
function enablePureColorjmxgqcls3() {
    let linkElement = document.getElementById("PureColorjmxgqcls3-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgqcls3-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/旋转灯引述块.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgqcls3() {
    const linkElement = document.getElementById("PureColorjmxgqcls3-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：光影·编辑器元素
function enablePureColorjmxgqcls4() {
    let linkElement = document.getElementById("PureColorjmxgqcls4-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgqcls4-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/光影编辑器元素.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgqcls4() {
    const linkElement = document.getElementById("PureColorjmxgqcls4-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：光影台阶
function enablePureColorjmxgqcls5() {
    let linkElement = document.getElementById("PureColorjmxgqcls5-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgqcls5-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/光影台阶.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgqcls5() {
    const linkElement = document.getElementById("PureColorjmxgqcls5-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：拟物化界面
function enablePureColorjmxgnwh1() {
    let linkElement = document.getElementById("PureColorjmxgnwh1-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorjmxgnwh1-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/拟物化界面.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorjmxgnwh1() {
    const linkElement = document.getElementById("PureColorjmxgnwh1-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：文档树大纲树列表线
function enablePureColorgnzqsjyd1() {
    let linkElement = document.getElementById("PureColorgnzqsjyd1-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorgnzqsjyd1-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/文档树大纲树列表线.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorgnzqsjyd1() {
    const linkElement = document.getElementById("PureColorgnzqsjyd1-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：寡淡I
function enablePureColorztpspscj1() {
    let linkElement = document.getElementById("PureColorztpspscj1-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorztpspscj1-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/寡淡I.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorztpspscj1() {
    const linkElement = document.getElementById("PureColorztpspscj1-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：鲜艳II
function enablePureColorztpspscj2() {
    let linkElement = document.getElementById("PureColorztpspscj2-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorztpspscj2-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/鲜艳II.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorztpspscj2() {
    const linkElement = document.getElementById("PureColorztpspscj2-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}



// 开启\关闭：套餐黑白调
function enablePureColorpzhdtjtc1() {
    let linkElement = document.getElementById("PureColorpzhdtjtc1-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorpzhdtjtc1-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/套餐黑白调.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorpzhdtjtc1() {
    const linkElement = document.getElementById("PureColorpzhdtjtc1-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：套餐三栏界面
function enablePureColorpzhdtjtc2() {
    let linkElement = document.getElementById("PureColorpzhdtjtc2-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorpzhdtjtc2-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/套餐三栏界面.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorpzhdtjtc2() {
    const linkElement = document.getElementById("PureColorpzhdtjtc2-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：套餐直角大满足
function enablePureColorpzhdtjtc3() {
    let linkElement = document.getElementById("PureColorpzhdtjtc3-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorpzhdtjtc3-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/套餐直角大满足.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorpzhdtjtc3() {
    const linkElement = document.getElementById("PureColorpzhdtjtc3-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
    }
}

// 开启\关闭：套餐圆角大满足
function enablePureColorpzhdtjtc4() {
    let linkElement = document.getElementById("PureColorpzhdtjtc4-style");
    if (!linkElement) {
        linkElement = document.createElement("link");
        linkElement.id = "PureColorpzhdtjtc4-style";
        linkElement.rel = "stylesheet";
        linkElement.href = "/appearance/themes/siyuan-theme-darkside/config/套餐圆角大满足.css";
        document.head.appendChild(linkElement);
    }
}
function disablePureColorpzhdtjtc4() {
    const linkElement = document.getElementById("PureColorpzhdtjtc4-style");
    if (linkElement) {
        setTimeout(() => {
            linkElement.remove();
        }, 300);
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
            enablePureColorlbzdx();
            isChecked2 = true;
        } else if (config?.isChecked2 === false) {
            disablePureColorlbzdx();
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
            enablePureColortypewriter();
            isChecked13 = true;
        } else if (config?.isChecked13 === false) {
            disablePureColortypewriter();
            isChecked13 = false;
        }
		
		if (config?.isChecked14 === true) {
            enabletoolbarhidden();
            isChecked14 = true;
        } else if (config?.isChecked14 === false) {
            disabletoolbarhidden();
            isChecked14 = false;
        }
		
		if (config?.isChecked15 === true) {
            enablecardbasedinterface();
            isChecked15 = true;
        } else if (config?.isChecked15 === false) {
            disablecardbasedinterface();
            isChecked15 = false;
        }
		
		if (config?.isChecked16 === true) {
            enablerightangleinterface();
            isChecked16 = true;
        } else if (config?.isChecked16 === false) {
            disablerightangleinterface();
            isChecked16 = false;
        }
		
		if (config?.isChecked17 === true) {
            enablePureColorps11();
            isChecked17 = true;
        } else if (config?.isChecked17 === false) {
            disablePureColorps11();
            isChecked17 = false;
        }
		
		if (config?.isChecked18 === true) {
			enablePureColorjmxgjmcj1();
			isChecked18 = true;
		} else if (config?.isChecked18 === false) {
			disablePureColorjmxgjmcj1();
			isChecked18 = false;
		}
		if (config?.isChecked19 === true) {
			enablePureColorjmxgjmcj2();
			isChecked19 = true;
		} else if (config?.isChecked19 === false) {
			disablePureColorjmxgjmcj2();
			isChecked19 = false;
		}
		if (config?.isChecked20 === true) {
			enablePureColorjmxgjmcj3();
			isChecked20 = true;
		} else if (config?.isChecked20 === false) {
			disablePureColorjmxgjmcj3();
			isChecked20 = false;
		}
		if (config?.isChecked21 === true) {
			enablePureColorjmxgyjh1();
			isChecked21 = true;
		} else if (config?.isChecked21 === false) {
			disablePureColorjmxgyjh1();
			isChecked21 = false;
		}
		if (config?.isChecked22 === true) {
			enablePureColorjmxgyjh2();
			isChecked22 = true;
		} else if (config?.isChecked22 === false) {
			disablePureColorjmxgyjh2();
			isChecked22 = false;
		}
		if (config?.isChecked23 === true) {
			enablePureColorjmxgyjh3();
			isChecked23 = true;
		} else if (config?.isChecked23 === false) {
			disablePureColorjmxgyjh3();
			isChecked23 = false;
		}
		if (config?.isChecked24 === true) {
			enablePureColorjmxgyjh4();
			isChecked24 = true;
		} else if (config?.isChecked24 === false) {
			disablePureColorjmxgyjh4();
			isChecked24 = false;
		}
		if (config?.isChecked25 === true) {
			enablePureColorjmxgyjh5();
			isChecked25 = true;
		} else if (config?.isChecked25 === false) {
			disablePureColorjmxgyjh5();
			isChecked25 = false;
		}
		if (config?.isChecked26 === true) {
			enablePureColorjmxgzjh1();
			isChecked26 = true;
		} else if (config?.isChecked26 === false) {
			disablePureColorjmxgzjh1();
			isChecked26 = false;
		}
		if (config?.isChecked27 === true) {
			enablePureColorjmxgzjh2();
			isChecked27 = true;
		} else if (config?.isChecked27 === false) {
			disablePureColorjmxgzjh2();
			isChecked27 = false;
		}
		if (config?.isChecked28 === true) {
			enablePureColorjmxgzjh3();
			isChecked28 = true;
		} else if (config?.isChecked28 === false) {
			disablePureColorjmxgzjh3();
			isChecked28 = false;
		}
		if (config?.isChecked29 === true) {
			enablePureColorjmxgzjh4();
			isChecked29 = true;
		} else if (config?.isChecked29 === false) {
			disablePureColorjmxgzjh4();
			isChecked29 = false;
		}
		if (config?.isChecked30 === true) {
			enablePureColorjmxgqcls1();
			isChecked30 = true;
		} else if (config?.isChecked30 === false) {
			disablePureColorjmxgqcls1();
			isChecked30 = false;
		}
		if (config?.isChecked31 === true) {
			enablePureColorjmxgqcls2();
			isChecked31 = true;
		} else if (config?.isChecked31 === false) {
			disablePureColorjmxgqcls2();
			isChecked31 = false;
		}
		if (config?.isChecked32 === true) {
			enablePureColorjmxgqcls3();
			isChecked32 = true;
		} else if (config?.isChecked32 === false) {
			disablePureColorjmxgqcls3();
			isChecked32 = false;
		}
		if (config?.isChecked33 === true) {
			enablePureColorjmxgqcls4();
			isChecked33 = true;
		} else if (config?.isChecked33 === false) {
			disablePureColorjmxgqcls4();
			isChecked33 = false;
		}
		if (config?.isChecked34 === true) {
			enablePureColorjmxgqcls5();
			isChecked34 = true;
		} else if (config?.isChecked34 === false) {
			disablePureColorjmxgqcls5();
			isChecked34 = false;
		}
		if (config?.isChecked35 === true) {
			enablePureColorjmxgnwh1();
			isChecked35 = true;
		} else if (config?.isChecked35 === false) {
			disablePureColorjmxgnwh1();
			isChecked35 = false;
		}
		if (config?.isChecked36 === true) {
			enablePureColorgnzqsjyd1();
			isChecked36 = true;
		} else if (config?.isChecked36 === false) {
			disablePureColorgnzqsjyd1();
			isChecked36 = false;
		}
		if (config?.isChecked37 === true) {
			enablePureColorztpspscj1();
			isChecked37 = true;
		} else if (config?.isChecked37 === false) {
			disablePureColorztpspscj1();
			isChecked37 = false;
		}
		if (config?.isChecked38 === true) {
			enablePureColorztpspscj2();
			isChecked38 = true;
		} else if (config?.isChecked38 === false) {
			disablePureColorztpspscj2();
			isChecked38 = false;
		}

		if (config?.isChecked40 === true) {
			enablePureColorpzhdtjtc1();
			isChecked40 = true;
		} else if (config?.isChecked40 === false) {
			disablePureColorpzhdtjtc1();
			isChecked40 = false;
		}
		if (config?.isChecked41 === true) {
			enablePureColorpzhdtjtc2();
			isChecked41 = true;
		} else if (config?.isChecked41 === false) {
			disablePureColorpzhdtjtc2();
			isChecked41 = false;
		}
		if (config?.isChecked42 === true) {
			enablePureColorpzhdtjtc3();
			isChecked42 = true;
		} else if (config?.isChecked42 === false) {
			disablePureColorpzhdtjtc3();
			isChecked42 = false;
		}
		if (config?.isChecked43 === true) {
			enablePureColorpzhdtjtc4();
			isChecked43 = true;
		} else if (config?.isChecked43 === false) {
			disablePureColorpzhdtjtc4();
			isChecked43 = false;
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
const PureColorlbzdx = (function() {
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





//打字机模式
	//0.获得焦点所在的块
function getFocusedBlock() {
    if (document.activeElement.classList.contains('protyle-wysiwyg')) {
        /* 光标在编辑区内 */
        let block = window.getSelection()?.focusNode?.parentElement; // 当前光标
        while (block != null && block?.dataset?.nodeId == null) block = block.parentElement;
        return block;
    }
    else return null;
}

//打字机核心模块
function typewriteractivate() {
    let protyle_wysiwyg = document.querySelectorAll('div.protyle:not(.fn__none) div.protyle-wysiwyg');
    if (protyle_wysiwyg.length > 0) {
        for (let editor of protyle_wysiwyg) {
            if (editor.onkeyup == null) {
                editor.onkeyup = (e, t) => {
                    if (!window.typewriterModeActive) return;
                    
                    let block = getFocusedBlock();
                    let page = editor.parentElement;
                    if (block == null || page == null) return;
                    
                    // Add visual focus class
                    document.querySelectorAll('.typing-focus').forEach(el => {
                        el.classList.remove('typing-focus');
                    });
                    
                    // 处理代码块和表格的特殊情况
                    let focusElement = block;
                    if (block.dataset.type === "NodeCodeBlock") {
                        // 对于代码块，聚焦当前行
                        const selection = window.getSelection();
                        if (selection && selection.rangeCount > 0) {
                            const range = selection.getRangeAt(0);
                            const codeLine = range.startContainer.parentElement.closest('.code-block');
                            if (codeLine) {
                                focusElement = codeLine;
                            }
                        }
                    } else if (block.dataset.type === "NodeTable") {
                        // 对于表格，聚焦当前行
                        const selection = window.getSelection();
                        if (selection && selection.rangeCount > 0) {
                            const range = selection.getRangeAt(0);
                            const tableRow = range.startContainer.parentElement.closest('table tr');
                            if (tableRow) {
                                focusElement = tableRow;
                            }
                        }
                    }
                    
                    focusElement.classList.add('typing-focus');
                    
                    // Calculate and perform scroll
                    let block_height = focusElement.clientHeight;
                    let block_bottom = focusElement.getBoundingClientRect().bottom;
                    let page_height = page.clientHeight;
                    let page_bottom = page.getBoundingClientRect().bottom;
                    
                    page.style.scrollBehavior = "smooth";
					const scrollStep = 0.7; // 调整这个系数可改进滚动速度 (慢0.1-1.0快)
                    page.scrollBy(0, -((page_bottom - page_height / 2) - (block_bottom - block_height / 2)));
                };
            }
        }
    }
    return { 
        disable: () => disableTypewriter() 
    };
}




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





