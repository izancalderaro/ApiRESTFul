"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgnoreFavicon = exports.ErrorHandlerApi = void 0;
function ErrorHandlerApi(err, _req, res, _next) {
    console.log(`Api errorhandler foi executada: ${err}`);
    res.status(500).json({
        errorCode: 'ERR-001',
        message: 'Erro Interno do Servidor'
    });
}
exports.ErrorHandlerApi = ErrorHandlerApi;
function IgnoreFavicon(err, req, res) {
    try {
        if (req.originalUrl.includes('favicon.ico')) {
            res.status(204).end();
        }
    }
    catch (_a) {
        console.log(`IgnoreFavicon foi executado com o erro: ${err}`);
    }
}
exports.IgnoreFavicon = IgnoreFavicon;
