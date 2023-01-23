//   ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
//   ♥            ♥   ♥               ♥♥♥♥♥♥♥♥♥            ♥
//  ♥            ♥ ♥ ♥ ♥                   ♥                 ♥
// ♥            ♥   ♥   ♥                  ♥                  ♥
// ♥           ♥         ♥          ♥♥♥    ♥                  ♥
// ♥          ♥           ♥           ♥    ♥                  ♥
//  ♥        ♥♥           ♥♥            ♥♥                   ♥
//   ♥                                                      ♥
//   ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {  //force hay que cambiarlo a false una vez que subí el deploy
  server.listen(process.env.PORT, () => { //PORT según si es local o en el deploy
    console.log('%s listening at', process.env.PORT); // eslint-disable-line no-console
  });
});
