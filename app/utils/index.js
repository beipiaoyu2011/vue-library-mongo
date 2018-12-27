exports.callbackData = (obj) => {
    let status = obj.status;
    let code = obj.code;
    let data = obj.data || null;
    let _obj = {
        code: status,
        data: {
            code: code
        }
    };
    if (obj.code == 0) {
        _obj.data.data = data;
    } else {
        _obj.data.message = data;
    }
    return _obj;
}
