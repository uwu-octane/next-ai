// instrumentation.ts
import Consul from 'consul';
export const runtime = 'nodejs'
const g = globalThis as unknown as { __NEXT_AI_CONSUL__?: boolean }

export async function register() {
    if (g.__NEXT_AI_CONSUL__) return
    g.__NEXT_AI_CONSUL__ = true
    
    if (process.env.NODE_ENV !== 'development') return
    const host = process.env.HOST || 'localhost'
    const port = Number(process.env.PORT)

    const consulHost = process.env.CONSUL_HOST || 'localhost'
    const consulPort = Number(process.env.CONSUL_PORT)
    const consul = new Consul({
        host: consulHost,
        port: consulPort,
    });
    const id = `${process.env.NEXT_PUBLIC_SERVICE_NAME}-${host}-${port}`;
    console.log('id', id)
        const svc = {
            id,
            name: 'next-ai',
            address: host,
            port: port,
            tags: ['gateway', 'ai', 'http'],
            check: {
                http: `http://host.docker.internal:${port}/nextapi/health`,
                interval: '10s',
                timeout: '5s',
                deregistercriticalserviceafter: '1m',
            },
        };
        console.log('🔌 Next.js instrumentation hook: registering with Consul');
        try {
            await consul.agent.service.register(svc as any);
            console.log(` Registered next-ai to Consul at ${consulHost}:${consulPort} as ${id}`);
        } catch (error) {
            console.error(`Failed to register next-ai to Consul:`, error);
        }
}
