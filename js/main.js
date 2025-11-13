// 主JavaScript文件

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const playBtn = document.getElementById('play-btn');
    const shareBtn = document.getElementById('share-btn');
    const ultraman = document.getElementById('ultraman');
    const rightArm = document.getElementById('right-arm');
    const warmthLight = document.getElementById('warmth-light');
    const monster = document.getElementById('monster');
    const message = document.getElementById('message');
    const warmthParticles = document.getElementById('warmth-particles');
    const card = document.getElementById('card');

    // 动画播放状态
    let isAnimating = false;

    // 播放送温暖动画
    function playGiveWarmthAnimation() {
        if (isAnimating) return;
        
        isAnimating = true;
        playBtn.disabled = true;
        playBtn.textContent = '播放中...';

        // 重置状态
        ultraman.classList.remove('giving-warmth');
        rightArm.classList.remove('raise');
        warmthLight.classList.remove('show');
        monster.classList.remove('receiving-warmth');
        
        // 延迟一下让重置生效
        setTimeout(() => {
            // 1. 奥特曼移动和举臂
            ultraman.classList.add('giving-warmth');
            rightArm.classList.add('raise');
            
            // 2. 显示温暖光效
            setTimeout(() => {
                warmthLight.classList.add('show');
            }, 500);

            // 3. 小怪兽接收温暖
            setTimeout(() => {
                monster.classList.add('receiving-warmth');
            }, 800);

            // 4. 温暖粒子飘落效果
            createWarmthParticles();

            // 5. 显示消息
            setTimeout(() => {
                message.style.animation = 'none';
                setTimeout(() => {
                    message.style.animation = 'messageFadeIn 1s ease-out forwards';
                }, 10);
            }, 1000);

            // 6. 动画完成
            setTimeout(() => {
                isAnimating = false;
                playBtn.disabled = false;
                playBtn.textContent = '再次播放';
            }, 2500);
        }, 100);
    }

    // 创建温暖粒子飘落效果
    function createWarmthParticles() {
        // 清除之前的粒子
        warmthParticles.innerHTML = '';
        
        // 创建多个温暖粒子
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'warmth-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
                particle.style.animationDelay = (Math.random() * 1) + 's';
                particle.style.transform = `rotate(${Math.random() * 360}deg)`;
                warmthParticles.appendChild(particle);

                // 动画结束后移除
                setTimeout(() => {
                    particle.remove();
                }, 5000);
            }, i * 80);
        }
    }

    // 分享功能
    function shareCard() {
        // 获取当前页面URL
        const url = window.location.href;
        const title = 'Q版奥特曼送温暖给小怪兽';
        const text = '一份温暖的电子贺卡 - 传递爱与温暖';

        // 检查是否支持Web Share API
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: url
            }).then(() => {
                console.log('分享成功');
                showMessage('分享成功！');
            }).catch((error) => {
                console.log('分享失败', error);
                copyToClipboard(url);
            });
        } else {
            // 降级方案：复制链接到剪贴板
            copyToClipboard(url);
        }
    }

    // 复制到剪贴板
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showMessage('链接已复制到剪贴板！');
            }).catch((error) => {
                console.error('复制失败', error);
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    }

    // 降级复制方案
    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showMessage('链接已复制到剪贴板！');
        } catch (error) {
            console.error('复制失败', error);
            showMessage('请手动复制链接：' + text);
        }
        document.body.removeChild(textArea);
    }

    // 显示消息
    function showMessage(msg) {
        // 创建消息提示
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            z-index: 1000;
            font-size: 1.2em;
            animation: fadeInOut 2s ease-in-out;
        `;
        messageDiv.textContent = msg;
        document.body.appendChild(messageDiv);

        // 添加动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);

        // 移除消息
        setTimeout(() => {
            messageDiv.remove();
            style.remove();
        }, 2000);
    }

    // 微信分享配置
    function initWeChatShare() {
        // 如果是在微信环境中
        if (typeof wx !== 'undefined') {
            wx.ready(function() {
                // 微信分享到朋友圈
                wx.updateTimelineShareData({
                    title: 'Q版奥特曼送温暖给小怪兽',
                    link: window.location.href,
                    imgUrl: window.location.origin + '/images/og-image.jpg'
                });

                // 微信分享给朋友
                wx.updateAppMessageShareData({
                    title: 'Q版奥特曼送温暖给小怪兽',
                    desc: '一份温暖的电子贺卡 - 传递爱与温暖',
                    link: window.location.href,
                    imgUrl: window.location.origin + '/images/og-image.jpg'
                });
            });
        }
    }

    // 自动播放动画（首次加载）- 移动端延迟更长
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const autoPlayDelay = isMobile ? 1500 : 1000;
    
    setTimeout(() => {
        playGiveWarmthAnimation();
    }, autoPlayDelay);

    // 绑定事件 - 移动端兼容
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // 为每个按钮单独设置状态
    let playBtnTouchHandled = false;
    let playBtnLastClickTime = 0;
    let shareBtnTouchHandled = false;
    let shareBtnLastClickTime = 0;
    
    function handlePlayClick(e) {
        // 防止快速重复点击
        const now = Date.now();
        if (now - playBtnLastClickTime < 500) {
            console.log('播放按钮：防抖中，忽略点击');
            return;
        }
        playBtnLastClickTime = now;
        
        // 防止移动端click和touchend重复触发
        if (playBtnTouchHandled && e && e.type === 'click') {
            console.log('播放按钮：已处理触摸事件，忽略click');
            return;
        }
        
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        console.log('播放按钮被点击:', e ? e.type : 'direct');
        playGiveWarmthAnimation();
    }
    
    function handleShareClick(e) {
        // 防止快速重复点击
        const now = Date.now();
        if (now - shareBtnLastClickTime < 500) {
            console.log('分享按钮：防抖中，忽略点击');
            return;
        }
        shareBtnLastClickTime = now;
        
        // 防止移动端click和touchend重复触发
        if (shareBtnTouchHandled && e && e.type === 'click') {
            console.log('分享按钮：已处理触摸事件，忽略click');
            return;
        }
        
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        console.log('分享按钮被点击:', e ? e.type : 'direct');
        shareCard();
    }
    
    // 移动端：使用touchend，阻止click事件
    if (isMobileDevice) {
        console.log('检测到移动端设备，使用触摸事件');
        
        // 播放按钮 - 触摸开始：提供视觉反馈
        playBtn.addEventListener('touchstart', function(e) {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(0.98)';
            playBtnTouchHandled = false;
        }, { passive: true });
        
        // 播放按钮 - 触摸结束：触发动作
        playBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
            playBtnTouchHandled = true;
            console.log('播放按钮：touchend触发');
            handlePlayClick(e);
            // 阻止300ms后的click事件
            setTimeout(() => {
                playBtnTouchHandled = false;
            }, 400);
        }, { passive: false });
        
        // 播放按钮 - 绑定click但阻止执行（移动端有300ms延迟）
        playBtn.addEventListener('click', function(e) {
            if (!playBtnTouchHandled) {
                // 如果touchend没有触发，说明可能是鼠标点击（某些平板）
                console.log('播放按钮：click触发（touchend未处理）');
                handlePlayClick(e);
            } else {
                console.log('播放按钮：阻止click事件（已处理touchend）');
                e.preventDefault();
                e.stopPropagation();
            }
        }, false);
        
        // 分享按钮 - 触摸开始：提供视觉反馈
        shareBtn.addEventListener('touchstart', function(e) {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(0.98)';
            shareBtnTouchHandled = false;
        }, { passive: true });
        
        // 分享按钮 - 触摸结束：触发动作
        shareBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
            shareBtnTouchHandled = true;
            console.log('分享按钮：touchend触发');
            handleShareClick(e);
            setTimeout(() => {
                shareBtnTouchHandled = false;
            }, 400);
        }, { passive: false });
        
        // 分享按钮 - 绑定click但阻止执行
        shareBtn.addEventListener('click', function(e) {
            if (!shareBtnTouchHandled) {
                console.log('分享按钮：click触发（touchend未处理）');
                handleShareClick(e);
            } else {
                console.log('分享按钮：阻止click事件（已处理touchend）');
                e.preventDefault();
                e.stopPropagation();
            }
        }, false);
    } else {
        // 桌面端：只使用click事件
        console.log('检测到桌面端设备，使用click事件');
        playBtn.addEventListener('click', handlePlayClick, false);
        shareBtn.addEventListener('click', handleShareClick, false);
    }
    
    console.log('事件监听器已绑定 - 移动端:', isMobileDevice);

    // 初始化微信分享
    initWeChatShare();

    // 触摸事件支持
    let touchStartY = 0;
    card.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    });

    card.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        // 向上滑动超过50px时播放动画
        if (diff > 50 && !isAnimating) {
            playGiveWarmthAnimation();
        }
    });

    // 键盘事件支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isAnimating) {
                playGiveWarmthAnimation();
            }
        }
    });

    // 页面可见性变化时暂停/恢复动画
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 页面隐藏时暂停动画
            console.log('页面隐藏');
        } else {
            // 页面显示时恢复
            console.log('页面显示');
        }
    });
});

// 页面加载完成后的初始化
window.addEventListener('load', function() {
    console.log('页面加载完成');
    
    // 隐藏加载动画（如果有）
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.display = 'none';
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 性能监控
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('页面加载时间:', pageLoadTime + 'ms');
        }, 0);
    });
}

