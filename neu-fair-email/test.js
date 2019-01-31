const mail = require('@sendgrid/mail');
mail.setApiKey('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')
const website = 'www.codegenerator.com/'
const recipient_code = "wowowowow"

const msg = {
    to: 'gilbert.tensorbros@gmail.com',
    from: 'gilbertjohncuaresma@gmail.com',
    subject: 'NEU Fair 2019 QR Code',
    text: 'Click the link to show your QR Code',
    html: `<a href="${website}/${recipient_code}">Show my QR Code</a>`,
};

mail.send(msg).then((res) => {
    console.log(res)
    console.log('sent')
})