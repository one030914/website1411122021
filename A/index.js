// Animation
gsap.registerPlugin(ScrollTrigger);

// 為所有class fade-in的元素設置動畫
gsap.utils.toArray(".fade-in").forEach((element) => {
    gsap.fromTo(
        element,
        { opacity: 0, y: 50 }, // 初始狀態
        {
            opacity: 1,
            y: 0, // 動畫結束狀態
            scrollTrigger: {
                trigger: element,
                start: "top 80%", // 進入時開始
                end: "top 20%", // 離開時結束
                toggleActions: "play none none reverse", // 播放-回播
                scrub: true,
            },
            duration: 1, // 動畫持續時間
        }
    );
});

gsap.utils.toArray(".fade").forEach((element) => {
    gsap.fromTo(
        element,
        { opacity: 0, y: 50 }, // 初始狀態
        {
            opacity: 1,
            y: 0, // 動畫結束狀態
            scrollTrigger: {
                trigger: element,
                start: "top 80%", // 進入時開始
                end: "top 20%", // 離開時結束
                toggleActions: "play none none reverse", // 播放-回播
            },
            duration: 1, // 動畫持續時間
        }
    );
});

// Vue
var paintings = Vue.createApp({
    data() {
        return {
            items: [],
        };
    },
}).mount("#paintings");

var projects = Vue.createApp({
    data() {
        return {
            items: [],
        };
    },
}).mount("#projects");

$.ajax({
    url: "/index",
    method: "GET",
    dataType: "json",
    success: (results) => {
        paintings.items = results[0].paintings;
        projects.items = results[0].projects;
    },
    error: (error) => {
        console.error("無法載入作品資料:", error);
    },
});
