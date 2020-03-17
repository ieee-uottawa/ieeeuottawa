import React from 'react';
import { Typography } from './helpers/material-ui';

const isServerSideRendering = () => typeof window === 'undefined';

const isFacebookApp = () => {
    if (isServerSideRendering()) return false;
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    return ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1;
};

const renderUnsupportedBrowser = () => {
    return (
        isFacebookApp() && (
            <div style={{ textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom color="primary">
                    Unsupported Browser
                </Typography>
            </div>
        )
    );
};

const moneyFormatter = new Intl.NumberFormat('en-CA', {
    currency: 'CAD',
    style: 'currency'
});
const isDevEnvironment = process.env.NODE_ENV === 'development';

const capitalize = str => str.substring(0, 1).toUpperCase() + str.substring(1);

const isMobile = () => {
    return (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
            navigator.userAgent
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            navigator.userAgent.substr(0, 4)
        )
    );
};

// const ArrayLikeToString = arg => Array.prototype.toString.call(arg);

// const getTextFeature = (text, color) => {
//     try {
//         const canvas = document.createElement('canvas');
//         canvas.width = 1;
//         canvas.height = 1;

//         const ctx = canvas.getContext('2d');
//         ctx.textBaseline = 'top';
//         ctx.font = '100px -no-font-family-here-';
//         ctx.fillStyle = color;
//         ctx.scale(0.01, 0.01);
//         ctx.fillText(text, 0, 0);

//         return ctx.getImageData(0, 0, 1, 1).data;
//     } catch (e) {
//         return false;
//     }
// };

// const compareFeatures = (feature1, feature2) => {
//     const feature1Str = ArrayLikeToString(feature1);
//     const feature2Str = ArrayLikeToString(feature2);
//     return feature1Str === feature2Str && feature1Str !== '0,0,0,0';
// };

// const isEmojiSupported = text => {
//     const feature1 = getTextFeature(text, '#000');
//     const feature2 = getTextFeature(text, '#fff');
//     return feature1 && feature2 && compareFeatures(feature1, feature2);
// };

const flattenDeep = arr =>
    arr.reduce(
        (acc, val) =>
            Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
        []
    );

const showPricing = (pricing, formatter = moneyFormatter) =>
    pricing
        .map(({ quantity, price }) => {
            if (quantity === 1) return formatter.format(price);
            return `${quantity} for ${formatter.format(price)}`;
        })
        .join(' or ');

const calculatePrice = (price, qty) => {
    let quantity = qty;
    if (price.length === 1) return price[0].price * quantity;

    let total = 0;
    const filterPricing = ({ quantity: count }) => count <= quantity;
    const sortPricing = (a, b) => b.quantity - a.quantity;
    do {
        const { price: pricePer, quantity: quantityPer } = price
            .filter(filterPricing)
            .sort(sortPricing)[0];
        total += pricePer;
        quantity -= quantityPer;
    } while (quantity > 0);

    return total;
};

export {
    calculatePrice,
    capitalize,
    flattenDeep,
    isDevEnvironment,
    isMobile,
    isFacebookApp,
    isServerSideRendering,
    renderUnsupportedBrowser,
    moneyFormatter,
    showPricing
};
