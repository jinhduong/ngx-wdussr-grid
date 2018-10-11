export function getQueries() {
    try {
        const search = location.search.substring(1);
        const obj = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
        Object.keys(obj).forEach(p => {
            obj[p] = tryParseJson(obj[p]);
        });
        return obj;
    } catch (err) {
        return null;
    }
}

function tryParseJson(str: any) {
    try {
        var jsonObject = JSON.parse(str);
        return jsonObject;
    }
    catch (e) {
        return str;
    }
}