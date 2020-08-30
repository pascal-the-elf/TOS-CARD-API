# 神魔之塔卡片 API
非官方卡片資訊 API

## 卡片資訊項目
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
## 測試 DEMO
[前往 DEMO 網站](https://pascal-the-elf.github.io/TOS-CARD-API/demo)
