// Redis Pub/Sub event bus for inter service communication
// initEventBus(): call once at startup to connect to Redis
// publishEvent(channel, data): fire an event (noben-ai, ner-roui, adbouras use this when something happens)
// subscribeToEvents(pattern, handler): listen for events (adbouras for presence, abmahfou for analytics)
// closeEventBus(): disconnect Redis on shutdown

const Redis = require('ioredis');
let publisher = null;
let subscriber = null;

function initEventBus(redisUrl){
    const url = redisUrl || process.env.REDIS_URL;
    publisher = new Redis(url);
    subscriber = new Redis(url);
    publisher.on('connect', () => console.log('Event bus publisher connected'));
    subscriber.on('connect', () => console.log('Event bus subscriber connected'));
    publisher.on('error', (err) => console.error('Publisher error:', err.message));
    subscriber.on('error', (err) => console.error('Subscriber error:', err.message));
}

async function publishEvent(channel, data){
    if (!publisher) { console.warn('Event bus not initialized'); return; }
    await publisher.publish(channel, JSON.stringify({ event: channel, data, timestamp: new Date().toISOString() }));
}

function subscribeToEvents(pattern, handler){
    if (!subscriber) { console.warn('Event bus not initialized'); return;
    }
    subscriber.psubscribe(pattern);
    subscriber.on('pmessage', (pat, channel, message) => {
        try { handler(channel, JSON.parse(message));}
        catch (err) { console.error('Failed to parse event:', err.message);

        }
    });
}

async function closeEventBus(){
    if (publisher) await publisher.quit();
    if (subscriber) await subscriber.quit();
}

module.exports = {initEventBus, publishEvent, subscribeToEvents, closeEventBus};