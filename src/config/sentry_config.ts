import {Express} from 'express';
import * as Sentry from '@sentry/node';
import {nodeProfilingIntegration} from '@sentry/profiling-node';
import {env_config} from './env_config';

const {dsn} = env_config.sentry;

export const initSentry = (app: Express) => {
    Sentry.init({
        dsn,
        integrations: [
            new Sentry.Integrations.Http({tracing: true}),
            new Sentry.Integrations.Express({app}),
            nodeProfilingIntegration(),
        ],
        tracesSampleRate: 1.0,
        profilesSampleRate: 1.0,
    });

    return Sentry;
};