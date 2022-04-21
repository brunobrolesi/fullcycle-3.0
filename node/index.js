const express = require('express') 
const mysql = require('mysql')

const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'fullcycle'
}

const names = ['Bruno', 'Michelle', 'Wesley', 'Felipe', 'Maria']

app.get('/', (req,res) => {
  const connection = mysql.createConnection(config)
  const name = names[Math.floor(Math.random() * (4 + 1))]
  const insertQuery = `INSERT INTO people(name) values ("${name}")`
  connection.query(insertQuery)
  const selectQuery = 'SELECT * FROM people'
  connection.query(selectQuery, (err, result) => {
    if (err) throw err;
    const namesList = result.reduce((acc, current) => acc.concat(`<li>${current.name}</li>`), '')
    res.send(`
    <h1>Full Cycle</h1>
    ${namesList}
    `)
  })
  connection.end()
})

app.listen(port, ()=> {
  console.log('Rodando na porta ' + port)
})
