import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';

import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

const app = express();

app.use = express();

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const jwtConfig = {
    secret: jwtSecret,
    expresIn: '1h',
};

app.listen(3000, () =>
    console.log('Application running on http://localhost:3000')
);

const userDB = [];

const usersSchema = yup.objsect().shape({
    username: yup.string().required(),
    age: yup.number().required().positive().integer(),
    email: yup.string().email().required(),
    password: yup.string().required(),
});

//////////////////////MID/////////////////////////

const validateBody = (usersSchema) => async (req, res, next) => {
    const data = req.body;

    try{
        await usersSchema.validate(data);
        next();
    }   catch (err) {
        res.status(422).json({  message: err.errors.join(', ')});
    }
};

const checkUsernameEmail = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;

    const findUser = usersDB.find((user) => user.username == username);
    const findEmail = userDB.find((user) => user.email == email);

    if (findUser){
        res.status(422).json({  message: `Username ${username} already exists on database!`});
    }
    if (findEmail){
        res.status(422).json({  message: `Email ${email} already exists on databese!`});
    }   else next();
};

const authUser = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({   message: 'Invalid token'    });
    }

    const token = req.headres.authorization.split(' ')[1];

    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({   message: 'Invalid token'});
        }

        const user = usersDB.find((user) => user.username == decoded.username);

        req.user = user;
    });

    next();
};

const verifyUserChagenPass = (req, res, next) => {
    const { uuid } = req.params;
    const { user } = req;

    uuid != user.uuid ? res.status(403).json({ message: 'Permission denied' }) : next();
};


//////////////// crud //////////////////

app.post(
    '/signup',
    validateBody(usersSchema),
    checkUsernameEmail,
    async(req, res) => {
        try{
            const data = req.body;

            const hashedPassword = await bcrypt.hash(data.password, 10);
            const userSerializer = {
                uuid: uuidv4(),
                createdOn: new Date(),
                email: data.email,
                age: data.age,
                username: data.username,
            };
            const userWithPassword = { ...userSerializer, password: hashedPassword };

            userDB.push(userWithPassword);

            res.status(201).json(userSerializer);
        }   catch(err)  {
            res.status(422).json({ message: 'error while creating an user' });
        }
    }
);

app.get('/users', authUser, (req, res) =>{
    res.status(200).json(userDB);
});

app.put(
    '/user/:uuid/password',
    authUser,
    verifyUserChagenPass,
    async(req, res) => {
        try{
            const { user } = req;
            const { password } = req.body;

            const hasedPassword = await bcrypt.hash(password, 10);

            user.password = hashedPassword;
        }   catch(err) {
            res.status(400).jason({ message: 'something went wrong' });
        }

        res.status(204).json('');
    }
);

/////////////// login ///////////////

app.post('/login', async(req, res) => {
    const user = userDB.find((user)=> user.username == data.username);

    try {
        const match = await bcrypt.compare(data.password, user.password);

        const token = jwt.sign(
            {
                username: data.username,
                password: user.password,
            },
            jwtConfig.secret, {
                expiresIn: jwtConfig.expiresIn
            }
        );

        match ? res.status(200).json({ token: token }) : res.status(401).json({ message: 'invalid credentials' });
    } catch (err) {
        res.status(401).json({ message: 'invalid credentials' });
    }
});