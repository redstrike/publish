module.exports = {
  app: {
    name: {
      doc: "The applicaton name",
      format: String,
      default: "DADI Publish (Repo Default)"
    },
    publisher: {
      doc: "The organisation name",
      format: String,
      default: "DADI"
    },
    baseUrl: {
      doc: "The base URL of the application",
      format: "url",
      default: "http://localhost:3001"
    }
  },
  apis: {
    doc: "Connected APIs",
    format: Array,
    default: [],
    enabled: {
      type: Boolean,
      default: true
    },
    host: {
      format: "ipaddress",
      default: "0.0.0.0"
    },
    port: {
      format: "port",
      default: 3000
    },
    database: {
      format: String,
      default: ""
    },
    version: {
      format: String,
      default: "1.0"
    },
    clientKey: {
      format: Object,
      clientId: {
        format: String,
        default: "testClient"
      },
      secret: {
        format: String,
        default: "superSecret"
      }
    }
  },
  server: {
    host: {
      doc: "The IP address or interface to bind to",
      format: "ipaddress",
      default: "0.0.0.0"
    },
    port: {
      doc: "The port to bind to",
      format: "port",
      default: 3001
    },
    protocol: {
      doc: "The protocol the web application will use",
      format: String,
      default: "http",
      env: "PROTOCOL"
    },
    sslPassphrase: {
      doc: "The passphrase of the SSL private key",
      format: String,
      default: "",
      env: "SSL_PRIVATE_KEY_PASSPHRASE"
    },
    sslPrivateKeyPath: {
      doc: "The filename of the SSL private key",
      format: String,
      default: "",
      env: "SSL_PRIVATE_KEY_PATH"
    },
    sslCertificatePath: {
      doc: "The filename of the SSL certificate",
      format: String,
      default: "",
      env: "SSL_CERTIFICATE_PATH"
    },
    sslIntermediateCertificatePath: {
      doc: "The filename of an SSL intermediate certificate, if any",
      format: String,
      default: "",
      env: "SSL_INTERMEDIATE_CERTIFICATE_PATH"
    },
    sslIntermediateCertificatePaths: {
      doc: "The filenames of SSL intermediate certificates, overrides sslIntermediateCertificate (singular)",
      format: Array,
      default: [],
      env: "SSL_INTERMEDIATE_CERTIFICATE_PATHS"
    }
  },
  paths: {
      doc: "Customisable asset paths",
      format: Object,
      default: {
        language: __dirname + '/../language',
        workspace: __dirname + '/../workspace',
        db: __dirname + '/../workspace/db'
      }
    },
  TZ: {
    doc: "Process Timezone",
    default: "Europe/London"
  },
  env: {
    doc: "The applicaton environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  ui: {
    inputDelay: {
      doc: "Delay in ms to debounce inputs by",
      format: "integer",
      default: 100
    }
  }
}
