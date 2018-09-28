
// 系统配置
export let System = {
  API_SERVER_PORT: '3000', // API服务器监听的端口号
  WS_CONFIG: {
    port: 3001,
    perMessageDeflate: {
      zlibDeflateOptions: { // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3,
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      // Other options settable:
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      //clientMaxWindowBits: 10,       // Defaults to negotiated value.
      serverMaxWindowBits: 10,       // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10,          // Limits zlib concurrency for perf.
      threshold: 1024,               // Size (in bytes) below which messages
      // should not be compressed.
    }
  }
}
