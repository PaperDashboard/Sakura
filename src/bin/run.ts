import app from "../app";
import * as d from 'debug'
import * as http from 'http'

const debug = d('Sakura:server')

function normalizePort(value) {
    const port: number = parseInt(value, 10);
    if (isNaN(port)) {
        return value;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

const port = normalizePort(process.env.PORT || 3000);

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

const bind = typeof port === 'string'
    ? 'Pipe: ' + port
    : 'Port: ' + port

server.on('error', function (err) {
    if (err['syscall'] !== 'listen') {
        throw err
    }

    switch (err['code']) {
        case 'EACCES': {
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        }
        case 'EADDRINUSE': {
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        }
        default: {
            throw err
        }
    }
})

server.on('listening', function(){
    const addr = server.address()
    debug("Listening on " + bind)
})
