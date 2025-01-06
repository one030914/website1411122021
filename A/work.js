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
let paintings = Vue.createApp({
    data() {
        return {
            items: [],
        };
    },
}).mount("#paintings");

var C1 = Vue.createApp({
    data() {
        return {
            items: [],
        };
    },
}).mount("#projectsCarousel1");

var C2 = Vue.createApp({
    data() {
        return {
            items: [],
        };
    },
}).mount("#projectsCarousel2");

var C3 = Vue.createApp({
    data() {
        return {
            items: [],
        };
    },
}).mount("#projectsCarousel3");

// jQuery
$.ajax({
    url: "/work", // 從後端 /works 路由獲取資料
    method: "GET",
    dataType: "json",
    success: (results) => {
        // 成功後將資料賦值給 Vue 實例的 works 屬性
        paintings.items = results[0].paintings;
        C1.items = results[0].C1;
        C2.items = results[0].C2;
        C3.items = results[0].C3;
    },
    error: (error) => {
        console.error("無法載入作品資料:", error);
    },
});
