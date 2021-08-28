const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name, link) =>{
    sgMail.send({
        to:email,
        from:'mekre.abate@gmail.com',
        subject:"SUQACHIN - Glad to have you on board",
        text:`Welcome to Suqachin, ${name}. a fast and reliable online shopping center. By clicking the link, Please verify your email to continue\n\n ${link}\n\n\n This link expires in 20 minutes`
    })
}


module.exports = {
    sendWelcomeEmail
}