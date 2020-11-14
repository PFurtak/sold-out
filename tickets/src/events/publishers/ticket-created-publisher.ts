import { Publisher, Subjects, TicketCreatedEvent } from '@soldout-dev/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}