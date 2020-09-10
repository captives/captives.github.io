var count = 0;
var list = [];
onconnect = function (e) {
    var port = e.ports[0];
    console.log('onconnect ---');
    port.onmessage = function (event) {
        var data = Object.assign({}, event.data);
        console.log('--', list.length, data.id, data.value);

        var items = list.find(item => item.id === data.id);
        if (!items || items.length == 0) {
            list.push({ id: data.id, port });
            console.log('add port', data.id);
        }

        count += data.value;
        data.value = count;
        broadcast(data);
    }

    port.start();
};

function broadcast(data) {
    list.forEach(function (item) {
        item.port.postMessage(data);
    });
}