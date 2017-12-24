import * as mongoose from 'mongoose'

class ItemModel {
    public static TYPE = {
        PRODUCT: 0x00,
        FLOW_BAG: 0x01,
    }

    private static itemSchema = new mongoose.Schema({
        type: { type: Number, default: ItemModel.TYPE.PRODUCT, required: true },
        amount: { type: Number, default: 0, required: true },
        group: { type: mongoose.Schema.Types.ObjectId },
    })

    getModel() {
        const m: any = mongoose.model('Items', ItemModel.itemSchema);
        m.LIST_TYPE = ItemModel.TYPE;
        return m
    }
}

export default new ItemModel()
