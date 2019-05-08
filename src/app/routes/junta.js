const dbConnection = require('../../config/dbConnection');

let mailer = require('../js/mailer');

let sqlupdate = 'UPDATE products SET availability = ? WHERE idproduct = ?';
let sqldelete = 'DELETE FROM products WHERE idproduct = ?';
let sqldelete2 = 'DELETE FROM promos WHERE idpromos = ?';


module.exports = app => {
  const connection = dbConnection();
  console.log("CONNECTED");

  function handleDisconnect() {    
    const connection = dbConnection();                             
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleDisconnect();                        
      } else {                                      
        throw err;                                 
      }
    });
  };
  
  handleDisconnect();
  
  app.get('/products', (req,res) => {
    connection.query('SELECT * FROM products;SELECT * FROM promos', (err, result) => {
      setInterval(function () {
        connection.query('SELECT 1');
      }, 5000);
      res.render('pages/products', {
        products: result[0],
        promos: result[1]
      });
    });

  });

  app.get('/', (req,res) => {
    res.redirect('/products');
  });

  app.post('/products', (req,res) => {
    const { name, price, description} = req.body;
    let availability = 'Disponible';

    connection.query('INSERT INTO products SET?', {
      name,
      price,
      description,
      availability
    }, (err, result) => {
      res.redirect('/products');
    });
  });

  app.post('/promos', (req,res) => {
    const { name, vig, description} = req.body;
    connection.query('INSERT INTO promos SET?', {
      name,
      vig,
      description
    }, (err, result) => {
      res.redirect('/products');
    });
  });

  app.post('/productsedit', (req,res) => {
    let data = [req.body.availability, req.body.id_products];
    connection.query(sqlupdate, data, (error, results, fields) => {
      if (error){
        return console.error(error.message);
      }
      console.log('Rows affected:', results.affectedRows, data);
      res.redirect('/products');
    });
  });

  app.post('/productsdelete', (req,res) => {
    let data = [req.body.id_products];
    connection.query(sqldelete, data, (error, results, fields) => {
      if (error){
        return console.error(error.message);
      }
      console.log('Rows affected:', results.affectedRows, data);
      res.redirect('/products');
    });
  });

  app.post('/promodelete', (req,res) => {
    let data = [req.body.id_products];
    connection.query(sqldelete2, data, (error, results, fields) => {
      if (error){
        return console.error(error.message);
      }
      console.log('Rows affected:', results.affectedRows, data);
      res.redirect('/products');
    });
  });

  app.post('/cleartable', (req,res) => {
    mailer.connect();
    mailer.sendMail();
    connection.query('TRUNCATE TABLE products');
    connection.query('DELETE FROM products', (err, result) => {
      res.redirect('/products');
    });
  });

  app.post('/cleartablepromo', (req,res) => {
    mailer.connect();
    mailer.sendMail();
    connection.query('TRUNCATE TABLE promos');
    connection.query('DELETE FROM promos', (err, result) => {
      res.redirect('/products');
    });
  });

};