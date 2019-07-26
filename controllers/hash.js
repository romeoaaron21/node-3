const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../secret')

function register(req, res) {
    const db = req.app.get('db');
    const { email, password } = req.body;

    argon2
        .hash(password)
        .then(hash => {
            return db.users.insert({
                email,
                password: hash
            },
            {
                fields: ['id', 'email']
            }
            )
        })
        .then(user => {
            const token = jwt.sign({ userId: user.id}, secret);
            res.status(201).json({ ...user, token });
        })
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}

function login(req, res) {
    const db = req.app.get('db')
    const { email, password } = req.body;
  
    db.users
      .findOne({email},
        {
          fields: ['id', 'email', 'password'],
        })
      .then(user => {
        if (!user) {
          throw new Error('Invalid email');
        }
        return argon2.verify(user.password, password).then(valid => {
          if (!valid) {
            throw new Error('Incorrect password');
          }
          const token = jwt.sign({ userId: user.id }, secret);
          delete user.password; 
          res.status(200).json({ ...user, token });
        });
      })
      .catch(err => {
        if (
          ['Invalid email', 'Incorrect password'].includes(err.message)
        ) {
          res.status(400).json({ error: err.message });
        } else {
          console.error(err);
          res.status(500).end();
        }
      });
}

module.exports = {
    register,
    login
}