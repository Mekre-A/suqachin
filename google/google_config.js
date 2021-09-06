const { google } = require('googleapis');

const createConnection = ()=>{
    return new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_SECRET_ID,
        `localhost:${process.env.PORT}`
    )
}