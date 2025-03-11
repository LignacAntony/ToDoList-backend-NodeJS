import app from './app';

process.on('uncaughtException', (error) => {
  console.error('ERREUR NON GÉRÉE:', error);
  console.error(error.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promesse rejetée non gérée:', promise);
  console.error('Raison:', reason);
});

let server;

try {
  server = app.listen(3333, '0.0.0.0', () => {
    console.log('Serveur démarré sur le port 3333');
    console.log('Routes disponibles: /test, /test-db, /users, ...');
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error('Le port 3333 est déjà utilisé. Veuillez arrêter le processus qui utilise ce port et réessayer.');
    } else {
      console.error('Une erreur est survenue lors du démarrage du serveur:', error);
    }
  });
} catch (error) {
  console.error('Erreur lors du démarrage du serveur:', error);
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown() {
  console.log('Arrêt gracieux du serveur...');
  if (server) {
    server.close(() => {
      console.log('Serveur arrêté avec succès');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('Impossible de fermer les connexions dans le délai imparti, arrêt forcé');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
}