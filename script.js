var map = new AMap.Map('map', {
    center: [116.397428, 39.90923],
    zoom: 10
});

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        showProperties(data);
        document.getElementById('priceFilter').addEventListener('input', function() {
            const maxPrice = this.value;
            const filteredProperties = data.filter(item => item.price <= maxPrice);
            showProperties(filteredProperties);
        });
    });

function showProperties(properties) {
    const list = document.getElementById('propertyList');
    list.innerHTML = '';
    properties.forEach(property => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${property.title}</strong><br>价格：${property.price}元<br>面积：${property.area}㎡<br>地址：${property.address}`;
        list.appendChild(li);
        var marker = new AMap.Marker({
            position: new AMap.LngLat(property.lng, property.lat),
            map: map,
            title: property.title
        });
    });
}