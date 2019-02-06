const Sequelize = require('sequelize');
const sequelize = new Sequelize('bookdb', 'user_1', 'test123', {
    dialect: 'postgres',
    host: "localhost",
    port: 5432,
})
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

  const User = sequelize.define('bookdata', {
    authorName: {
      type: Sequelize.STRING
    },
    bookName: {
      type: Sequelize.STRING
    },
    publishDate: {
      type: Sequelize.DATE
    },
    bookCoverImg: {
      type:Sequelize.STRING
    },
    likes:{
      type:Sequelize.INTEGER
    },
    dislikes:{
      type:Sequelize.INTEGER
    }

  });


  module.exports = {
    User
  }










  // var Sequelize = require('sequelize');
  // var sequelize = new Sequelize('bookdb', 'user_1', 'test123', {
  //     dialect: 'postgres',
  //     host: "localhost",
  //     port: 5432,
  // })
  // sequelize
  //     .authenticate()
  //     .then(() => {
  //         console.log('Connection has been established successfully.');
  //     })
  //     .catch(err => {
  //         console.error('Unable to connect to the database:', err);
  //     });
  //
  // var User = sequelize.define('bookdetail', {
  //     authorName: {
  //         type: Sequelize.STRING
  //     },
  //     bookName: {
  //         type: Sequelize.STRING
  //     },
  //     publishDate: {
  //         type: Sequelize.DATE
  //     }
  // });

  //
  // const User = sequelize.define('bookdetail', {
  //     authorName: {
  //         type: Sequelize.STRING
  //     },
  //     bookName: {
  //         type: Sequelize.STRING
  //     },
  //     publishDate: {
  //         type: Sequelize.DATE
  //     }
  //   })

  // User.sync({force: true}).then(() => {
  //   // Table created
  //   return User.create({
  //     authorName: 'John',
  //     bookName: 'Hancock',
  //     publishDate:'2001-09-20',
  //     bookCoverImg:'dfyghjsedtrfyguhiurtyugvhbrxdtfcygvhbfcgv',
  //     likes:0,
  //     dislikes:0
  //
  //   });
  // });
