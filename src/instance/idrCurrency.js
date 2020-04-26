let convertToRupiah = function (value) {
    var rupiah = '';
    var valuerev = value.toString().split('').reverse().join('');
    for (var i = 0; i < valuerev.length; i++)
        if (i % 3 == 0) rupiah += valuerev.substr(i, 3) + '.';
    return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
}

export default {
    convert: convertToRupiah,
}