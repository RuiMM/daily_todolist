export default function errorHandler() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = {
        error: {
          message: err.message || '服务器内部错误',
          ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
      };
      ctx.app.emit('error', err, ctx);
    }
  };
} 