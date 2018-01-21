import { Document, Error } from "mongoose";

class TickerService {
    private context = null;
    constructor(context) {
        this.context = context
    }

    public async create(user, title, context) {
        const message: Document = new this.context.model.ticketMessage({
            creater: user._id,
            context
        })
        await message.save()
        const ticket: Document = new this.context.model.ticket({
            creater: user._id,
            messages: [
                message._id
            ],
            title
        })
        await ticket.save()
    }
}
