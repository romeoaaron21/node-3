function create(req, res) {
    const db = req.app.get('db');
    const { email, password } = req.body;

    db.users
    .insert({
      email,
      password,
      user_profiles: [{
          userId: undefined,
          about: null,
          thumbnail: null,
        }],
    },
    {
      deepInsert: true,
    }
  )
  .then(user => res.status(201).json(user))
  .catch(err => {
    console.error(err);
  });
}

function fetchUsers(req, res) {
    const db = req.app.get('db');

    db.users
    .find()
    .then(users => res.status(200).json(users))
    .catch(err => {
        console.error(err);
        res.status(500).end()
    })
}

function fetchId(req, res) {
    const db = req.app.get('db');

    db.users
    .findOne(req.params)
    .then(user => res.status(200).json(user))
    .catch(err => {
        console.error(err);
        res.status(500).end()
    })
}

function fetchProfile(req, res) {
    const db = req.app.get('db');

    db.user_profiles
    .findOne({userId:req.params.id})
    .then(userProfile => res.status(200).json(userProfile))
    .catch(err => {
        console.error(err);
        res.status(500).end()
    })
}

module.exports = {
    create,
    fetchUsers,
    fetchId,
    fetchProfile,
}