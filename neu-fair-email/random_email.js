const api_keys = [

    {
        key: "apikey0",
        emails: [
            'email0@gmail.com',
            'email1@gmail.com',
        ]
    },

    {
        key: "apikey1",
        emails: [
            'email2@gmail.com',
            'email3@gmail.com',
        ]
    },

    {
        key: "apikey2",
        emails: [
            'email4@gmail.com',
            'email5@gmail.com',
        ]
    },
]


function getRandomApiKeyAndEmail() {
    let random_api_key = api_keys[randomInt(0, api_keys.length)];
    let random_email = random_api_key.emails[randomInt(0, random_api_key.emails.length)]

    return {
        key: random_api_key.key,
        email: random_email
    }
}

function randomInt(min, max) {
    //returns random int not max inclusive
    return Math.floor((Math.random() * max - min) + min)
}

console.log(getRandomApiKeyAndEmail())