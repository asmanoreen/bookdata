var User = require('../model').User;
var cloudinary = require('../cloudinary.js').cloudinary;


function bookRecord(req, res) {

    pageLimit = req.params.pageLimit;
    pageOffset = req.params.pageOffset;


    User.findAndCountAll({  offset: pageOffset , limit: pageLimit , order: [['id', 'DESC']]})
    .then(usersCount => {
        if(usersCount.count){

          User.findAll({  offset: pageOffset , limit: pageLimit , order: [['id', 'DESC']]})
          .then(users => {
              if(users){ res.json({
                  usersListCount:usersCount.count,
                  bookObj:users,
                  success:true
                  })
                  console.log("success"); }
              else { res.json({ success:false }) } })
          .catch(err => res.json(users))
            console.log(usersCount.count ,"success"); }
        else { res.json({ success:false }) } })
    .catch(err => res.json(users))

}

function bookRecordbyid(req, res) {
  console.log(req.params.id);

    User.findAll({ where: {  id: req.params.id } })
      .then(users => {
          if(users){ res.json({
              bookObj:users,
              success:true
              })
              console.log("success"); }
          else { res.json({ success:false }) } })
      .catch(err => res.json(users))

}

function addBook(req, res) {

  console.log(req.file);
  console.log(req.file.path);
  var bookCoverFile = req.file.path;
cloudinary.uploader.upload(bookCoverFile,function(result) {
                  console.log(result.url);
                  if(result.url){
                    console.log("create url");
                    User.create({
                        authorName: req.body.authorName,
                        bookName: req.body.bookName,
                        publishDate: req.body.publishDate,
                        bookCoverImg:result.url
                    })
                    .then(users => {
                        if(users){ res.json({ success:true })
                          console.log("success"); }
                        else { res.json({ success:false }) } })
                    .catch(err => res.json(users)) }
                  else {
                    console.log("some wrong with cloudinary funtion");
                  }
                },{ resource_type: "auto"});

}

function deleteBook(req, res) {

    console.log(req.params);

    User.destroy({  where: { id: req.params.id, } })
        .then(users => {
          if(users){ res.json({ success:true })
            console.log("success"); }
          else { res.json({ success:false }) }  })
        .catch(err => res.json(users))
}

function updateBook(req, res) {

    console.log(req.params);
    console.log(req.body);
    console.log(req.file);
    if(req.file==undefined){
      User.update(
          {
            authorName: req.body.authorName,
            bookName: req.body.bookName,
            publishDate: req.body.publishDate,
          },
          { where: { id: req.params.id, } })
           .then(users => {
              if(users){ res.json({ success:true })
                  console.log("success");}
              else { res.json({ success:false }) }  })
          .catch(err => res.json(users))

    }else {
        console.log(req.file);
        var coverImgFile = req.file.path;
      cloudinary.uploader.upload(coverImgFile,function(result) {
                        console.log(result.url);
                        if(result.url){
                          console.log("create url");

                          User.update(
                              {
                                authorName: req.body.authorName,
                                bookName: req.body.bookName,
                                publishDate: req.body.publishDate,
                                bookCoverImg:result.url
                              },
                              { where: { id: req.params.id, } })
                               .then(users => {
                                  if(users){ res.json({ success:true })
                                      console.log("success");}
                                  else { res.json({ success:false }) }  })
                              .catch(err => res.json(users))

                         }

                        else {
                          console.log("some wrong with cloudinary funtion");
                        }
                      },{ resource_type: "auto"});


    }




}

function addLikes(req, res){

  console.log(req.params);
  console.log(req.body);

  User.update(
      {
        likes: req.body.numberOfLikes,
      },
      { where: { id: req.params.id, } })
       .then(users => {
          if(users){ res.json({ success:true })
              console.log("success");}
          else { res.json({ success:false }) }  })
      .catch(err => res.json(users))

}
function addDisLikes(req, res){

  console.log(req.params);
  console.log(req.body);

  User.update(
      {
        dislikes: req.body.numberOfDisLikes,
      },
      { where: { id: req.params.id, } })
       .then(users => {
          if(users){ res.json({ success:true })
              console.log("success");}
          else { res.json({ success:false }) }  })
      .catch(err => res.json(users))

}

function searchRecord(req, res) {

    console.log(req.params.searchText);

    User.findAll({where: {authorName: {like: '%' +  req.params.searchText + '%'}}})
        .then(users => {
          if(users){  res.json({
              bookObj:users,
              success:true })
              console.log(users ,"success"); }
          else { res.json({ success:false }) } })
        .catch(err => res.json(users))
}




module.exports = {

    addBook: addBook,
    bookRecord: bookRecord,
    deleteBook: deleteBook,
    updateBook: updateBook,
    bookRecordbyid:bookRecordbyid,
    searchRecord:searchRecord,
    addLikes:addLikes,
    addDisLikes:addDisLikes

};
