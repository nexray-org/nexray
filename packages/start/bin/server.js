"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var NextServer = require('next/dist/server/next-server').default;
var http = require('http');
var path = require('path');
process.env.NODE_ENV = 'production';
process.chdir(__dirname);
// Make sure commands gracefully respect termination signals (e.g. from Docker)
// Allow the graceful termination to be manually configurable
if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
    process.on('SIGTERM', function () { return process.exit(0); });
    process.on('SIGINT', function () { return process.exit(0); });
}
var handler;
var server = http.createServer(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, handler(req, res)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.error(err_1);
                res.statusCode = 500;
                res.end('internal server error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
var currentPort = parseInt(process.env.PORT, 10) || 3000;
server.listen(currentPort, function (err) {
    if (err) {
        console.error('Failed to start server', err);
        process.exit(1);
    }
    var nextServer = new NextServer({
        hostname: 'localhost',
        port: currentPort,
        dir: path.join(__dirname, '../', 'node_modules/@nexray/app'),
        dev: false,
        customServer: false,
        conf: {
            env: {},
            webpack: null,
            webpackDevMiddleware: null,
            eslint: { ignoreDuringBuilds: false },
            typescript: { ignoreBuildErrors: false, tsconfigPath: 'tsconfig.json' },
            distDir: './.next',
            cleanDistDir: true,
            assetPrefix: '',
            configOrigin: 'next.config.js',
            useFileSystemPublicRoutes: true,
            generateEtags: true,
            pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
            target: 'server',
            poweredByHeader: true,
            compress: true,
            analyticsId: '',
            images: {
                deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
                imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
                path: '/_next/image',
                loader: 'default',
                loaderFile: '',
                domains: [],
                disableStaticImages: false,
                minimumCacheTTL: 60,
                formats: ['image/webp'],
                dangerouslyAllowSVG: false,
                contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
                remotePatterns: [],
                unoptimized: true,
            },
            devIndicators: { buildActivity: true, buildActivityPosition: 'bottom-right' },
            onDemandEntries: { maxInactiveAge: 15000, pagesBufferLength: 2 },
            amp: { canonicalBase: '' },
            basePath: '',
            sassOptions: {},
            trailingSlash: false,
            i18n: null,
            productionBrowserSourceMaps: false,
            optimizeFonts: true,
            excludeDefaultMomentLocales: true,
            serverRuntimeConfig: {},
            publicRuntimeConfig: {},
            reactStrictMode: true,
            httpAgentOptions: { keepAlive: true },
            outputFileTracing: true,
            staticPageGenerationTimeout: 60,
            swcMinify: true,
            output: 'standalone',
            experimental: {
                fetchCache: false,
                middlewarePrefetch: 'flexible',
                optimisticClientCache: true,
                manualClientBasePath: false,
                legacyBrowsers: false,
                newNextLinkBehavior: true,
                cpus: 7,
                sharedPool: true,
                profiling: false,
                isrFlushToDisk: true,
                workerThreads: false,
                pageEnv: false,
                optimizeCss: false,
                nextScriptWorkers: false,
                scrollRestoration: false,
                externalDir: false,
                disableOptimizedLoading: false,
                gzipSize: true,
                swcFileReading: true,
                craCompat: false,
                esmExternals: true,
                appDir: false,
                isrMemoryCacheSize: 52428800,
                fullySpecified: false,
                outputFileTracingRoot: '',
                swcTraceProfiling: false,
                forceSwcTransforms: false,
                largePageDataBytes: 128000,
                enableUndici: false,
                adjustFontFallbacks: false,
                adjustFontFallbacksWithSizeAdjust: false,
                trustHostHeader: false,
            },
            configFileName: 'next.config.js',
        },
    });
    handler = nextServer.getRequestHandler();
    console.log('Listening on port', currentPort, 'url: http://localhost:' + currentPort);
});
//# sourceMappingURL=server.js.map