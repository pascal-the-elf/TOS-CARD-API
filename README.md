# 神魔之塔卡片 API
非官方卡片資訊 API

## 功能
- 容易使用，快速上手
- 多卡查詢（單一請求上限：6張）
- 自訂查詢內容（預設全部，可自選去除部分項目）
- 提供 Javascript Client （[tos_card.js](#link_tos_card_js)）

### 卡片資訊
提供的卡片資訊項目包含
- 卡片 ID
- 卡片名稱
- 卡片屬性
- 卡片種族
- 卡片稀有度
- 卡片空間
- 卡片系列名稱
- 卡片初等數值
- 卡片滿等數值
- 卡片主動技能
- 卡片隊長技能
- 卡片隊伍技能
- 卡片額外資訊
- 卡片故事
- 卡片各等級數值表

## 測試 DEMO
[前往 DEMO 網站](https://pascal-the-elf.github.io/TOS-CARD-API/demo)

## API 請求方式
1. 使用 tos_card.js 請求
```html
<script src="https://cdn.jsdelivr.net/gh/pascal-the-elf/TOS-CARD-API@latest/js/tos_card.min.js"></script>

<script>
    var card = new tos_card();

    card.get(2454).then(card_data => {
        // card_data: 卡片資料
        document.body.innerHTML += `<pre>${card_data}</pre>`;
    });
</script>
```

2. 使用 HTTP GET Request 請求
```javascript
fetch("https://tos-card-api.pascaltheelf.workers.dev/?id=2454").then(r=>r.json()).then(resp => {
    // resp: API 回傳資料，包含 {info, data}
    document.body.innerHTML += `<pre>${resp.data}</pre>`;
});
```

## API 請求參數與回應資訊

### 請求參數
```javascript
var request_url = "https://tos-card-api.pascaltheelf.workers.dev/" + 
                    "?id=2454,2455" + /* 卡片 ID (必須) */
                    "$minify=false" + /* 是否去除縮排以減少資料大小 (可選) */
                    "&noskills=false" + /* 是否去除技能資訊以減少資料大小 (可選) */
                    "&noinfo=false" + /* 是否去除額外資訊以減少資料大小 (可選) */
                    "&nostory=false" + /* 是否去除卡片故事以減少資料大小 (可選) */
                    "&notable=false"; /* 是否去除卡片各等級數值表以減少資料大小 (可選) */
```
### 回應資訊
```javascript
{
    "info": {
        "success": true,                    /* 請求成功與否 */
        "msg": "此 API 還在測試中，如果遇到任何問題，請至 https://github.com/pascal-the-elf/TOS-CARD-API/issues 提出。", /* 一些提醒 */
        "parameters": {                     /* 請求執行的參數 */
            "id": [
                2454,
                2455
            ],
            "minify": false,
            "noskills": false,
            "noinfo": false,
            "nostory": false,
            "notable": false
        },
        "version": "1.1.0"                  /* API 版本 */
    },
    "cards": {                              /* 查詢的資料 */
        "2454": {                           /* 查詢的卡片 */
            "id": 2454,                     /* 卡片 ID */
            "name": "憤怒之罪 ‧ 梅里奧達斯",   /* 卡片名稱 */
            "attribute": "暗",               /* 卡片屬性 */
            "race": "魔族",                  /* 卡片種族 */
            "rarity": 6,                    /* 卡片稀有度 */
            "cost": 14,                     /* 卡片空間 */
            "series": "眾神的逆鱗",          /* 卡片系列名稱 */
            "stats": {                      /* 卡片初等數值 */
                "hp": 878,
                "attack": 1231,
                "recovery": 68
            },
            "stats_max": {                  /* 卡片滿等數值 */
                "hp": 2007,
                "attack": 2687,
                "recovery": 407
            },
            "skills": {                     /* 卡片技能 */
                "active": [                 /* 卡片主動技 */
                    {
                        "name": "全反擊",
                        "effect": "1 回合內\nI. 自身不能發動攻擊\nII. 所受傷害不會使你死亡\n(包括「喋血屠刀」、「一擊必殺」等\n扣除召喚師指定 % 生命力的敵技\n所造成的傷害)\nIII. 以所受傷害 1000 倍\n⇒ 對敵方攻擊者進行\n相剋屬性反擊\n(此傷害無視防禦力及\n「強化突破」敵技)\nIV. 下回合，將本回合\n所受傷害的 3 倍\n⇒ 加至自身攻擊力\n⇒ 最多加至 32500",
                        "cd": {
                            "max": 18,
                            "min": 7
                        }
                    },
                    {
                        "name": "變身",
                        "effect": "I. 變身\nII. 引爆心符石\n⇒ 掉落暗魔族強化符石\n2 回合內\nIII. 心符石的掉落率降至 0\nIV. 將原有機率增加至\n⇒ 暗符石的掉落率\nV. 將掉落的暗符石\n⇒ 以暗魔族強化符石代替\nVI. 魔族攻擊力及回復力 1.7 倍",
                        "switch": 2455,
                        "cd": {
                            "max": 18,
                            "min": 7
                        }
                    }
                ],
                "leader": [                 /* 卡片隊長技 */
                    {
                        "name": "支配憤怒",
                        "effect": "隊伍中只有人類、妖精類、魔族或\n「最高神的女兒 ‧ 伊麗莎白」時：\nI. 全隊攻擊力 7 倍、\n生命力及回復力 1.5 倍\nII. 暗符石兼具 50% 其他符石效果\nIII. 以所受傷害 700 倍\n⇒ 對敵方進行相剋屬性反擊\n(此傷害無視防禦力及「強化突破」敵技)\nIV. 達成 ≥7 連擊 (Combo)\n⇒ 全隊攻擊力額外 1.7 倍"
                    }
                ],
                "team": [                   /* 卡片隊伍技 */
                    {
                        "effect": "I. 必然延長移動符石時間 2 秒\nII. 「七大罪」\n⇒ 生命力、攻擊力、回復力 1.2 倍\nIII. 將移動符石時觸碰的符石\n⇒ 轉化為強化符石\nIV. 其他屬性符石\n⇒ 兼具 50% 暗符石效果\nV. 每消除 2 連擊 (Combo)\n⇒ 額外計算多 1 連擊 (Combo)",
                        "condition": "以「憤怒之罪 ‧ 梅里奧達斯」\n作隊長及戰友；或\n以「憤怒之罪 ‧ 梅里奧達斯」及\n「魔神化 ‧ 梅里奧達斯」作隊長及戰友"
                    },
                    {
                        "effect": "最左方的「看板娘 ‧ 伊麗莎白」及\n最左方的「憤怒之罪 ‧ 梅里奧達斯」\n⇒ 生命力、攻擊力、回復力 1.5 倍",
                        "condition": "以「憤怒之罪 ‧ 梅里奧達斯」\n及「看板娘 ‧ 伊麗莎白」作成員"
                    },
                    {
                        "effect": "＊此召喚獸於 CD 0 時可以變身，變身後將以消耗能量點的方式發動技能。召喚獸的技能等級愈高，發動技能時所需的能量值愈低。\n變身時，能量點為全滿狀態 (20 點)；當能量點未滿時，可以於 1 回合內消除 5 粒或以上的暗符石，以儲存 1 點能量點。",
                        "condition": null
                    }
                ]
            },
            "info": "【眾神的逆鱗】\n\nCV：梶裕貴\n\n「眾神的逆鱗」系列練技素材：\n- ID 2462 霍克\n- ID 2471 紅色魔神\n- ID 2472 灰色魔神", /* 卡片額外資訊 */
            "story": "背負七大罪的「憤怒之罪」、「七大罪」的團長，也是移動酒館「豬帽子亭」的店長。外表是名少年，實際的身份是「七大罪」的團長。", /* 卡片故事 */
            "table": [                      /* 卡片各等級數值表：table[n] 為 n等的數值 */
                null,
                {
                    "hp": 878,              /* 卡片各等級生命力 */
                    "attack": 1231,         /* 卡片各等級攻擊力 */
                    "recovery": 68,         /* 卡片各等級回復力 */
                    "levelup_exp": 521,     /* 卡片各等級升級所需經驗值（升至下一級） */
                    "total_exp": 0,         /* 卡片各等級累積經驗值 */
                    "exp": 1200,            /* 卡片各等級拿去餵的經驗值 */
                    "sell": 6000            /* 卡片各等級分解的價值 */
                },
                {
                    "hp": 890,
                    "attack": 1246,
                    "recovery": 71,
                    "levelup_exp": 1562,
                    "total_exp": 521,
                    "exp": 2200,
                    "sell": 6100
                },
                {
                    "因為太長了": "所以中間省略",
                    "真正的請求不會省略": "請放心"
                },
                {
                    "hp": 1995,
                    "attack": 2672,
                    "recovery": 403,
                    "levelup_exp": 101520,
                    "total_exp": 4898480,
                    "exp": 98200,
                    "sell": 15700
                },
                {
                    "hp": 2007,
                    "attack": 2687,
                    "recovery": 407,
                    "levelup_exp": 102562,
                    "total_exp": 5000000,
                    "exp": 99200,
                    "sell": 15800
                }
            ]
        },
        "2455": {
            "id": 2455,
            "name": "魔神化 ‧ 梅里奧達斯",
            "attribute": "暗",
            "race": "魔族",
            "rarity": 6,
            "cost": 16,
            "series": "眾神的逆鱗",
            "stats": {
                "hp": 1229,
                "attack": 1605,
                "recovery": 95
            },
            "stats_max": {
                "hp": 2287,
                "attack": 2877,
                "recovery": 417
            },
            "skills": {
                "active": [
                    {
                        "name": "全反擊 ‧ 強",
                        "effect": "1 回合內\nI. 自身不能發動攻擊\nII. 所受傷害不會使你死亡\n(包括「喋血屠刀」、「一擊必殺」等\n扣除召喚師指定 % 生命力的敵技\n所造成的傷害)\nIII. 以所受傷害 2000 倍\n⇒ 對敵方攻擊者進行\n相剋屬性反擊\n(此傷害無視防禦力及\n「強化突破」敵技)\nIV. 下回合，將本回合\n所受傷害的 5 倍\n⇒ 加至自身攻擊力\n⇒ 最多加至 56000\n\n註：「全反擊」技能在面對「扣除召喚師指定 % 生命力」以外「防禦崩壞」敵技時，仍會因生命力不足而導致死亡。",
                        "ep": {
                            "max": 13,
                            "min": 7
                        }
                    },
                    {
                        "name": "神千斬",
                        "effect": "I. 敵方全體點燃\nII. 使受影響目標\n⇒ 轉為暗屬性\nIII. 每回合以 100 倍自身攻擊力\n⇒ 對敵方全體造成暗屬性傷害\n，並持續至死亡\nIV. 效果持續期間\n⇒ 暗屬性及魔族攻擊力 1.7 倍",
                        "ep": {
                            "max": 13,
                            "min": 7
                        }
                    }
                ],
                "leader": [
                    {
                        "name": "支配憤怒 ‧ 強",
                        "effect": "隊伍中只有人類、妖精類、魔族或\n「最高神的女兒 ‧ 伊麗莎白」時：\nI. 全隊攻擊力 7 倍\nII. 魔族生命力、攻擊力、回復力 2 倍\nIII. 暗符石兼具 50% 其他符石效果\nIV. 以所受傷害 700 倍\n⇒ 對敵方進行相剋屬性反擊\n(此傷害無視防禦力及「強化突破」敵技)\nV. 達成 ≥7 連擊 (Combo)\n⇒ 全隊攻擊力額外 1.7 倍"
                    }
                ],
                "team": [
                    {
                        "effect": "I. 必然延長移動符石時間 2 秒\nII. 魔族攻擊力及回復力 1.7 倍\nIII. 將移動符石時觸碰的符石\n⇒ 轉化為魔族強化符石\nIV. 其他屬性符石\n⇒ 兼具 50% 暗符石效果\nV. 每消除 2 連擊 (Combo)\n⇒ 額外計算多 1 連擊 (Combo)",
                        "condition": "以「魔神化 ‧ 梅里奧達斯」\n作隊長及戰友"
                    },
                    {
                        "effect": "「最高神的女兒 ‧ 伊麗莎白」\n  每次發動主動技能\n⇒「魔神化 ‧ 梅里奧達斯」的\n     技能 EP 增加 2",
                        "condition": "以「最高神的女兒 ‧ 伊麗莎白」\n及「魔神化 ‧ 梅里奧達斯」作成員"
                    },
                    {
                        "effect": "＊能量儲存條件：1 回合內消除 5 粒或以上的暗符石",
                        "condition": null
                    }
                ]
            },
            "info": "【眾神的逆鱗】\n\nCV：梶裕貴",
            "story": "",
            "table": [
                null,
                {
                    "hp": 1229,
                    "attack": 1605,
                    "recovery": 95,
                    "levelup_exp": 521,
                    "total_exp": 0,
                    "exp": 1200,
                    "sell": 6000
                },
                {
                    "hp": 1240,
                    "attack": 1618,
                    "recovery": 98,
                    "levelup_exp": 1562,
                    "total_exp": 521,
                    "exp": 2200,
                    "sell": 6100
                },
                {
                    "因為太長了": "所以中間省略",
                    "真正的請求不會省略": "請放心"
                },
                {
                    "hp": 2276,
                    "attack": 2864,
                    "recovery": 413,
                    "levelup_exp": 101520,
                    "total_exp": 4898480,
                    "exp": 98200,
                    "sell": 15700
                },
                {
                    "hp": 2287,
                    "attack": 2877,
                    "recovery": 417,
                    "levelup_exp": 102562,
                    "total_exp": 5000000,
                    "exp": 99200,
                    "sell": 15800
                }
            ]
        }
    }
}
```
<a name="link_tos_card_js"></a>
## Javascript Client - TOS_CARD.JS
```javascript
var card = new tos_card();

var card_id = [1,5,9,13,17];
var options = {
    minify: false,
    noskills: false,
    noinfo: false,
    nostory: false,
    notable: false
};

card.get(card_id, options).then(console.log); 
/* 
    card_id: 可為 number, string, array(上限6項)
    options: 非必要，object
*/
```
