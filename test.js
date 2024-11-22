// ==UserScript==
// @name         清华大学课程自动播放
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自动播放清华大学在线课程视频，并处理页面切换暂停问题
// @author       Your name
// @match        *://tsinghua.yuketang.cn/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  let lastUrl = location.href;
  let playInterval;

  // 检查并播放视频
  function checkAndPlay() {
    const video = document.querySelector("video");
    if (video) {
      // 如果视频暂停了，就播放
      if (video.paused) {
        video.play();
      }

      // 移除视频的暂停事件监听器
      video.onpause = null;

      // 设置播放速度（可选，这里设置1.5倍速）
      video.playbackRate = 1.5;
    }
  }

  // 启动自动播放检查
  function startAutoPlay() {
    // 清除之前的定时器
    if (playInterval) {
      clearInterval(playInterval);
    }

    // 每秒检查一次视频状态
    playInterval = setInterval(checkAndPlay, 1000);
  }

  // 监听URL变化
  function checkUrlChange() {
    if (location.href !== lastUrl) {
      lastUrl = location.href;

      // URL变化后，等待2秒再启动自动播放（等待新页面加载）
      setTimeout(() => {
        startAutoPlay();
      }, 2000);
    }
  }

  // 监听页面变化
  setInterval(checkUrlChange, 1000);

  // 初始启动自动播放
  startAutoPlay();

  // 添加快捷键控制
  document.addEventListener("keydown", function (e) {
    // 按空格键暂停/播放
    if (e.code === "Space") {
      const video = document.querySelector("video");
      if (video) {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
        e.preventDefault();
      }
    }
  });
})();
