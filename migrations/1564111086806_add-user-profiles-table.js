exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('user_profiles', {
      id: {
        type: 'serial',
        primaryKey: true,
      },
      userId: {
        type: 'integer',
        notNull: true,
        references: '"users"',
      },
      about: {
        type: 'text',
      },
      thumbnail: {
        type: 'text',
      },
    });
  };

exports.down = (pgm) => {

};
