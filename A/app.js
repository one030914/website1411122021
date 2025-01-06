const { createApp } = Vue;

const vueworks = createApp({
    data() {
        return {
            works: []  // 用來儲存作品資料
        };
    },

}).mount("#paintings")
$.ajax({
    url: "/works",  // 從後端 /works 路由獲取資料
    method: "GET",
    dataType: "json",
    success: (results) => {
        // 成功後將資料賦值給 Vue 實例的 works 屬性
        vueworks.works = results;
    },
    error: (error) => {
        console.error("無法載入作品資料:", error);
    }
});