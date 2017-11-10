import * as mocha from 'mocha'
import serviceUtils from '../utils/service'

describe('service', () => {
    it("service utils", done => {
        const r = {}
        serviceUtils(r, {}, function() {
            console.log(r["service"].user.default)
            done()
        })
    })
})
