function now() {
  return `[${new Date().toISOString()}]`;
}

/**
 * logger
 *
 * @param {string} context
 */
function logger(context) {
  if (global.__TEST__) {
    return {
      log() { },
      info() { },
      warn() { },
      error() { },
    };
  }

  return {
    log(...args) {
      console.log(now(), context, ...args);
    },
    info(...args) {
      console.info(now(), context, ...args);
    },
    warn(...args) {
      console.warn(now(), context, ...args);
    },
    error(...args) {
      console.error(now(), context, ...args);
    },
  };
}

module.exports = logger;
