
import app from './app';

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  const now = new Date().toLocaleString();
  console.log(`[${now}] Server running on port ${PORT} | Env: ${ENV}`);
});

server.on('error', (err) => {
  console.error('Erro ao iniciar o servidor:', err);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('Encerrando servidor...');
  server.close(() => {
    console.log('Servidor finalizado com sucesso.');
    process.exit(0);
  });
});
