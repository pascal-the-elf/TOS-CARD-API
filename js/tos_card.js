function tos_card() {
    var self = this;
    self.get = async function(id=null, options=self.settings.options) {
        if(!id) {
            console.error("沒有提供卡片ID");
            return;
        }
        if(typeof id == "string") id = [id];
        else if(typeof id == "number") id = [id.toString()];
        else if(Array.isArray(id) && id.length > 0) {
            id.forEach(item => {
                if(typeof item == "number") return item.toString();
                else if(typeof item != "string") return "";
            });
        }
        return await self.get_cards(id, options);
    };
    self.get_cards = async function(id=null, options=self.settings.options) {
        if(!id) {
            console.error("沒有提供卡片ID");
            return;
        }
        var que = [], cards = {};
        if(self.settings.cache) {
            console.log("已啟用快取功能，查詢快取資料");
            let cache = await self.cache(id, options);
            que = cache.request;
            cache.local.forEach(item => { cards[item[0]] = item[1] });
        }
        else {
            que = id;
        }
        if(que.length > 0) {
            console.log("開始向 API 請求資料", que);
            var response = await fetch("https://tos-card-api.pascaltheelf.workers.dev/?id="+que.join(",")+self.build_options(options)).then(r=>r.json());
            if(response.info.success) {
                console.log("成功向 API 請求資料", response);
                if(self.settings.cache) {
                    console.log("已啟用快取功能，寫入快取資料");
                    var storage = JSON.parse(localStorage[self.settings.cache_name]);
                    Object.entries(response.cards).forEach(card => {
                        storage[card[0]] = {
                            options: Object.values(options).map(x=>x?1:0).join("").substr(1),
                            time: Date.now(),
                            card: card[1]
                        };
                    });
                    localStorage[self.settings.cache_name] = JSON.stringify(storage);
                    console.log("已寫入快取資料", storage);
                }
                Object.entries(response.cards).forEach(card => { cards[card[0]] = card[1] });
                console.log("回傳卡片資料");
            }
        }
        return cards;
    };
    self.cache = async function(id=null, options=self.settings.options) {
        if(!id) {
            console.error("沒有提供卡片ID");
            return;
        }
        if(!localStorage[self.settings.cache_name]) localStorage[self.settings.cache_name] = `{}`;
        var storage = JSON.parse(localStorage[self.settings.cache_name]);

        var request = [], local = [];
        for(let i = 0; i < id.length; i++) {
            let cached = storage[id[i]];
            if(cached && cached.options === Object.values(options).map(x=>x?1:0).join("").substr(1) && cached.time + self.settings.cache_time >= Date.now()) {
                console.log(`已取得符合 No.${id[i]} 的快取資料，使用快取資料`);
                local.push([id[i],cached.card]);
            }
            else {
                console.log(`未取得符合 No.${id[i]} 的快取資料，加入請求儲列`);
                request.push(id[i]);
            }
        }
        return {request, local};
    };
    self.clear_cache = function() {
        localStorage[self.settings.cache_name] = `{}`;
        console.log("已清除快取資料");
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
