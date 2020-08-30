function tos_card() {
    var self = this;
    self.get = async function(id=0, options=self.settings.options) {
        if(!id) {
            console.error("沒有提供卡片ID");
            return;
        }
        if(self.settings.cache) {
            console.log("已啟用快取功能，查詢快取資料");
            let cache = await self.cache(id, options);
            if(cache) return cache;
        }
        console.log("開始向 API 請求資料");
        var response = await fetch("https://tos-card-api.pascaltheelf.workers.dev/?id="+id+self.build_options(options)).then(r=>r.json());
        if(response.info.success) {
            console.log("成功向 API 請求資料", response);
            if(self.settings.cache) {
                console.log("已啟用快取功能，寫入快取資料");
                var storage = JSON.parse(localStorage[self.settings.cache_name]);
                storage[id] = {
                    options: Object.values(options).map(x=>x?1:0).join("").substr(1),
                    time: Date.now(),
                    card: response.data
                };
                localStorage[self.settings.cache_name] = JSON.stringify(storage);
                console.log("已寫入快取資料", storage);
            }
            console.log("回傳卡片資料");
            return response.data;
        }
    };
    self.cache = async function(id=0, options=self.settings.options) {
        if(!id) {
            console.error("沒有提供卡片ID");
            return;
        }
        if(!localStorage[self.settings.cache_name]) localStorage[self.settings.cache_name] = `{}`;
        var storage = JSON.parse(localStorage[self.settings.cache_name]);
        var cached = storage[id];
        if(cached && cached.options === Object.values(options).map(x=>x?1:0).join("").substr(1) && cached.time + self.settings.cache_time >= Date.now()) {
            console.log("已取得符合的快取資料，使用快取資料");
            return cached.card;
        }
        console.log("未取得符合的快取資料，使用 API 請求資料");
        return null;
    };
    self.build_options = function(options) {
        var built = "";
        Object.entries(options).forEach(item => {
            built += item[1] ? `&${item[0]}=${item[1]}` : "";
        });
        return built;
    };
    self.settings = {
        cache: true,
        cache_time: 12*60*60*1000,
        cache_name: "tos_card_cache",
        options: {
            minify: false,
            noskills: false,
            noinfo: false,
            nostory: false,
            notable: false
        }
    };
}
