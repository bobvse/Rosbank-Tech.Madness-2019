export default {
    number: {
        getWithMask: function (value) {
            if (value === undefined) {return value; }
            return ('' + value).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        },
        getWithoutMask: function (value) {
            if (value === undefined) {return value; }
            return +('' + value).replace(/[^\d\-]+/gi, '');
        }
    },
    phone: {
        getWithMask: function (value) {
            if (!value) {return value; }
            const x = ('' + value).replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            return !x[2] ? '(' + x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        },
        getWithoutMask: function (value) {
            if (value === undefined) {return value; }
            return ('' + value).replace(/\D/g, '');
        }
    },
    zip: {
        getWithMask: function (value) {
            if (value === undefined) {return value; }
            const x = ('' + value).replace(/\D/g, '').match(/(\d{0,5})(\d{0,4})/);
            return !x[2] ? x[1] : x[1] + '-' + x[2];
        },
        getWithoutMask: function (value) {
            if (value === undefined) {return value; }
            return ('' + value).replace(/\D/g, '');
        }
    },
    uppercase: {
        getWithMask: function (value) {
            if (value === undefined) {return value; }
            return ('' + value).toUpperCase();
        },
        getWithoutMask: function (value) {
            return value;
        }
    }
};
