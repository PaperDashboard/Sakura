import * as mongoose from 'mongoose'

class ItemGroupModel {
    private static itemGroupSchema = new mongoose.Schema({
        isHidde: { type: Boolean, default: false, required: true },
        name: { type: String, default: "" },
    })

    getModel() {
        return mongoose.model('ItemGroup', ItemGroupModel.itemGroupSchema)
    }
}

export default new ItemGroupModel()
