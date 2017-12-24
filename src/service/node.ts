import { Document } from "mongoose";
import { getLink } from '../utils/shadowsocks';
import { IConfig } from "config";

class NodeService {
    private context = null;
    constructor(context) {
        this.context = context
    }

    public async getAllNodes(): Promise<Array<Document>> {
        return await this.context.model.node.find({})
    }

    public async create(nodeObject: object): Promise<Document> {
        const doc = new this.context.model.node(nodeObject)
        await doc.save()
        return doc
    }
    public async findById(nodeId: string): Promise<Document> {
        return await this.context.model.node.findOne({
            _id: nodeId
        });
    }
    public async destory(nodeId: string): Promise<void> {
        const node = await this.findById(nodeId)
        if (node) {
            await node.remove();
        }
    }
    public async upadte(nodeId: string, infomation: object): Promise<void> {
        const node = await this.findById(nodeId)
        if (node) {
            Object.assign(node, infomation);
            await node.save()
        }
    }

    public async getLink(nodeId: string, userId: string): Promise<string> {
        const node = await this.findById(nodeId);
        const user = await this.context.service.user.findById(userId);
        const config: IConfig = this.context.config;

        if (this.context.model.node.KIND_LIST.SHADOWSOCKS === node['kind']) {
            return getLink({
                host: node['address'],
                port: user.port,
                password: user.linkPassword,
                method: user.method,
                protocol: user.protocol,
                obfs: user.obfs,
                remarks: node['name'],
                group: config.get('site.name'),
            });
        }
        return "Tigger kind node is not support link"
    }

    public async getUserAvailAble(userId: string): Promise<Array<Document>> {
        const level = await this.context.service.user.getHighestLevel(userId)

        return await this.context.model.node.find({
            level: {
                $lte: level
            }
        })
    }
}

export default NodeService
