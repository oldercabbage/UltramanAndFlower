// 主JavaScript文件

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const playBtn = document.getElementById('play-btn');
    const shareBtn = document.getElementById('share-btn');
    const ultraman = document.getElementById('ultraman');
    const rightArm = document.getElementById('right-arm');
    const flower = document.getElementById('flower');
    const message = document.getElementById('message');
    const petalsFall = document.getElementById('petals-fall');
    const card = document.getElementById('card');

    // 动画播放状态
    let isAnimating = false;

    // 播放送花动画
    function playGiveFlowerAnimation() {
        if (isAnimating) return;
        
        isAnimating = true;
        playBtn.disabled = true;
        playBtn.textContent = '播放中...';

        // 重置状态
        ultraman.classList.remove('giving-flower');
        rightArm.classList.remove('raise');
        flower.classList.remove('show');
        
        // 延迟一下让重置生效
        setTimeout(() => {
            // 1. 奥特曼移动和举臂
            ultraman.classList.add('giving-flower');
            rightArm.classList.add('raise');
            
            // 2. 显示花朵
            setTimeout(() => {
                flower.classList.add('show');
            }, 500);

            // 3. 花瓣飘落效果
            createPetalsFall();

            // 4. 显示消息
            setTimeout(() => {
                message.style.animation = 'none';
                setTimeout(() => {
                    message.style.animation = 'messageFadeIn 1s ease-out forwards';
                }, 10);
            }, 1000);

            // 5. 动画完成
            setTimeout(() => {
                isAnimating = false;
                playBtn.disabled = false;
                playBtn.textContent = '再次播放';
            }, 2500);
        }, 100);
    }

    // 创建花瓣飘落效果
    function createPetalsFall() {
        // 清除之前的花瓣
        petalsFall.innerHTML = '';
        
        // 创建多个花瓣
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                petal.className = 'petal-fall';
                petal.style.left = Math.random() * 100 + '%';
                petal.style.animationDuration = (Math.random() * 3 + 2) + 's';
                petal.style.animationDelay = (Math.random() * 1) + 's';
                petal.style.transform = `rotate(${Math.random() * 360}deg)`;
                petalsFall.appendChild(petal);

                // 动画结束后移除
                setTimeout(() => {
                    petal.remove();
                }, 5000);
            }, i * 100);
        }
    }

    // 分享功能
    function shareCard() {
        // 获取当前页面URL
        const url = window.location.href;
        const title = 'Q版奥特曼送花贺卡';
        const text = '送给最爱的你 - 一份特别的电子贺卡';

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
                    title: 'Q版奥特曼送花贺卡',
                    link: window.location.href,
                    imgUrl: window.location.origin + '/images/og-image.jpg'
                });

                // 微信分享给朋友
                wx.updateAppMessageShareData({
                    title: 'Q版奥特曼送花贺卡',
                    desc: '送给最爱的你 - 一份特别的电子贺卡',
                    link: window.location.href,
                    imgUrl: window.location.origin + '/images/og-image.jpg'
                });
            });
        }
    }

    // 自动播放动画（首次加载）
    setTimeout(() => {
        playGiveFlowerAnimation();
    }, 1000);

    // 绑定事件
    playBtn.addEventListener('click', playGiveFlowerAnimation);
    shareBtn.addEventListener('click', shareCard);

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
            playGiveFlowerAnimation();
        }
    });

    // 键盘事件支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!isAnimating) {
                playGiveFlowerAnimation();
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

