module.exports = {
  dialect: 'postgres',
  host: 'db_server',
  username: 'todouser',
  password: 'todopassword',
  database: 'tasklist',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
}; 