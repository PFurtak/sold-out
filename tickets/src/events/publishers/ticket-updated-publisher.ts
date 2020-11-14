import { Publisher, Subjects, TicketUpdatedEvent } from '@soldout-dev/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}