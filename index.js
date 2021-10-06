
const express = require('express');

const cors = require('cors');

const nodemailer = require('nodemailer');


const app = express();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send({
        ok: true
    });
});


app.post('/send-message', (req, res) => {
    
    const {name, email, message} = req.body;

    if(!name || !email || !message){
        return res.send({
            ok: false,
            msg: 'ningun campo puede estar vacio'
        });
    }

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'enviarexcelfinanzas@gmail.com',
            pass: 'arjomabelu19'
        }
    });

    const optionsEmail = {
        from: 'enviarexcelfinanzas@gmail.com',
        to: 'LAOI.OROZCO.ANGEL@gmail.com',
        subject: 'MENSAJE PORTAFOLIO',
        text: `${name} \n\n ${message} \n\n ${email}`
    };

    transport.sendMail(optionsEmail, (err) => {
        if(err){
            return res.status(401).json({
                ok: false,
                msg: 'error al enviar email'
            })
        }
    });

    res.send({
        ok: true,
        msg: 'mensaje enviado'
    });
});


app.listen(process.env.PORT, () => {
    console.log('app listening');
});