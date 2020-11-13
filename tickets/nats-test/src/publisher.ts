import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';


const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS server');
    
    const publisher = new TicketCreatedPublisher(stan);
    publisher.publish({
        id: '123',
        title: 'concert',
        price: 15,
    });

//     const data = JSON.stringify({
//         id: '123',
//         title: 'Concert',
//         price: 20
//     });

//     stan.publish('ticket:created', data, () => {
//         console.log('Event published')
//     })
 })